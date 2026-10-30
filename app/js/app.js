// ============================================================================
// CONTROLADOR PRINCIPAL DE LA APLICACIÓN DE PLANEACIÓN Y HOJAS DE ACTIVIDAD
// Esc. Sec. General Abelardo L. Rodríguez | Prof. José Rafael Leyva García
// Con persistencia en tiempo real de todos los campos editables en localStorage
// ============================================================================

window.AppController = {
  state: {
    currentTab: "planeacion", // 'planeacion' | 'hojas' | 'analitico' | 'generador'
    currentTrimestre: 1, // 1 | 2 | 3 | 4 (Codiseño) | 0 (Todos)
    searchQuery: "",
    selectedBloqueId: "B01",
    selectedSessionIndex: "all", // 'all' o índice numérico 0, 1, 2...
    showTeacherAnswers: false,
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

    // Expandir sesiones para que todos los bloques tengan al menos 5 sesiones completas
    this.state.bloquesDB.forEach((b) => {
      if (rawPlanes[b.id]) {
        this.state.planesDB[b.id] = window.SessionExpander.ensureFullSessions(b, rawPlanes[b.id]);
      }
    });

    // 2. Recuperar personalizaciones guardadas en localStorage si existen
    const savedEscuela = localStorage.getItem("nem_alr_escuela");
    if (savedEscuela) {
      try { Object.assign(this.state.escuela, JSON.parse(savedEscuela)); } catch (e) {}
    }

    const savedVinculacion = localStorage.getItem("nem_alr_vinculacion");
    if (savedVinculacion) {
      try { Object.assign(this.state.vinculacion, JSON.parse(savedVinculacion)); } catch (e) {}
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
      } catch (e) {}
    }

    this.bindEvents();
    this.renderSidebar();
    this.renderMainView();
  },

  saveStateToStorage() {
    localStorage.setItem("nem_alr_escuela", JSON.stringify(this.state.escuela));
    localStorage.setItem("nem_alr_vinculacion", JSON.stringify(this.state.vinculacion));
    localStorage.setItem("nem_alr_custom_bloques_v1", JSON.stringify(this.state.bloquesDB));
    localStorage.setItem("nem_alr_custom_planes_v1", JSON.stringify(this.state.planesDB));

    const now = new Date();
    this.state.lastSavedTime = now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const badge = document.getElementById("saveStatusBadge");
    if (badge) {
      badge.textContent = `✅ Guardado (${this.state.lastSavedTime})`;
      badge.style.display = "inline-flex";
    }
  },

  getCurrentBloque() {
    return this.state.bloquesDB.find(
      (b) => b.id === this.state.selectedBloqueId
    ) || this.state.bloquesDB[0];
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
        
        // Si el bloque actual no pertenece al trimestre seleccionado, auto-seleccionar el primero disponible
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
        // Quitar prefijo "a) " si el usuario lo dejó al editar
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
          plan.sesiones[sIdx].hojaActividad.ejercicios[exIdx].respuesta = val.replace(/^✅\s*Respuesta\s*\/\s*Guía Docente:\s*/i, "").trim();
        } else {
          plan.sesiones[sIdx].hojaActividad.ejercicios[exIdx][key] = val;
        }
      }
    }
  },

  // Recorre todos los campos editables visibles y los persiste en localStorage
  flushAllEditableFields() {
    const editables = document.querySelectorAll('[contenteditable="true"][data-edit-scope]');
    if (editables.length === 0) return;
    editables.forEach((el) => this.applyEditableElementToState(el));
    this.saveStateToStorage();
    this.renderSidebar();
  },

  // Vincula listeners en tiempo real a cada campo con contenteditable="true"
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

  renderSidebar() {
    const listEl = document.getElementById("bloqueListContainer");
    if (!listEl) return;

    const bloques = this.state.bloquesDB.filter((b) => {
      const matchTrim = this.state.currentTrimestre === 0 || b.trimestre === this.state.currentTrimestre;
      const q = this.state.searchQuery;
      const matchQuery = !q ||
        b.semanas.toLowerCase().includes(q) ||
        b.contenidoSintetico.toLowerCase().includes(q) ||
        b.contenidoContextualizado.toLowerCase().includes(q) ||
        b.pda.toLowerCase().includes(q);
      return matchTrim && matchQuery;
    });

    listEl.innerHTML = bloques.map((b) => {
      const plan = this.state.planesDB[b.id];
      const numSes = plan && plan.sesiones ? plan.sesiones.length : b.numSesiones;
      const isActive = b.id === this.state.selectedBloqueId;
      return `
        <div class="bloque-item ${isActive ? 'active' : ''}" onclick="AppController.selectBloque('${b.id}')">
          <div class="bloque-item-header">
            <span class="bloque-badge">${b.semanas}</span>
            <span class="bloque-sesiones-tag">${numSes} sesiones</span>
          </div>
          <div class="bloque-item-title">${b.contenidoSintetico}</div>
          <div class="bloque-item-pda">${b.pda}</div>
        </div>
      `;
    }).join("");
  },

  selectBloque(bloqueId) {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    this.state.selectedBloqueId = bloqueId;
    this.state.selectedSessionIndex = "all";
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

  toggleTeacherAnswers() {
    if (this.state.editMode) {
      this.flushAllEditableFields();
    }
    this.state.showTeacherAnswers = !this.state.showTeacherAnswers;
    this.renderMainView();
  },

  toggleEditMode() {
    if (this.state.editMode) {
      // Si estaba activo y el usuario presiona "Guardar Cambios", guardamos todo antes de salir
      this.flushAllEditableFields();
      this.state.editMode = false;
    } else {
      this.state.editMode = true;
    }
    this.renderMainView();
  },

  formatMultiline(text) {
    if (!text) return "";
    return text
      .split("\n")
      .map((line) => `<div>${line}</div>`)
      .join("");
  },

  renderMainView() {
    const container = document.getElementById("mainContentContainer");
    if (!container) return;

    const bloque = this.getCurrentBloque();
    const plan = this.getCurrentPlan();

    if (this.state.currentTab === "planeacion") {
      container.innerHTML = this.renderToolbar(bloque, "planeacion") + this.renderPlaneacionView(bloque, plan);
    } else if (this.state.currentTab === "hojas") {
      container.innerHTML = this.renderToolbar(bloque, "hojas") + this.renderHojasView(bloque, plan);
    } else if (this.state.currentTab === "analitico") {
      container.innerHTML = this.renderAnaliticoView();
    } else if (this.state.currentTab === "generador") {
      container.innerHTML = this.renderGeneradorView(bloque, plan);
    }

    if (this.state.editMode) {
      this.attachEditableListeners();
    }
  },

  renderToolbar(bloque, mode) {
    const docTargetId = mode === "planeacion" ? "printableDocumentArea" : "printableWorksheetsArea";
    const filePrefix = mode === "planeacion"
      ? `Planeacion_Matematicas3_${bloque.id}_${bloque.semanas.replace(/\s+/g, "_")}`
      : `Hojas_Actividad_Matematicas3_${bloque.id}_${bloque.semanas.replace(/\s+/g, "_")}`;

    const plan = this.getCurrentPlan();
    const totalSesiones = plan && plan.sesiones ? plan.sesiones.length : 5;

    return `
      <div class="action-toolbar no-export">
        <div class="toolbar-group">
          <button class="btn ${mode === 'planeacion' ? 'btn-primary' : 'btn-outline'}" onclick="AppController.switchSubView('planeacion')">
            📋 Plan de Clase (${bloque.semanas})
          </button>
          <button class="btn ${mode === 'hojas' ? 'btn-primary' : 'btn-outline'}" onclick="AppController.switchSubView('hojas')">
            📝 Hojas de Actividad (${totalSesiones})
          </button>
          <button class="btn ${this.state.editMode ? 'btn-save-edit' : 'btn-outline'}" onclick="AppController.toggleEditMode()">
            ${this.state.editMode ? '💾 Guardar y Finalizar Edición' : '✏️ Editar Texto / Fechas'}
          </button>
          <span id="saveStatusBadge" style="display:${this.state.lastSavedTime ? 'inline-flex' : 'none'};align-items:center;font-size:0.78rem;font-weight:700;color:#15803d;background:#dcfce7;padding:4px 10px;border-radius:14px;">
            ✅ Guardado (${this.state.lastSavedTime || ''})
          </span>
          ${mode === "hojas" ? `
            <button class="btn btn-outline ${this.state.showTeacherAnswers ? 'active-toggle' : ''}" onclick="AppController.toggleTeacherAnswers()">
              🔑 ${this.state.showTeacherAnswers ? 'Ocultar Respuestas (Modo Alumno)' : 'Ver Respuestas (Guía Docente)'}
            </button>
          ` : ""}
        </div>
        <div class="toolbar-group">
          <button class="btn btn-word" onclick="AppController.exportWordSafely('${docTargetId}', '${filePrefix}')">
            📄 Descargar Word (.doc)
          </button>
          <button class="btn btn-pdf" onclick="AppController.exportPDFSafely()">
            🖨️ Descargar / Imprimir PDF
          </button>
        </div>
      </div>
      ${this.state.editMode ? `
        <div class="no-export" style="background:#eff6ff;border:1px solid #93c5fd;color:#1e3a8a;padding:9px 14px;border-radius:8px;margin-bottom:14px;font-size:0.85rem;display:flex;justify-content:space-between;align-items:center;">
          <span>✏️ <strong>Modo Edición Activo:</strong> Haz clic sobre cualquier texto recuadrado en azul para modificarlo. Todo lo que escribas se guarda automáticamente.</span>
          <button class="btn btn-primary" style="padding:5px 12px;font-size:0.78rem;" onclick="AppController.toggleEditMode()">💾 Listo / Guardar</button>
        </div>
      ` : ""}
    `;
  },

  exportWordSafely(docTargetId, filePrefix) {
    if (this.state.editMode) this.flushAllEditableFields();
    window.ExportEngine.exportToWord(docTargetId, filePrefix);
  },

  exportPDFSafely() {
    if (this.state.editMode) this.flushAllEditableFields();
    window.ExportEngine.exportToPDF();
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

  // Helper para generar atributos de edición con enlace de datos
  editAttr(scope, field, extraAttrs = "") {
    if (!this.state.editMode) return "";
    return `contenteditable="true" class="editing-active" data-edit-scope="${scope}" data-field="${field}" ${extraAttrs}`;
  },

  // ================= VISTA 1: PLAN DE CLASE OFICIAL NEM =================
  renderPlaneacionView(bloque, plan) {
    const esc = this.state.escuela;
    const vinc = this.state.vinculacion;

    // Agrupar sesiones de 5 en 5 por semana
    const sesiones = plan.sesiones || [];
    const semanasMap = {};
    sesiones.forEach((s, i) => {
      const semNum = Math.floor(i / 5) + 1;
      if (!semanasMap[semNum]) semanasMap[semNum] = [];
      semanasMap[semNum].push({ ses: s, absIdx: i });
    });

    const tablasSemanasHTML = Object.keys(semanasMap).map((semKey) => {
      const lista = semanasMap[semKey];
      const filasSesiones = lista.map(({ ses, absIdx }) => `
        <tr>
          <td class="session-col-num">
            <div>Sesión ${ses.numero}</div>
            <div style="font-size:0.76rem;color:#64748b;font-weight:normal;margin-top:4px;">50 min</div>
            <button class="btn btn-outline no-export" style="margin-top:8px;padding:4px 8px;font-size:0.72rem;"
              onclick="AppController.openSessionWorksheet(${absIdx})">
              Ver Hoja #${ses.numero}
            </button>
          </td>
          <td>
            <div style="font-weight:700;color:#8b1d41;margin-bottom:6px;font-size:0.95rem;"
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
      `).join("");

      return `
        <table class="nem-table">
          <thead>
            <tr>
              <th colspan="2" class="nem-table-title">
                SECUENCIA DIDÁCTICA DE ACTIVIDADES - SEMANA ${semKey} (${bloque.semanas})
              </th>
            </tr>
            <tr style="background:#fae5d7;">
              <th style="width:110px;text-align:center;">Sesiones</th>
              <th style="text-align:center;">Actividades (Inicio 10 min / Desarrollo 30 min / Cierre 10 min)</th>
            </tr>
          </thead>
          <tbody>
            ${filasSesiones}
          </tbody>
        </table>
      `;
    }).join("");

    const filasEvaluacion = (plan.evaluacionFormativa || []).map((criterio, i) => {
      const letra = String.fromCharCode(97 + i);
      return `
        <tr>
          <td>
            <strong>${letra})</strong>
            <span ${this.editAttr("evaluacion", "criterio", `data-eval-idx="${i}"`)}>${criterio}</span>
          </td>
          <td style="width:95px;text-align:center;"></td>
          <td style="width:125px;text-align:center;"></td>
          <td style="width:95px;text-align:center;"></td>
        </tr>
      `;
    }).join("");

    return `
      <div id="printableDocumentArea">
        <div class="nem-document-sheet">
          <div class="nem-header-banner">
            <span>NUEVA ESCUELA MEXICANA</span>
            <span>TRIMESTRE ${bloque.trimestre <= 3 ? bloque.trimestre : "CODISEÑO"} | ${bloque.semanas.toUpperCase()}</span>
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

          <div style="background:#fae5d7;border:1px solid #475569;padding:8px 12px;font-size:0.85rem;font-weight:700;">
            ESCALA DE DESEMPEÑO:<br>
            ➢ Nivel III. Logrado.<br>
            ➢ Nivel II. Medianamente logrado.<br>
            ➢ Nivel I. No logrado.
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

    const pillsHTML = `
      <div class="session-selector-bar no-export">
        <span style="font-weight:700;font-size:0.85rem;align-self:center;margin-right:6px;">Filtrar Sesión:</span>
        <button class="session-pill ${sel === 'all' ? 'active' : ''}" onclick="AppController.selectSession('all')">
          📚 Todas las Sesiones (${sesiones.length} hojas)
        </button>
        ${sesiones.map((s, idx) => `
          <button class="session-pill ${sel === idx ? 'active' : ''}" onclick="AppController.selectSession(${idx})">
            Sesión ${s.numero}: ${s.titulo ? s.titulo.slice(0, 26) + '...' : ''}
          </button>
        `).join("")}
      </div>
    `;

    const sesionesConIndice = sel === "all"
      ? sesiones.map((ses, idx) => ({ ses, absIdx: idx }))
      : [{ ses: sesiones[sel] || sesiones[0], absIdx: typeof sel === "number" ? sel : 0 }];

    const tarjetasHojasHTML = sesionesConIndice.map(({ ses, absIdx }) => {
      const h = ses.hojaActividad || {};
      const diagramType = h.diagramType || bloque.diagramType || "algebra_rect";
      const svgHTML = window.SVGDiagrams.renderByType(diagramType, {
        title: h.tituloHoja || ses.titulo
      });

      const ejerciciosHTML = (h.ejercicios || []).map((ej, exIdx) => `
        <div class="worksheet-exercise-item">
          <div class="worksheet-exercise-text"
            ${this.editAttr("ejercicio", "enunciado", `data-session-idx="${absIdx}" data-exercise-idx="${exIdx}"`)}>
            ${ej.enunciado}
          </div>
          <div class="worksheet-work-area">
            Espacio para operaciones, tabla, planteamiento o representación geométrica:
          </div>
          ${this.state.showTeacherAnswers ? `
            <div class="teacher-answer-box">
              ✅ Respuesta / Guía Docente:
              <span ${this.editAttr("ejercicio", "respuesta", `data-session-idx="${absIdx}" data-exercise-idx="${exIdx}"`)}>
                ${ej.respuesta}
              </span>
            </div>
          ` : ""}
        </div>
      `).join("");

      return `
        <div class="worksheet-card">
          <div class="nem-header-banner">
            <span>ESC. SEC. GRAL. ${esc.nombre.toUpperCase()} (${esc.cct})</span>
            <span>MATEMÁTICAS 3° | ${bloque.semanas.toUpperCase()} - SESIÓN ${ses.numero}</span>
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
              HOJA DE TRABAJO - SESIÓN ${ses.numero}:
              <span ${this.editAttr("hoja", "tituloHoja", `data-session-idx="${absIdx}"`)}>
                ${h.tituloHoja || ses.titulo}
              </span>
            </div>
            <span style="font-size:0.8rem;background:rgba(255,255,255,0.2);padding:3px 8px;border-radius:12px;">50 min</span>
          </div>

          <div style="font-size:0.86rem;margin-bottom:8px;">
            <div><strong>Aprendizaje (PDA):</strong> <span ${this.editAttr("bloque", "pda")}>${bloque.pda}</span></div>
            <div style="margin-top:3px;">
              <strong>Instrucciones:</strong>
              <span ${this.editAttr("hoja", "instrucciones", `data-session-idx="${absIdx}"`)}>
                ${h.instrucciones || "Resuelve ordenadamente cada actividad anotando todo tu procedimiento."}
              </span>
            </div>
          </div>

          <div class="worksheet-theory-box">
            <strong>💡 Recordatorio Matemático Clave:</strong>
            <span ${this.editAttr("hoja", "notaTeorica", `data-session-idx="${absIdx}"`)}>
              ${h.notaTeorica || ""}
            </span>
          </div>

          <div class="worksheet-diagram-container">
            ${svgHTML}
          </div>

          <div style="margin-top:10px;">
            ${ejerciciosHTML}
          </div>

          <div class="exit-ticket-box">
            <div class="exit-ticket-title">🎟️ Boleto de Salida (Evaluación Formativa de Cierre - 10 min)</div>
            <div style="font-size:0.88rem;font-weight:600;margin-bottom:8px;"
              ${this.editAttr("hoja", "boletoSalida", `data-session-idx="${absIdx}"`)}>
              ${h.boletoSalida || "Explica cuál fue la estrategia principal que utilizaste en la sesión de hoy."}
            </div>
            <div style="border-bottom:1px dotted #64748b;height:22px;margin-bottom:6px;"></div>
            <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:#475569;margin-top:6px;">
              <span>Mi nivel de comprensión hoy:</span>
              <span>⬜ ¡Lo dominé! (Logrado)</span>
              <span>⬜ Casi listo, tuve una duda (Medianamente)</span>
              <span>⬜ Necesito apoyo extra</span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    return `
      ${pillsHTML}
      <div id="printableWorksheetsArea">
        ${tarjetasHojasHTML}
      </div>
    `;
  },

  // ================= VISTA 3: PROGRAMA ANALÍTICO Y SINTÉTICO =================
  renderAnaliticoView() {
    const data = window.ProgramaAnaliticoData;
    const esc = this.state.escuela;

    const filasContextualizacion = this.state.bloquesDB.map((b) => `
      <tr>
        <td style="font-weight:700;text-align:center;">${b.semanas}<br><span style="font-size:0.75rem;color:#64748b;">Trim. ${b.trimestre <= 3 ? b.trimestre : 'Codiseño'}</span></td>
        <td><strong>${b.contenidoContextualizado}</strong><br><span style="font-size:0.8rem;color:#475569;">(Sintético: ${b.contenidoSintetico})</span></td>
        <td>${b.pda}</td>
        <td style="font-size:0.82rem;">${b.justificacion}</td>
        <td style="text-align:center;font-weight:700;">${b.ejesArticuladores}</td>
        <td style="text-align:center;">
          <button class="btn btn-primary" style="padding:5px 10px;font-size:0.76rem;margin-bottom:4px;" onclick="AppController.selectBloqueAndOpen('${b.id}', 'planeacion')">
            Abrir Plan
          </button>
          <button class="btn btn-outline" style="padding:5px 10px;font-size:0.76rem;" onclick="AppController.selectBloqueAndOpen('${b.id}', 'hojas')">
            Abrir Hojas
          </button>
        </td>
      </tr>
    `).join("");

    return `
      <div class="info-card">
        <h2>🏫 Primer Plano: Diagnóstico Socioeducativo (${esc.nombre} - ${esc.cct})</h2>
        <p style="font-size:0.9rem;color:#334155;margin-bottom:12px;">
          ${data.diagnosticoSocioeducativo.comunidad}
        </p>
        <h3 style="font-size:0.95rem;color:#8b1d41;margin-bottom:8px;">Situación Actual de los Aprendizajes (Grupos 3°G y 3°H):</h3>
        <div class="grid-3">
          ${data.diagnosticoSocioeducativo.areasPrioritarias.map((ap) => `
            <div class="priority-box">
              <strong>${ap.titulo}</strong>
              <p style="margin-top:4px;">${ap.descripcion}</p>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="info-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px;">
          <h2>📚 Segundo y Tercer Plano: Contextualización Anual (38 Semanas) y Codiseño</h2>
          <button class="btn btn-word" onclick="ExportEngine.exportToWord('analiticoFullTableArea', 'Programa_Analitico_Matematicas3_ALR')">
            📄 Descargar Programa Analítico en Word
          </button>
        </div>
        <div id="analiticoFullTableArea">
          <table class="nem-table">
            <thead>
              <tr>
                <th colspan="6" class="nem-table-title">PLANO DE CONTEXTUALIZACIÓN Y CODISEÑO - MATEMÁTICAS 3° (${esc.nombre})</th>
              </tr>
              <tr style="background:#fae5d7;">
                <th style="width:95px;">Semana</th>
                <th style="width:22%;">Contenido Contextualizado</th>
                <th style="width:20%;">PDA que se impulsa</th>
                <th>Justificación Pedagógica</th>
                <th style="width:95px;">Ejes</th>
                <th class="no-export" style="width:110px;">Acción Directa</th>
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

  // ================= VISTA 4: GENERADOR DE NUEVAS SESIONES E IA =================
  renderGeneradorView(bloque, plan) {
    const esc = this.state.escuela;
    const savedKey = localStorage.getItem("nem_gemini_api_key") || "";

    return `
      <div class="info-card">
        <h2>⚙️ Datos Institucionales del Encabezado Oficial</h2>
        <p style="font-size:0.86rem;color:#475569;margin-bottom:12px;">
          Estos datos aparecen automáticamente en todas tus planeaciones y hojas de actividad.
        </p>
        <div class="form-grid">
          <div class="form-group">
            <label>Escuela Secundaria:</label>
            <input id="cfgNombreEsc" class="form-control" value="${esc.nombre}">
          </div>
          <div class="form-group">
            <label>Clave CCT:</label>
            <input id="cfgCCT" class="form-control" value="${esc.cct}">
          </div>
          <div class="form-group">
            <label>Docente:</label>
            <input id="cfgDocente" class="form-control" value="${esc.docente}">
          </div>
          <div class="form-group">
            <label>Grupos:</label>
            <input id="cfgGrupos" class="form-control" value="${esc.grupos}">
          </div>
          <div class="form-group">
            <label>Turno:</label>
            <input id="cfgTurno" class="form-control" value="${esc.turno}">
          </div>
          <div class="form-group">
            <label>Ciclo Escolar:</label>
            <input id="cfgCiclo" class="form-control" value="${esc.cicloEscolar}">
          </div>
        </div>
        <button class="btn btn-primary" onclick="AppController.saveSchoolConfig()">
          💾 Guardar Datos Institucionales
        </button>
      </div>

      <div class="info-card">
        <h2>✨ Generador de Nuevas Sesiones y Hojas Contextualizadas en Guaymas</h2>
        <p style="font-size:0.88rem;color:#475569;margin-bottom:14px;">
          Bloque actualmente seleccionado en la barra lateral: <strong>${bloque.semanas} - ${bloque.contenidoSintetico}</strong> (PDA: <em>${bloque.pda}</em>).
          Puedes agregar una nueva sesión con su Hoja de Actividad contextualizada al instante.
        </p>

        <div class="form-grid">
          <div class="form-group">
            <label>Escenario del Contexto de Guaymas, Sonora:</label>
            <select id="genContextoKey" class="form-control">
              <option value="pesca">⚓ Sector Pesquero y Marítimo del Puerto de Guaymas</option>
              <option value="malecon">🌴 Malecón Turístico, Plaza y Comercios Vecinos a la Secundaria</option>
              <option value="deportes">🏀 Deportes en el Gimnasio Municipal y Canchas de 3°G y 3°H</option>
              <option value="industria">🏭 Manufactura, Empaques e Ingeniería en Empresas de la Región</option>
            </select>
          </div>
          <div class="form-group">
            <label>API Key de Gemini (Opcional - para generación con IA en la nube):</label>
            <input id="genGeminiKey" type="password" class="form-control" placeholder="Deja vacío para usar el motor local instantáneo o pega tu API Key" value="${savedKey}">
          </div>
        </div>

        <div class="form-group" style="margin-bottom:14px;">
          <label>Situación, reto específico o tipo de ejercicios que deseas agregar (opcional):</label>
          <textarea id="genCustomPrompt" class="form-control" rows="3" placeholder="Ejemplo: Que los alumnos calculen el costo de combustible de dos lanchas pesqueras o resuelvan 4 ejercicios graduados de este PDA..."></textarea>
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button id="btnRunGenerator" class="btn btn-primary" onclick="AppController.handleGenerateNewSession()">
            ➕ Generar y Agregar Nueva Sesión + Hoja de Actividad al Bloque ${bloque.id}
          </button>
          <button class="btn btn-outline" onclick="AppController.resetDefaultData()">
            🔄 Restaurar Planeaciones Originales de Fábrica
          </button>
        </div>
        <div id="genStatusMessage" style="margin-top:12px;font-weight:600;font-size:0.88rem;"></div>
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
    alert("Datos institucionales actualizados correctamente en todas las planeaciones y hojas de trabajo.");
  },

  async handleGenerateNewSession() {
    const bloque = this.getCurrentBloque();
    const plan = this.getCurrentPlan();
    const contextoKey = document.getElementById("genContextoKey").value;
    const apiKey = document.getElementById("genGeminiKey").value.trim();
    const customPrompt = document.getElementById("genCustomPrompt").value.trim();
    const statusEl = document.getElementById("genStatusMessage");
    const nextNum = (plan.sesiones ? plan.sesiones.length : 0) + 1;

    if (apiKey) {
      localStorage.setItem("nem_gemini_api_key", apiKey);
    }

    try {
      statusEl.style.color = "#0369a1";
      statusEl.textContent = "Generando sesión y hoja de actividad...";
      let nuevaSesion;
      if (apiKey) {
        nuevaSesion = await window.AIGenerator.generateWithGeminiAPI(apiKey, bloque, contextoKey, customPrompt, nextNum);
      } else {
        nuevaSesion = window.AIGenerator.generateContextualSession(bloque, contextoKey, customPrompt, nextNum);
      }
      plan.sesiones.push(nuevaSesion);
      this.saveStateToStorage();
      this.renderSidebar();
      this.openSessionWorksheet(plan.sesiones.length - 1);
    } catch (err) {
      statusEl.style.color = "#b91c1c";
      statusEl.textContent = `Aviso: ${err.message}. Se generó usando el motor pedagógico local.`;
      const fallback = window.AIGenerator.generateContextualSession(bloque, contextoKey, customPrompt, nextNum);
      plan.sesiones.push(fallback);
      this.saveStateToStorage();
      setTimeout(() => this.openSessionWorksheet(plan.sesiones.length - 1), 1200);
    }
  },

  resetDefaultData() {
    if (confirm("¿Deseas restaurar todas las planeaciones y hojas de actividad a su estado original?")) {
      localStorage.removeItem("nem_alr_custom_planes_v1");
      localStorage.removeItem("nem_alr_custom_bloques_v1");
      localStorage.removeItem("nem_alr_vinculacion");
      localStorage.removeItem("nem_alr_escuela");
      window.location.reload();
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.AppController.init();
});
