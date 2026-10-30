// ============================================================================
// CONTROLADOR PRINCIPAL DE LA PLATAFORMA DE PLANEACIÓN DIDÁCTICA NEM CON IA
// Flujo Encadenado en 5 Etapas (Multi-Materia y Multi-Grado):
// 1. Datos y Programa Sintético (PDF/Catálogo) -> 2. Programa Analítico ->
// 3. Codiseño -> 4. Planes de Clase -> 5. Hojas de Actividad
// Conserva íntegro el proyecto base de Matemáticas 3° (Esc. Sec. Abelardo L. Rodríguez)
// ============================================================================

window.AppController = {
  state: {
    currentTab: "planeacion", // 'sintetico' | 'analitico' | 'codiseno' | 'planeacion' | 'hojas'
    currentTrimestre: 1, // 1 | 2 | 3 | 4 (Codiseño) | 0 (Todos)
    searchQuery: "",
    selectedBloqueId: "B01",
    selectedSessionIndex: "all", // 'all' o índice numérico 0, 1, 2...
    showTeacherAnswers: false,
    compactPrintMode: false,
    editMode: false,
    lastSavedTime: null,
    activeCourseId: "matematicas_3_alr",
    coursesDB: {},
    // Referencias activas sincronizadas con el curso seleccionado:
    escuela: null,
    diagnostico: null,
    contenidosSinteticos: [],
    vinculacion: null,
    bloquesDB: [],
    planesDB: {}
  },

  init() {
    const savedCompact = localStorage.getItem("nem_alr_compact_mode");
    if (savedCompact === "true") {
      this.state.compactPrintMode = true;
    }

    // 1. Construir el curso base de Matemáticas 3° (Esc. Sec. Gral. Abelardo L. Rodríguez)
    const defaultMathCourse = this.buildDefaultMathCourse();

    // 2. Cargar cursos guardados en localStorage
    const savedCoursesRaw = localStorage.getItem("nem_multi_courses_v2");
    if (savedCoursesRaw) {
      try {
        const parsedCourses = JSON.parse(savedCoursesRaw);
        if (parsedCourses && typeof parsedCourses === "object") {
          this.state.coursesDB = parsedCourses;
        }
      } catch (e) {}
    }

    // Asegurar que el curso principal de Matemáticas 3° exista siempre y herede personalizaciones previas
    if (!this.state.coursesDB["matematicas_3_alr"]) {
      this.state.coursesDB["matematicas_3_alr"] = defaultMathCourse;
    } else {
      // Garantizar que los bloques de 2 semanas tengan sus 10 sesiones completas
      const c = this.state.coursesDB["matematicas_3_alr"];
      if (!c.contenidosSinteticos || c.contenidosSinteticos.length === 0) {
        c.contenidosSinteticos = defaultMathCourse.contenidosSinteticos;
      }
      if (!c.diagnostico) {
        c.diagnostico = defaultMathCourse.diagnostico;
      }
      (c.bloquesDB || []).forEach((b) => {
        if (c.planesDB && c.planesDB[b.id]) {
          c.planesDB[b.id] = window.SessionExpander.ensureFullSessions(b, c.planesDB[b.id]);
        }
      });
    }

    const savedActiveCourseId = localStorage.getItem("nem_active_course_id_v2");
    if (savedActiveCourseId && this.state.coursesDB[savedActiveCourseId]) {
      this.state.activeCourseId = savedActiveCourseId;
    } else {
      this.state.activeCourseId = "matematicas_3_alr";
    }

    this.loadActiveCourseIntoState();
    this.bindEvents();
    this.renderCourseSelector();
    this.renderSidebar();
    this.renderMainView();
  },

  buildDefaultMathCourse() {
    const escuela = JSON.parse(JSON.stringify(window.ProgramaAnaliticoData.escuela));
    escuela.fase = escuela.fase || "Fase 6";
    escuela.materiaId = "matematicas";
    escuela.asignatura = escuela.asignatura || "Matemáticas";
    escuela.grado = escuela.grado || "3° de Secundaria";
    escuela.municipio = escuela.municipio || "Guaymas, Sonora";

    const diagnostico = JSON.parse(
      JSON.stringify(window.ProgramaAnaliticoData.diagnosticoSocioeducativo)
    );
    const vinculacion = JSON.parse(
      JSON.stringify(window.ProgramaAnaliticoData.vinculacionTransversalDefault)
    );
    let bloquesDB = JSON.parse(
      JSON.stringify(window.ProgramaAnaliticoData.bloquesCurriculares)
    );

    const rawPlanes = {
      ...window.PlaneacionesTrimestre1,
      ...window.PlaneacionesTrimestre2y3
    };
    const planesDB = {};
    bloquesDB.forEach((b) => {
      if (rawPlanes[b.id]) {
        planesDB[b.id] = window.SessionExpander.ensureFullSessions(
          b,
          JSON.parse(JSON.stringify(rawPlanes[b.id]))
        );
      }
    });

    // Migrar personalizaciones previas de v1 si existían
    try {
      const legacyEsc = localStorage.getItem("nem_alr_escuela");
      if (legacyEsc) Object.assign(escuela, JSON.parse(legacyEsc));
      const legacyVinc = localStorage.getItem("nem_alr_vinculacion");
      if (legacyVinc) Object.assign(vinculacion, JSON.parse(legacyVinc));
      const legacyBloques = localStorage.getItem("nem_alr_custom_bloques_v1");
      if (legacyBloques) {
        const pb = JSON.parse(legacyBloques);
        if (Array.isArray(pb) && pb.length > 0) bloquesDB = pb;
      }
      const legacyPlanes = localStorage.getItem("nem_alr_custom_planes_v1");
      if (legacyPlanes) {
        const pp = JSON.parse(legacyPlanes);
        Object.assign(planesDB, pp);
        bloquesDB.forEach((b) => {
          if (planesDB[b.id]) {
            planesDB[b.id] = window.SessionExpander.ensureFullSessions(b, planesDB[b.id]);
          }
        });
      }
    } catch (e) {}

    const contenidosSinteticos = window.CatalogoSinteticoNEM.getContenidosForMateria(
      "matematicas",
      "3° de Secundaria"
    );

    return {
      id: "matematicas_3_alr",
      nombreCurso: `${escuela.asignatura} · ${escuela.grado} (${escuela.nombre})`,
      pdfFileName: "Programa_Sintetico_Fase_6.pdf (Incluido)",
      escuela,
      diagnostico,
      contenidosSinteticos,
      vinculacion,
      bloquesDB,
      planesDB
    };
  },

  loadActiveCourseIntoState() {
    const course =
      this.state.coursesDB[this.state.activeCourseId] ||
      this.state.coursesDB["matematicas_3_alr"];
    this.state.escuela = course.escuela;
    this.state.diagnostico = course.diagnostico;
    this.state.contenidosSinteticos = course.contenidosSinteticos || [];
    this.state.vinculacion = course.vinculacion;
    this.state.bloquesDB = course.bloquesDB || [];
    this.state.planesDB = course.planesDB || {};

    if (
      !this.state.bloquesDB.some((b) => b.id === this.state.selectedBloqueId) &&
      this.state.bloquesDB.length > 0
    ) {
      this.state.selectedBloqueId = this.state.bloquesDB[0].id;
    }
    this.state.selectedSessionIndex = "all";
  },

  renderCourseSelector() {
    const selectEl = document.getElementById("courseSelectDropdown");
    const wordmarkEl = document.getElementById("topbarWordmark");
    if (wordmarkEl && this.state.escuela) {
      wordmarkEl.textContent = `${this.state.escuela.asignatura || "Materia"} · ${this.state.escuela.grado || ""} · ${this.state.escuela.nombre || "Escuela"}`;
    }
    if (!selectEl) return;

    const entries = Object.values(this.state.coursesDB);
    selectEl.innerHTML = entries
      .map((c) => {
        const label = `${c.escuela?.asignatura || "Materia"} · ${c.escuela?.grado || ""} (${c.escuela?.nombre || "Escuela"})`;
        return `<option value="${c.id}" ${c.id === this.state.activeCourseId ? "selected" : ""}>${label}</option>`;
      })
      .join("");
  },

  switchCourse(courseId) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    if (!this.state.coursesDB[courseId]) return;
    this.state.activeCourseId = courseId;
    localStorage.setItem("nem_active_course_id_v2", courseId);
    this.loadActiveCourseIntoState();
    this.renderCourseSelector();
    this.renderSidebar();
    this.renderMainView();
    this.showToast(
      `Curso activo: ${this.state.escuela.asignatura} (${this.state.escuela.grado}).`,
      "success"
    );
  },

  createNewCourseInteractive() {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    const baseEsc = this.state.escuela || {};
    const newId = `curso_${Date.now()}`;
    const nuevaMateriaId = "espanol";
    const nuevaAsignatura = "Español (Lengua Materna)";
    const nuevoGrado = "1° de Secundaria";
    const nuevoCampo = "Lenguajes";

    const nuevaEscuela = {
      nombre: baseEsc.nombre || "Escuela Secundaria General Abelardo L. Rodríguez",
      cct: baseEsc.cct || "26DES0010E",
      docente: baseEsc.docente || "Prof. José Rafael Leyva García",
      turno: baseEsc.turno || "Vespertino",
      fase: "Fase 6",
      grado: nuevoGrado,
      grupos: "1°A, 1°B",
      campoFormativo: nuevoCampo,
      materiaId: nuevaMateriaId,
      asignatura: nuevaAsignatura,
      municipio: baseEsc.municipio || "Guaymas, Sonora",
      cicloEscolar: baseEsc.cicloEscolar || "2025-2026"
    };

    const contenidos = window.CatalogoSinteticoNEM.getContenidosForMateria(
      nuevaMateriaId,
      nuevoGrado
    );

    const diagnostico = {
      comunidad: `La escuela ${nuevaEscuela.nombre} (CCT ${nuevaEscuela.cct}), ubicada en ${nuevaEscuela.municipio}, atiende a los grupos ${nuevaEscuela.grupos} del turno ${nuevaEscuela.turno} en ${nuevaEscuela.grado} (${nuevaEscuela.fase}). El contexto sociocultural y productivo de la localidad permite vincular los Procesos de Desarrollo de Aprendizaje (PDA) de ${nuevaEscuela.asignatura} con situaciones reales de los estudiantes.`,
      areasPrioritarias: [
        {
          titulo: `1. Dominio de PDAs en ${nuevaEscuela.asignatura}`,
          descripcion: `Fortalecer las habilidades fundamentales de ${nuevaEscuela.asignatura} mediante actividades contextualizadas.`
        },
        {
          titulo: "2. Comprensión Lectora, Argumentación y Pensamiento Crítico",
          descripcion: "Impulsar el análisis de fuentes, la expresión oral y escrita y la resolución colaborativa de problemas."
        },
        {
          titulo: "3. Vinculación con la Comunidad y Evaluación Formativa",
          descripcion: "Relacionar cada secuencia con retos reales del entorno escolar y familiar."
        }
      ]
    };

    const bloquesIniciales = window.AIGenerator.normalizeBloquesAnalitico(
      contenidos.map((c, idx) => ({
        trimestre: c.trimestreSugerido || ((idx % 3) + 1),
        semanas: `Semanas ${idx * 2 + 1} y ${idx * 2 + 2}`,
        numSemanas: c.semanasSugeridas || 2,
        numSesiones: (c.semanasSugeridas || 2) * 5,
        contenidoSintetico: c.contenido,
        contenidoContextualizado: `${c.contenido} (Contextualizado en ${nuevaEscuela.municipio})`,
        pda: c.pda,
        justificacion: `Contextualizado para responder a los intereses y necesidades de los grupos ${nuevaEscuela.grupos}.`,
        ejesArticuladores: c.ejesSugeridos
      })),
      nuevaEscuela
    );

    const planesIniciales = {};
    bloquesIniciales.forEach((b) => {
      planesIniciales[b.id] = window.AIGenerator.generateLocalPlanForBloque(nuevaEscuela, b);
    });

    this.state.coursesDB[newId] = {
      id: newId,
      nombreCurso: `${nuevaEscuela.asignatura} · ${nuevaEscuela.grado} (${nuevaEscuela.nombre})`,
      pdfFileName: "Catálogo Oficial NEM (Listo para subir PDF)",
      escuela: nuevaEscuela,
      diagnostico,
      contenidosSinteticos: contenidos,
      vinculacion: JSON.parse(
        JSON.stringify(window.ProgramaAnaliticoData.vinculacionTransversalDefault)
      ),
      bloquesDB: bloquesIniciales,
      planesDB: planesIniciales
    };

    this.state.activeCourseId = newId;
    localStorage.setItem("nem_active_course_id_v2", newId);
    this.loadActiveCourseIntoState();
    this.saveStateToStorage();
    this.renderCourseSelector();
    this.renderSidebar();
    this.switchSubView("sintetico");
    this.showToast(
      "Nuevo curso creado. Configura los datos de Escuela, Docente, Materia y sube tu PDF en el Paso 1.",
      "success"
    );
  },

  deleteActiveCourse() {
    if (this.state.activeCourseId === "matematicas_3_alr") {
      this.showToast(
        "El curso base de Matemáticas 3° (Sec. Abelardo L. Rodríguez) está protegido y no se puede eliminar.",
        "warning"
      );
      return;
    }
    this.showConfirmModal({
      title: "Eliminar este curso",
      message: `¿Deseas eliminar el curso "${this.state.escuela.asignatura} · ${this.state.escuela.grado}"? Volverás automáticamente al curso principal de Matemáticas 3°.`,
      confirmText: "Eliminar curso",
      onConfirm: () => {
        delete this.state.coursesDB[this.state.activeCourseId];
        this.state.activeCourseId = "matematicas_3_alr";
        localStorage.setItem("nem_active_course_id_v2", "matematicas_3_alr");
        this.loadActiveCourseIntoState();
        this.saveStateToStorage();
        this.renderCourseSelector();
        this.renderSidebar();
        this.renderMainView();
        this.showToast("Curso eliminado.", "success");
      }
    });
  },

  // ================= NOTIFICACIONES TOAST Y MODAL INTEGRADO =================
  showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const prefixes = {
      success: "Listo:",
      warning: "Aviso:",
      error: "Error:"
    };
    const prefix = prefixes[type] || "Info:";

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <span><strong>${prefix}</strong> ${message}</span>
      <button type="button" style="background:transparent;border:none;color:#ffffff;cursor:pointer;font-weight:700;font-size:0.9rem;" aria-label="Cerrar">×</button>
    `;
    toast.querySelector("button").addEventListener("click", () => toast.remove());
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 3800);
  },

  showConfirmModal({ title, message, confirmText = "Confirmar", onConfirm }) {
    const backdrop = document.getElementById("confirmModalBackdrop");
    const titleEl = document.getElementById("confirmModalTitle");
    const msgEl = document.getElementById("confirmModalMessage");
    const cancelBtn = document.getElementById("confirmModalCancelBtn");
    const acceptBtn = document.getElementById("confirmModalAcceptBtn");

    if (!backdrop || !titleEl || !msgEl || !cancelBtn || !acceptBtn) {
      if (typeof onConfirm === "function") onConfirm();
      return;
    }

    titleEl.textContent = title || "Confirmar acción";
    msgEl.textContent = message || "¿Deseas continuar con esta acción?";
    acceptBtn.textContent = confirmText;
    backdrop.style.display = "flex";

    const cleanup = () => {
      backdrop.style.display = "none";
      cancelBtn.onclick = null;
      acceptBtn.onclick = null;
    };

    cancelBtn.onclick = () => cleanup();
    acceptBtn.onclick = () => {
      cleanup();
      if (typeof onConfirm === "function") onConfirm();
    };
  },

  // ================= PERSISTENCIA Y ESTADO =================
  saveStateToStorage() {
    const currentCourse = this.state.coursesDB[this.state.activeCourseId];
    if (currentCourse) {
      currentCourse.escuela = this.state.escuela;
      currentCourse.diagnostico = this.state.diagnostico;
      currentCourse.contenidosSinteticos = this.state.contenidosSinteticos;
      currentCourse.vinculacion = this.state.vinculacion;
      currentCourse.bloquesDB = this.state.bloquesDB;
      currentCourse.planesDB = this.state.planesDB;
      currentCourse.nombreCurso = `${this.state.escuela.asignatura} · ${this.state.escuela.grado} (${this.state.escuela.nombre})`;
    }

    localStorage.setItem("nem_multi_courses_v2", JSON.stringify(this.state.coursesDB));
    localStorage.setItem("nem_active_course_id_v2", this.state.activeCourseId);
    localStorage.setItem("nem_alr_compact_mode", String(this.state.compactPrintMode));

    const now = new Date();
    this.state.lastSavedTime = now.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    const badge = document.getElementById("saveStatusBadge");
    if (badge) {
      badge.textContent = `Guardado automático · ${this.state.lastSavedTime}`;
      badge.style.display = "inline-block";
    }
    this.renderCourseSelector();
  },

  getCurrentBloque() {
    return (
      this.state.bloquesDB.find((b) => b.id === this.state.selectedBloqueId) ||
      this.state.bloquesDB[0]
    );
  },

  getCurrentPlan() {
    const b = this.getCurrentBloque();
    if (!b) return null;
    if (!this.state.planesDB[b.id]) {
      this.state.planesDB[b.id] = window.AIGenerator.generateLocalPlanForBloque(
        this.state.escuela,
        b
      );
    }
    return this.state.planesDB[b.id];
  },

  bindEvents() {
    // Pestañas superiores (5 etapas del flujo NEM)
    document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.state.editMode) {
          this.flushAllEditableFields();
        }
        document.querySelectorAll(".nav-tab-btn").forEach((el) => el.classList.remove("active"));
        btn.classList.add("active");
        this.state.currentTab = btn.dataset.tab;
        this.renderMainView();
      });
    });

    // Filtro de trimestres en la barra lateral
    document.querySelectorAll(".trim-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".trim-btn").forEach((el) => el.classList.remove("active"));
        btn.classList.add("active");
        this.state.currentTrimestre = parseInt(btn.dataset.trim, 10);

        const bloqueActual = this.getCurrentBloque();
        if (
          bloqueActual &&
          this.state.currentTrimestre !== 0 &&
          bloqueActual.trimestre !== this.state.currentTrimestre
        ) {
          const primerBloque = this.state.bloquesDB.find(
            (b) => b.trimestre === this.state.currentTrimestre
          );
          if (primerBloque) {
            this.state.selectedBloqueId = primerBloque.id;
            this.state.selectedSessionIndex = "all";
            this.renderMainView();
          }
        }
        this.renderSidebar();
      });
    });

    // Buscador lateral
    const searchInput = document.getElementById("sidebarSearch");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.state.searchQuery = e.target.value.toLowerCase();
        this.renderSidebar();
      });
    }
  },

  // Convierte el HTML de un elemento contenteditable en texto limpio con saltos de línea
  extractCleanText(el) {
    if (!el) return "";
    const clone = el.cloneNode(true);
    clone.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
    clone.querySelectorAll("div, p").forEach((block) => {
      block.prepend(document.createTextNode("\n"));
    });
    return (clone.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
  },

  // Aplica el valor de un elemento editable directamente en el modelo de datos en memoria
  applyEditableElementToState(el) {
    const scope = el.dataset.editScope;
    if (!scope) return;

    const val = this.extractCleanText(el);
    const bloque = this.getCurrentBloque();
    const plan = this.getCurrentPlan();

    if (scope === "escuela") {
      const key = el.dataset.field;
      if (key) this.state.escuela[key] = val;
    } else if (scope === "diagnostico") {
      const key = el.dataset.field;
      if (key === "comunidad") {
        this.state.diagnostico.comunidad = val;
      } else if (key === "area_titulo" || key === "area_desc") {
        const aIdx = parseInt(el.dataset.areaIdx, 10);
        if (!isNaN(aIdx) && this.state.diagnostico.areasPrioritarias?.[aIdx]) {
          if (key === "area_titulo") this.state.diagnostico.areasPrioritarias[aIdx].titulo = val;
          else this.state.diagnostico.areasPrioritarias[aIdx].descripcion = val;
        }
      }
    } else if (scope === "sintetico_item") {
      const cIdx = parseInt(el.dataset.itemIdx, 10);
      const key = el.dataset.field;
      if (!isNaN(cIdx) && this.state.contenidosSinteticos[cIdx] && key) {
        this.state.contenidosSinteticos[cIdx][key] = val;
      }
    } else if (scope === "bloque_by_id") {
      const bId = el.dataset.bloqueId;
      const key = el.dataset.field;
      const targetB = this.state.bloquesDB.find((item) => item.id === bId);
      if (targetB && key) {
        targetB[key] = val;
      }
    } else if (scope === "bloque") {
      const key = el.dataset.field;
      if (key && bloque) {
        bloque[key] = val;
      }
    } else if (scope === "plan") {
      const key = el.dataset.field;
      if (key && plan) {
        plan[key] = val;
      }
    } else if (scope === "vinculacion") {
      const key = el.dataset.field;
      if (key && this.state.vinculacion) {
        this.state.vinculacion[key] = val
          .split("\n")
          .map((line) => line.replace(/^[•\-*]\s*/, "").trim())
          .filter(Boolean);
      }
    } else if (scope === "sesion") {
      const sIdx = parseInt(el.dataset.sessionIdx, 10);
      const key = el.dataset.field;
      if (!isNaN(sIdx) && plan && plan.sesiones && plan.sesiones[sIdx]) {
        plan.sesiones[sIdx][key] = val;
      }
    } else if (scope === "evaluacion") {
      const eIdx = parseInt(el.dataset.evalIdx, 10);
      if (!isNaN(eIdx) && plan && plan.evaluacionFormativa) {
        plan.evaluacionFormativa[eIdx] = val.replace(/^[a-z]\)\s*/i, "").trim();
      }
    } else if (scope === "hoja") {
      const sIdx = parseInt(el.dataset.sessionIdx, 10);
      const key = el.dataset.field;
      if (!isNaN(sIdx) && plan && plan.sesiones && plan.sesiones[sIdx]) {
        if (!plan.sesiones[sIdx].hojaActividad) plan.sesiones[sIdx].hojaActividad = {};
        plan.sesiones[sIdx].hojaActividad[key] = val;
      }
    } else if (scope === "ejercicio") {
      const sIdx = parseInt(el.dataset.sessionIdx, 10);
      const exIdx = parseInt(el.dataset.exerciseIdx, 10);
      const key = el.dataset.field;
      if (
        !isNaN(sIdx) &&
        !isNaN(exIdx) &&
        plan &&
        plan.sesiones?.[sIdx]?.hojaActividad?.ejercicios?.[exIdx]
      ) {
        if (key === "respuesta") {
          plan.sesiones[sIdx].hojaActividad.ejercicios[exIdx].respuesta = val
            .replace(/^Respuesta\s*\/\s*Guía Docente:\s*/i, "")
            .trim();
        } else {
          plan.sesiones[sIdx].hojaActividad.ejercicios[exIdx][key] = val;
        }
      }
    }
  },

  flushAllEditableFields() {
    const editables = document.querySelectorAll('[contenteditable="true"][data-edit-scope]');
    if (editables.length === 0) return;
    editables.forEach((el) => this.applyEditableElementToState(el));
    this.saveStateToStorage();
    this.renderSidebar();
  },

  attachEditableListeners() {
    const editables = document.querySelectorAll('[contenteditable="true"][data-edit-scope]');
    editables.forEach((el) => {
      el.addEventListener("input", () => {
        this.applyEditableElementToState(el);
        this.saveStateToStorage();
      });
      el.addEventListener("blur", () => {
        this.applyEditableElementToState(el);
        this.saveStateToStorage();
        this.renderSidebar();
      });
    });
  },

  toggleMobileSidebar() {
    const sidebarEl = document.getElementById("appSidebar");
    const toggleBtn = document.getElementById("mobileSidebarToggleBtn");
    if (!sidebarEl) return;
    const isOpen = sidebarEl.classList.toggle("mobile-open");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  },

  renderSidebar() {
    const listEl = document.getElementById("bloqueListContainer");
    const countMetaEl = document.getElementById("sidebarCountMeta");
    const mobileLabelEl = document.getElementById("mobileSidebarToggleLabel");
    if (!listEl) return;

    const currentBloque = this.getCurrentBloque();
    if (mobileLabelEl && currentBloque) {
      mobileLabelEl.textContent = `Secuencia Activa: ${currentBloque.semanas} (${currentBloque.id}) · Cambiar`;
    }

    const bloques = this.state.bloquesDB.filter((b) => {
      const matchTrim =
        this.state.currentTrimestre === 0 || b.trimestre === this.state.currentTrimestre;
      const q = this.state.searchQuery;
      const matchQuery =
        !q ||
        (b.semanas || "").toLowerCase().includes(q) ||
        (b.contenidoSintetico || "").toLowerCase().includes(q) ||
        (b.contenidoContextualizado || "").toLowerCase().includes(q) ||
        (b.pda || "").toLowerCase().includes(q);
      return matchTrim && matchQuery;
    });

    const totalSesionesMostradas = bloques.reduce((acc, b) => {
      const p = this.state.planesDB[b.id];
      return acc + (p && p.sesiones ? p.sesiones.length : b.numSesiones || 5);
    }, 0);

    if (countMetaEl) {
      countMetaEl.textContent = `${bloques.length} bloques · ${totalSesionesMostradas} sesiones`;
    }

    if (bloques.length === 0) {
      listEl.innerHTML = `
        <div style="padding:18px 12px;text-align:center;color:#64748b;font-size:0.82rem;border:1px dashed #cbd5e1;border-radius:8px;">
          No hay secuencias en este filtro.
        </div>
      `;
      return;
    }

    listEl.innerHTML = bloques
      .map((b) => {
        const plan = this.state.planesDB[b.id];
        const numSes = plan && plan.sesiones ? plan.sesiones.length : b.numSesiones;
        const isActive = b.id === this.state.selectedBloqueId;
        const trimLabel = b.trimestre <= 3 ? `Trim. ${b.trimestre}` : "Codiseño";
        return `
          <div class="bloque-item ${isActive ? "active" : ""}" onclick="AppController.selectBloque('${b.id}')">
            <div class="bloque-item-meta">
              <span class="bloque-meta-week">${b.semanas}</span>
              <span aria-hidden="true">·</span>
              <span>${trimLabel}</span>
              <span aria-hidden="true">·</span>
              <span>${numSes} ses.</span>
            </div>
            <div class="bloque-item-title">${b.contenidoSintetico}</div>
            <div class="bloque-item-pda">${b.pda}</div>
          </div>
        `;
      })
      .join("");
  },

  selectBloque(bloqueId) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    this.state.selectedBloqueId = bloqueId;
    this.state.selectedSessionIndex = "all";
    const sidebarEl = document.getElementById("appSidebar");
    const toggleBtn = document.getElementById("mobileSidebarToggleBtn");
    if (sidebarEl && sidebarEl.classList.contains("mobile-open")) {
      sidebarEl.classList.remove("mobile-open");
      if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
    }
    this.renderSidebar();
    this.renderMainView();
  },

  selectSession(idx) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    this.state.selectedSessionIndex = idx;
    this.renderMainView();
  },

  stepSession(delta) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    const plan = this.getCurrentPlan();
    const total = plan && Array.isArray(plan.sesiones) ? plan.sesiones.length : 0;
    if (total === 0) return;

    let current = this.state.selectedSessionIndex;
    if (current === "all") {
      current = delta > 0 ? 0 : total - 1;
    } else {
      current = (current + delta + total) % total;
    }
    this.state.selectedSessionIndex = current;
    this.renderMainView();
  },

  toggleTeacherAnswers() {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    this.state.showTeacherAnswers = !this.state.showTeacherAnswers;
    this.renderMainView();
  },

  toggleCompactMode() {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    this.state.compactPrintMode = !this.state.compactPrintMode;
    this.saveStateToStorage();
    this.renderMainView();
    this.showToast(
      this.state.compactPrintMode
        ? "Modo compacto activado (1 página por Hoja de Actividad)."
        : "Modo de tamaño estándar restaurado.",
      "success"
    );
  },

  toggleEditMode() {
    if (this.state.editMode) {
      this.flushAllEditableFields();
      this.state.editMode = false;
      this.showToast("Cambios guardados en tu curso activo.", "success");
    } else {
      this.state.editMode = true;
    }
    this.renderMainView();
  },

  // ================= OPERACIONES CRUD EN MODO EDICIÓN =================
  renumberSessions(plan, bloque) {
    if (!plan || !Array.isArray(plan.sesiones)) return;
    plan.sesiones.forEach((s, idx) => {
      s.numero = idx + 1;
    });
    const numSem = Math.max(1, Math.ceil(plan.sesiones.length / 5));
    plan.tiempoRealizacion = `${numSem} semana(s) (${plan.sesiones.length} sesiones)`;
  },

  addManualSession() {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    const bloque = this.getCurrentBloque();
    const plan = this.getCurrentPlan();
    if (!plan) return;
    if (!Array.isArray(plan.sesiones)) plan.sesiones = [];

    const nextNum = plan.sesiones.length + 1;
    const nueva = window.AIGenerator.generateContextualSession(
      bloque,
      "pesca",
      "",
      nextNum,
      this.state.escuela
    );
    plan.sesiones.push(nueva);
    this.renumberSessions(plan, bloque);
    this.saveStateToStorage();
    this.renderSidebar();
    this.renderMainView();
    this.showToast(`Sesión ${nextNum} agregada al bloque ${bloque.id}.`, "success");
  },

  deleteSession(sessionIdx) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    const bloque = this.getCurrentBloque();
    const plan = this.getCurrentPlan();
    if (!plan || !Array.isArray(plan.sesiones)) return;

    if (plan.sesiones.length <= 1) {
      this.showToast("Cada bloque debe conservar al menos 1 sesión.", "warning");
      return;
    }

    const ses = plan.sesiones[sessionIdx];
    this.showConfirmModal({
      title: `Eliminar Sesión ${ses ? ses.numero : sessionIdx + 1}`,
      message: `¿Estás seguro de eliminar la Sesión ${ses ? ses.numero : sessionIdx + 1} ("${ses ? ses.titulo : ""}") y su Hoja de Actividad? Las sesiones restantes se renumerarán automáticamente.`,
      confirmText: "Eliminar sesión",
      onConfirm: () => {
        plan.sesiones.splice(sessionIdx, 1);
        this.renumberSessions(plan, bloque);
        if (this.state.selectedSessionIndex !== "all") {
          this.state.selectedSessionIndex = Math.min(
            this.state.selectedSessionIndex,
            plan.sesiones.length - 1
          );
        }
        this.saveStateToStorage();
        this.renderSidebar();
        this.renderMainView();
        this.showToast("Sesión eliminada y secuencia renumerada.", "success");
      }
    });
  },

  addExercise(sessionIdx) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    const plan = this.getCurrentPlan();
    const ses = plan && plan.sesiones && plan.sesiones[sessionIdx];
    if (!ses) return;

    if (!ses.hojaActividad) ses.hojaActividad = {};
    if (!Array.isArray(ses.hojaActividad.ejercicios)) ses.hojaActividad.ejercicios = [];

    const nextExNum = ses.hojaActividad.ejercicios.length + 1;
    ses.hojaActividad.ejercicios.push({
      enunciado: `${nextExNum}. Nueva actividad contextualizada: Describe aquí el planteamiento o ejercicio para el alumno.`,
      respuesta: "Procedimiento o criterio de resolución esperada para la guía docente."
    });

    this.saveStateToStorage();
    this.renderMainView();
    this.showToast(`Actividad #${nextExNum} añadida a la Sesión ${ses.numero}.`, "success");
  },

  deleteExercise(sessionIdx, exerciseIdx) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    const plan = this.getCurrentPlan();
    const ejercicios = plan?.sesiones?.[sessionIdx]?.hojaActividad?.ejercicios;
    if (!Array.isArray(ejercicios)) return;

    if (ejercicios.length <= 1) {
      this.showToast("La hoja de trabajo debe tener al menos un ejercicio.", "warning");
      return;
    }

    ejercicios.splice(exerciseIdx, 1);
    this.saveStateToStorage();
    this.renderMainView();
    this.showToast("Ejercicio eliminado de la Hoja de Actividad.", "success");
  },

  changeWorksheetDiagram(sessionIdx, newDiagramType) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    const plan = this.getCurrentPlan();
    const ses = plan?.sesiones?.[sessionIdx];
    if (!ses) return;

    if (!ses.hojaActividad) ses.hojaActividad = {};
    ses.hojaActividad.diagramType = newDiagramType;
    this.saveStateToStorage();
    this.renderMainView();
    this.showToast("Esquema visual actualizado en la Hoja de Actividad.", "success");
  },

  addEvaluationCriterion() {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    const plan = this.getCurrentPlan();
    if (!plan) return;
    if (!Array.isArray(plan.evaluacionFormativa)) plan.evaluacionFormativa = [];

    plan.evaluacionFormativa.push("Nuevo indicador de evaluación formativa del PDA.");
    this.saveStateToStorage();
    this.renderMainView();
    this.showToast("Indicador de evaluación formativa agregado.", "success");
  },

  deleteEvaluationCriterion(evalIdx) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    const plan = this.getCurrentPlan();
    if (!plan || !Array.isArray(plan.evaluacionFormativa)) return;
    if (plan.evaluacionFormativa.length <= 1) {
      this.showToast("Debe existir al menos un criterio de evaluación.", "warning");
      return;
    }
    plan.evaluacionFormativa.splice(evalIdx, 1);
    this.saveStateToStorage();
    this.renderMainView();
    this.showToast("Indicador eliminado.", "success");
  },

  // ================= RESPALDO PORTÁTIL JSON (EXPORTAR / IMPORTAR) =================
  exportBackupJSON() {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    this.saveStateToStorage();
    const backupPayload = {
      app: "Plataforma de Planeación Didáctica NEM Multi-Materia",
      version: "3.0",
      exportedAt: new Date().toISOString(),
      activeCourseId: this.state.activeCourseId,
      coursesDB: this.state.coursesDB,
      // Compatibilidad hacia atrás
      escuela: this.state.escuela,
      vinculacion: this.state.vinculacion,
      bloquesDB: this.state.bloquesDB,
      planesDB: this.state.planesDB
    };

    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], {
      type: "application/json;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `Respaldo_Planeaciones_NEM_${dateStamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.showToast("Archivo de respaldo (.json) descargado correctamente.", "success");
  },

  triggerImportBackup() {
    const fileInput = document.getElementById("backupJsonInput");
    if (fileInput) {
      fileInput.value = "";
      fileInput.click();
    }
  },

  handleImportBackupFile(event) {
    const file = event.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(String(e.target?.result || "{}"));
        if (parsed.coursesDB && typeof parsed.coursesDB === "object") {
          this.state.coursesDB = parsed.coursesDB;
          this.state.activeCourseId =
            parsed.activeCourseId && this.state.coursesDB[parsed.activeCourseId]
              ? parsed.activeCourseId
              : Object.keys(this.state.coursesDB)[0];
          this.loadActiveCourseIntoState();
        } else if (parsed.planesDB && parsed.bloquesDB) {
          if (parsed.escuela) this.state.escuela = parsed.escuela;
          if (parsed.vinculacion) this.state.vinculacion = parsed.vinculacion;
          if (Array.isArray(parsed.bloquesDB)) this.state.bloquesDB = parsed.bloquesDB;
          if (parsed.planesDB) this.state.planesDB = parsed.planesDB;
        } else {
          this.showToast("El archivo JSON no tiene el formato de respaldo esperado.", "error");
          return;
        }

        this.saveStateToStorage();
        this.renderCourseSelector();
        this.renderSidebar();
        this.renderMainView();
        this.showToast("Respaldo JSON restaurado con éxito.", "success");
      } catch (err) {
        this.showToast("No se pudo leer el archivo JSON seleccionado.", "error");
      }
    };
    reader.readAsText(file);
  },

  formatMultiline(text) {
    if (!text) return "";
    return String(text)
      .split("\n")
      .map((line) => `<div>${line}</div>`)
      .join("");
  },

  // ================= RENDERIZADO CENTRAL DE LAS 5 ETAPAS =================
  renderMainView() {
    const container = document.getElementById("mainContentContainer");
    const layoutEl = document.getElementById("appLayoutContainer");
    if (!container) return;

    // Mostrar el menú lateral de Filtrar por Periodo únicamente en Planes de Clase
    if (layoutEl) {
      layoutEl.classList.toggle("sidebar-hidden", this.state.currentTab !== "planeacion");
    }

    const bloque = this.getCurrentBloque();
    const plan = this.getCurrentPlan();
    const esc = this.state.escuela;

    const subBannerHTML = `
      <div class="context-subbanner no-export">
        <span><strong>${esc.asignatura || "Matemáticas"} (${esc.grado || "3° Sec."})</strong> · ${esc.nombre} (CCT: ${esc.cct}) · ${esc.docente}</span>
        <span>Grupos: ${esc.grupos} (${esc.turno}) · ${esc.municipio || "Guaymas, Sonora"} · Ciclo ${esc.cicloEscolar}</span>
      </div>
    `;

    if (this.state.currentTab === "sintetico") {
      container.innerHTML = subBannerHTML + this.renderSinteticoView();
    } else if (this.state.currentTab === "analitico") {
      container.innerHTML = subBannerHTML + this.renderAnaliticoView();
    } else if (this.state.currentTab === "codiseno") {
      container.innerHTML = subBannerHTML + this.renderCodisenoView();
    } else if (this.state.currentTab === "planeacion") {
      container.innerHTML =
        subBannerHTML +
        this.renderToolbar(bloque, "planeacion") +
        this.renderPlaneacionView(bloque, plan);
    } else if (this.state.currentTab === "hojas") {
      container.innerHTML =
        subBannerHTML +
        this.renderToolbar(bloque, "hojas") +
        this.renderHojasView(bloque, plan);
    }

    this.attachEditableListeners();
  },

  // ============================================================================
  // ETAPA 1: DATOS DE IDENTIFICACIÓN (ESCUELA, CCT, DOCENTE, MATERIA) + SINTÉTICO (PDF)
  // ============================================================================
  renderSinteticoView() {
    const esc = this.state.escuela;
    const course = this.state.coursesDB[this.state.activeCourseId] || {};
    const fases = window.CatalogoSinteticoNEM.fases;
    const currentFaseObj = fases.find((f) => f.id === esc.fase) || fases[0];

    const opcionesFase = fases
      .map(
        (f) => `<option value="${f.id}" ${f.id === currentFaseObj.id ? "selected" : ""}>${f.nombre}</option>`
      )
      .join("");

    const opcionesGrado = currentFaseObj.grados
      .map((g) => `<option value="${g}" ${g === esc.grado ? "selected" : ""}>${g}</option>`)
      .join("");

    const opcionesMateria = currentFaseObj.materias
      .map(
        (m) =>
          `<option value="${m.id}" ${m.id === esc.materiaId || m.nombre === esc.asignatura ? "selected" : ""}>${m.nombre} (${m.campoFormativo})</option>`
      )
      .join("");

    const filasContenidos = (this.state.contenidosSinteticos || [])
      .map(
        (item, idx) => `
        <tr>
          <td style="text-align:center;">
            <input type="checkbox" ${item.seleccionado !== false ? "checked" : ""}
              onchange="AppController.toggleSinteticoItem(${idx}, this.checked)" />
          </td>
          <td style="text-align:center;font-weight:700;font-variant-numeric:tabular-nums;">
            ${idx + 1}
          </td>
          <td>
            <div contenteditable="true" class="editing-active" data-edit-scope="sintetico_item" data-item-idx="${idx}" data-field="contenido">
              ${item.contenido}
            </div>
          </td>
          <td>
            <div contenteditable="true" class="editing-active" data-edit-scope="sintetico_item" data-item-idx="${idx}" data-field="pda">
              ${item.pda}
            </div>
          </td>
          <td>
            <div contenteditable="true" class="editing-active" data-edit-scope="sintetico_item" data-item-idx="${idx}" data-field="ejesSugeridos">
              ${item.ejesSugeridos || "Pensamiento crítico"}
            </div>
          </td>
          <td style="text-align:center;">
            <select class="form-control" style="padding:4px 6px;font-size:0.78rem;"
              onchange="AppController.updateSinteticoMeta(${idx}, 'trimestreSugerido', this.value)">
              <option value="1" ${Number(item.trimestreSugerido) === 1 ? "selected" : ""}>Trim 1</option>
              <option value="2" ${Number(item.trimestreSugerido) === 2 ? "selected" : ""}>Trim 2</option>
              <option value="3" ${Number(item.trimestreSugerido) === 3 ? "selected" : ""}>Trim 3</option>
            </select>
          </td>
          <td style="text-align:center;">
            <button class="btn btn-danger-outline btn-sm" onclick="AppController.deleteSinteticoItem(${idx})">Quitar</button>
          </td>
        </tr>
      `
      )
      .join("");

    return `
      <div class="stage-guide-banner no-export">
        <div>
          <div class="stage-guide-kicker">ETAPA 1 DE 5 · PUNTO DE PARTIDA</div>
          <div class="stage-guide-title">1. Datos de la Escuela, Docente, Materia y Programa Sintético (PDF)</div>
          <div class="stage-guide-desc">Configura los datos oficiales de identificación y carga el Programa Sintético en PDF (o desde el catálogo NEM) para alimentar todo el flujo.</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-outline" onclick="AppController.exportBackupJSON()">Respaldar Cursos (.json)</button>
          <button class="btn btn-outline" onclick="AppController.triggerImportBackup()">Importar Respaldo (.json)</button>
          <button class="btn btn-primary" onclick="AppController.switchSubView('analitico')">
            Siguiente: 2. Programa Analítico →
          </button>
        </div>
      </div>

      <!-- SECCIÓN 1A: FICHA DE DATOS DE IDENTIFICACIÓN (ESCUELA, CCT, DOCENTE, MATERIA, GRADO) -->
      <div class="info-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h2 style="margin-bottom:2px;">Paso 1A · Datos de Identificación: Escuela, Docente, Clave CCT y Materia</h2>
            <p style="font-size:0.84rem;color:#475569;">
              Estos datos encabezan automáticamente el Programa Analítico, el Codiseño, los Planes de Clase y las Hojas de Actividad, y guían el contexto de la IA.
            </p>
          </div>
          ${
            this.state.activeCourseId !== "matematicas_3_alr"
              ? `<button class="btn btn-danger-outline btn-sm" onclick="AppController.deleteActiveCourse()">Eliminar este Curso</button>`
              : `<span style="font-size:0.76rem;font-weight:700;color:#8b1d41;background:#fdf2eb;padding:5px 10px;border-radius:6px;border:1px solid #f6d5c1;">Curso Principal Precargado (38 Semanas)</span>`
          }
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="cfgNombreEsc">Nombre de la Escuela:</label>
            <input id="cfgNombreEsc" class="form-control" value="${esc.nombre || ""}" placeholder="Ej. Esc. Sec. Gral. Abelardo L. Rodríguez" />
          </div>
          <div class="form-group">
            <label for="cfgCCT">Clave de la Escuela (CCT):</label>
            <input id="cfgCCT" class="form-control" value="${esc.cct || ""}" placeholder="Ej. 26DES0010E" />
          </div>
          <div class="form-group">
            <label for="cfgDocente">Nombre del Docente:</label>
            <input id="cfgDocente" class="form-control" value="${esc.docente || ""}" placeholder="Ej. Prof. José Rafael Leyva García" />
          </div>
          <div class="form-group">
            <label for="cfgMunicipio">Municipio, Estado / Contexto Local:</label>
            <input id="cfgMunicipio" class="form-control" value="${esc.municipio || "Guaymas, Sonora"}" placeholder="Ej. Guaymas, Sonora" />
          </div>
          <div class="form-group">
            <label for="cfgFase">Nivel / Fase de la NEM:</label>
            <select id="cfgFase" class="form-control" onchange="AppController.handleFaseChange(this.value)">
              ${opcionesFase}
            </select>
          </div>
          <div class="form-group">
            <label for="cfgGrado">Grado Escolar:</label>
            <select id="cfgGrado" class="form-control">
              ${opcionesGrado}
            </select>
          </div>
          <div class="form-group">
            <label for="cfgMateriaSelect">Materia / Disciplina (Catálogo NEM):</label>
            <select id="cfgMateriaSelect" class="form-control" onchange="AppController.handleMateriaSelectChange(this.value)">
              ${opcionesMateria}
            </select>
          </div>
          <div class="form-group">
            <label for="cfgAsignaturaCustom">Nombre de la Materia (Personalizable):</label>
            <input id="cfgAsignaturaCustom" class="form-control" value="${esc.asignatura || "Matemáticas"}" />
          </div>
          <div class="form-group">
            <label for="cfgCampoFormativo">Campo Formativo:</label>
            <input id="cfgCampoFormativo" class="form-control" value="${esc.campoFormativo || "Saberes y Pensamiento Científico"}" />
          </div>
          <div class="form-group">
            <label for="cfgGrupos">Grupo(s) que atiende:</label>
            <input id="cfgGrupos" class="form-control" value="${esc.grupos || ""}" placeholder="Ej. 3°G, 3°H" />
          </div>
          <div class="form-group">
            <label for="cfgTurno">Turno:</label>
            <select id="cfgTurno" class="form-control">
              <option value="Matutino" ${esc.turno === "Matutino" ? "selected" : ""}>Matutino</option>
              <option value="Vespertino" ${esc.turno === "Vespertino" ? "selected" : ""}>Vespertino</option>
              <option value="Tiempo Completo" ${esc.turno === "Tiempo Completo" ? "selected" : ""}>Tiempo Completo</option>
            </select>
          </div>
          <div class="form-group">
            <label for="cfgCiclo">Ciclo Escolar:</label>
            <input id="cfgCiclo" class="form-control" value="${esc.cicloEscolar || "2025-2026"}" />
          </div>
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          <button class="btn btn-primary" onclick="AppController.saveSchoolConfig()">
            Guardar Datos de Escuela, Docente y Materia
          </button>
          <button class="btn btn-outline" onclick="AppController.loadCatalogSinteticoForCurrentSubject()">
            Cargar Contenidos Oficiales NEM de esta Materia
          </button>
          <button class="btn btn-danger-outline" onclick="AppController.resetDefaultData()" style="margin-left:auto;">
            Restaurar Datos de Fábrica
          </button>
        </div>
      </div>

      <!-- SECCIÓN 1B: SUBIDA DE PDF DEL PROGRAMA SINTÉTICO Y EXTRACCIÓN CON IA -->
      <div class="info-card">
        <h2>Paso 1B · Subir Programa Sintético en PDF (Extracción Automática con IA)</h2>
        <p style="font-size:0.85rem;color:#475569;margin-bottom:12px;">
          Sube el archivo PDF del Programa Sintético de tu Fase o Asignatura. La IA leerá el documento y extraerá automáticamente los <strong>Contenidos y Procesos de Desarrollo de Aprendizaje (PDA)</strong> para <strong>${esc.asignatura} (${esc.grado})</strong>.
        </p>

        <div class="pdf-dropzone" onclick="document.getElementById('sinteticoPdfInput').click()">
          <div style="font-weight:800;font-size:0.96rem;color:#8b1d41;margin-bottom:4px;">
            Haz clic aquí para seleccionar el PDF del Programa Sintético desde tu equipo
          </div>
          <div style="font-size:0.82rem;color:#475569;">
            Archivo actual: <strong>${course.pdfFileName || "Catálogo Oficial NEM"}</strong> · Soporta cualquier PDF oficial de la SEP (Fases 2 a 6)
          </div>
          <div id="pdfUploadStatusText" style="margin-top:8px;font-weight:700;font-size:0.84rem;color:#0369a1;"></div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin:16px 0 10px 0;">
          <div>
            <h3 style="font-size:0.95rem;color:#0f172a;">
              Contenidos y PDAs del Programa Sintético (${(this.state.contenidosSinteticos || []).length} registrados)
            </h3>
            <span style="font-size:0.8rem;color:#64748b;">
              Puedes editar cualquier texto haciendo clic sobre él, marcar qué contenidos incluir o agregar nuevos antes de generar el Programa Analítico.
            </span>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <a href="/Programa_Sintetico_Fase_6.pdf" target="_blank" class="btn btn-outline btn-sm" style="text-decoration:none;">
              Ver PDF Fase 6 Incluido
            </a>
            <button class="btn btn-outline btn-sm" onclick="AppController.addSinteticoItemManual()">
              + Agregar Contenido / PDA Manual
            </button>
          </div>
        </div>

        <div style="overflow-x:auto;">
          <table class="nem-table">
            <thead>
              <tr style="background:#fae5d7;">
                <th style="width:55px;text-align:center;">Incluir</th>
                <th style="width:45px;text-align:center;">#</th>
                <th style="width:28%;">Contenido del Programa Sintético (Editable)</th>
                <th>Proceso de Desarrollo de Aprendizaje - PDA (Editable)</th>
                <th style="width:18%;">Ejes Articuladores</th>
                <th style="width:95px;text-align:center;">Trimestre</th>
                <th style="width:80px;text-align:center;">Acción</th>
              </tr>
            </thead>
            <tbody>
              ${filasContenidos}
            </tbody>
          </table>
        </div>

        <div style="display:flex;justify-content:flex-end;margin-top:12px;">
          <button class="btn btn-primary" onclick="AppController.switchSubView('analitico')">
            Guardar y Continuar al Paso 2: Programa Analítico →
          </button>
        </div>
      </div>
    `;
  },

  handleFaseChange(nuevaFaseId) {
    const fases = window.CatalogoSinteticoNEM.fases;
    const fObj = fases.find((f) => f.id === nuevaFaseId) || fases[0];
    this.state.escuela.fase = fObj.id;
    this.state.escuela.grado = fObj.grados[0];
    if (fObj.materias[0]) {
      this.state.escuela.materiaId = fObj.materias[0].id;
      this.state.escuela.asignatura = fObj.materias[0].nombre;
      this.state.escuela.campoFormativo = fObj.materias[0].campoFormativo;
    }
    this.renderMainView();
  },

  handleMateriaSelectChange(materiaId) {
    const fases = window.CatalogoSinteticoNEM.fases;
    const fObj = fases.find((f) => f.id === this.state.escuela.fase) || fases[0];
    const mObj = fObj.materias.find((m) => m.id === materiaId);
    if (mObj) {
      this.state.escuela.materiaId = mObj.id;
      this.state.escuela.asignatura = mObj.nombre;
      this.state.escuela.campoFormativo = mObj.campoFormativo;
      const inputAsig = document.getElementById("cfgAsignaturaCustom");
      const inputCampo = document.getElementById("cfgCampoFormativo");
      if (inputAsig) inputAsig.value = mObj.nombre;
      if (inputCampo) inputCampo.value = mObj.campoFormativo;
    }
  },

  saveSchoolConfig() {
    this.flushAllEditableFields();
    const getVal = (id, fallback) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : fallback;
    };

    this.state.escuela.nombre = getVal("cfgNombreEsc", this.state.escuela.nombre);
    this.state.escuela.cct = getVal("cfgCCT", this.state.escuela.cct);
    this.state.escuela.docente = getVal("cfgDocente", this.state.escuela.docente);
    this.state.escuela.municipio = getVal("cfgMunicipio", this.state.escuela.municipio);
    this.state.escuela.fase = getVal("cfgFase", this.state.escuela.fase);
    this.state.escuela.grado = getVal("cfgGrado", this.state.escuela.grado);
    this.state.escuela.materiaId = getVal("cfgMateriaSelect", this.state.escuela.materiaId);
    this.state.escuela.asignatura = getVal("cfgAsignaturaCustom", this.state.escuela.asignatura);
    this.state.escuela.campoFormativo = getVal("cfgCampoFormativo", this.state.escuela.campoFormativo);
    this.state.escuela.grupos = getVal("cfgGrupos", this.state.escuela.grupos);
    this.state.escuela.turno = getVal("cfgTurno", this.state.escuela.turno);
    this.state.escuela.cicloEscolar = getVal("cfgCiclo", this.state.escuela.cicloEscolar);

    this.saveStateToStorage();
    this.renderMainView();
    this.showToast(
      `Datos actualizados: ${this.state.escuela.asignatura} (${this.state.escuela.grado}) · ${this.state.escuela.nombre}.`,
      "success"
    );
  },

  loadCatalogSinteticoForCurrentSubject() {
    this.saveSchoolConfig();
    const nuevos = window.CatalogoSinteticoNEM.getContenidosForMateria(
      this.state.escuela.materiaId,
      this.state.escuela.grado
    );
    this.state.contenidosSinteticos = nuevos;
    this.saveStateToStorage();
    this.renderMainView();
    this.showToast(
      `Se cargaron ${nuevos.length} contenidos oficiales de ${this.state.escuela.asignatura}.`,
      "success"
    );
  },

  async handleSinteticoPdfUpload(event) {
    const file = event.target?.files?.[0];
    if (!file) return;

    this.saveSchoolConfig();
    const statusEl = document.getElementById("pdfUploadStatusText");
    if (statusEl) {
      statusEl.textContent = `Analizando "${file.name}" con IA para extraer Contenidos y PDAs de ${this.state.escuela.asignatura} (${this.state.escuela.grado})...`;
    }
    this.showToast(`Procesando PDF "${file.name}" con IA...`, "warning");

    try {
      const extraidos = await window.AIGenerator.parseSinteticoPDF(file, this.state.escuela);
      this.state.contenidosSinteticos = extraidos;
      const course = this.state.coursesDB[this.state.activeCourseId];
      if (course) course.pdfFileName = file.name;
      this.saveStateToStorage();
      this.renderMainView();
      this.showToast(
        `¡PDF procesado! Se extrajeron ${extraidos.length} Contenidos y PDAs para ${this.state.escuela.asignatura}.`,
        "success"
      );
    } catch (err) {
      const fallback = window.CatalogoSinteticoNEM.getContenidosForMateria(
        this.state.escuela.materiaId,
        this.state.escuela.grado
      );
      this.state.contenidosSinteticos = fallback;
      const course = this.state.coursesDB[this.state.activeCourseId];
      if (course) course.pdfFileName = file.name;
      this.saveStateToStorage();
      this.renderMainView();
      this.showToast(
        `PDF registrado (${file.name}). Se cargaron los Contenidos y PDAs base de ${this.state.escuela.asignatura}.`,
        "success"
      );
    }
  },

  toggleSinteticoItem(idx, checked) {
    if (this.state.contenidosSinteticos[idx]) {
      this.state.contenidosSinteticos[idx].seleccionado = Boolean(checked);
      this.saveStateToStorage();
    }
  },

  updateSinteticoMeta(idx, field, value) {
    if (this.state.contenidosSinteticos[idx]) {
      this.state.contenidosSinteticos[idx][field] = Number(value) || 1;
      this.saveStateToStorage();
    }
  },

  addSinteticoItemManual() {
    this.flushAllEditableFields();
    const nextIdx = (this.state.contenidosSinteticos || []).length + 1;
    this.state.contenidosSinteticos.push({
      id: `CS-${String(nextIdx).padStart(2, "0")}`,
      contenido: "Nuevo Contenido del Programa Sintético (Haz clic para editar)",
      pda: "Describe aquí el Proceso de Desarrollo de Aprendizaje (PDA) correspondiente.",
      ejesSugeridos: "Pensamiento crítico e Inclusión",
      semanasSugeridas: 2,
      trimestreSugerido: 1,
      seleccionado: true
    });
    this.saveStateToStorage();
    this.renderMainView();
    this.showToast("Contenido sintético agregado.", "success");
  },

  deleteSinteticoItem(idx) {
    this.flushAllEditableFields();
    if (this.state.contenidosSinteticos.length <= 1) {
      this.showToast("Debe conservarse al menos un contenido en el Programa Sintético.", "warning");
      return;
    }
    this.state.contenidosSinteticos.splice(idx, 1);
    this.saveStateToStorage();
    this.renderMainView();
  },

  // ============================================================================
  // ETAPA 2: PROGRAMA ANALÍTICO (1° PLANO DIAGNÓSTICO + 2° PLANO CONTEXTUALIZACIÓN)
  // ============================================================================
  renderAnaliticoView() {
    const esc = this.state.escuela;
    const diag = this.state.diagnostico || { comunidad: "", areasPrioritarias: [] };
    const bloquesRegulares = this.state.bloquesDB.filter((b) => b.trimestre <= 3);

    const filasContextualizacion = bloquesRegulares
      .map((b) => {
        const plan = this.state.planesDB[b.id];
        const numSes = plan && plan.sesiones ? plan.sesiones.length : b.numSesiones;
        return `
        <tr>
          <td style="font-weight:700;text-align:center;font-variant-numeric:tabular-nums;">
            <div contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="semanas">${b.semanas}</div>
            <span style="font-size:0.74rem;color:#64748b;font-weight:normal;">
              Trim. ${b.trimestre} · ${numSes} ses.
            </span>
          </td>
          <td>
            <div style="font-weight:700;" contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="contenidoContextualizado">
              ${b.contenidoContextualizado}
            </div>
            <div style="font-size:0.78rem;color:#475569;margin-top:4px;">
              <strong>Sintético:</strong>
              <span contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="contenidoSintetico">${b.contenidoSintetico}</span>
            </div>
          </td>
          <td>
            <div contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="pda">
              ${b.pda}
            </div>
          </td>
          <td style="font-size:0.82rem;">
            <div contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="justificacion">
              ${b.justificacion}
            </div>
          </td>
          <td style="text-align:center;font-weight:700;">
            <div contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="ejesArticuladores">
              ${b.ejesArticuladores}
            </div>
          </td>
          <td class="no-export" style="text-align:center;">
            <button class="btn btn-primary btn-sm" style="margin-bottom:4px;width:100%;justify-content:center;" onclick="AppController.selectBloqueAndOpen('${b.id}', 'planeacion')">
              Abrir Plan
            </button>
            <button class="btn btn-outline btn-sm" style="width:100%;justify-content:center;" onclick="AppController.selectBloqueAndOpen('${b.id}', 'hojas')">
              Hojas (${numSes})
            </button>
          </td>
        </tr>
      `;
      })
      .join("");

    return `
      <div class="stage-guide-banner no-export">
        <div>
          <div class="stage-guide-kicker">ETAPA 2 DE 5 · PRIMER Y SEGUNDO PLANO NEM</div>
          <div class="stage-guide-title">2. Programa Analítico: Diagnóstico Socioeducativo y Contextualización</div>
          <div class="stage-guide-desc">Edita libremente el diagnóstico de tu escuela/comunidad y usa la IA para contextualizar los Contenidos Sintéticos del Paso 1.</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-outline" onclick="AppController.switchSubView('sintetico')">← 1. Datos y Sintético</button>
          <button class="btn btn-primary" onclick="AppController.switchSubView('codiseno')">Siguiente: 3. Codiseño →</button>
        </div>
      </div>

      <!-- PRIMER PLANO: DIAGNÓSTICO SOCIOEDUCATIVO -->
      <div class="info-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
          <h2>Primer Plano: Lectura de la Realidad / Diagnóstico Socioeducativo (${esc.nombre} · ${esc.cct})</h2>
          <button id="btnAIDiagnostico" class="btn btn-primary btn-sm" onclick="AppController.handleGenerateDiagnosticoAI()">
            Redactar / Enriquecer Diagnóstico con IA
          </button>
        </div>
        <p style="font-size:0.8rem;color:#64748b;margin-bottom:6px;">
          Haz clic en cualquier párrafo o recuadro para modificarlo manualmente. La IA tomará este diagnóstico exacto para el Codiseño, los Planes de Clase y las Hojas.
        </p>
        <div contenteditable="true" class="editing-active" data-edit-scope="diagnostico" data-field="comunidad"
          style="font-size:0.89rem;color:#1e293b;margin-bottom:14px;padding:10px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;">
          ${diag.comunidad}
        </div>

        <h3 style="font-size:0.92rem;color:#8b1d41;margin-bottom:8px;">
          Situación Actual de los Aprendizajes y Necesidades Prioritarias (${esc.asignatura} · Grupos ${esc.grupos}):
        </h3>
        <div class="grid-3">
          ${(diag.areasPrioritarias || [])
            .map(
              (ap, aIdx) => `
            <div class="priority-box">
              <strong contenteditable="true" class="editing-active" data-edit-scope="diagnostico" data-area-idx="${aIdx}" data-field="area_titulo" style="display:block;margin-bottom:4px;">
                ${ap.titulo}
              </strong>
              <div contenteditable="true" class="editing-active" data-edit-scope="diagnostico" data-area-idx="${aIdx}" data-field="area_desc">
                ${ap.descripcion}
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- SEGUNDO PLANO: CONTEXTUALIZACIÓN Y DOSIFICACIÓN ANUAL -->
      <div class="info-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px;">
          <div>
            <h2>Segundo Plano: Contextualización y Secuenciación de Contenidos (${bloquesRegulares.length} Bloques)</h2>
            <p style="font-size:0.82rem;color:#475569;">
              Vincula los Contenidos y PDAs del Paso 1 con el Diagnóstico Socioeducativo. Todos los textos de la tabla son editables.
            </p>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button id="btnAIAnalitico" class="btn btn-primary" onclick="AppController.handleGenerateAnaliticoFromSinteticoAI()">
              Generar / Actualizar Contextualización desde Paso 1 con IA
            </button>
            <button class="btn btn-word" onclick="ExportEngine.exportToWord('analiticoFullTableArea', 'Programa_Analitico_${esc.asignatura.replace(/\s+/g, "_")}')">
              Descargar Word (.doc)
            </button>
            <button class="btn btn-pdf js-pdf-export-btn" onclick="ExportEngine.exportToPDF('analiticoFullTableArea', 'Programa_Analitico_${esc.asignatura.replace(/\s+/g, "_")}')">
              Descargar PDF (.pdf)
            </button>
          </div>
        </div>

        <div id="analiticoFullTableArea">
          <table class="nem-table">
            <thead>
              <tr>
                <th colspan="6" class="nem-table-title">
                  PROGRAMA ANALÍTICO (SEGUNDO PLANO) · ${esc.asignatura.toUpperCase()} · ${esc.grado.toUpperCase()} (${esc.nombre} · CCT ${esc.cct})
                </th>
              </tr>
              <tr style="background:#fae5d7;">
                <th style="width:110px;">Semana / Trim.</th>
                <th style="width:23%;">Contenido Contextualizado y Sintético</th>
                <th style="width:22%;">PDA que se impulsa</th>
                <th>Justificación Pedagógica / Comunitaria</th>
                <th style="width:105px;">Ejes</th>
                <th class="no-export" style="width:115px;">Plano Didáctico</th>
              </tr>
            </thead>
            <tbody>
              ${filasContextualizacion}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  async handleGenerateDiagnosticoAI() {
    this.flushAllEditableFields();
    const btn = document.getElementById("btnAIDiagnostico");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Redactando Diagnóstico con IA...";
    }
    try {
      const nuevoDiag = await window.AIGenerator.generateDiagnostico(
        this.state.escuela,
        this.state.diagnostico
      );
      this.state.diagnostico = nuevoDiag;
      this.saveStateToStorage();
      this.renderMainView();
      this.showToast("Diagnóstico socioeducativo enriquecido con IA.", "success");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Redactar / Enriquecer Diagnóstico con IA";
      }
    }
  },

  async handleGenerateAnaliticoFromSinteticoAI() {
    this.flushAllEditableFields();
    const btn = document.getElementById("btnAIAnalitico");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Contextualizando Contenidos con IA...";
    }
    this.showToast(
      "Generando bloques del Programa Analítico a partir del Programa Sintético y Diagnóstico...",
      "warning"
    );

    try {
      const codisenoActuales = this.state.bloquesDB.filter((b) => b.trimestre === 4);
      const nuevosBloques = await window.AIGenerator.generateAnaliticoBloques(
        this.state.escuela,
        this.state.diagnostico,
        this.state.contenidosSinteticos
      );

      this.state.bloquesDB = [...nuevosBloques, ...codisenoActuales];
      this.state.bloquesDB.forEach((b, idx) => {
        b.id = `B${String(idx + 1).padStart(2, "0")}`;
        if (!this.state.planesDB[b.id]) {
          this.state.planesDB[b.id] = window.AIGenerator.generateLocalPlanForBloque(
            this.state.escuela,
            b
          );
        }
      });

      this.state.selectedBloqueId = this.state.bloquesDB[0]?.id || "B01";
      this.saveStateToStorage();
      this.renderSidebar();
      this.renderMainView();
      this.showToast(
        `¡Programa Analítico actualizado con ${nuevosBloques.length} bloques contextualizados!`,
        "success"
      );
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Generar / Actualizar Contextualización desde Paso 1 con IA";
      }
    }
  },

  // ============================================================================
  // ETAPA 3: CODISEÑO CURRICULAR (TERCER PLANO NEM)
  // ============================================================================
  renderCodisenoView() {
    const esc = this.state.escuela;
    const bloquesCodiseno = this.state.bloquesDB.filter((b) => b.trimestre === 4);

    const filasCodiseno = bloquesCodiseno
      .map((b) => {
        const plan = this.state.planesDB[b.id];
        const numSes = plan && plan.sesiones ? plan.sesiones.length : b.numSesiones;
        return `
        <tr>
          <td style="font-weight:700;text-align:center;">
            <div contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="semanas">${b.semanas}</div>
            <span style="font-size:0.74rem;color:#8b1d41;">Codiseño · ${numSes} ses.</span>
          </td>
          <td>
            <div style="font-weight:700;" contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="contenidoContextualizado">
              ${b.contenidoContextualizado}
            </div>
            <div style="font-size:0.78rem;color:#475569;margin-top:4px;">
              <strong>Tema Local:</strong>
              <span contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="contenidoSintetico">${b.contenidoSintetico}</span>
            </div>
          </td>
          <td>
            <div contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="pda">
              ${b.pda}
            </div>
          </td>
          <td style="font-size:0.82rem;">
            <div contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="justificacion">
              ${b.justificacion}
            </div>
          </td>
          <td style="text-align:center;font-weight:700;">
            <div contenteditable="true" class="editing-active" data-edit-scope="bloque_by_id" data-bloque-id="${b.id}" data-field="ejesArticuladores">
              ${b.ejesArticuladores}
            </div>
          </td>
          <td class="no-export" style="text-align:center;">
            <button class="btn btn-primary btn-sm" style="margin-bottom:4px;width:100%;justify-content:center;" onclick="AppController.selectBloqueAndOpen('${b.id}', 'planeacion')">
              Abrir Plan
            </button>
            <button class="btn btn-danger-outline btn-sm" style="width:100%;justify-content:center;" onclick="AppController.deleteCodisenoBloque('${b.id}')">
              Quitar
            </button>
          </td>
        </tr>
      `;
      })
      .join("");

    return `
      <div class="stage-guide-banner no-export">
        <div>
          <div class="stage-guide-kicker">ETAPA 3 DE 5 · TERCER PLANO NEM</div>
          <div class="stage-guide-title">3. Codiseño Curricular: Contenidos y PDAs Locales / Regionales</div>
          <div class="stage-guide-desc">Incorpora contenidos propios de la comunidad (${esc.municipio || "Localidad"}) o necesidades académicas de los grupos ${esc.grupos} que enriquecen el Programa Analítico.</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-outline" onclick="AppController.switchSubView('analitico')">← 2. Programa Analítico</button>
          <button class="btn btn-primary" onclick="AppController.switchSubView('planeacion')">Siguiente: 4. Planes de Clase →</button>
        </div>
      </div>

      <div class="info-card no-export">
        <h2>Generador de Propuestas de Codiseño con IA (${esc.asignatura} · ${esc.grado})</h2>
        <p style="font-size:0.85rem;color:#475569;margin-bottom:10px;">
          La IA analiza el Diagnóstico Socioeducativo de <strong>${esc.nombre}</strong> y te sugiere bloques de Codiseño con su PDA, justificación comunitaria y plan de clase listo.
        </p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          <input id="codisenoPromptInput" class="form-control" style="flex:1;min-width:260px;"
            placeholder="Opcional: Describe qué problemática local o habilidad deseas reforzar en Codiseño (ej. Cuidado del agua en Guaymas, nivelación en álgebra, lectura comprensiva...)" />
          <button id="btnAICodiseno" class="btn btn-primary" onclick="AppController.handleGenerateCodisenoAI()">
            + Proponer Bloques de Codiseño con IA
          </button>
          <button class="btn btn-outline" onclick="AppController.addManualCodisenoBloque()">
            + Agregar Codiseño Manual
          </button>
        </div>
      </div>

      <div class="info-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px;">
          <h2>Tercer Plano: Bloques de Codiseño Integrados al Curso (${bloquesCodiseno.length})</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn btn-word" onclick="ExportEngine.exportToWord('codisenoTableArea', 'Codiseno_${esc.asignatura.replace(/\s+/g, "_")}')">
              Descargar Codiseño en Word (.doc)
            </button>
            <button class="btn btn-pdf js-pdf-export-btn" onclick="ExportEngine.exportToPDF('codisenoTableArea', 'Codiseno_${esc.asignatura.replace(/\s+/g, "_")}')">
              Descargar PDF (.pdf)
            </button>
          </div>
        </div>

        <div id="codisenoTableArea">
          <table class="nem-table">
            <thead>
              <tr>
                <th colspan="6" class="nem-table-title">
                  PLANO DE CODISEÑO CURRICULAR · ${esc.asignatura.toUpperCase()} (${esc.nombre} · ${esc.municipio || ""})
                </th>
              </tr>
              <tr style="background:#fae5d7;">
                <th style="width:120px;">Periodo / Semanas</th>
                <th style="width:23%;">Contenido de Codiseño Local</th>
                <th style="width:22%;">PDA Específico de Codiseño</th>
                <th>Justificación Comunitaria y Pedagógica</th>
                <th style="width:105px;">Ejes</th>
                <th class="no-export" style="width:115px;">Acción</th>
              </tr>
            </thead>
            <tbody>
              ${
                filasCodiseno ||
                `<tr><td colspan="6" style="text-align:center;padding:18px;color:#64748b;">Aún no hay bloques de Codiseño. Usa el botón "+ Proponer Bloques de Codiseño con IA" arriba.</td></tr>`
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  async handleGenerateCodisenoAI() {
    this.flushAllEditableFields();
    const promptInput = document.getElementById("codisenoPromptInput");
    const promptExtra = promptInput ? promptInput.value.trim() : "";
    const btn = document.getElementById("btnAICodiseno");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Diseñando Codiseño con IA...";
    }

    try {
      const nuevosCodiseno = await window.AIGenerator.generateCodisenoBloques(
        this.state.escuela,
        this.state.diagnostico,
        this.state.bloquesDB.length,
        promptExtra
      );

      nuevosCodiseno.forEach((b) => {
        this.state.bloquesDB.push(b);
        this.state.planesDB[b.id] = window.AIGenerator.generateLocalPlanForBloque(
          this.state.escuela,
          b,
          promptExtra
        );
      });

      this.saveStateToStorage();
      this.renderSidebar();
      this.renderMainView();
      this.showToast(
        `Se agregaron ${nuevosCodiseno.length} bloque(s) de Codiseño y sus Planes de Clase iniciales.`,
        "success"
      );
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "+ Proponer Bloques de Codiseño con IA";
      }
    }
  },

  addManualCodisenoBloque() {
    this.flushAllEditableFields();
    const nextNum = this.state.bloquesDB.length + 1;
    const newId = `B${String(nextNum).padStart(2, "0")}`;
    const nuevoBloque = {
      id: newId,
      trimestre: 4,
      semanas: `Codiseño (1 Semana)`,
      numSemanas: 1,
      numSesiones: 5,
      periodoSugerido: "Transversal / Reforzamiento Anual",
      contenidoSintetico: "Nuevo Contenido Local de Codiseño",
      contenidoContextualizado: `Proyecto comunitario de ${this.state.escuela.asignatura} en ${this.state.escuela.municipio || "la localidad"}`,
      pda: "Aplica saberes de la disciplina para atender una necesidad prioritaria de su escuela y comunidad.",
      justificacion: "Incorporado por el docente a partir del diagnóstico socioeducativo.",
      ejesArticuladores: "Pensamiento crítico y Vida saludable",
      diagramType: window.AIGenerator.getDefaultDiagramForSubject(this.state.escuela.asignatura)
    };

    this.state.bloquesDB.push(nuevoBloque);
    this.state.planesDB[newId] = window.AIGenerator.generateLocalPlanForBloque(
      this.state.escuela,
      nuevoBloque
    );
    this.saveStateToStorage();
    this.renderSidebar();
    this.renderMainView();
    this.showToast(`Bloque de Codiseño ${newId} agregado.`, "success");
  },

  deleteCodisenoBloque(bloqueId) {
    this.flushAllEditableFields();
    if (this.state.bloquesDB.length <= 1) {
      this.showToast("El curso debe conservar al menos un bloque.", "warning");
      return;
    }
    this.state.bloquesDB = this.state.bloquesDB.filter((b) => b.id !== bloqueId);
    delete this.state.planesDB[bloqueId];
    if (this.state.selectedBloqueId === bloqueId) {
      this.state.selectedBloqueId = this.state.bloquesDB[0].id;
    }
    this.saveStateToStorage();
    this.renderSidebar();
    this.renderMainView();
    this.showToast("Bloque de Codiseño eliminado.", "success");
  },

  // ============================================================================
  // BARRA DE HERRAMIENTAS PARA ETAPAS 4 (PLAN DE CLASE) Y 5 (HOJAS DE ACTIVIDAD)
  // ============================================================================
  renderToolbar(bloque, mode) {
    const docTargetId = mode === "planeacion" ? "printableDocumentArea" : "printableWorksheetsArea";
    const asigClean = (this.state.escuela.asignatura || "Matematicas").replace(/\s+/g, "_");
    const filePrefix =
      mode === "planeacion"
        ? `Planeacion_${asigClean}_${bloque.id}_${bloque.semanas.replace(/\s+/g, "_")}`
        : `Hojas_Actividad_${asigClean}_${bloque.id}_${bloque.semanas.replace(/\s+/g, "_")}`;

    const plan = this.getCurrentPlan();
    const totalSesiones = plan && plan.sesiones ? plan.sesiones.length : 5;

    return `
      <div class="action-toolbar no-export">
        <div class="toolbar-group">
          <div class="toolbar-block-indicator">
            <span class="toolbar-block-kicker">BLOQUE ${bloque.id} · ${bloque.semanas.toUpperCase()} (${totalSesiones} SESIONES)</span>
            ${
              mode === "hojas"
                ? `<select class="form-control" style="padding:3px 8px;font-size:0.8rem;font-weight:700;max-width:290px;" onchange="AppController.selectBloque(this.value)">
                    ${this.state.bloquesDB
                      .map(
                        (b) =>
                          `<option value="${b.id}" ${b.id === bloque.id ? "selected" : ""}>${b.semanas} · ${(b.contenidoContextualizado || b.contenidoSintetico).slice(0, 42)}</option>`
                      )
                      .join("")}
                  </select>`
                : `<span class="toolbar-block-name" title="${bloque.contenidoContextualizado || bloque.contenidoSintetico}">${bloque.contenidoContextualizado || bloque.contenidoSintetico}</span>`
            }
          </div>
          ${
            mode === "planeacion"
              ? `<button class="btn btn-outline" onclick="AppController.switchSubView('hojas')">Pasar a 5. Hojas de Actividad (${totalSesiones}) →</button>`
              : `<button class="btn btn-outline" onclick="AppController.switchSubView('planeacion')">← Volver a 4. Plan de Clase</button>`
          }
          <button class="btn ${this.state.editMode ? "btn-save-edit" : "btn-outline"}" onclick="AppController.toggleEditMode()">
            ${this.state.editMode ? "Guardar y Salir de Edición" : "Editar Contenido"}
          </button>
          ${
            mode === "hojas"
              ? `
            <button class="btn btn-outline ${this.state.showTeacherAnswers ? "active-toggle" : ""}" onclick="AppController.toggleTeacherAnswers()">
              ${this.state.showTeacherAnswers ? "Ocultar Respuestas (Modo Alumno)" : "Ver Guía Docente (Respuestas)"}
            </button>
            <button class="btn btn-outline ${this.state.compactPrintMode ? "active-toggle" : ""}" onclick="AppController.toggleCompactMode()">
              ${this.state.compactPrintMode ? "Vista Compacta 1 Pág. (Activa)" : "Ajustar a 1 Página (Compacto)"}
            </button>
          `
              : ""
          }
          <span id="saveStatusBadge" class="save-status-text" style="display:${this.state.lastSavedTime ? "inline-block" : "none"};">
            Guardado automático · ${this.state.lastSavedTime || ""}
          </span>
        </div>
        <div class="toolbar-group">
          <button class="btn btn-outline" onclick="AppController.exportBackupJSON()" title="Descargar copia de seguridad de todos tus cursos">
            Respaldar (.json)
          </button>
          <button class="btn btn-word" onclick="AppController.exportWordSafely('${docTargetId}', '${filePrefix}')">
            Descargar Word (.doc)
          </button>
          <button class="btn btn-pdf js-pdf-export-btn" onclick="AppController.exportPDFSafely('${docTargetId}', '${filePrefix}')">
            Descargar PDF (.pdf)
          </button>
        </div>
      </div>
      ${
        this.state.editMode
          ? `
        <div class="edit-banner no-export">
          <span><strong>Modo Edición Activo:</strong> Haz clic sobre cualquier texto recuadrado en azul para modificarlo. La IA respetará tus cambios en el siguiente paso.</span>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-outline btn-sm" onclick="AppController.addManualSession()">+ Agregar Sesión al Bloque</button>
            <button class="btn btn-primary btn-sm" onclick="AppController.toggleEditMode()">Guardar y Finalizar</button>
          </div>
        </div>
      `
          : ""
      }
    `;
  },

  exportWordSafely(docTargetId, filePrefix) {
    if (this.state.editMode) this.flushAllEditableFields();
    window.ExportEngine.exportToWord(docTargetId, filePrefix);
  },

  exportPDFSafely(docTargetId, filePrefix) {
    if (this.state.editMode) this.flushAllEditableFields();

    const bloque = this.getCurrentBloque();
    const semClean = bloque ? bloque.semanas.replace(/\s+/g, "_") : "Curso";
    const asigClean = (this.state.escuela.asignatura || "Matematicas").replace(/\s+/g, "_");

    if (!docTargetId) {
      if (this.state.currentTab === "hojas") {
        docTargetId = "printableWorksheetsArea";
        filePrefix = `Hojas_Actividad_${asigClean}_${bloque.id}_${semClean}`;
      } else if (this.state.currentTab === "analitico") {
        docTargetId = "analiticoFullTableArea";
        filePrefix = `Programa_Analitico_${asigClean}`;
      } else if (this.state.currentTab === "codiseno") {
        docTargetId = "codisenoTableArea";
        filePrefix = `Codiseno_${asigClean}`;
      } else {
        if (this.state.currentTab === "sintetico") {
          this.switchSubView("planeacion");
        }
        docTargetId = "printableDocumentArea";
        filePrefix = `Planeacion_${asigClean}_${bloque.id}_${semClean}`;
      }
    }

    window.ExportEngine.exportToPDF(docTargetId, filePrefix);
  },

  switchSubView(tabName) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    this.state.currentTab = tabName;
    document.querySelectorAll(".nav-tab-btn").forEach((el) => {
      el.classList.toggle("active", el.dataset.tab === tabName);
    });
    this.renderMainView();
  },

  editAttr(scope, field, extraAttrs = "") {
    if (!this.state.editMode) return "";
    return `contenteditable="true" class="editing-active" data-edit-scope="${scope}" data-field="${field}" ${extraAttrs}`;
  },

  // ============================================================================
  // ETAPA 4: PLAN DE CLASE OFICIAL NEM (CON GENERACIÓN IA DESDE ANALÍTICO/CODISEÑO)
  // ============================================================================
  renderPlaneacionView(bloque, plan) {
    const esc = this.state.escuela;
    const vinc = this.state.vinculacion;

    const sesiones = plan.sesiones || [];
    const semanasMap = {};
    sesiones.forEach((s, i) => {
      const semNum = Math.floor(i / 5) + 1;
      if (!semanasMap[semNum]) semanasMap[semNum] = [];
      semanasMap[semNum].push({ ses: s, absIdx: i });
    });

    const tablasSemanasHTML = Object.keys(semanasMap)
      .map((semKey) => {
        const lista = semanasMap[semKey];
        const semRealLabel = lista[0]?.ses?.semana
          ? `Semana ${lista[0].ses.semana}`
          : `Semana ${semKey} de la Secuencia`;

        const filasSesiones = lista
          .map(
            ({ ses, absIdx }) => `
          <tr>
            <td class="session-col-num">
              <div>Sesión ${ses.numero}</div>
              <div style="font-size:0.74rem;color:#64748b;font-weight:normal;margin-top:2px;">50 min</div>
              <button class="btn btn-outline btn-sm no-export" style="margin-top:8px;width:100%;justify-content:center;"
                onclick="AppController.openSessionWorksheet(${absIdx})">
                Ver Hoja #${ses.numero}
              </button>
              ${
                this.state.editMode && sesiones.length > 1
                  ? `
                <button class="btn btn-danger-outline btn-sm no-export" style="margin-top:6px;width:100%;justify-content:center;"
                  onclick="AppController.deleteSession(${absIdx})">
                  Eliminar
                </button>
              `
                  : ""
              }
            </td>
            <td>
              <div style="font-weight:700;color:#8b1d41;margin-bottom:6px;font-size:0.94rem;"
                ${this.editAttr("sesion", "titulo", `data-session-idx="${absIdx}"`)}>
                ${ses.titulo || ""}
              </div>
              <div class="session-phase-block">
                <span class="session-phase-title">Inicio (10 min):</span>
                <div ${this.editAttr("sesion", "inicio", `data-session-idx="${absIdx}"`)}>
                  ${this.formatMultiline(ses.inicio)}
                </div>
              </div>
              <div class="session-phase-block">
                <span class="session-phase-title">Desarrollo (30 min):</span>
                <div ${this.editAttr("sesion", "desarrollo", `data-session-idx="${absIdx}"`)}>
                  ${this.formatMultiline(ses.desarrollo)}
                </div>
              </div>
              <div class="session-phase-block">
                <span class="session-phase-title">Cierre (10 min):</span>
                <div ${this.editAttr("sesion", "cierre", `data-session-idx="${absIdx}"`)}>
                  ${this.formatMultiline(ses.cierre)}
                </div>
              </div>
            </td>
          </tr>
        `
          )
          .join("");

        return `
          <table class="nem-table">
            <thead>
              <tr>
                <th colspan="2" class="nem-table-title">
                  SECUENCIA DIDÁCTICA DE ACTIVIDADES · ${String(semRealLabel).toUpperCase()} (${bloque.semanas.toUpperCase()})
                </th>
              </tr>
              <tr style="background:#fae5d7;">
                <th style="width:120px;text-align:center;">Sesiones</th>
                <th style="text-align:center;">Actividades (Inicio 10 min / Desarrollo 30 min / Cierre 10 min)</th>
              </tr>
            </thead>
            <tbody>
              ${filasSesiones}
            </tbody>
          </table>
        `;
      })
      .join("");

    const filasEvaluacion = (plan.evaluacionFormativa || [])
      .map((criterio, i) => {
        const letra = String.fromCharCode(97 + i);
        return `
          <tr>
            <td>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                <div style="flex:1;">
                  <strong>${letra})</strong>
                  <span ${this.editAttr("evaluacion", "criterio", `data-eval-idx="${i}"`)}>${criterio}</span>
                </div>
                ${
                  this.state.editMode
                    ? `<button class="btn btn-danger-outline btn-sm no-export" onclick="AppController.deleteEvaluationCriterion(${i})">Quitar</button>`
                    : ""
                }
              </div>
            </td>
            <td style="width:95px;text-align:center;"></td>
            <td style="width:125px;text-align:center;"></td>
            <td style="width:95px;text-align:center;"></td>
          </tr>
        `;
      })
      .join("");

    return `
      <!-- PANEL CONTEXTUAL IA PARA EL PLAN DE CLASE -->
      <div class="ai-action-box no-export">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div>
            <div style="font-size:0.75rem;font-weight:800;color:#8b1d41;text-transform:uppercase;">
              ETAPA 4 DE 5 · MOTOR IA CONECTADO AL PROGRAMA ANALÍTICO Y CODISEÑO
            </div>
            <div style="font-size:0.86rem;color:#334155;margin-top:2px;">
              Genera o actualiza este Plan de Clase tomando tus ediciones del <strong>Diagnóstico, Programa Analítico y Codiseño</strong>, o agrega una nueva sesión contextualizada.
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button id="btnRegenPlanBloqueAI" class="btn btn-primary btn-sm" onclick="AppController.handleRegenerateBlockPlanAI()">
              Generar / Actualizar Plan del Bloque ${bloque.id} con IA
            </button>
            <button id="btnAddSessionAI" class="btn btn-outline btn-sm" onclick="AppController.handleAddSingleSessionWithAI()">
              + Agregar Sesión #${sesiones.length + 1} con IA
            </button>
          </div>
        </div>
        <div style="margin-top:8px;">
          <input id="planBloqueCustomPrompt" class="form-control" style="font-size:0.82rem;padding:6px 10px;"
            placeholder="Instrucción opcional para la IA en este bloque (ej. Enfocarse en experimentos con materiales caseros, debate grupal, problemas pesqueros de Guaymas...)" />
        </div>
      </div>

      <div id="printableDocumentArea">
        <div class="nem-document-sheet">
          <div class="nem-header-banner">
            <span>NUEVA ESCUELA MEXICANA · ${(esc.fase || "FASE 6").toUpperCase()}</span>
            <span>TRIMESTRE ${bloque.trimestre <= 3 ? bloque.trimestre : "CODISEÑO"} · ${bloque.semanas.toUpperCase()}</span>
          </div>

          <!-- Tabla 1: Encabezado Institucional -->
          <table class="nem-table">
            <thead>
              <tr>
                <th colspan="6" class="nem-table-title">
                  PLAN DE CLASE · ${(esc.asignatura || "MATEMÁTICAS").toUpperCase()} · ${(esc.grado || "3° DE SECUNDARIA").toUpperCase()}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="nem-cell-label">Escuela:</td>
                <td ${this.editAttr("escuela", "nombre")}>${esc.nombre}</td>
                <td class="nem-cell-label" style="width:10%;">CCT:</td>
                <td ${this.editAttr("escuela", "cct")}>${esc.cct}</td>
                <td class="nem-cell-label" style="width:10%;">Grupo:</td>
                <td ${this.editAttr("escuela", "grupos")}>${esc.grupos}</td>
              </tr>
              <tr>
                <td class="nem-cell-label">Docente:</td>
                <td colspan="3" ${this.editAttr("escuela", "docente")}>${esc.docente}</td>
                <td class="nem-cell-label">Turno:</td>
                <td ${this.editAttr("escuela", "turno")}>${esc.turno}</td>
              </tr>
              <tr>
                <td class="nem-cell-label">Periodo:</td>
                <td colspan="2" ${this.editAttr("plan", "periodo")}>${plan.periodo || bloque.periodoSugerido}</td>
                <td class="nem-cell-label">Ciclo escolar:</td>
                <td colspan="2" ${this.editAttr("plan", "cicloEscolar")}>${plan.cicloEscolar || esc.cicloEscolar}</td>
              </tr>
            </tbody>
          </table>

          <!-- Tabla 2: Elementos Curriculares y Transversalidad -->
          <table class="nem-table">
            <tbody>
              <tr>
                <td class="nem-cell-label" style="vertical-align:middle;text-align:center;">Campo Formativo:</td>
                <td style="width:18%;font-weight:700;vertical-align:middle;text-align:center;" ${this.editAttr("escuela", "campoFormativo")}>${esc.campoFormativo}</td>
                <td class="nem-cell-label" style="width:14%;vertical-align:middle;text-align:center;">Contenido:</td>
                <td colspan="3">
                  <div><strong>Programa Sintético:</strong> <span ${this.editAttr("bloque", "contenidoSintetico")}>${bloque.contenidoSintetico}</span></div>
                  <div style="margin-top:4px;"><strong>Contextualización (Programa Analítico / Codiseño):</strong> <span ${this.editAttr("bloque", "contenidoContextualizado")}>${bloque.contenidoContextualizado}</span></div>
                </td>
              </tr>
              <tr>
                <td class="nem-cell-label" style="vertical-align:middle;text-align:center;">Procesos de desarrollo de aprendizaje (PDA):</td>
                <td colspan="3" style="font-weight:600;" ${this.editAttr("bloque", "pda")}>
                  ${bloque.pda}
                </td>
                <td class="nem-cell-label" style="width:14%;vertical-align:middle;text-align:center;">Tiempo de realización:</td>
                <td style="width:14%;vertical-align:middle;text-align:center;font-weight:700;" ${this.editAttr("plan", "tiempoRealizacion")}>
                  ${plan.tiempoRealizacion || `${bloque.numSemanas} semana(s) / ${sesiones.length} sesiones`}
                </td>
              </tr>
              <tr>
                <td class="nem-cell-label" style="text-align:center;">Ejes que se favorecen:</td>
                <td colspan="5" style="font-weight:700;" ${this.editAttr("bloque", "ejesArticuladores")}>${bloque.ejesArticuladores}</td>
              </tr>
              <tr>
                <th colspan="6" class="nem-table-title">CAMPOS FORMATIVOS CON QUE SE VINCULA TRANSVERSALMENTE:</th>
              </tr>
              <tr>
                <td colspan="6">
                  <strong>Lenguajes</strong>
                  <div ${this.editAttr("vinculacion", "lenguajes")}>
                    ${vinc.lenguajes.map((l) => `• ${l}`).join("<br>")}
                  </div>
                  <br>
                  <strong>Ética, naturaleza y sociedades</strong>
                  <div ${this.editAttr("vinculacion", "eticaNaturalezaSociedad")}>
                    ${vinc.eticaNaturalezaSociedad.map((e) => `• ${e}`).join("<br>")}
                  </div>
                  <br>
                  <strong>De lo humano y lo comunitario</strong>
                  <div ${this.editAttr("vinculacion", "deLoHumanoYLoComunitario")}>
                    ${vinc.deLoHumanoYLoComunitario.map((d) => `• ${d}`).join("<br>")}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Tabla 3: Secuencia Didáctica por Semana y Sesión -->
          ${tablasSemanasHTML}

          ${
            this.state.editMode
              ? `
            <div class="no-export" style="margin-bottom:16px;text-align:right;">
              <button class="btn btn-outline btn-sm" onclick="AppController.addManualSession()">
                + Agregar Nueva Sesión al Bloque (${sesiones.length + 1})
              </button>
            </div>
          `
              : ""
          }

          <!-- Tabla 4: Evaluación Formativa -->
          <table class="nem-table">
            <thead>
              <tr>
                <th colspan="4" class="nem-table-title">
                  Evaluación Formativa del Proceso de Desarrollo del Aprendizaje | ${esc.grado} | Trimestre ${bloque.trimestre <= 3 ? bloque.trimestre : "Codiseño"} | Grupo: ${esc.grupos}
                </th>
              </tr>
              <tr style="background:#fae5d7;">
                <th style="text-align:center;">Conceptos / Indicadores de Logro</th>
                <th style="text-align:center;width:95px;">No logrado</th>
                <th style="text-align:center;width:125px;">Medianamente logrado</th>
                <th style="text-align:center;width:95px;">Logrado</th>
              </tr>
            </thead>
            <tbody>
              ${filasEvaluacion}
            </tbody>
          </table>

          ${
            this.state.editMode
              ? `
            <div class="no-export" style="margin-bottom:14px;text-align:right;">
              <button class="btn btn-outline btn-sm" onclick="AppController.addEvaluationCriterion()">
                + Agregar Indicador de Evaluación Formativa
              </button>
            </div>
          `
              : ""
          }

          <div style="background:#fae5d7;border:1px solid #475569;padding:8px 12px;font-size:0.84rem;font-weight:700;">
            ESCALA DE DESEMPEÑO:<br>
            Nivel III. Logrado. · Nivel II. Medianamente logrado. · Nivel I. No logrado.
          </div>
        </div>
      </div>
    `;
  },

  async handleRegenerateBlockPlanAI() {
    this.flushAllEditableFields();
    const bloque = this.getCurrentBloque();
    const promptInput = document.getElementById("planBloqueCustomPrompt");
    const promptExtra = promptInput ? promptInput.value.trim() : "";
    const btn = document.getElementById("btnRegenPlanBloqueAI");
    if (btn) {
      btn.disabled = true;
      btn.textContent = `Generando Plan de ${bloque.id} con IA...`;
    }
    this.showToast(
      `Generando Plan de Clase para ${bloque.semanas} (${this.state.escuela.asignatura}) tomando el contexto del Programa Analítico...`,
      "warning"
    );

    try {
      const nuevoPlan = await window.AIGenerator.generatePlanForBloque(
        this.state.escuela,
        this.state.diagnostico,
        bloque,
        promptExtra
      );
      this.state.planesDB[bloque.id] = nuevoPlan;
      this.renumberSessions(this.state.planesDB[bloque.id], bloque);
      this.saveStateToStorage();
      this.renderSidebar();
      this.renderMainView();
      this.showToast(
        `¡Plan de Clase del bloque ${bloque.id} actualizado con IA (${nuevoPlan.sesiones.length} sesiones)!`,
        "success"
      );
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = `Generar / Actualizar Plan del Bloque ${bloque.id} con IA`;
      }
    }
  },

  async handleAddSingleSessionWithAI() {
    this.flushAllEditableFields();
    const bloque = this.getCurrentBloque();
    const plan = this.getCurrentPlan();
    const promptInput = document.getElementById("planBloqueCustomPrompt");
    const promptExtra = promptInput ? promptInput.value.trim() : "";
    const btn = document.getElementById("btnAddSessionAI");
    const nextNum = (plan.sesiones ? plan.sesiones.length : 0) + 1;

    if (btn) {
      btn.disabled = true;
      btn.textContent = `Generando Sesión #${nextNum}...`;
    }

    try {
      const nuevaSesion = await window.AIGenerator.generateWithServerAI(
        bloque,
        "pesca",
        promptExtra,
        nextNum,
        this.state.escuela
      );
      plan.sesiones.push(nuevaSesion);
      this.renumberSessions(plan, bloque);
      this.saveStateToStorage();
      this.renderSidebar();
      this.renderMainView();
      this.showToast(`Sesión #${nextNum} generada con IA y agregada al bloque ${bloque.id}.`, "success");
    } catch (e) {
      const fallback = window.AIGenerator.generateContextualSession(
        bloque,
        "pesca",
        promptExtra,
        nextNum,
        this.state.escuela
      );
      plan.sesiones.push(fallback);
      this.renumberSessions(plan, bloque);
      this.saveStateToStorage();
      this.renderSidebar();
      this.renderMainView();
      this.showToast(`Sesión #${nextNum} generada y agregada al bloque ${bloque.id}.`, "success");
    } finally {
      if (btn) {
        btn.disabled = false;
      }
    }
  },

  openSessionWorksheet(sessionIdx) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    this.state.currentTab = "hojas";
    this.state.selectedSessionIndex = sessionIdx;
    document.querySelectorAll(".nav-tab-btn").forEach((el) => {
      el.classList.toggle("active", el.dataset.tab === "hojas");
    });
    this.renderMainView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  // ============================================================================
  // ETAPA 5: HOJAS DE ACTIVIDAD POR SESIÓN (SINCRONIZADAS CON EL PLAN DE CLASE)
  // ============================================================================
  renderHojasView(bloque, plan) {
    const esc = this.state.escuela;
    const sesiones = plan.sesiones || [];
    const sel = this.state.selectedSessionIndex;
    const catalog = window.SVGDiagrams.catalog || [];

    // Agrupar botones de sesión por semana (5 sesiones por grupo semanal)
    const gruposSemanales = {};
    sesiones.forEach((s, idx) => {
      const groupIdx = Math.floor(idx / 5) + 1;
      if (!gruposSemanales[groupIdx]) gruposSemanales[groupIdx] = [];
      gruposSemanales[groupIdx].push({ s, idx });
    });

    const gruposBotonesHTML = Object.keys(gruposSemanales)
      .map((gKey) => {
        const items = gruposSemanales[gKey];
        const semNum = items[0]?.s?.semana || gKey;
        return `
          <div class="session-week-group">
            <span class="session-week-label">Sem. ${semNum}:</span>
            ${items
              .map(({ s, idx }) => {
                const safeTitle = (s.titulo || `Sesión ${s.numero}`).replace(/"/g, "&quot;");
                return `
                  <button class="session-filter-btn ${sel === idx ? "active" : ""}"
                    onclick="AppController.selectSession(${idx})"
                    title="Sesión ${s.numero}: ${safeTitle}">
                    S${s.numero}
                  </button>
                `;
              })
              .join("")}
          </div>
        `;
      })
      .join("");

    const activeSesObj = typeof sel === "number" ? sesiones[sel] : null;

    const syncBannerHTML = `
      <div class="ai-action-box no-export">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div>
            <div style="font-size:0.75rem;font-weight:800;color:#8b1d41;text-transform:uppercase;">
              ETAPA 5 DE 5 · HOJAS DE ACTIVIDAD CONECTADAS AL PLAN DE CLASE
            </div>
            <div style="font-size:0.85rem;color:#334155;margin-top:2px;">
              ¿Modificaste actividades en el <strong>Plan de Clase</strong>? Sincroniza con IA para que las hojas de trabajo reflejen exactamente tus cambios.
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button id="btnSyncHojasAI" class="btn btn-primary btn-sm" onclick="AppController.handleSyncHojasFromPlanAI()">
              Sincronizar / Generar Hojas desde el Plan de Clase con IA
            </button>
          </div>
        </div>
      </div>
    `;

    const filterBarHTML = `
      <div class="session-selector-bar no-export">
        <div class="session-week-groups">
          <button class="session-filter-btn session-filter-btn-all ${sel === "all" ? "active" : ""}" onclick="AppController.selectSession('all')">
            Todas (${sesiones.length} hojas)
          </button>
          ${gruposBotonesHTML}
        </div>
        <div class="session-stepper-controls">
          ${
            activeSesObj
              ? `<span style="font-size:0.78rem;color:#475569;font-weight:600;max-width:260px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${(activeSesObj.titulo || "").replace(/"/g, "&quot;")}">
                  S${activeSesObj.numero}: ${activeSesObj.titulo || ""}
                </span>`
              : `<span style="font-size:0.78rem;color:#64748b;">Mostrando las ${sesiones.length} sesiones</span>`
          }
          <button class="btn btn-outline btn-sm" onclick="AppController.stepSession(-1)" title="Ver Hoja de Actividad Anterior">
            ← Anterior
          </button>
          <button class="btn btn-outline btn-sm" onclick="AppController.stepSession(1)" title="Ver Siguiente Hoja de Actividad">
            Siguiente →
          </button>
        </div>
      </div>
    `;

    const sesionesConIndice =
      sel === "all"
        ? sesiones.map((ses, idx) => ({ ses, absIdx: idx }))
        : [{ ses: sesiones[sel] || sesiones[0], absIdx: typeof sel === "number" ? sel : 0 }];

    const tarjetasHojasHTML = sesionesConIndice
      .map(({ ses, absIdx }) => {
        const h = ses.hojaActividad || {};
        const diagramType =
          h.diagramType ||
          bloque.diagramType ||
          window.AIGenerator.getDefaultDiagramForSubject(esc.asignatura);
        const svgHTML = window.SVGDiagrams.renderByType(diagramType, {
          title: h.tituloHoja || ses.titulo
        });

        const diagramSelectorHTML = this.state.editMode
          ? `
          <div class="worksheet-diagram-toolbar no-export">
            <span><strong>Esquema Visual / Organizador Gráfico de la Hoja #${ses.numero}:</strong></span>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <select class="form-control" style="width:auto;padding:4px 8px;font-size:0.78rem;"
                onchange="AppController.changeWorksheetDiagram(${absIdx}, this.value)">
                ${catalog
                  .map(
                    (item) =>
                      `<option value="${item.id}" ${item.id === diagramType ? "selected" : ""}>${item.label}</option>`
                  )
                  .join("")}
              </select>
              ${
                sesiones.length > 1
                  ? `<button class="btn btn-danger-outline btn-sm" onclick="AppController.deleteSession(${absIdx})">Eliminar Sesión #${ses.numero}</button>`
                  : ""
              }
            </div>
          </div>
        `
          : "";

        const ejerciciosHTML = (h.ejercicios || [])
          .map(
            (ej, exIdx) => `
          <div class="worksheet-exercise-item">
            <div class="worksheet-exercise-header">
              <div class="worksheet-exercise-text"
                ${this.editAttr("ejercicio", "enunciado", `data-session-idx="${absIdx}" data-exercise-idx="${exIdx}"`)}>
                ${ej.enunciado}
              </div>
              ${
                this.state.editMode
                  ? `<button class="btn btn-danger-outline btn-sm no-export" onclick="AppController.deleteExercise(${absIdx}, ${exIdx})">Quitar ejercicio</button>`
                  : ""
              }
            </div>
            <div class="worksheet-work-area">
              Espacio para desarrollo, operaciones, análisis o argumentación:
            </div>
            ${
              this.state.showTeacherAnswers
                ? `
              <div class="teacher-answer-box">
                Respuesta / Guía Docente:
                <span ${this.editAttr("ejercicio", "respuesta", `data-session-idx="${absIdx}" data-exercise-idx="${exIdx}"`)}>
                  ${ej.respuesta}
                </span>
              </div>
            `
                : ""
            }
          </div>
        `
          )
          .join("");

        return `
          <div class="worksheet-card">
            <div class="nem-header-banner">
              <span>${esc.nombre.toUpperCase()} (${esc.cct})</span>
              <span>${(esc.asignatura || "MATEMÁTICAS").toUpperCase()} · ${(esc.grado || "3°").toUpperCase()} · ${bloque.semanas.toUpperCase()} · SESIÓN ${ses.numero}</span>
            </div>

            <table class="worksheet-student-header">
              <tbody>
                <tr>
                  <td style="width:52%;"><strong>Nombre del Alumno(a):</strong> _______________________________________</td>
                  <td style="width:20%;"><strong>Grupo:</strong> ______</td>
                  <td style="width:28%;"><strong>Fecha:</strong> ____/____/202___</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Docente:</strong> ${esc.docente}</td>
                  <td><strong>Calificación / Sello:</strong> _________</td>
                </tr>
              </tbody>
            </table>

            <div class="worksheet-title-banner">
              <div>
                HOJA DE TRABAJO · SESIÓN ${ses.numero}:
                <span ${this.editAttr("hoja", "tituloHoja", `data-session-idx="${absIdx}"`)}>
                  ${h.tituloHoja || ses.titulo}
                </span>
              </div>
              <span style="font-size:0.78rem;opacity:0.92;white-space:nowrap;">50 min</span>
            </div>

            <div style="font-size:0.85rem;margin-bottom:8px;">
              <div><strong>Aprendizaje (PDA):</strong> <span ${this.editAttr("bloque", "pda")}>${bloque.pda}</span></div>
              <div style="margin-top:3px;">
                <strong>Instrucciones:</strong>
                <span ${this.editAttr("hoja", "instrucciones", `data-session-idx="${absIdx}"`)}>
                  ${h.instrucciones || "Realiza ordenadamente cada actividad anotando todo tu procedimiento o análisis."}
                </span>
              </div>
            </div>

            <div class="worksheet-theory-box">
              <strong>Concepto / Recordatorio Clave:</strong>
              <span ${this.editAttr("hoja", "notaTeorica", `data-session-idx="${absIdx}"`)}>
                ${h.notaTeorica || ""}
              </span>
            </div>

            ${diagramSelectorHTML}

            ${
              svgHTML
                ? `<div class="worksheet-diagram-container">${svgHTML}</div>`
                : ""
            }

            <div style="margin-top:8px;">
              ${ejerciciosHTML}
            </div>

            ${
              this.state.editMode
                ? `
              <div class="no-export" style="margin:8px 0 12px 0;text-align:right;">
                <button class="btn btn-outline btn-sm" onclick="AppController.addExercise(${absIdx})">
                  + Agregar Actividad/Ejercicio a la Hoja #${ses.numero}
                </button>
              </div>
            `
                : ""
            }

            <div class="exit-ticket-box">
              <div class="exit-ticket-title">Boleto de Salida (Evaluación Formativa de Cierre · 10 min)</div>
              <div style="font-size:0.86rem;font-weight:600;margin-bottom:6px;"
                ${this.editAttr("hoja", "boletoSalida", `data-session-idx="${absIdx}"`)}>
                ${h.boletoSalida || "Explica cuál fue la estrategia o idea principal que utilizaste en la sesión de hoy."}
              </div>
              <div style="border-bottom:1px dotted #64748b;height:20px;margin-bottom:5px;"></div>
              <div style="display:flex;justify-content:space-between;font-size:0.76rem;color:#475569;margin-top:4px;flex-wrap:wrap;gap:6px;">
                <span>Mi nivel de comprensión hoy:</span>
                <span>[ ] Lo dominé (Logrado)</span>
                <span>[ ] Casi listo, tuve una duda (Medianamente)</span>
                <span>[ ] Necesito apoyo extra</span>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    return `
      ${syncBannerHTML}
      ${filterBarHTML}
      <div id="printableWorksheetsArea" class="${this.state.compactPrintMode ? "compact-worksheet" : ""}">
        ${tarjetasHojasHTML}
      </div>
    `;
  },

  async handleSyncHojasFromPlanAI() {
    this.flushAllEditableFields();
    const bloque = this.getCurrentBloque();
    const plan = this.getCurrentPlan();
    if (!plan || !Array.isArray(plan.sesiones)) return;

    const btn = document.getElementById("btnSyncHojasAI");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sincronizando Hojas con el Plan de Clase...";
    }
    this.showToast(
      "Sincronizando Hojas de Actividad con las sesiones editadas del Plan de Clase...",
      "warning"
    );

    try {
      const targetSesiones =
        this.state.selectedSessionIndex === "all"
          ? plan.sesiones
          : [plan.sesiones[this.state.selectedSessionIndex]];

      const hojasActualizadas = await window.AIGenerator.syncHojasFromPlan(
        this.state.escuela,
        bloque,
        targetSesiones
      );

      hojasActualizadas.forEach((item) => {
        const sesMatch = plan.sesiones.find((s) => Number(s.numero) === Number(item.numero));
        if (sesMatch && item.hojaActividad) {
          sesMatch.hojaActividad = item.hojaActividad;
        }
      });

      this.saveStateToStorage();
      this.renderMainView();
      this.showToast(
        "¡Hojas de Actividad sincronizadas con el contexto actual del Plan de Clase!",
        "success"
      );
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Sincronizar / Generar Hojas desde el Plan de Clase con IA";
      }
    }
  },

  selectBloqueAndOpen(bloqueId, targetTab) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    this.state.selectedBloqueId = bloqueId;
    this.state.selectedSessionIndex = "all";
    this.switchSubView(targetTab);
    this.renderSidebar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  resetDefaultData() {
    this.showConfirmModal({
      title: "Restaurar sistema de fábrica",
      message:
        "¿Deseas restaurar los datos originales de fábrica? Te recomendamos descargar primero un respaldo (.json) si creaste cursos o ediciones importantes.",
      confirmText: "Restaurar de fábrica",
      onConfirm: () => {
        localStorage.removeItem("nem_multi_courses_v2");
        localStorage.removeItem("nem_active_course_id_v2");
        localStorage.removeItem("nem_alr_custom_planes_v1");
        localStorage.removeItem("nem_alr_custom_bloques_v1");
        localStorage.removeItem("nem_alr_vinculacion");
        localStorage.removeItem("nem_alr_escuela");
        localStorage.removeItem("nem_alr_compact_mode");
        window.location.reload();
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.AppController.init();
});
