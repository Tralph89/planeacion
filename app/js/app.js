// ============================================================================
// CONTROLADOR PRINCIPAL DE LA APLICACIÓN DE PLANEACIÓN Y HOJAS DE ACTIVIDAD
// Esc. Sec. General Abelardo L. Rodríguez | Prof. José Rafael Leyva García
// Con persistencia en tiempo real, CRUD completo, IA en servidor y respaldo JSON
// ============================================================================

window.AppController = {
  state: {
    currentTab: "planeacion", // 'planeacion' | 'hojas' | 'analitico' | 'generador'
    currentTrimestre: 1, // 1 | 2 | 3 | 4 (Codiseño) | 0 (Todos)
    searchQuery: "",
    selectedBloqueId: "B01",
    selectedSessionIndex: "all", // 'all' o índice numérico 0, 1, 2...
    showTeacherAnswers: false,
    compactPrintMode: false,
    editMode: false,
    lastSavedTime: null,
    escuela: null,
    vinculacion: null,
    bloquesDB: [],
    planesDB: {}
  },

  init() {
    // 1. Cargar copias editables de escuela, vinculación y bloques curriculares
    this.state.escuela = JSON.parse(JSON.stringify(window.ProgramaAnaliticoData.escuela));
    this.state.vinculacion = JSON.parse(JSON.stringify(window.ProgramaAnaliticoData.vinculacionTransversalDefault));
    this.state.bloquesDB = JSON.parse(JSON.stringify(window.ProgramaAnaliticoData.bloquesCurriculares));

    const rawPlanes = {
      ...window.PlaneacionesTrimestre1,
      ...window.PlaneacionesTrimestre2y3
    };

    // Expandir sesiones para que todos los bloques tengan sus 5, 10 o 15 sesiones completas
    this.state.bloquesDB.forEach((b) => {
      if (rawPlanes[b.id]) {
        this.state.planesDB[b.id] = window.SessionExpander.ensureFullSessions(
          b,
          JSON.parse(JSON.stringify(rawPlanes[b.id]))
        );
      }
    });

    // 2. Recuperar personalizaciones guardadas en localStorage si existen
    const savedCompact = localStorage.getItem("nem_alr_compact_mode");
    if (savedCompact === "true") {
      this.state.compactPrintMode = true;
    }

    const savedEscuela = localStorage.getItem("nem_alr_escuela");
    if (savedEscuela) {
      try {
        Object.assign(this.state.escuela, JSON.parse(savedEscuela));
      } catch (e) {}
    }

    const savedVinculacion = localStorage.getItem("nem_alr_vinculacion");
    if (savedVinculacion) {
      try {
        Object.assign(this.state.vinculacion, JSON.parse(savedVinculacion));
      } catch (e) {}
    }

    const savedBloques = localStorage.getItem("nem_alr_custom_bloques_v1");
    if (savedBloques) {
      try {
        const parsedBloques = JSON.parse(savedBloques);
        if (Array.isArray(parsedBloques) && parsedBloques.length === this.state.bloquesDB.length) {
          this.state.bloquesDB = parsedBloques;
        }
      } catch (e) {}
    }

    const savedCustomPlanes = localStorage.getItem("nem_alr_custom_planes_v1");
    if (savedCustomPlanes) {
      try {
        const parsed = JSON.parse(savedCustomPlanes);
        Object.assign(this.state.planesDB, parsed);
        // Asegurar que bloques de 2 semanas previamente guardados en caché se expandan a 10 sesiones
        this.state.bloquesDB.forEach((b) => {
          if (this.state.planesDB[b.id]) {
            this.state.planesDB[b.id] = window.SessionExpander.ensureFullSessions(b, this.state.planesDB[b.id]);
          }
        });
      } catch (e) {}
    }

    this.bindEvents();
    this.renderSidebar();
    this.renderMainView();
  },

  // ================= NOTIFICACIONES TOAST Y MODAL INTEGRADO =================
  showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const prefixes = {
      success: "Guardado:",
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
    }, 3600);
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
    localStorage.setItem("nem_alr_escuela", JSON.stringify(this.state.escuela));
    localStorage.setItem("nem_alr_vinculacion", JSON.stringify(this.state.vinculacion));
    localStorage.setItem("nem_alr_custom_bloques_v1", JSON.stringify(this.state.bloquesDB));
    localStorage.setItem("nem_alr_custom_planes_v1", JSON.stringify(this.state.planesDB));
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
  },

  getCurrentBloque() {
    return (
      this.state.bloquesDB.find((b) => b.id === this.state.selectedBloqueId) ||
      this.state.bloquesDB[0]
    );
  },

  getCurrentPlan() {
    const b = this.getCurrentBloque();
    return this.state.planesDB[b.id];
  },

  bindEvents() {
    // Pestañas superiores
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
        if (this.state.currentTrimestre !== 0 && bloqueActual.trimestre !== this.state.currentTrimestre) {
          const primerBloque = this.state.bloquesDB.find((b) => b.trimestre === this.state.currentTrimestre);
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
      const key = el.dataset.field; // 'enunciado' | 'respuesta'
      if (
        !isNaN(sIdx) &&
        !isNaN(exIdx) &&
        plan &&
        plan.sesiones?.[sIdx]?.hojaActividad?.ejercicios?.[exIdx]
      ) {
        if (key === "respuesta") {
          plan.sesiones[sIdx].hojaActividad.ejercicios[exIdx].respuesta = val
            .replace(/^✅\s*Respuesta\s*\/\s*Guía Docente:\s*/i, "")
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
      const matchTrim = this.state.currentTrimestre === 0 || b.trimestre === this.state.currentTrimestre;
      const q = this.state.searchQuery;
      const matchQuery =
        !q ||
        b.semanas.toLowerCase().includes(q) ||
        b.contenidoSintetico.toLowerCase().includes(q) ||
        b.contenidoContextualizado.toLowerCase().includes(q) ||
        b.pda.toLowerCase().includes(q);
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
          No se encontraron secuencias para "${this.state.searchQuery}".
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
              <span>${numSes} sesiones</span>
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
      this.showToast("Cambios guardados en este navegador.", "success");
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
    const nueva = window.AIGenerator.generateContextualSession(bloque, "pesca", "", nextNum);
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
      enunciado: `${nextExNum}. Nuevo ejercicio contextualizado: Describe aquí el planteamiento matemático y los datos para el alumno.`,
      respuesta: "Procedimiento paso a paso y resultado exacto."
    });

    this.saveStateToStorage();
    this.renderMainView();
    this.showToast(`Ejercicio #${nextExNum} añadido a la Sesión ${ses.numero}.`, "success");
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
    this.showToast("Diagrama geométrico actualizado en la Hoja de Actividad.", "success");
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
    const backupPayload = {
      app: "Sistema de Planeación Didáctica Matemáticas 3° NEM",
      version: "2.0",
      exportedAt: new Date().toISOString(),
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
    link.download = `Respaldo_Planeaciones_Matematicas3_NEM_${dateStamp}.json`;
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
        if (!parsed.planesDB || !parsed.bloquesDB) {
          this.showToast("El archivo JSON no tiene el formato de respaldo esperado.", "error");
          return;
        }
        if (parsed.escuela) this.state.escuela = parsed.escuela;
        if (parsed.vinculacion) this.state.vinculacion = parsed.vinculacion;
        if (Array.isArray(parsed.bloquesDB)) this.state.bloquesDB = parsed.bloquesDB;
        if (parsed.planesDB) this.state.planesDB = parsed.planesDB;

        this.saveStateToStorage();
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
    return text
      .split("\n")
      .map((line) => `<div>${line}</div>`)
      .join("");
  },

  // ================= RENDERIZADO DE VISTAS =================
  renderMainView() {
    const container = document.getElementById("mainContentContainer");
    if (!container) return;

    const bloque = this.getCurrentBloque();
    const plan = this.getCurrentPlan();
    const esc = this.state.escuela;

    const subBannerHTML = `
      <div class="context-subbanner no-export">
        <span>Esc. Sec. Gral. ${esc.nombre} (${esc.cct}) · Prof. ${esc.docente} · Grupos ${esc.grupos} (${esc.turno})</span>
        <span>Ciclo Escolar ${esc.cicloEscolar} · Guaymas, Sonora</span>
      </div>
    `;

    if (this.state.currentTab === "planeacion") {
      container.innerHTML =
        subBannerHTML +
        this.renderToolbar(bloque, "planeacion") +
        this.renderPlaneacionView(bloque, plan);
    } else if (this.state.currentTab === "hojas") {
      container.innerHTML =
        subBannerHTML +
        this.renderToolbar(bloque, "hojas") +
        this.renderHojasView(bloque, plan);
    } else if (this.state.currentTab === "analitico") {
      container.innerHTML = subBannerHTML + this.renderAnaliticoView();
    } else if (this.state.currentTab === "generador") {
      container.innerHTML = subBannerHTML + this.renderGeneradorView(bloque, plan);
    }

    if (this.state.editMode) {
      this.attachEditableListeners();
    }
  },

  renderToolbar(bloque, mode) {
    const docTargetId = mode === "planeacion" ? "printableDocumentArea" : "printableWorksheetsArea";
    const filePrefix =
      mode === "planeacion"
        ? `Planeacion_Matematicas3_${bloque.id}_${bloque.semanas.replace(/\s+/g, "_")}`
        : `Hojas_Actividad_Matematicas3_${bloque.id}_${bloque.semanas.replace(/\s+/g, "_")}`;

    const plan = this.getCurrentPlan();
    const totalSesiones = plan && plan.sesiones ? plan.sesiones.length : 5;

    return `
      <div class="action-toolbar no-export">
        <div class="toolbar-group">
          <div class="toolbar-block-indicator">
            <span class="toolbar-block-kicker">BLOQUE ${bloque.id} · ${bloque.semanas.toUpperCase()} (${totalSesiones} SESIONES)</span>
            <span class="toolbar-block-name" title="${bloque.contenidoSintetico}">${bloque.contenidoSintetico}</span>
          </div>
          ${
            mode === "planeacion"
              ? `<button class="btn btn-outline" onclick="AppController.switchSubView('hojas')">Ver Hojas de Actividad (${totalSesiones})</button>`
              : `<button class="btn btn-outline" onclick="AppController.switchSubView('planeacion')">Ver Plan de Clase</button>`
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
          <button class="btn btn-outline" onclick="AppController.exportBackupJSON()" title="Descargar copia de seguridad de todas tus planeaciones">
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
          <span><strong>Modo Edición Activo:</strong> Haz clic sobre cualquier texto recuadrado en azul para modificarlo, o usa los botones para agregar/quitar sesiones, ejercicios, diagramas y criterios.</span>
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
    const semClean = bloque.semanas.replace(/\s+/g, "_");

    // Si se invoca desde el botón global superior sin argumentos, detectar la vista activa
    if (!docTargetId) {
      if (this.state.currentTab === "hojas") {
        docTargetId = "printableWorksheetsArea";
        filePrefix = `Hojas_Actividad_Matematicas3_${bloque.id}_${semClean}`;
      } else if (this.state.currentTab === "analitico") {
        docTargetId = "analiticoFullTableArea";
        filePrefix = "Programa_Analitico_Matematicas3_ALR";
      } else {
        if (this.state.currentTab === "generador") {
          this.switchSubView("planeacion");
        }
        docTargetId = "printableDocumentArea";
        filePrefix = `Planeacion_Matematicas3_${bloque.id}_${semClean}`;
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

  // ================= VISTA 1: PLAN DE CLASE OFICIAL NEM =================
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
      <div id="printableDocumentArea">
        <div class="nem-document-sheet">
          <div class="nem-header-banner">
            <span>NUEVA ESCUELA MEXICANA · FASE 6</span>
            <span>TRIMESTRE ${bloque.trimestre <= 3 ? bloque.trimestre : "CODISEÑO"} · ${bloque.semanas.toUpperCase()}</span>
          </div>

          <!-- Tabla 1: Encabezado Institucional -->
          <table class="nem-table">
            <thead>
              <tr>
                <th colspan="6" class="nem-table-title">PLAN DE CLASE MATEMÁTICAS 3° DE SECUNDARIA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="nem-cell-label">Esc. Sec.</td>
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
                  <div style="margin-top:4px;"><strong>Contextualización (Programa Analítico):</strong> <span ${this.editAttr("bloque", "contenidoContextualizado")}>${bloque.contenidoContextualizado}</span></div>
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
                  Evaluación Formativa del Proceso de Desarrollo del Aprendizaje | Tercer grado | Trimestre ${bloque.trimestre <= 3 ? bloque.trimestre : "Codiseño"} | Grupo: ${esc.grupos}
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

  // ================= VISTA 2: HOJAS DE ACTIVIDAD POR SESIÓN =================
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
        const diagramType = h.diagramType || bloque.diagramType || "algebra_rect";
        const svgHTML = window.SVGDiagrams.renderByType(diagramType, {
          title: h.tituloHoja || ses.titulo
        });

        const diagramSelectorHTML = this.state.editMode
          ? `
          <div class="worksheet-diagram-toolbar no-export">
            <span><strong>Esquema Visual / Geométrico de la Hoja #${ses.numero}:</strong></span>
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
              Espacio para operaciones, tabla, planteamiento o representación geométrica:
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
              <span>ESC. SEC. GRAL. ${esc.nombre.toUpperCase()} (${esc.cct})</span>
              <span>MATEMÁTICAS 3° · ${bloque.semanas.toUpperCase()} · SESIÓN ${ses.numero}</span>
            </div>

            <table class="worksheet-student-header">
              <tbody>
                <tr>
                  <td style="width:52%;"><strong>Nombre del Alumno(a):</strong> _______________________________________</td>
                  <td style="width:20%;"><strong>Grupo:</strong> ______</td>
                  <td style="width:28%;"><strong>Fecha:</strong> ____/____/202___</td>
                </tr>
                <tr>
                  <td colspan="2"><strong>Docente:</strong> Prof. ${esc.docente}</td>
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
                  ${h.instrucciones || "Resuelve ordenadamente cada actividad anotando todo tu procedimiento."}
                </span>
              </div>
            </div>

            <div class="worksheet-theory-box">
              <strong>Recordatorio Matemático Clave:</strong>
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
                  + Agregar Ejercicio a la Hoja #${ses.numero}
                </button>
              </div>
            `
                : ""
            }

            <div class="exit-ticket-box">
              <div class="exit-ticket-title">Boleto de Salida (Evaluación Formativa de Cierre · 10 min)</div>
              <div style="font-size:0.86rem;font-weight:600;margin-bottom:6px;"
                ${this.editAttr("hoja", "boletoSalida", `data-session-idx="${absIdx}"`)}>
                ${h.boletoSalida || "Explica cuál fue la estrategia principal que utilizaste en la sesión de hoy."}
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
      ${filterBarHTML}
      <div id="printableWorksheetsArea" class="${this.state.compactPrintMode ? "compact-worksheet" : ""}">
        ${tarjetasHojasHTML}
      </div>
    `;
  },

  // ================= VISTA 3: PROGRAMA ANALÍTICO Y SINTÉTICO =================
  renderAnaliticoView() {
    const data = window.ProgramaAnaliticoData;
    const esc = this.state.escuela;

    const filasContextualizacion = this.state.bloquesDB
      .map((b) => {
        const plan = this.state.planesDB[b.id];
        const numSes = plan && plan.sesiones ? plan.sesiones.length : b.numSesiones;
        return `
        <tr>
          <td style="font-weight:700;text-align:center;font-variant-numeric:tabular-nums;">
            ${b.semanas}<br>
            <span style="font-size:0.74rem;color:#64748b;font-weight:normal;">
              ${b.trimestre <= 3 ? `Trim. ${b.trimestre}` : "Codiseño"} · ${numSes} ses.
            </span>
          </td>
          <td><strong>${b.contenidoContextualizado}</strong><br><span style="font-size:0.79rem;color:#475569;">(Sintético: ${b.contenidoSintetico})</span></td>
          <td>${b.pda}</td>
          <td style="font-size:0.82rem;">${b.justificacion}</td>
          <td style="text-align:center;font-weight:700;">${b.ejesArticuladores}</td>
          <td class="no-export" style="text-align:center;">
            <button class="btn btn-primary btn-sm" style="margin-bottom:4px;width:100%;justify-content:center;" onclick="AppController.selectBloqueAndOpen('${b.id}', 'planeacion')">
              Abrir Plan
            </button>
            <button class="btn btn-outline btn-sm" style="width:100%;justify-content:center;" onclick="AppController.selectBloqueAndOpen('${b.id}', 'hojas')">
              Abrir Hojas (${numSes})
            </button>
          </td>
        </tr>
      `;
      })
      .join("");

    return `
      <div class="info-card">
        <h2>Primer Plano: Diagnóstico Socioeducativo (${esc.nombre} · ${esc.cct})</h2>
        <p style="font-size:0.89rem;color:#334155;margin-bottom:12px;">
          ${data.diagnosticoSocioeducativo.comunidad}
        </p>
        <h3 style="font-size:0.93rem;color:#8b1d41;margin-bottom:8px;">Situación Actual de los Aprendizajes (Grupos ${esc.grupos}):</h3>
        <div class="grid-3">
          ${data.diagnosticoSocioeducativo.areasPrioritarias
            .map(
              (ap) => `
            <div class="priority-box">
              <strong>${ap.titulo}</strong>
              <p style="margin-top:4px;">${ap.descripcion}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="info-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px;">
          <h2>Segundo y Tercer Plano: Contextualización Anual (38 Semanas) y Codiseño</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn btn-word" onclick="ExportEngine.exportToWord('analiticoFullTableArea', 'Programa_Analitico_Matematicas3_ALR')">
              Descargar Programa Analítico en Word (.doc)
            </button>
            <button class="btn btn-pdf js-pdf-export-btn" onclick="ExportEngine.exportToPDF('analiticoFullTableArea', 'Programa_Analitico_Matematicas3_ALR')">
              Descargar PDF (.pdf)
            </button>
          </div>
        </div>
        <div id="analiticoFullTableArea">
          <table class="nem-table">
            <thead>
              <tr>
                <th colspan="6" class="nem-table-title">PLANO DE CONTEXTUALIZACIÓN Y CODISEÑO · MATEMÁTICAS 3° (${esc.nombre})</th>
              </tr>
              <tr style="background:#fae5d7;">
                <th style="width:105px;">Semana</th>
                <th style="width:22%;">Contenido Contextualizado</th>
                <th style="width:20%;">PDA que se impulsa</th>
                <th>Justificación Pedagógica</th>
                <th style="width:95px;">Ejes</th>
                <th class="no-export" style="width:115px;">Acción Directa</th>
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

  // ================= VISTA 4: GENERADOR DE NUEVAS SESIONES, IA Y RESPALDO =================
  renderGeneradorView(bloque, plan) {
    const esc = this.state.escuela;
    const totalSes = plan && plan.sesiones ? plan.sesiones.length : 0;

    return `
      <div class="info-card">
        <h2>Generador de Nuevas Sesiones y Hojas Contextualizadas en Guaymas</h2>
        <p style="font-size:0.88rem;color:#475569;margin-bottom:14px;">
          Bloque activo: <strong>${bloque.semanas} · ${bloque.contenidoSintetico}</strong> (${totalSes} sesiones actuales).<br>
          PDA: <em>${bloque.pda}</em>
        </p>

        <div class="form-grid">
          <div class="form-group">
            <label for="genContextoKey">Escenario del Contexto de Guaymas, Sonora:</label>
            <select id="genContextoKey" class="form-control">
              <option value="pesca">Sector Pesquero y Marítimo del Puerto de Guaymas</option>
              <option value="malecon">Malecón Turístico, Plaza y Comercios Vecinos a la Secundaria</option>
              <option value="deportes">Deportes en el Gimnasio Municipal y Canchas de 3°G y 3°H</option>
              <option value="industria">Manufactura, Empaques e Ingeniería en Empresas de la Región</option>
            </select>
          </div>
          <div class="form-group">
            <label for="genEngineMode">Motor de Generación Pedagógica:</label>
            <select id="genEngineMode" class="form-control">
              <option value="server_ai">Generador IA en el Servidor (Gemini · Recomendado)</option>
              <option value="local_template">Motor Pedagógico Local Instantáneo (Sin conexión)</option>
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:14px;">
          <label for="genCustomPrompt">Situación, reto específico o tipo de ejercicios que deseas agregar (opcional):</label>
          <textarea id="genCustomPrompt" class="form-control" rows="3" placeholder="Ejemplo: Que los alumnos calculen el costo de combustible de dos embarcaciones pesqueras o resuelvan 3 ejercicios graduados sobre este PDA..."></textarea>
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button id="btnRunGenerator" class="btn btn-primary" onclick="AppController.handleGenerateNewSession()">
            + Generar y Agregar Sesión #${totalSes + 1} al Bloque ${bloque.id}
          </button>
        </div>
        <div id="genStatusMessage" style="margin-top:12px;font-weight:600;font-size:0.86rem;"></div>
      </div>

      <div class="info-card">
        <h2>Datos Institucionales del Encabezado Oficial</h2>
        <p style="font-size:0.86rem;color:#475569;margin-bottom:12px;">
          Estos datos se actualizan automáticamente en todas tus planeaciones y hojas de actividad.
        </p>
        <div class="form-grid">
          <div class="form-group">
            <label for="cfgNombreEsc">Escuela Secundaria:</label>
            <input id="cfgNombreEsc" class="form-control" value="${esc.nombre}">
          </div>
          <div class="form-group">
            <label for="cfgCCT">Clave CCT:</label>
            <input id="cfgCCT" class="form-control" value="${esc.cct}">
          </div>
          <div class="form-group">
            <label for="cfgDocente">Docente:</label>
            <input id="cfgDocente" class="form-control" value="${esc.docente}">
          </div>
          <div class="form-group">
            <label for="cfgGrupos">Grupos:</label>
            <input id="cfgGrupos" class="form-control" value="${esc.grupos}">
          </div>
          <div class="form-group">
            <label for="cfgTurno">Turno:</label>
            <input id="cfgTurno" class="form-control" value="${esc.turno}">
          </div>
          <div class="form-group">
            <label for="cfgCiclo">Ciclo Escolar:</label>
            <input id="cfgCiclo" class="form-control" value="${esc.cicloEscolar}">
          </div>
        </div>
        <button class="btn btn-primary" onclick="AppController.saveSchoolConfig()">
          Guardar Datos Institucionales
        </button>
      </div>

      <div class="info-card">
        <h2>Respaldo Portátil (.JSON) y Restauración del Sistema</h2>
        <p style="font-size:0.86rem;color:#475569;margin-bottom:14px;">
          Descarga un archivo de respaldo con todas tus ediciones, sesiones personalizadas y ajustes para conservarlo en tu computadora o cargarlo en otro dispositivo.
        </p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="AppController.exportBackupJSON()">
            Exportar Respaldo Completo (.json)
          </button>
          <button class="btn btn-outline" onclick="AppController.triggerImportBackup()">
            Importar Archivo de Respaldo (.json)
          </button>
          <button class="btn btn-danger-outline" onclick="AppController.resetDefaultData()">
            Restaurar Planeaciones Originales de Fábrica
          </button>
        </div>
      </div>
    `;
  },

  saveSchoolConfig() {
    this.state.escuela.nombre = document.getElementById("cfgNombreEsc").value.trim();
    this.state.escuela.cct = document.getElementById("cfgCCT").value.trim();
    this.state.escuela.docente = document.getElementById("cfgDocente").value.trim();
    this.state.escuela.grupos = document.getElementById("cfgGrupos").value.trim();
    this.state.escuela.turno = document.getElementById("cfgTurno").value.trim();
    this.state.escuela.cicloEscolar = document.getElementById("cfgCiclo").value.trim();
    this.saveStateToStorage();
    this.renderMainView();
    this.showToast("Datos institucionales actualizados en todas las planeaciones y hojas.", "success");
  },

  async handleGenerateNewSession() {
    const bloque = this.getCurrentBloque();
    const plan = this.getCurrentPlan();
    const contextoKey = document.getElementById("genContextoKey").value;
    const engineMode = document.getElementById("genEngineMode").value;
    const customPrompt = document.getElementById("genCustomPrompt").value.trim();
    const statusEl = document.getElementById("genStatusMessage");
    const btnEl = document.getElementById("btnRunGenerator");
    const nextNum = (plan.sesiones ? plan.sesiones.length : 0) + 1;

    if (btnEl) btnEl.disabled = true;

    try {
      let nuevaSesion;
      if (engineMode === "server_ai") {
        statusEl.style.color = "#0369a1";
        statusEl.textContent = "Generando sesión y hoja de actividad con IA en el servidor...";
        nuevaSesion = await window.AIGenerator.generateWithServerAI(
          bloque,
          contextoKey,
          customPrompt,
          nextNum
        );
        this.showToast(`Sesión #${nextNum} generada con IA para el bloque ${bloque.id}.`, "success");
      } else {
        nuevaSesion = window.AIGenerator.generateContextualSession(
          bloque,
          contextoKey,
          customPrompt,
          nextNum
        );
        this.showToast(`Sesión #${nextNum} generada con el motor pedagógico local.`, "success");
      }

      plan.sesiones.push(nuevaSesion);
      this.renumberSessions(plan, bloque);
      this.saveStateToStorage();
      this.renderSidebar();
      this.openSessionWorksheet(plan.sesiones.length - 1);
    } catch (err) {
      const fallback = window.AIGenerator.generateContextualSession(
        bloque,
        contextoKey,
        customPrompt,
        nextNum
      );
      plan.sesiones.push(fallback);
      this.renumberSessions(plan, bloque);
      this.saveStateToStorage();
      this.renderSidebar();
      this.showToast(
        "Se generó la sesión utilizando el motor pedagógico local contextualizado en Guaymas.",
        "warning"
      );
      this.openSessionWorksheet(plan.sesiones.length - 1);
    } finally {
      if (btnEl) btnEl.disabled = false;
    }
  },

  resetDefaultData() {
    this.showConfirmModal({
      title: "Restaurar planeaciones de fábrica",
      message:
        "¿Deseas restaurar todas las planeaciones, sesiones y hojas de actividad a su estado original? Te recomendamos descargar primero un respaldo (.json) si hiciste ediciones importantes.",
      confirmText: "Restaurar de fábrica",
      onConfirm: () => {
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
