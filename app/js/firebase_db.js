// ============================================================================
// MÓDULO DE BASE DE DATOS EN LA NUBE (FIREBASE FIRESTORE + GOOGLE AUTH)
// Sincroniza todas las materias, programas analíticos, codiseño, planes de
// clase y hojas de actividad con Firestore (/courses/{courseId}).
// ============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const OperationType = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  LIST: "list",
  GET: "get",
  WRITE: "write"
};

let db = null;
let auth = null;
let currentUser = null;

function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo:
        auth?.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email
        })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

function sanitizeId(raw) {
  return String(raw || "curso")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 60);
}

function clampStr(val, fallback, maxLen) {
  const str = String(val || fallback || "").trim();
  const nonEmpty = str.length > 0 ? str : fallback;
  return nonEmpty.slice(0, maxLen);
}

async function testConnection() {
  if (!db) return;
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

window.FirebaseDB = {
  isReady: false,
  user: null,

  async init() {
    try {
      const res = await fetch("/firebase-applet-config.json");
      if (!res.ok) return;
      const firebaseConfig = await res.json();

      const app = initializeApp(firebaseConfig);
      db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
      auth = getAuth(app);
      this.isReady = true;

      await testConnection();

      onAuthStateChanged(auth, async (user) => {
        currentUser = user;
        this.user = user;
        if (window.AppController) {
          window.AppController.updateCloudAuthUI(user);
        }
        if (user) {
          await this.loadAndSyncCoursesFromCloud();
        }
      });
    } catch (err) {
      console.warn("Inicialización de Firebase omitida o en modo local:", err);
    }
  },

  async signInWithGoogle() {
    if (!auth) return;
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      if (window.AppController) {
        window.AppController.showToast(
          "Sesión iniciada con Google. Sincronizando tus materias con la base de datos en la nube...",
          "success"
        );
      }
    } catch (err) {
      if (window.AppController) {
        window.AppController.showToast(
          "No se completó el inicio de sesión con Google. Tus datos siguen guardados localmente.",
          "warning"
        );
      }
    }
  },

  async signOutUser() {
    if (!auth) return;
    await signOut(auth);
    if (window.AppController) {
      window.AppController.updateCloudAuthUI(null);
      window.AppController.showToast("Sesión en la nube cerrada.", "success");
    }
  },

  getDocIdForCourse(courseId) {
    if (!currentUser) return null;
    const uidPart = sanitizeId(currentUser.uid);
    const cPart = sanitizeId(courseId);
    return `${uidPart}_${cPart}`.slice(0, 128);
  },

  async loadAndSyncCoursesFromCloud() {
    if (!db || !currentUser || !window.AppController) return;
    const pathForList = "courses";
    let snap = null;
    try {
      const q = query(collection(db, pathForList), where("ownerId", "==", currentUser.uid));
      snap = await getDocs(q);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, pathForList);
      return;
    }

    const cloudCourses = {};
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && data.courseData && data.courseData.id) {
        cloudCourses[data.courseData.id] = data.courseData;
      }
    });

    const cloudKeys = Object.keys(cloudCourses);
    if (cloudKeys.length > 0) {
      // Combinar cursos de la nube con los locales (dando prioridad a los datos guardados en la cuenta del docente)
      Object.assign(window.AppController.state.coursesDB, cloudCourses);

      // Si el curso activo actual no está entre los cursos de la nube (ej. computadora nueva), activar el primer curso de la nube
      if (!cloudCourses[window.AppController.state.activeCourseId]) {
        window.AppController.state.activeCourseId = cloudKeys[0];
        localStorage.setItem("nem_active_course_id_v2", cloudKeys[0]);
      }

      localStorage.setItem(
        "nem_multi_courses_v2",
        JSON.stringify(window.AppController.state.coursesDB)
      );

      window.AppController.loadActiveCourseIntoState();
      window.AppController.renderCourseSelector();
      window.AppController.renderSidebar();
      window.AppController.renderMainView();
      window.AppController.updateCloudSyncBadge("Sincronizado en tu cuenta");
    } else {
      // Subir los cursos actuales del usuario por primera vez a Firestore
      await this.syncAllLocalCoursesToCloud();
    }
  },

  async syncAllLocalCoursesToCloud() {
    if (!db || !currentUser || !window.AppController) return;
    const courses = Object.values(window.AppController.state.coursesDB || {});
    for (const c of courses) {
      await this.saveCourseToCloud(c);
    }
    window.AppController.updateCloudSyncBadge("Guardado en Base de Datos");
  },

  async saveCourseToCloud(course) {
    if (!db || !currentUser || !course || !course.id) return;
    const docId = this.getDocIdForCourse(course.id);
    if (!docId) return;

    const pathForDoc = `courses/${docId}`;
    const esc = course.escuela || {};

    // Sanitizar y garantizar límites exactos del esquema firebase-blueprint.json
    const cleanCourseData = JSON.parse(
      JSON.stringify({
        id: String(course.id),
        nombreCurso: String(course.nombreCurso || "Curso NEM"),
        pdfFileName: String(course.pdfFileName || ""),
        escuela: esc,
        diagnostico: course.diagnostico || { comunidad: "", areasPrioritarias: [] },
        contenidosSinteticos: course.contenidosSinteticos || [],
        vinculacion: course.vinculacion || {},
        bloquesDB: course.bloquesDB || [],
        planesDB: course.planesDB || {}
      })
    );

    const basePayload = {
      courseId: docId,
      ownerId: currentUser.uid,
      nombreCurso: clampStr(course.nombreCurso, `${esc.asignatura || "Materia"} · ${esc.grado || "Grado"}`, 240),
      pdfFileName: String(course.pdfFileName || "").slice(0, 240),
      asignatura: clampStr(esc.asignatura, "Matemáticas", 160),
      grado: clampStr(esc.grado, "3° de Secundaria", 120),
      escuelaNombre: clampStr(esc.nombre, "Escuela Secundaria", 200),
      cct: clampStr(esc.cct, "26DES0010E", 40),
      docente: clampStr(esc.docente, "Docente NEM", 160),
      courseData: cleanCourseData,
      updatedAt: serverTimestamp()
    };

    try {
      const ref = doc(db, "courses", docId);
      await setDoc(ref, basePayload);
      if (window.AppController) {
        window.AppController.updateCloudSyncBadge("Guardado en Base de Datos");
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, pathForDoc);
    }
  },

  async deleteCourseFromCloud(courseId) {
    if (!db || !currentUser || !courseId) return;
    const docId = this.getDocIdForCourse(courseId);
    if (!docId) return;
    const pathForDelete = `courses/${docId}`;
    try {
      await deleteDoc(doc(db, "courses", docId));
      if (window.AppController) {
        window.AppController.updateCloudSyncBadge("Materia eliminada de BD");
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, pathForDelete);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.FirebaseDB.init();
});
