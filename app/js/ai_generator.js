// ============================================================================
// MOTOR DE GENERACIÓN PEDAGÓGICA EN CASCADA (NEM - MULTI-MATERIA Y MULTI-GRADO)
// Conecta las 5 etapas del flujo (Sintético PDF -> Analítico -> Codiseño ->
// Plan de Clase -> Hojas de Actividad) mediante:
// 1. Llamada directa a Google Gemini REST API (Client-side, compatible con GitHub Pages)
// 2. Servidor local Express/Node si está en localhost:3000
// 3. Motor pedagógico contextualizado local offline (Zero errors en GitHub Pages)
// ============================================================================

window.AIGenerator = {
  // --------------------------------------------------------------------------
  // GESTIÓN DE ENTORNO Y CLAVE DE API DE GEMINI (CLIENT-SIDE)
  // --------------------------------------------------------------------------
  getGeminiApiKey() {
    try {
      return (localStorage.getItem("nem_gemini_api_key") || "").trim();
    } catch (e) {
      return "";
    }
  },

  setGeminiApiKey(key) {
    try {
      if (key && key.trim()) {
        localStorage.setItem("nem_gemini_api_key", key.trim());
      } else {
        localStorage.removeItem("nem_gemini_api_key");
      }
    } catch (e) {}
  },

  hasGeminiApiKey() {
    return Boolean(this.getGeminiApiKey());
  },

  isLocalServerEnvironment() {
    if (typeof window === "undefined") return false;
    const host = window.location.hostname;
    const port = window.location.port;
    return host === "localhost" || host === "127.0.0.1" || port === "3000";
  },

  async callGeminiDirect(promptText, systemInstruction = "", responseSchema = null, inlineData = null) {
    const apiKey = this.getGeminiApiKey();
    if (!apiKey) {
      throw new Error("No hay API Key configurada para Gemini.");
    }

    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const parts = [];
    if (inlineData) {
      parts.push({
        inlineData: {
          mimeType: inlineData.mimeType || "application/pdf",
          data: inlineData.data
        }
      });
    }
    parts.push({ text: promptText });

    const body = {
      contents: [{ role: "user", parts }],
      generationConfig: {
        temperature: 0.4
      }
    };

    if (systemInstruction) {
      body.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    if (responseSchema) {
      body.generationConfig.responseMimeType = "application/json";
      body.generationConfig.responseSchema = responseSchema;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      let errorMsg = `Error de Gemini API (${res.status})`;
      try {
        const errJson = await res.json();
        if (errJson?.error?.message) {
          errorMsg = errJson.error.message;
        }
      } catch (e) {}
      throw new Error(errorMsg);
    }

    const resJson = await res.json();
    const candidateText = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error("Respuesta vacía de Gemini.");
    }

    if (responseSchema) {
      try {
        return JSON.parse(candidateText);
      } catch (err) {
        const clean = candidateText.replace(/```json/gi, "").replace(/```/g, "").trim();
        return JSON.parse(clean);
      }
    }
    return candidateText;
  },

  contextosGuaymas: {
    pesca: {
      nombre: "Sector Pesquero y Marítimo Local",
      escenario: "las actividades marítimas, pesqueras, portuarias y ecológicas de la comunidad",
      unidades: "producción local, recursos marinos y logística"
    },
    malecon: {
      nombre: "Comercios, Cultura y Espacios Públicos de la Comunidad",
      escenario: "el malecón turístico, plazas, comercios y vida cotidiana alrededor de la escuela",
      unidades: "participación ciudadana, servicios y actividades culturales"
    },
    deportes: {
      nombre: "Salud, Deportes y Convivencia Escolar",
      escenario: "las actividades deportivas, recreativas y de vida saludable de los grupos escolares",
      unidades: "desempeño físico, trabajo colaborativo y bienestar"
    },
    industria: {
      nombre: "Innovación, Ciencia y Procesos Productivos Regionales",
      escenario: "los procesos tecnológicos, ambientales y productivos de la región",
      unidades: "sustentabilidad, energía y solución de problemas"
    }
  },

  // --------------------------------------------------------------------------
  // ETAPA 1: Extraer Contenidos y PDAs desde un archivo PDF con IA
  // --------------------------------------------------------------------------
  async parseSinteticoPDF(file, escuela) {
    const cleanEscuela = escuela || {};
    const materia = cleanEscuela.asignatura || "Matemáticas";
    const grado = cleanEscuela.grado || "2° de Secundaria";
    const fase = cleanEscuela.fase || "Fase 6";
    const campo = cleanEscuela.campoFormativo || "Saberes y Pensamiento Científico";

    // 1. Si el usuario configuró su clave Gemini, extraer directamente con Gemini multimodal en el cliente
    if (this.hasGeminiApiKey()) {
      try {
        const pdfBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ""));
          reader.onerror = () => reject(new Error("No se pudo leer el archivo PDF."));
          reader.readAsDataURL(file);
        });
        const cleanBase64 = String(pdfBase64).replace(/^data:application\/pdf;base64,/, "");

        const promptText = `
Analiza el documento PDF del Programa Sintético de la Nueva Escuela Mexicana (SEP).
Extrae TODOS los Contenidos y Procesos de Desarrollo de Aprendizaje (PDA) oficiales completos que corresponden específicamente a:
- Fase: ${fase}
- Grado: ${grado}
- Campo Formativo: ${campo}
- Materia / Disciplina: ${materia}
Distribuye en los 3 trimestres.
`.trim();

        const schema = {
          type: "OBJECT",
          properties: {
            contenidos: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  contenido: { type: "STRING" },
                  pda: { type: "STRING" },
                  ejesSugeridos: { type: "STRING" },
                  semanasSugeridas: { type: "INTEGER" },
                  trimestreSugerido: { type: "INTEGER" }
                },
                required: ["contenido", "pda"]
              }
            }
          },
          required: ["contenidos"]
        };

        const result = await this.callGeminiDirect(
          promptText,
          "Eres un especialista curricular de la Nueva Escuela Mexicana (SEP). Devuelve siempre JSON con los Contenidos y PDAs en español.",
          schema,
          { mimeType: "application/pdf", data: cleanBase64 }
        );

        if (Array.isArray(result?.contenidos) && result.contenidos.length > 0) {
          return result.contenidos.map((c, idx) => ({
            id: `CS-${String(idx + 1).padStart(2, "0")}`,
            contenido: c.contenido,
            pda: c.pda,
            ejesSugeridos: c.ejesSugeridos || "Pensamiento crítico",
            semanasSugeridas: Number(c.semanasSugeridas) || 2,
            trimestreSugerido: Number(c.trimestreSugerido) || ((idx % 3) + 1),
            seleccionado: true
          }));
        }
      } catch (err) {
        console.warn("[AIGenerator]: Extracción de PDF con Gemini falló, usando catálogo oficial:", err);
      }
    }

    // 2. Si estamos en entorno local con backend Node/Express activo
    if (this.isLocalServerEnvironment()) {
      try {
        const pdfBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ""));
          reader.onerror = () => reject(new Error("No se pudo leer el archivo PDF."));
          reader.readAsDataURL(file);
        });

        const response = await fetch("/api/parse-sintetico-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pdfBase64, escuela: cleanEscuela })
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data?.contenidos) && data.contenidos.length > 0) {
            return data.contenidos.map((c, idx) => ({
              id: `CS-${String(idx + 1).padStart(2, "0")}`,
              contenido: c.contenido,
              pda: c.pda,
              ejesSugeridos: c.ejesSugeridos || "Pensamiento crítico",
              semanasSugeridas: Number(c.semanasSugeridas) || 2,
              trimestreSugerido: Number(c.trimestreSugerido) || ((idx % 3) + 1),
              seleccionado: true
            }));
          }
        }
      } catch (e) {
        console.warn("[AIGenerator]: Servidor local /api/parse-sintetico-pdf no disponible.");
      }
    }

    // 3. Respaldo sin conexión / GitHub Pages: Usar catálogo oficial integrado
    const resolvedId = window.CatalogoSinteticoNEM
      ? window.CatalogoSinteticoNEM.resolveMateriaId(cleanEscuela.materiaId, materia, grado)
      : "matematicas_2";

    if (window.CatalogoSinteticoNEM) {
      return window.CatalogoSinteticoNEM.getContenidosForMateria(resolvedId, grado, materia);
    }
    return [];
  },

  // --------------------------------------------------------------------------
  // ETAPA 2A: Generar / Enriquecer Diagnóstico Socioeducativo (Primer Plano)
  // --------------------------------------------------------------------------
  async generateDiagnostico(escuela, diagnosticoActual, promptExtra = "") {
    const esc = escuela || {};
    const diagActual = diagnosticoActual || {};

    // 1. Directo con Gemini API si el usuario configuró clave
    if (this.hasGeminiApiKey()) {
      try {
        const prompt = `
Redacta o enriquece el Primer Plano (Diagnóstico Socioeducativo / Lectura de la Realidad) para el Programa Analítico de la Nueva Escuela Mexicana con los siguientes datos:
- Escuela: ${esc.nombre || "Escuela Secundaria"} (CCT: ${esc.cct || "26DES0010E"})
- Docente: ${esc.docente || "Docente"}
- Localidad / Municipio: ${esc.municipio || "Guaymas, Sonora"}
- Fase y Grado: ${esc.fase || "Fase 6"} · ${esc.grado || "2° de Secundaria"} (Grupos: ${esc.grupos || "A, B"}, Turno: ${esc.turno || "Vespertino"})
- Campo Formativo: ${esc.campoFormativo || "Saberes y Pensamiento Científico"}
- Materia / Disciplina: ${esc.asignatura || "Matemáticas"}
- Diagnóstico actual: ${diagActual.comunidad || ""}
- Petición del docente: ${promptExtra || "Enriquecer la vinculación de la asignatura con la comunidad."}
`.trim();

        const schema = {
          type: "OBJECT",
          properties: {
            comunidad: { type: "STRING" },
            areasPrioritarias: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  titulo: { type: "STRING" },
                  descripcion: { type: "STRING" }
                },
                required: ["titulo", "descripcion"]
              }
            }
          },
          required: ["comunidad", "areasPrioritarias"]
        };

        const data = await this.callGeminiDirect(
          prompt,
          "Eres un asesor técnico pedagógico experto en el Programa Analítico de la NEM. Responde en español formal en formato JSON.",
          schema
        );
        if (data && data.comunidad) return data;
      } catch (err) {
        console.warn("[AIGenerator]: Direct Gemini error, usando generador local:", err.message);
      }
    } else if (this.isLocalServerEnvironment()) {
      // 2. Servidor local Express
      try {
        const response = await fetch("/api/generate-diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ escuela: esc, diagnosticoActual: diagActual, promptExtra })
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.diagnostico) return data.diagnostico;
        }
      } catch (e) {
        console.warn("[AIGenerator]: Local server error, usando generador local.");
      }
    }

    // 3. Generador pedagógico situado local (cero errores en GitHub Pages)
    return {
      comunidad: `La escuela ${esc.nombre || "Secundaria"} (CCT ${esc.cct || "26DES0010E"}), ubicada en ${esc.municipio || "la localidad"}, atiende a los grupos ${esc.grupos || "escolares"} del turno ${esc.turno || "Matutino"} en ${esc.grado || "Secundaria"} (${esc.fase || "Fase 6"}). El entorno socioeconómico y productivo de la comunidad brinda oportunidades estratégicas para vincular los contenidos de ${esc.asignatura || "la materia"} (${esc.campoFormativo || "Campo Formativo"}) con problemáticas reales del alumnado, promoviendo la inclusión, la vida saludable y el pensamiento crítico.`,
      areasPrioritarias: [
        {
          titulo: `1. Comprensión y Aplicación Práctica en ${esc.asignatura || "la Asignatura"}`,
          descripcion: `Fortalecer el dominio de los Procesos de Desarrollo de Aprendizaje (PDA) correspondientes a ${esc.grado || "este grado"} mediante situaciones didácticas contextualizadas.`
        },
        {
          titulo: "2. Pensamiento Crítico, Argumentación y Trabajo Colaborativo",
          descripcion: "Fomentar el análisis colaborativo, la interpretación de evidencias y la resolución de situaciones desafiantes en el aula."
        },
        {
          titulo: "3. Vinculación Comunitaria y Evaluación Formativa Continua",
          descripcion: `Articular los proyectos escolares con las necesidades prioritarias detectadas en ${esc.municipio || "el entorno escolar"} y brindar retroalimentación constante.`
        }
      ]
    };
  },

  // --------------------------------------------------------------------------
  // ETAPA 2B: Generar Bloques del Programa Analítico desde Sintético + Diagnóstico
  // --------------------------------------------------------------------------
  async generateAnaliticoBloques(escuela, diagnostico, contenidosSinteticos, promptExtra = "") {
    const esc = escuela || {};
    const diag = diagnostico || {};
    const activos = (contenidosSinteticos || []).filter((c) => c.seleccionado !== false);

    // 1. Directo con Gemini si hay clave configurada
    if (this.hasGeminiApiKey()) {
      try {
        const prompt = `
Contextualiza y dosifica los Contenidos y PDAs del Programa Sintético seleccionados para el Segundo Plano (Programa Analítico NEM):
- Escuela: ${esc.nombre || "Escuela Secundaria"} (${esc.cct || ""}) en ${esc.municipio || "México"}
- Materia y Grado: ${esc.asignatura || "Matemáticas"} (${esc.grado || "2° de Secundaria"}, ${esc.fase || "Fase 6"})
- Diagnóstico (Primer Plano): ${diag.comunidad || ""}
- Indicaciones: ${promptExtra || "Contextualizar a la comunidad y distribuir en 3 trimestres."}
Contenidos Sintéticos:
${JSON.stringify(activos, null, 2)}
`.trim();

        const schema = {
          type: "OBJECT",
          properties: {
            bloques: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  trimestre: { type: "INTEGER" },
                  semanas: { type: "STRING" },
                  numSemanas: { type: "INTEGER" },
                  numSesiones: { type: "INTEGER" },
                  contenidoSintetico: { type: "STRING" },
                  contenidoContextualizado: { type: "STRING" },
                  pda: { type: "STRING" },
                  justificacion: { type: "STRING" },
                  ejesArticuladores: { type: "STRING" }
                },
                required: ["trimestre", "semanas", "contenidoSintetico", "contenidoContextualizado", "pda", "ejesArticuladores"]
              }
            }
          },
          required: ["bloques"]
        };

        const resData = await this.callGeminiDirect(
          prompt,
          "Eres un experto curricular de la NEM. Devuelve JSON con los bloques contextualizados.",
          schema
        );
        if (Array.isArray(resData?.bloques) && resData.bloques.length > 0) {
          return this.normalizeBloquesAnalitico(resData.bloques, esc);
        }
      } catch (err) {
        console.warn("[AIGenerator]: Gemini Analítico falló, usando normalizador local:", err.message);
      }
    } else if (this.isLocalServerEnvironment()) {
      // 2. Servidor local si está en localhost
      try {
        const response = await fetch("/api/generate-analitico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            escuela: esc,
            diagnostico: diag,
            contenidosSinteticos: activos,
            promptExtra
          })
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data?.bloques) && data.bloques.length > 0) {
            return this.normalizeBloquesAnalitico(data.bloques, esc);
          }
        }
      } catch (e) {
        console.warn("[AIGenerator]: Local server error en analítico.");
      }
    }

    // 3. Generación contextualizada local instantánea
    let currentWeek = 1;
    const raw = activos.map((c, idx) => {
      const numSem = Number(c.semanasSugeridas) || 2;
      const semStr =
        numSem === 1
          ? `Semana ${currentWeek}`
          : `Semanas ${currentWeek} y ${currentWeek + numSem - 1}`;
      currentWeek += numSem;
      return {
        trimestre: Number(c.trimestreSugerido) || ((idx % 3) + 1),
        semanas: semStr,
        numSemanas: numSem,
        numSesiones: numSem * 5,
        contenidoSintetico: c.contenido,
        contenidoContextualizado: `${c.contenido} (Contextualizado en ${esc.municipio || "la comunidad escolar"} para ${esc.asignatura || "la materia"})`,
        pda: c.pda,
        justificacion: `Se contextualiza para responder a las necesidades detectadas en el diagnóstico socioeducativo de ${esc.nombre || "la escuela"} (${esc.grupos || "los grupos"}).`,
        ejesArticuladores: c.ejesSugeridos || "Pensamiento crítico e Inclusión"
      };
    });
    return this.normalizeBloquesAnalitico(raw, esc);
  },

  normalizeBloquesAnalitico(rawBloques, escuela) {
    const defaultDiag = this.getDefaultDiagramForSubject(escuela?.asignatura);
    return rawBloques.map((b, idx) => {
      const numSem = Math.max(1, Number(b.numSemanas) || 2);
      const numSes = Number(b.numSesiones) || numSem * 5;
      return {
        id: `B${String(idx + 1).padStart(2, "0")}`,
        trimestre: Number(b.trimestre) || ((idx % 3) + 1),
        semanas: b.semanas || `Semanas ${idx * 2 + 1} y ${idx * 2 + 2}`,
        numSemanas: numSem,
        numSesiones: numSes,
        periodoSugerido: `Trimestre ${Number(b.trimestre) || ((idx % 3) + 1)} · Ciclo ${escuela?.cicloEscolar || "2025-2026"}`,
        contenidoSintetico: b.contenidoSintetico || "Contenido Curricular",
        contenidoContextualizado: b.contenidoContextualizado || b.contenidoSintetico,
        pda: b.pda || "Proceso de desarrollo de aprendizaje.",
        justificacion: b.justificacion || "Contextualización pedagógica basada en el diagnóstico escolar.",
        ejesArticuladores: b.ejesArticuladores || "Pensamiento crítico",
        diagramType: b.diagramType || defaultDiag
      };
    });
  },

  getDefaultDiagramForSubject(asignatura = "") {
    const lower = String(asignatura).toLowerCase();
    if (lower.includes("matem")) return "algebra_rect";
    if (lower.includes("historia")) return "timeline";
    if (lower.includes("ciencias") || lower.includes("biolog") || lower.includes("físic") || lower.includes("fisic") || lower.includes("químic") || lower.includes("quimic")) {
      return "scientific_method";
    }
    if (lower.includes("geograf") || lower.includes("cívica") || lower.includes("civica") || lower.includes("tecnolog")) {
      return "cause_effect";
    }
    if (lower.includes("inglés") || lower.includes("ingles")) return "comparative_table";
    return "concept_map";
  },

  // --------------------------------------------------------------------------
  // ETAPA 3: Proponer Bloques de Codiseño Curricular (Tercer Plano)
  // --------------------------------------------------------------------------
  async generateCodisenoBloques(escuela, diagnostico, existingBloquesCount = 15, promptExtra = "") {
    const esc = escuela || {};
    const diag = diagnostico || {};
    const defaultDiag = this.getDefaultDiagramForSubject(esc.asignatura);

    // 1. Directo con Gemini API si hay clave
    if (this.hasGeminiApiKey()) {
      try {
        const prompt = `
Propón 1 o 2 bloques de Codiseño Curricular (Tercer Plano NEM) para atender problemáticas específicas de la comunidad o la escuela:
- Escuela: ${esc.nombre || "Secundaria"} (${esc.municipio || "Comunidad"})
- Asignatura: ${esc.asignatura || "Matemáticas"} (${esc.grado || "2° de Secundaria"})
- Diagnóstico: ${diag.comunidad || ""}
- Énfasis docente: ${promptExtra || "Cuidado del agua, saberes comunitarios y reforzamiento académico."}
`.trim();

        const schema = {
          type: "OBJECT",
          properties: {
            bloquesCodiseno: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  semanas: { type: "STRING" },
                  numSemanas: { type: "INTEGER" },
                  numSesiones: { type: "INTEGER" },
                  contenidoSintetico: { type: "STRING" },
                  contenidoContextualizado: { type: "STRING" },
                  pda: { type: "STRING" },
                  justificacion: { type: "STRING" },
                  ejesArticuladores: { type: "STRING" }
                },
                required: ["contenidoSintetico", "contenidoContextualizado", "pda", "justificacion", "ejesArticuladores"]
              }
            }
          },
          required: ["bloquesCodiseno"]
        };

        const resData = await this.callGeminiDirect(prompt, "Experto en Codiseño Curricular NEM.", schema);
        if (Array.isArray(resData?.bloquesCodiseno) && resData.bloquesCodiseno.length > 0) {
          return resData.bloquesCodiseno.map((b, idx) => ({
            id: `B${String(existingBloquesCount + idx + 1).padStart(2, "0")}`,
            trimestre: 4,
            semanas: b.semanas || `Codiseño ${idx + 1} (1 Semana)`,
            numSemanas: Number(b.numSemanas) || 1,
            numSesiones: Number(b.numSesiones) || 5,
            periodoSugerido: "Transversal / Reforzamiento Anual",
            contenidoSintetico: b.contenidoSintetico || "Contenido Regional de Codiseño",
            contenidoContextualizado: b.contenidoContextualizado || b.contenidoSintetico,
            pda: b.pda,
            justificacion: b.justificacion,
            ejesArticuladores: b.ejesArticuladores || "Pensamiento crítico",
            diagramType: defaultDiag
          }));
        }
      } catch (err) {
        console.warn("[AIGenerator]: Gemini Codiseño falló, usando generador local:", err.message);
      }
    } else if (this.isLocalServerEnvironment()) {
      // 2. Servidor local Express
      try {
        const response = await fetch("/api/generate-codiseno", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ escuela: esc, diagnostico: diag, promptExtra })
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data?.bloquesCodiseno) && data.bloquesCodiseno.length > 0) {
            return data.bloquesCodiseno.map((b, idx) => ({
              id: `B${String(existingBloquesCount + idx + 1).padStart(2, "0")}`,
              trimestre: 4,
              semanas: b.semanas || `Codiseño ${idx + 1} (1 Semana)`,
              numSemanas: Number(b.numSemanas) || 1,
              numSesiones: Number(b.numSesiones) || 5,
              periodoSugerido: "Transversal / Reforzamiento Anual",
              contenidoSintetico: b.contenidoSintetico || "Contenido Regional de Codiseño",
              contenidoContextualizado: b.contenidoContextualizado || b.contenidoSintetico,
              pda: b.pda || "Desarrolla saberes comunitarios aplicados a problemáticas reales de su localidad.",
              justificacion: b.justificacion || "Incorporado por el colectivo docente para atender necesidades específicas de la escuela.",
              ejesArticuladores: b.ejesArticuladores || "Pensamiento crítico e Interculturalidad crítica",
              diagramType: defaultDiag
            }));
          }
        }
      } catch (e) {
        console.warn("[AIGenerator]: Local server error en codiseño.");
      }
    }

    // 3. Generador de codiseño local situado
    return [
      {
        id: `B${String(existingBloquesCount + 1).padStart(2, "0")}`,
        trimestre: 4,
        semanas: `Codiseño (1 Semana)`,
        numSemanas: 1,
        numSesiones: 5,
        periodoSugerido: "Transversal / Reforzamiento Anual",
        contenidoSintetico: `Proyecto de Codiseño Local en ${esc.asignatura || "la materia"}: ${promptExtra || "Saberes y Retos de " + (esc.municipio || "la Comunidad")}`,
        contenidoContextualizado: `Aplicación práctica de ${esc.asignatura || "la materia"} para atender necesidades prioritarias de ${esc.nombre || "la escuela"} en ${esc.municipio || "la región"}.`,
        pda: `Indaga, propone y aplica soluciones desde ${esc.asignatura || "la materia"} (${esc.grado || "Secundaria"}) ante problemáticas cotidianas de su entorno escolar y comunitario.`,
        justificacion: `Definido en el Tercer Plano (Codiseño) a partir de la lectura de la realidad de los grupos ${esc.grupos || "escolares"}.`,
        ejesArticuladores: "Pensamiento crítico y Vida saludable",
        diagramType: defaultDiag
      }
    ];
  },

  // --------------------------------------------------------------------------
  // ETAPA 4: Generar Plan de Clase Completo de un Bloque desde Analítico/Codiseño
  // --------------------------------------------------------------------------
  async generatePlanForBloque(escuela, diagnostico, bloque, promptExtra = "") {
    const esc = escuela || {};
    const diag = diagnostico || {};

    // 1. Directo con Gemini API si hay clave
    if (this.hasGeminiApiKey()) {
      try {
        const prompt = `
Genera un Plan de Clase completo (con sus sesiones progresivas y hojas de actividad) para el siguiente bloque curricular NEM:
- Escuela: ${esc.nombre || "Secundaria"} (${esc.municipio || ""})
- Materia / Grado: ${esc.asignatura || "Matemáticas"} (${esc.grado || "2° de Secundaria"})
- Bloque: ${bloque.id} (${bloque.semanas})
- Contenido Sintético: ${bloque.contenidoSintetico}
- Contenido Contextualizado: ${bloque.contenidoContextualizado}
- PDA: ${bloque.pda}
- Ejes Articuladores: ${bloque.ejesArticuladores}
- Número de sesiones a generar: ${bloque.numSesiones || 5}
- Petición del docente: ${promptExtra || "Secuencia didáctica activa con Inicio, Desarrollo, Cierre y Hojas de Actividad."}
`.trim();

        const schema = {
          type: "OBJECT",
          properties: {
            plan: {
              type: "OBJECT",
              properties: {
                sesiones: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      numero: { type: "INTEGER" },
                      semana: { type: "STRING" },
                      titulo: { type: "STRING" },
                      inicio: { type: "STRING" },
                      desarrollo: { type: "STRING" },
                      cierre: { type: "STRING" },
                      hojaActividad: {
                        type: "OBJECT",
                        properties: {
                          tituloHoja: { type: "STRING" },
                          instrucciones: { type: "STRING" },
                          notaTeorica: { type: "STRING" },
                          ejercicios: {
                            type: "ARRAY",
                            items: {
                              type: "OBJECT",
                              properties: {
                                enunciado: { type: "STRING" },
                                respuesta: { type: "STRING" }
                              },
                              required: ["enunciado", "respuesta"]
                            }
                          },
                          boletoSalida: { type: "STRING" }
                        },
                        required: ["tituloHoja", "instrucciones", "ejercicios", "boletoSalida"]
                      }
                    },
                    required: ["numero", "titulo", "inicio", "desarrollo", "cierre", "hojaActividad"]
                  }
                }
              },
              required: ["sesiones"]
            }
          },
          required: ["plan"]
        };

        const resData = await this.callGeminiDirect(prompt, "Planificador docente experto en la Nueva Escuela Mexicana.", schema);
        if (resData?.plan && Array.isArray(resData.plan.sesiones) && resData.plan.sesiones.length > 0) {
          const diagType = bloque.diagramType || this.getDefaultDiagramForSubject(esc.asignatura);
          resData.plan.sesiones.forEach((s) => {
            if (s.hojaActividad && !s.hojaActividad.diagramType) {
              s.hojaActividad.diagramType = diagType;
            }
          });
          return {
            periodo: bloque.periodoSugerido || `Ciclo ${esc.cicloEscolar || "2025-2026"}`,
            cicloEscolar: esc.cicloEscolar || "2025-2026",
            tiempoRealizacion: `${bloque.numSemanas || 1} semana(s) (${resData.plan.sesiones.length} sesiones)`,
            ...resData.plan
          };
        }
      } catch (err) {
        console.warn("[AIGenerator]: Gemini Plan falló, usando generador local:", err.message);
      }
    } else if (this.isLocalServerEnvironment()) {
      // 2. Servidor local Express
      try {
        const response = await fetch("/api/generate-plan-bloque", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ escuela: esc, diagnostico: diag, bloque, promptExtra })
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.plan && Array.isArray(data.plan.sesiones)) {
            return data.plan;
          }
        }
      } catch (e) {
        console.warn("[AIGenerator]: Local server error en plan de bloque.");
      }
    }

    // 3. Generador local completo de 5 sesiones con hojas de actividad
    return this.generateLocalPlanForBloque(esc, bloque, promptExtra);
  },

  generateLocalPlanForBloque(escuela, bloque, promptExtra = "") {
    const numSes = Math.max(1, Number(bloque.numSesiones) || 5);
    const diag = bloque.diagramType || this.getDefaultDiagramForSubject(escuela?.asignatura);
    const sesiones = [];
    const fasesProgresivas = [
      "Exploración de saberes previos y lectura de la situación comunitaria",
      "Indagación guiada y construcción conceptual del contenido",
      "Práctica colaborativa y resolución de casos contextualizados",
      "Aplicación en reto real de la escuela y localidad",
      "Socialización de hallazgos y evaluación formativa de la semana"
    ];

    for (let i = 1; i <= numSes; i++) {
      const faseTexto = fasesProgresivas[(i - 1) % fasesProgresivas.length];
      sesiones.push({
        numero: i,
        semana: bloque.semanas,
        titulo: `Sesión ${i}: ${faseTexto} — ${bloque.contenidoContextualizado}`,
        inicio: `Iniciaré la sesión (10 min) presentando a los estudiantes de ${escuela.grupos} un planteamiento situado en ${escuela.municipio || "nuestra comunidad"} relacionado con "${bloque.contenidoContextualizado}". Recuperaré conocimientos previos mediante lluvia de ideas en el pizarrón.`,
        desarrollo: `Durante el desarrollo (30 min), organizaré actividades de aprendizaje activo para trabajar el PDA: "${bloque.pda}".\n• Enfoque de la sesión: ${faseTexto}.${promptExtra ? `\n• Énfasis docente: ${promptExtra}` : ""}\n• Los alumnos realizarán el análisis, registro y resolución en su Hoja de Actividad mientras acompaño y retroalimento a cada equipo.`,
        cierre: `En el cierre (10 min), coordinaré la puesta en común de conclusiones y aplicaré el Boleto de Salida para valorar formativamente el avance individual.`,
        hojaActividad: {
          tituloHoja: `${bloque.contenidoContextualizado} · Sesión ${i}`,
          instrucciones: `Realiza las siguientes actividades de ${escuela.asignatura} (${escuela.grado}) aplicando lo trabajado en la sesión sobre "${faseTexto}".`,
          notaTeorica: `Contenido: ${bloque.contenidoSintetico} | PDA: ${bloque.pda}`,
          diagramType: diag,
          ejercicios: [
            {
              enunciado: `1. Comprensión y Análisis Contextualizado: Con base en el tema "${bloque.contenidoContextualizado}" en ${escuela.municipio || "nuestra comunidad"}, identifica los elementos principales y explícalos con tus propias palabras o mediante el esquema visual.`,
              respuesta: `El alumno identifica y relaciona correctamente los conceptos clave del contenido "${bloque.contenidoSintetico}" con el contexto local.`
            },
            {
              enunciado: `2. Desarrollo y Aplicación Práctica: Resuelve o desarrolla el caso práctico correspondiente a la fase "${faseTexto}" para demostrar el logro del PDA: "${bloque.pda}".`,
              respuesta: `Procedimiento completo, ordenado y fundamentado conforme a los criterios vistos en clase.`
            },
            {
              enunciado: `3. Reflexión y Propuesta Comunitaria: ¿Cómo podemos aplicar lo aprendido hoy en ${escuela.nombre} o en nuestro entorno familiar?`,
              respuesta: `Propuesta pertinente y argumentada vinculada con los ejes articuladores (${bloque.ejesArticuladores}).`
            }
          ],
          boletoSalida: `Sintetiza en dos renglones el aprendizaje más importante que lograste hoy en la Sesión ${i}.`
        }
      });
    }

    return {
      periodo: bloque.periodoSugerido || `Ciclo Escolar ${escuela.cicloEscolar || "2025-2026"}`,
      cicloEscolar: escuela.cicloEscolar || "2025-2026",
      tiempoRealizacion: `${bloque.numSemanas || 1} semana(s) (${numSes} sesiones)`,
      sesiones,
      evaluacionFormativa: [
        `Comprende y explica los conceptos centrales de: ${bloque.contenidoSintetico}.`,
        `Aplica el PDA (${bloque.pda}) en actividades contextualizadas en ${escuela.municipio || "su comunidad"}.`,
        `Participa colaborativamente y completa con rigor las Hojas de Actividad y Boletos de Salida.`
      ]
    };
  },

  // --------------------------------------------------------------------------
  // ETAPA 5: Sincronizar Hojas de Actividad tomando el Plan de Clase Editado
  // --------------------------------------------------------------------------
  async syncHojasFromPlan(escuela, bloque, sesionesPlan, promptExtra = "") {
    const esc = escuela || {};

    if (this.isLocalServerEnvironment() && !this.hasGeminiApiKey()) {
      try {
        const response = await fetch("/api/sync-hojas-from-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ escuela: esc, bloque, sesionesPlan, promptExtra })
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data?.hojasPorSesion) && data.hojasPorSesion.length > 0) {
            return data.hojasPorSesion;
          }
        }
      } catch (e) {
        console.warn("[AIGenerator]: Local server error en sync hojas.");
      }
    }

    const diag = bloque.diagramType || this.getDefaultDiagramForSubject(esc.asignatura);
    return (sesionesPlan || []).map((s) => ({
      numero: s.numero,
      hojaActividad: {
        tituloHoja: `Hoja de Trabajo Sincronizada · ${s.titulo || "Sesión " + s.numero}`,
        instrucciones: `Con base en las actividades desarrolladas en la sesión ("${s.titulo}"), resuelve cada apartado de manera ordenada.${promptExtra ? " " + promptExtra : ""}`,
        notaTeorica: `Síntesis de la sesión: ${(s.desarrollo || bloque.pda).slice(0, 220)}`,
        diagramType: s.hojaActividad?.diagramType || diag,
        ejercicios: [
          {
            enunciado: `1. Actividad de Inicio y Exploración: Retomando el planteamiento inicial de la clase (${(s.inicio || "").slice(0, 140)}...), desarrolla tu planteamiento o respuesta inicial.`,
            respuesta: `Análisis coherente con la actividad de inicio planteada en el Plan de Clase.`
          },
          {
            enunciado: `2. Actividad Central de Desarrollo: Realiza la actividad principal descrita en la sesión (${(s.desarrollo || "").slice(0, 160)}...). Registra aquí tu procedimiento, análisis o producción.`,
            respuesta: `Resolución paso a paso acorde al desarrollo de la sesión "${s.titulo}".`
          },
          {
            enunciado: `3. Ejercicio de Consolidación del PDA (${bloque.pda}): Aplica lo aprendido a un caso concreto de ${esc.municipio || "tu comunidad"}.`,
            respuesta: `Aplicación correcta y justificada del PDA de la secuencia.`
          }
        ],
        boletoSalida: `Evaluación de Cierre: ${(s.cierre || "Explica qué aprendiste hoy y cómo lo resolviste.").slice(0, 160)}`
      }
    }));
  },

  // --------------------------------------------------------------------------
  // Generador de una sesión individual (compatible con todas las materias)
  // --------------------------------------------------------------------------
  generateContextualSession(bloqueInfo, contextoKey, customPrompt = "", nextSessionNumber = 6, escuela = {}) {
    const ctx = this.contextosGuaymas[contextoKey] || this.contextosGuaymas.pesca;
    const tema = customPrompt.trim() || bloqueInfo.contenidoContextualizado;
    const diag = bloqueInfo.diagramType || this.getDefaultDiagramForSubject(escuela?.asignatura);
    const materia = escuela?.asignatura || "Matemáticas";

    return {
      numero: nextSessionNumber,
      semana: bloqueInfo.semanas,
      titulo: `Taller Contextualizado (${ctx.nombre}): ${bloqueInfo.contenidoSintetico}`,
      inicio: `Comenzaré la sesión planteando una situación real vinculada con ${ctx.escenario}: "¿Cómo podemos aplicar el PDA '${bloqueInfo.pda}' en la asignatura de ${materia} para resolver un reto real de nuestra comunidad?". Anotaré las ideas previas de los alumnos en el pizarrón.`,
      desarrollo: `Organizaré al grupo en equipos colaborativos para trabajar la hoja de actividad centrada en: "${tema}".\n• Contexto aplicado: ${ctx.nombre}.\n• Los alumnos analizarán la información, desarrollarán las actividades paso a paso y contrastarán sus hallazgos entre pares mientras superviso y realizo preguntas guía.`,
      cierre: `Para cerrar, un equipo voluntario expondrá sus conclusiones en el pizarrón y aplicaremos el Boleto de Salida para verificar el logro individual del PDA.`,
      hojaActividad: {
        tituloHoja: `Actividad Contextualizada (${materia}): ${ctx.nombre}`,
        instrucciones: `Realiza las siguientes actividades ambientadas en ${ctx.escenario}, aplicando lo aprendido en "${bloqueInfo.contenidoSintetico}".`,
        notaTeorica: `PDA que se impulsa: ${bloqueInfo.pda}`,
        diagramType: diag,
        ejercicios: [
          {
            enunciado: `1. Situación Contextualizada en ${ctx.nombre}: En un proyecto sobre ${ctx.escenario} (${tema}), analiza los datos o elementos principales y represéntalos utilizando los conceptos de ${materia}.`,
            respuesta: `Identificación precisa de los elementos del contexto y aplicación directa de los conceptos del bloque "${bloqueInfo.contenidoSintetico}".`
          },
          {
            enunciado: `2. Resolución Aplicada: Desarrolla paso a paso la solución o propuesta vinculada con ${ctx.unidades} cumpliendo el PDA "${bloqueInfo.pda}".`,
            respuesta: `Procedimiento completo y fundamentado que resuelve la problemática planteada.`
          },
          {
            enunciado: `3. Reto de Pensamiento Crítico: ${customPrompt ? customPrompt : "Argumenta cómo comprobarías la validez de tu resultado o propuesta en una situación real de tu comunidad."}`,
            respuesta: `Argumentación reflexiva y verificación coherente con los criterios de evaluación formativa.`
          }
        ],
        boletoSalida: `Explica cómo se relaciona el tema "${bloqueInfo.contenidoSintetico}" con las actividades de ${ctx.escenario}.`
      }
    };
  },

  async generateWithServerAI(bloqueInfo, contextoKey, customPrompt, nextSessionNumber, escuela = {}) {
    const esc = escuela || {};
    const ctx = this.contextosGuaymas[contextoKey] || this.contextosGuaymas.pesca;

    // 1. Directo con Gemini API si hay clave
    if (this.hasGeminiApiKey()) {
      try {
        const prompt = `
Genera una sesión didáctica contextualizada (#${nextSessionNumber}) de 50 minutos para:
- Escuela: ${esc.nombre || "Secundaria"} (${esc.municipio || "Comunidad"})
- Materia: ${esc.asignatura || "Matemáticas"} (${esc.grado || "2° de Secundaria"})
- Bloque: ${bloqueInfo.contenidoSintetico}
- PDA: ${bloqueInfo.pda}
- Contexto aplicado: ${ctx.nombre} (${ctx.escenario})
- Enfoque especial docente: ${customPrompt || "Aprendizaje activo con Hoja de Trabajo."}
`.trim();

        const schema = {
          type: "OBJECT",
          properties: {
            session: {
              type: "OBJECT",
              properties: {
                numero: { type: "INTEGER" },
                semana: { type: "STRING" },
                titulo: { type: "STRING" },
                inicio: { type: "STRING" },
                desarrollo: { type: "STRING" },
                cierre: { type: "STRING" },
                hojaActividad: {
                  type: "OBJECT",
                  properties: {
                    tituloHoja: { type: "STRING" },
                    instrucciones: { type: "STRING" },
                    notaTeorica: { type: "STRING" },
                    ejercicios: {
                      type: "ARRAY",
                      items: {
                        type: "OBJECT",
                        properties: {
                          enunciado: { type: "STRING" },
                          respuesta: { type: "STRING" }
                        },
                        required: ["enunciado", "respuesta"]
                      }
                    },
                    boletoSalida: { type: "STRING" }
                  },
                  required: ["tituloHoja", "instrucciones", "ejercicios", "boletoSalida"]
                }
              },
              required: ["numero", "titulo", "inicio", "desarrollo", "cierre", "hojaActividad"]
            }
          },
          required: ["session"]
        };

        const resData = await this.callGeminiDirect(prompt, "Experto en diseño de sesiones NEM.", schema);
        if (resData?.session) {
          resData.session.numero = nextSessionNumber;
          resData.session.semana = bloqueInfo.semanas;
          if (resData.session.hojaActividad) {
            resData.session.hojaActividad.diagramType = bloqueInfo.diagramType || this.getDefaultDiagramForSubject(esc.asignatura);
          }
          return resData.session;
        }
      } catch (err) {
        console.warn("[AIGenerator]: Gemini Session falló, usando sesión contextual local:", err.message);
      }
    } else if (this.isLocalServerEnvironment()) {
      // 2. Servidor local si está en localhost
      try {
        const response = await fetch("/api/generate-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bloqueInfo,
            contexto: ctx,
            customPrompt,
            nextSessionNumber,
            escuela: esc
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.session) {
            return data.session;
          }
        }
      } catch (e) {
        console.warn("[AIGenerator]: Local server error en sesión.");
      }
    }

    // 3. Generador contextual local
    return this.generateContextualSession(bloqueInfo, contextoKey, customPrompt, nextSessionNumber, esc);
  },

  // ==========================================================================
  // CATÁLOGO OFICIAL DE LAS 4 METODOLOGÍAS SOCIOCRÍTICAS DE PROYECTOS (NEM)
  // ==========================================================================
  metodologiasNEM: {
    steam: {
      id: "steam",
      nombre: "Aprendizaje Basado en Indagación (STEAM como enfoque)",
      etiquetaCorta: "Indagación STEAM",
      campoSugerido: "Saberes y Pensamiento Científico",
      fasesOficiales: [
        {
          numero: 1,
          faseClave: "Fase 1 · Introducción al tema e identificación de la problemática",
          descripcion: "Uso de conocimientos previos sobre el tema a desarrollar e identificación de la problemática comunitaria o escolar."
        },
        {
          numero: 2,
          faseClave: "Fase 2 · Diseño de investigación y desarrollo de la indagación",
          descripcion: "Acuerdos sobre qué se va a hacer ante cada pregunta de indagación, exploración, experimentación o modelación."
        },
        {
          numero: 3,
          faseClave: "Fase 3 · Organizar y estructurar las respuestas a las preguntas de indagación",
          descripcion: "Análisis, organización, interpretación de datos, síntesis de ideas y clarificación de conceptos y explicaciones."
        },
        {
          numero: 4,
          faseClave: "Fase 4 · Presentación de los resultados de indagación y aplicación",
          descripcion: "Presentación de los resultados obtenidos y elaboración de propuestas de acción para resolver la problemática identificada."
        },
        {
          numero: 5,
          faseClave: "Fase 5 · Metacognición",
          descripcion: "Reflexión sobre todo lo realizado: los planes de trabajo, las actuaciones personales o grupales, los procedimientos e instrumentos y los logros."
        }
      ]
    },
    abpc: {
      id: "abpc",
      nombre: "Aprendizaje Basado en Proyectos Comunitarios (ABPC)",
      etiquetaCorta: "Proyectos Comunitarios (ABPC)",
      campoSugerido: "Lenguajes",
      fasesOficiales: [
        {
          numero: 1,
          faseClave: "Fase 1 · Planeación (Momentos 1 a 3: Identificación, Recuperación y Planificación)",
          descripcion: "Proponer planteamientos genuinos para introducir el diálogo, vincular conocimientos previos y negociar los pasos, producciones y tiempos del proyecto."
        },
        {
          numero: 2,
          faseClave: "Fase 2 · Acción (Momentos 4 a 7: Acercamiento, Comprensión y producción, Reconocimiento y Concreción)",
          descripcion: "Exploración del problema, experimentación y revisión de producciones, identificación de avances y desarrollo de la primera versión del producto."
        },
        {
          numero: 3,
          faseClave: "Fase 3 · Intervención (Momentos 8 a 11: Integración, Difusión, Consideraciones y Avances)",
          descripcion: "Exposición, explicación y difusión de las producciones a la comunidad, recepción de retroalimentación y toma de decisiones para futuros proyectos."
        }
      ]
    },
    abp: {
      id: "abp",
      nombre: "Aprendizaje Basado en Problemas (ABP)",
      etiquetaCorta: "Basado en Problemas (ABP)",
      campoSugerido: "Ética, Naturaleza y Sociedades",
      fasesOficiales: [
        {
          numero: 1,
          faseClave: "Momento 1 · Presentemos",
          descripcion: "Planteamiento de la reflexión inicial situada en una imagen, lectura breve o caso real del contexto escolar y comunitario."
        },
        {
          numero: 2,
          faseClave: "Momento 2 · Recolectemos",
          descripcion: "Exploración y recuperación de manera general de los saberes sociales y escolares previos respecto a la temática detectada."
        },
        {
          numero: 3,
          faseClave: "Momento 3 · Formulemos el problema",
          descripcion: "Determinación con claridad del problema sobre el cual se trabajará, así como las inquietudes y curiosidades de los alumnos."
        },
        {
          numero: 4,
          faseClave: "Momento 4 · Organicemos la experiencia",
          descripcion: "Planteamiento de una ruta de trabajo para el proceso de indagación contemplando objetivos, acuerdos, medios y recursos."
        },
        {
          numero: 5,
          faseClave: "Momento 5 · Vivamos la experiencia",
          descripcion: "Guiar a los alumnos a una indagación específica de corte documental o vivencial que los lleve a comprender e intervenir en el problema."
        },
        {
          numero: 6,
          faseClave: "Momento 6 · Resultados y análisis",
          descripcion: "Visualización de los avances o el fin del proyecto, divulgación de resultados e identificación de nuevos aprendizajes."
        }
      ]
    },
    as: {
      id: "as",
      nombre: "Aprendizaje Servicio (AS)",
      etiquetaCorta: "Aprendizaje Servicio (AS)",
      campoSugerido: "De lo Humano y lo Comunitario",
      fasesOficiales: [
        {
          numero: 1,
          faseClave: "Etapa 1 · Punto de partida",
          descripcion: "Nacimiento del proyecto desde el interés de los alumnos o una necesidad concreta de la comunidad escolar y familiar."
        },
        {
          numero: 2,
          faseClave: "Etapa 2 · Lo que sé y lo que quiero saber",
          descripcion: "Actividades para recabar información, identificar recursos y realizar un diagnóstico participativo de la realidad comunitaria."
        },
        {
          numero: 3,
          faseClave: "Etapa 3 · Organicemos las actividades",
          descripcion: "Articulación de la intencionalidad pedagógica con la intencionalidad del servicio: qué, por qué, cómo, cuándo y quiénes."
        },
        {
          numero: 4,
          faseClave: "Etapa 4 · Creatividad en marcha",
          descripcion: "Puesta en práctica de lo planificado, monitoreo de actividades, espacios y tiempos e interacción solidaria con la comunidad."
        },
        {
          numero: 5,
          faseClave: "Etapa 5 · Compartimos y evaluamos lo aprendido",
          descripcion: "Evaluación final de los resultados académicos y del cumplimiento del servicio a la comunidad, así como autoevaluación."
        }
      ]
    }
  },

  getSuggestedMetodologiaId(campoFormativo = "", asignatura = "") {
    const c = String(campoFormativo).toLowerCase();
    const a = String(asignatura).toLowerCase();
    if (c.includes("lenguaje") || a.includes("español") || a.includes("inglés") || a.includes("ingles") || a.includes("artes")) {
      return "abpc";
    }
    if (c.includes("ética") || c.includes("etica") || a.includes("historia") || a.includes("geograf") || a.includes("cívica") || a.includes("civica")) {
      return "abp";
    }
    if (c.includes("humano") || a.includes("tecnolog") || a.includes("física") && a.includes("educación") || a.includes("tutor")) {
      return "as";
    }
    return "steam";
  },

  // --------------------------------------------------------------------------
  // ETAPA 4 (MODALIDAD PROYECTO NEM): Generar Proyecto por Fases / Momentos
  // --------------------------------------------------------------------------
  async generateProyectoForBloque(escuela, diagnostico, bloque, metodologiaId, promptExtra = "") {
    const esc = escuela || {};
    const metId = metodologiaId || this.getSuggestedMetodologiaId(esc.campoFormativo, esc.asignatura);
    const metObj = this.metodologiasNEM[metId] || this.metodologiasNEM.steam;

    // 1. Directo con Gemini API si hay clave
    if (this.hasGeminiApiKey()) {
      try {
        const prompt = `
Genera un Proyecto Didáctico NEM completo organizado por sus fases/momentos oficiales:
- Escuela: ${esc.nombre || "Secundaria"} (${esc.municipio || ""})
- Asignatura: ${esc.asignatura || "Matemáticas"} (${esc.grado || "2° de Secundaria"})
- Metodología Sociocrítica Oficial: ${metObj.nombre} (${metObj.etiquetaCorta})
- Bloque curricular: ${bloque.contenidoContextualizado}
- PDA a lograr: ${bloque.pda}
- Diagnóstico: ${(diagnostico?.comunidad || "").slice(0, 300)}
- Indicaciones docente: ${promptExtra || "Diseñar cada fase con actividades del docente, actividades de alumnos, evidencia y hoja de trabajo."}
`.trim();

        const schema = {
          type: "OBJECT",
          properties: {
            proyecto: {
              type: "OBJECT",
              properties: {
                nombreProyecto: { type: "STRING" },
                problematica: { type: "STRING" },
                proposito: { type: "STRING" },
                productoFinal: { type: "STRING" },
                evaluacionFormativa: { type: "ARRAY", items: { type: "STRING" } },
                fases: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      faseClave: { type: "STRING" },
                      sesionesEstimadas: { type: "STRING" },
                      actividades: { type: "STRING" },
                      evidencia: { type: "STRING" },
                      recursos: { type: "STRING" }
                    },
                    required: ["faseClave", "actividades", "evidencia"]
                  }
                }
              },
              required: ["nombreProyecto", "problematica", "proposito", "productoFinal", "fases"]
            }
          },
          required: ["proyecto"]
        };

        const resData = await this.callGeminiDirect(prompt, "Especialista en proyectos sociocríticos de la NEM.", schema);
        if (resData?.proyecto && Array.isArray(resData.proyecto.fases) && resData.proyecto.fases.length > 0) {
          return {
            metodologiaId: metObj.id,
            metodologiaNombre: metObj.nombre,
            nombreProyecto: resData.proyecto.nombreProyecto,
            problematica: resData.proyecto.problematica,
            proposito: resData.proyecto.proposito,
            productoFinal: resData.proyecto.productoFinal,
            evaluacionFormativa: resData.proyecto.evaluacionFormativa || [],
            fases: resData.proyecto.fases.map((f, idx) => ({
              numero: idx + 1,
              faseClave: f.faseClave || metObj.fasesOficiales[idx]?.faseClave || `Fase ${idx + 1}`,
              sesionesEstimadas: f.sesionesEstimadas || "2 sesiones (100 min)",
              actividades: f.actividades || "",
              evidencia: f.evidencia || "",
              recursos: f.recursos || "Cuaderno, pizarrón y hojas de trabajo de la fase",
              hojaActividad: f.hojaActividad || this.buildDefaultPhaseWorksheet(esc, bloque, metObj, f, idx + 1)
            }))
          };
        }
      } catch (err) {
        console.warn("[AIGenerator]: Gemini Proyecto falló, usando generador local:", err.message);
      }
    } else if (this.isLocalServerEnvironment()) {
      // 2. Servidor local si está en localhost
      try {
        const response = await fetch("/api/generate-proyecto-bloque", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            escuela: esc,
            diagnostico,
            bloque,
            metodologia: metObj,
            promptExtra
          })
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.proyecto && Array.isArray(data.proyecto.fases) && data.proyecto.fases.length > 0) {
            return {
              metodologiaId: metObj.id,
              metodologiaNombre: metObj.nombre,
              nombreProyecto: data.proyecto.nombreProyecto,
              problematica: data.proyecto.problematica,
              proposito: data.proyecto.proposito,
              productoFinal: data.proyecto.productoFinal,
              evaluacionFormativa: data.proyecto.evaluacionFormativa || [],
              fases: data.proyecto.fases.map((f, idx) => ({
                numero: idx + 1,
                faseClave: f.faseClave || metObj.fasesOficiales[idx]?.faseClave || `Fase ${idx + 1}`,
                sesionesEstimadas: f.sesionesEstimadas || "2 sesiones (100 min)",
                actividades: f.actividades || "",
                evidencia: f.evidencia || "",
                recursos: f.recursos || "Cuaderno, pizarrón y hojas de trabajo de la fase",
                hojaActividad: f.hojaActividad || this.buildDefaultPhaseWorksheet(esc, bloque, metObj, f, idx + 1)
              }))
            };
          }
        }
      } catch (e) {
        console.warn("[AIGenerator]: Local server error en proyecto.");
      }
    }

    // 3. Generador de proyecto local
    return this.generateLocalProyectoForBloque(esc, bloque, metObj.id, promptExtra);
  },

  buildDefaultPhaseWorksheet(escuela, bloque, metObj, faseInfo, numeroFase) {
    const diag = bloque.diagramType || this.getDefaultDiagramForSubject(escuela?.asignatura);
    const faseTitulo = faseInfo.faseClave || `Fase ${numeroFase}`;
    return {
      tituloHoja: `${faseTitulo} · ${bloque.contenidoContextualizado}`,
      instrucciones: `Desarrolla en equipo e individualmente las actividades correspondientes a "${faseTitulo}" dentro de la metodología ${metObj.etiquetaCorta} para ${escuela.asignatura} (${escuela.grado}).`,
      notaTeorica: `Metodología NEM: ${metObj.nombre} | Contenido: ${bloque.contenidoSintetico} | PDA: ${bloque.pda}`,
      diagramType: diag,
      ejercicios: [
        {
          enunciado: `1. Indagación y Análisis de la Fase (${faseTitulo}): Con base en el propósito de esta fase (${faseInfo.descripcion || ""}), registra los datos, ideas clave o planteamientos de nuestro proyecto en ${escuela.municipio || "la comunidad"}.`,
          respuesta: `Registro claro y fundamentado de los hallazgos iniciales correspondientes a "${faseTitulo}" vinculados al contenido "${bloque.contenidoSintetico}".`
        },
        {
          enunciado: `2. Desarrollo Práctico del PDA en el Proyecto: Realiza el procedimiento, análisis o construcción correspondiente a "${bloque.pda}" para avanzar hacia el entregable parcial de esta fase.`,
          respuesta: `Desarrollo completo y justificado aplicando los conceptos de ${escuela.asignatura} al proyecto.`
        },
        {
          enunciado: `3. Construcción de Evidencia de la Fase: Elabora o sintetiza aquí el avance parcial de tu equipo para integrarlo al producto final del proyecto escolar.`,
          respuesta: `Evidencia parcial coherente con los criterios de evaluación formativa y los ejes articuladores (${bloque.ejesArticuladores}).`
        }
      ],
      boletoSalida: `Autoevaluación de la Fase ${numeroFase}: ¿Qué aporté hoy a mi equipo en "${faseTitulo}" y qué necesitamos para la siguiente fase del proyecto?`
    };
  },

  generateLocalProyectoForBloque(escuela, bloque, metodologiaId, promptExtra = "") {
    const metId = metodologiaId || this.getSuggestedMetodologiaId(escuela?.campoFormativo, escuela?.asignatura);
    const metObj = this.metodologiasNEM[metId] || this.metodologiasNEM.steam;
    const totalSesiones = Math.max(3, Number(bloque.numSesiones) || 5);
    const numFases = metObj.fasesOficiales.length;
    const sesPorFase = Math.max(1, Math.round(totalSesiones / numFases));

    const fases = metObj.fasesOficiales.map((f, idx) => {
      const sesCount = idx === numFases - 1 ? Math.max(1, totalSesiones - sesPorFase * (numFases - 1)) : sesPorFase;
      return {
        numero: idx + 1,
        faseClave: f.faseClave,
        sesionesEstimadas: `${sesCount} sesión(es) (${sesCount * 50} min)`,
        actividades: `• Propósito de la fase: ${f.descripcion}\n• Intervención Docente: Guiaré a los grupos ${escuela.grupos || "escolares"} en la contextualización de "${bloque.contenidoContextualizado}" dentro de ${escuela.municipio || "nuestra comunidad"}.${promptExtra ? `\n• Énfasis especial: ${promptExtra}.` : ""}\n• Actividades del Alumnado: En equipos colaborativos, los estudiantes desarrollarán la indagación, análisis y resolución del PDA ("${bloque.pda}") empleando la Hoja de Actividad de la Fase ${idx + 1}.`,
        evidencia: `Avance parcial #${idx + 1} del proyecto y Hoja de Actividad de "${f.faseClave}" resuelta.`,
        recursos: `Pizarrón, cuaderno de ${escuela.asignatura}, materiales del entorno y Hoja de Trabajo de la Fase ${idx + 1}.`,
        hojaActividad: this.buildDefaultPhaseWorksheet(escuela, bloque, metObj, f, idx + 1)
      };
    });

    return {
      metodologiaId: metObj.id,
      metodologiaNombre: metObj.nombre,
      nombreProyecto: `Proyecto ${metObj.etiquetaCorta}: ${bloque.contenidoContextualizado}`,
      problematica: `En el entorno de ${escuela.nombre} (${escuela.municipio || "la comunidad"}), se requiere analizar y proponer soluciones desde ${escuela.asignatura} (${escuela.grado}) ante situaciones reales vinculadas con "${bloque.contenidoSintetico}".`,
      proposito: `Que las y los estudiantes de ${escuela.grado} desarrollen el PDA "${bloque.pda}" mediante las fases de la metodología ${metObj.nombre}, articulando los ejes de ${bloque.ejesArticuladores}.`,
      productoFinal: `Exposición y entrega del proyecto aplicado sobre "${bloque.contenidoContextualizado}" acompañado del portafolio con las ${numFases} Hojas de Actividad por fase.`,
      evaluacionFormativa: [
        `Participa activamente en cada una de las ${numFases} fases/momentos de la metodología ${metObj.etiquetaCorta}.`,
        `Demuestra el logro del PDA (${bloque.pda}) en las evidencias parciales y el producto final del proyecto.`,
        `Vincula los saberes de ${escuela.asignatura} con la problemática comunitaria de ${escuela.municipio || "su localidad"}.`
      ],
      fases
    };
  },

  // --------------------------------------------------------------------------
  // ETAPA 5 (MODALIDAD PROYECTO NEM): Sincronizar Hojas por Fase/Momento
  // --------------------------------------------------------------------------
  async syncHojasFromProyecto(escuela, bloque, proyecto, fasesTarget, promptExtra = "") {
    const esc = escuela || {};

    if (this.isLocalServerEnvironment() && !this.hasGeminiApiKey()) {
      try {
        const response = await fetch("/api/sync-hojas-from-proyecto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ escuela: esc, bloque, proyecto, fasesTarget, promptExtra })
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data?.hojasPorFase) && data.hojasPorFase.length > 0) {
            return data.hojasPorFase;
          }
        }
      } catch (e) {
        console.warn("[AIGenerator]: Local server error en sync hojas proyecto.");
      }
    }

    const diag = bloque.diagramType || this.getDefaultDiagramForSubject(esc.asignatura);
    return (fasesTarget || []).map((f) => ({
      numero: f.numero,
      hojaActividad: {
        tituloHoja: `Hoja del Proyecto · ${f.faseClave}`,
        instrucciones: `Con base en las actividades del proyecto "${proyecto.nombreProyecto}" en "${f.faseClave}", realiza cada actividad para construir la evidencia: ${f.evidencia || "avance de la fase"}.`,
        notaTeorica: `Síntesis de la Fase: ${(f.actividades || bloque.pda).slice(0, 220)}`,
        diagramType: f.hojaActividad?.diagramType || diag,
        ejercicios: [
          {
            enunciado: `1. Planteamiento e Indagación (${f.faseClave}): Retomando la problemática del proyecto ("${(proyecto.problematica || "").slice(0, 140)}"), desarrolla el análisis inicial de esta fase.`,
            respuesta: `Análisis pertinente y alineado con "${f.faseClave}" del proyecto.`
          },
          {
            enunciado: `2. Actividad Central de la Fase: Desarrolla paso a paso las actividades acordadas (${(f.actividades || "").slice(0, 160)}...) aplicando el PDA "${bloque.pda}".`,
            respuesta: `Procedimiento y desarrollo acordes a las actividades de la fase.`
          },
          {
            enunciado: `3. Construcción de la Evidencia Parcial (${f.evidencia || "Entregable de la fase"}): Registra aquí la conclusión o propuesta que se integrará al producto final (${proyecto.productoFinal || ""}).`,
            respuesta: `Evidencia parcial completa y fundamentada.`
          }
        ],
        boletoSalida: `Reflexión de "${f.faseClave}": ¿Qué logramos resolver hoy para avanzar hacia nuestro producto final (${proyecto.productoFinal || "Proyecto NEM"})?`
      }
    }));
  }
};
