// ============================================================================
// MOTOR DE GENERACIÓN PEDAGÓGICA EN CASCADA (NEM - MULTI-MATERIA Y MULTI-GRADO)
// Conecta las 5 etapas del flujo (Sintético PDF -> Analítico -> Codiseño ->
// Plan de Clase -> Hojas de Actividad) con Gemini en el servidor y cuenta con
// generadores pedagógicos locales de respaldo para cualquier materia.
// ============================================================================

window.AIGenerator = {
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
    const pdfBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("No se pudo leer el archivo PDF."));
      reader.readAsDataURL(file);
    });

    const response = await fetch("/api/parse-sintetico-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pdfBase64, escuela })
    });

    const data = await response.json();
    if (!response.ok || !Array.isArray(data.contenidos)) {
      throw new Error(data.error || "No se pudieron extraer los contenidos del PDF.");
    }

    return data.contenidos.map((c, idx) => ({
      id: `CS-${String(idx + 1).padStart(2, "0")}`,
      contenido: c.contenido,
      pda: c.pda,
      ejesSugeridos: c.ejesSugeridos || "Pensamiento crítico",
      semanasSugeridas: Number(c.semanasSugeridas) || 2,
      trimestreSugerido: Number(c.trimestreSugerido) || ((idx % 3) + 1),
      seleccionado: true
    }));
  },

  // --------------------------------------------------------------------------
  // ETAPA 2A: Generar / Enriquecer Diagnóstico Socioeducativo (Primer Plano)
  // --------------------------------------------------------------------------
  async generateDiagnostico(escuela, diagnosticoActual, promptExtra = "") {
    try {
      const response = await fetch("/api/generate-diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ escuela, diagnosticoActual, promptExtra })
      });
      const data = await response.json();
      if (response.ok && data.diagnostico) {
        return data.diagnostico;
      }
      throw new Error(data.error || "Fallback local");
    } catch (e) {
      return {
        comunidad: `La escuela ${escuela.nombre} (CCT ${escuela.cct}), ubicada en ${escuela.municipio || "la localidad"}, atiende a los grupos ${escuela.grupos} del turno ${escuela.turno} en ${escuela.grado} (${escuela.fase}). El entorno socioeconómico y cultural de las familias brinda oportunidades valiosas para vincular la asignatura de ${escuela.asignatura} (${escuela.campoFormativo}) con situaciones auténticas de la comunidad, fortaleciendo la participación activa, la inclusión y el pensamiento crítico.`,
        areasPrioritarias: [
          {
            titulo: `1. Comprensión y Aplicación en ${escuela.asignatura}`,
            descripcion: `Fortalecer el dominio práctico de los Procesos de Desarrollo de Aprendizaje (PDA) de ${escuela.grado} mediante proyectos contextualizados.`
          },
          {
            titulo: "2. Argumentación, Lectura Crítica y Trabajo Colaborativo",
            descripcion: "Impulsar la comunicación oral, escrita y gráfica de ideas para resolver problemáticas reales del entorno escolar."
          },
          {
            titulo: "3. Vinculación Comunitaria y Evaluación Formativa",
            descripcion: "Conectar los contenidos curriculares con retos de la localidad y retroalimentar de manera continua el avance de cada estudiante."
          }
        ]
      };
    }
  },

  // --------------------------------------------------------------------------
  // ETAPA 2B: Generar Bloques del Programa Analítico desde Sintético + Diagnóstico
  // --------------------------------------------------------------------------
  async generateAnaliticoBloques(escuela, diagnostico, contenidosSinteticos, promptExtra = "") {
    const activos = (contenidosSinteticos || []).filter((c) => c.seleccionado !== false);
    try {
      const response = await fetch("/api/generate-analitico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          escuela,
          diagnostico,
          contenidosSinteticos: activos,
          promptExtra
        })
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data.bloques) && data.bloques.length > 0) {
        return this.normalizeBloquesAnalitico(data.bloques, escuela);
      }
      throw new Error(data.error || "Fallback local");
    } catch (e) {
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
          contenidoContextualizado: `${c.contenido} (Contextualizado en ${escuela.municipio || "la comunidad escolar"} para ${escuela.asignatura})`,
          pda: c.pda,
          justificacion: `Se contextualiza para responder a las necesidades detectadas en el diagnóstico socioeducativo de ${escuela.nombre} (${escuela.grupos}).`,
          ejesArticuladores: c.ejesSugeridos || "Pensamiento crítico e Inclusión"
        };
      });
      return this.normalizeBloquesAnalitico(raw, escuela);
    }
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
    const defaultDiag = this.getDefaultDiagramForSubject(escuela?.asignatura);
    try {
      const response = await fetch("/api/generate-codiseno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ escuela, diagnostico, promptExtra })
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data.bloquesCodiseno) && data.bloquesCodiseno.length > 0) {
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
      throw new Error(data.error || "Fallback local");
    } catch (e) {
      return [
        {
          id: `B${String(existingBloquesCount + 1).padStart(2, "0")}`,
          trimestre: 4,
          semanas: `Codiseño (1 Semana)`,
          numSemanas: 1,
          numSesiones: 5,
          periodoSugerido: "Transversal / Reforzamiento Anual",
          contenidoSintetico: `Proyecto de Codiseño Local en ${escuela.asignatura}: ${promptExtra || "Saberes y Retos de " + (escuela.municipio || "la Comunidad")}`,
          contenidoContextualizado: `Aplicación práctica de ${escuela.asignatura} para atender necesidades prioritarias de ${escuela.nombre} en ${escuela.municipio || "la región"}.`,
          pda: `Indaga, propone y aplica soluciones desde ${escuela.asignatura} (${escuela.grado}) ante problemáticas cotidianas de su entorno escolar y comunitario.`,
          justificacion: `Definido en el Tercer Plano (Codiseño) a partir de la lectura de la realidad de los grupos ${escuela.grupos}.`,
          ejesArticuladores: "Pensamiento crítico y Vida saludable",
          diagramType: defaultDiag
        }
      ];
    }
  },

  // --------------------------------------------------------------------------
  // ETAPA 4: Generar Plan de Clase Completo de un Bloque desde Analítico/Codiseño
  // --------------------------------------------------------------------------
  async generatePlanForBloque(escuela, diagnostico, bloque, promptExtra = "") {
    try {
      const response = await fetch("/api/generate-plan-bloque", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ escuela, diagnostico, bloque, promptExtra })
      });
      const data = await response.json();
      if (response.ok && data.plan && Array.isArray(data.plan.sesiones)) {
        return data.plan;
      }
      throw new Error(data.error || "Fallback local");
    } catch (e) {
      return this.generateLocalPlanForBloque(escuela, bloque, promptExtra);
    }
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
    try {
      const response = await fetch("/api/sync-hojas-from-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ escuela, bloque, sesionesPlan, promptExtra })
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data.hojasPorSesion) && data.hojasPorSesion.length > 0) {
        return data.hojasPorSesion;
      }
      throw new Error(data.error || "Fallback local");
    } catch (e) {
      const diag = bloque.diagramType || this.getDefaultDiagramForSubject(escuela?.asignatura);
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
              enunciado: `3. Ejercicio de Consolidación del PDA (${bloque.pda}): Aplica lo aprendido a un caso concreto de ${escuela.municipio || "tu comunidad"}.`,
              respuesta: `Aplicación correcta y justificada del PDA de la secuencia.`
            }
          ],
          boletoSalida: `Evaluación de Cierre: ${(s.cierre || "Explica qué aprendiste hoy y cómo lo resolviste.").slice(0, 160)}`
        }
      }));
    }
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
    const ctx = this.contextosGuaymas[contextoKey] || this.contextosGuaymas.pesca;
    const response = await fetch("/api/generate-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bloqueInfo,
        contexto: ctx,
        customPrompt,
        nextSessionNumber,
        escuela
      })
    });

    const data = await response.json();
    if (!response.ok || !data.session) {
      throw new Error(data.error || `Error del servidor (${response.status})`);
    }
    return data.session;
  }
};
