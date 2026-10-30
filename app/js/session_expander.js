// ============================================================================
// EXPANSOR PEDAGÓGICO DE SESIONES COMPLETAS (5, 10 O 15 SESIONES POR BLOQUE)
// Garantiza que cada bloque del Trimestre 1, 2, 3 y Codiseño tenga todas sus
// sesiones individuales (5 por semana) con Hoja de Trabajo propia y completa.
// ============================================================================

window.SessionExpander = {
  extractWeekLabels(bloqueInfo, baseS1, baseS2) {
    const matches = (bloqueInfo.semanas || "").match(/\d+/g);
    if (matches && matches.length >= 2) {
      return { sem1: parseInt(matches[0], 10), sem2: parseInt(matches[1], 10) };
    }
    if (matches && matches.length === 1) {
      const n = parseInt(matches[0], 10);
      return { sem1: n, sem2: n + 1 };
    }
    return {
      sem1: (baseS1 && baseS1.semana) || bloqueInfo.semanas || 1,
      sem2: (baseS2 && baseS2.semana) || (baseS1 && baseS1.semana) || bloqueInfo.semanas || 2
    };
  },

  buildFiveSessionWeek(bloqueInfo, baseS1, baseS2, semLabel, diagram) {
    const orientaciones = bloqueInfo.orientacionesDidacticas || [];
    const ex1_0 = (baseS1.hojaActividad && baseS1.hojaActividad.ejercicios && baseS1.hojaActividad.ejercicios[0]) || {
      enunciado: `1. Resuelve el problema base sobre ${bloqueInfo.contenidoSintetico}.`,
      respuesta: "Revisión paso a paso en el pizarrón."
    };
    const ex1_1 = (baseS1.hojaActividad && baseS1.hojaActividad.ejercicios && baseS1.hojaActividad.ejercicios[1]) || ex1_0;
    const ex1_last =
      (baseS1.hojaActividad &&
        baseS1.hojaActividad.ejercicios &&
        baseS1.hojaActividad.ejercicios[baseS1.hojaActividad.ejercicios.length - 1]) ||
      ex1_0;

    const ex2_0 = (baseS2.hojaActividad && baseS2.hojaActividad.ejercicios && baseS2.hojaActividad.ejercicios[0]) || ex1_0;
    const ex2_1 = (baseS2.hojaActividad && baseS2.hojaActividad.ejercicios && baseS2.hojaActividad.ejercicios[1]) || ex1_1;
    const ex2_last =
      (baseS2.hojaActividad &&
        baseS2.hojaActividad.ejercicios &&
        baseS2.hojaActividad.ejercicios[baseS2.hojaActividad.ejercicios.length - 1]) ||
      ex2_0;

    return [
      {
        ...baseS1,
        numero: 1,
        semana: baseS1.semana || semLabel,
        titulo: baseS1.titulo || `Exploración Inicial: ${bloqueInfo.contenidoContextualizado.slice(0, 55)}...`
      },
      {
        ...baseS2,
        numero: 2,
        semana: baseS2.semana || semLabel,
        titulo: baseS2 !== baseS1 ? baseS2.titulo : `Procedimientos y Modelado: ${bloqueInfo.contenidoSintetico}`
      },
      {
        numero: 3,
        semana: baseS1.semana || semLabel,
        titulo: `Taller de Práctica Guiada: ${bloqueInfo.contenidoSintetico}`,
        inicio: `Comenzaré la sesión con un reto rápido en el pizarrón retomando los conceptos clave de "${baseS1.titulo}". Solicitaré a dos voluntarios que expliquen la estrategia utilizada en la sesión anterior.`,
        desarrollo: `Será una sesión de práctica estructurada centrada en el PDA: "${bloqueInfo.pda}".\n${orientaciones[0] ? "• Orientación central: " + orientaciones[0] : ""}\nLos estudiantes resolverán de manera individual y en parejas la Hoja de Trabajo de la Sesión 3 con acompañamiento docente paso a paso.`,
        cierre: `Revisión grupal en el pizarrón identificando los pasos críticos y respondiendo el Boleto de Salida de verificación rápida.`,
        hojaActividad: {
          tituloHoja: `Práctica Guiada (Sesión 3): ${bloqueInfo.contenidoSintetico}`,
          instrucciones: "Resuelve los siguientes ejercicios aplicando el procedimiento paso a paso revisado en clase. Incluye todas tus operaciones.",
          notaTeorica: (baseS1.hojaActividad && baseS1.hojaActividad.notaTeorica) || `PDA: ${bloqueInfo.pda}`,
          diagramType: diagram,
          ejercicios: [
            {
              enunciado: `1. Ejercicio de Consolidación A (Nivel Básico): Aplica la regla o fórmula principal vista en "${baseS1.titulo}" cambiando los datos iniciales al doble y verifica cómo cambia el resultado.`,
              respuesta: `Al duplicar las magnitudes lineales, el resultado cambia proporcionalmente (o al cuadrado/cubo si se trata de área o volumen). Procedimiento base: ${ex1_0.respuesta}`
            },
            {
              enunciado: `2. Ejercicio de Consolidación B (Nivel Intermedio): ${ex1_1.enunciado}`,
              respuesta: ex1_1.respuesta
            },
            {
              enunciado: `3. Análisis de Error ("El Detective Matemático"): Un estudiante intentó resolver un problema de este tema pero olvidó aplicar correctamente la propiedad principal. Explica qué paso es indispensable cuidar siempre.`,
              respuesta: `Es indispensable verificar unidades, despejes y sustitución correcta en la fórmula antes de operar.`
            }
          ],
          boletoSalida: `Explica en dos renglones cuál es el paso más importante para no equivocarse al resolver problemas de: ${bloqueInfo.pda}`
        }
      },
      {
        numero: 4,
        semana: baseS2.semana || baseS1.semana || semLabel,
        titulo: `Aplicación en el Contexto de Guaymas: Problemas Reales`,
        inicio: `Plantearé una situación contextualizada en nuestra comunidad de Guaymas, Sonora (el malecón turístico, la actividad pesquera, el comercio local o las canchas de la Esc. Sec. Abelardo L. Rodríguez) vinculada con: "${bloqueInfo.contenidoContextualizado}".`,
        desarrollo: `En equipos colaborativos, los alumnos analizarán y resolverán problemas aplicados a nuestro entorno local.\n${orientaciones[1] ? "• Enfoque didáctico: " + orientaciones[1] : ""}\nRecorreré el aula haciendo preguntas guía para impulsar el Pensamiento Crítico.`,
        cierre: `Puesta en común donde cada equipo expone su planteamiento y se redacta la conclusión sobre la utilidad comunitaria del tema.`,
        hojaActividad: {
          tituloHoja: `Matemáticas en Guaymas (Sesión 4): Aplicaciones Comunitarias`,
          instrucciones: "Lee con atención cada problema contextualizado en nuestra comunidad, realiza el planteamiento matemático y encuentra la solución.",
          notaTeorica: (baseS2.hojaActividad && baseS2.hojaActividad.notaTeorica) || `PDA: ${bloqueInfo.pda}`,
          diagramType: diagram,
          ejercicios: [
            {
              enunciado: `1. Contexto Portuario y Comunitario: ${ex2_0.enunciado}`,
              respuesta: ex2_0.respuesta
            },
            {
              enunciado: `2. Aplicación Escolar en la Sec. Abelardo L. Rodríguez: ${ex2_1.enunciado}`,
              respuesta: ex2_1.respuesta
            },
            {
              enunciado: `3. Problema de Diseño Propio: Redacta en equipo un problema real de tu colonia o de Guaymas que se resuelva con este mismo procedimiento y resuélvelo aquí.`,
              respuesta: `Problema libre contextualizado con planteamiento, operaciones y respuesta con unidades.`
            }
          ],
          boletoSalida: `¿En qué oficio, profesión o actividad económica de Guaymas resulta indispensable dominar este aprendizaje?`
        }
      },
      {
        numero: 5,
        semana: baseS2.semana || baseS1.semana || semLabel,
        titulo: `Reto Integrador de la Secuencia y Evaluación Formativa`,
        inicio: `Lanzaré el Reto Final de la semana que integra todas las habilidades del PDA: "${bloqueInfo.pda}". Repasaremos brevemente el formulario y criterios de éxito.`,
        desarrollo: `Resolución en equipos e individual del Reto Integrador de la Sesión 5. Los estudiantes demostrarán su dominio conceptual, procedimental y de argumentación matemática.`,
        cierre: `Coevaluación en plenaria, socialización de distintas estrategias de solución y registro en la escala de Evaluación Formativa (Logrado, Medianamente logrado, No logrado).`,
        hojaActividad: {
          tituloHoja: `Reto Integrador y Evaluación Formativa (Sesión 5)`,
          instrucciones: "Demuestra lo aprendido a lo largo de la semana resolviendo el reto integrador y completando tu autoevaluación.",
          notaTeorica: `Meta de aprendizaje (PDA): ${bloqueInfo.pda}`,
          diagramType: diagram,
          ejercicios: [
            {
              enunciado: `1. Desafío Fundamental: ${ex1_last.enunciado}`,
              respuesta: ex1_last.respuesta
            },
            {
              enunciado: `2. Desafío Avanzado de Aplicación: ${ex2_last.enunciado}`,
              respuesta: ex2_last.respuesta
            },
            {
              enunciado: `3. Síntesis y Argumentación: Explica paso a paso con tus propias palabras cómo le enseñarías a un compañero de 3°G o 3°H a resolver este tipo de problemas.`,
              respuesta: `Explicación estructurada en 3 pasos: 1) Identificar datos e incógnita, 2) Sustituir en el modelo o proporción, 3) Operar y validar el sentido del resultado.`
            }
          ],
          boletoSalida: `Autoevaluación de la Semana: Marca tu nivel de logro ( [ ] Logrado  [ ] Medianamente logrado  [ ] En proceso ) y escribe qué te resultó más interesante.`
        }
      }
    ];
  },

  buildTenSessionTwoWeeks(bloqueInfo, baseS1, baseS2, sem1, sem2, diagram) {
    const orientaciones = bloqueInfo.orientacionesDidacticas || [];
    const h1 = baseS1.hojaActividad || {};
    const h2 = baseS2.hojaActividad || h1;
    const diag1 = h1.diagramType || diagram;
    const diag2 = h2.diagramType || diagram;

    const ex1 = h1.ejercicios || [];
    const ex2 = h2.ejercicios || ex1;

    const e1_0 = ex1[0] || { enunciado: `1. Ejercicio base de ${bloqueInfo.contenidoSintetico}.`, respuesta: "Verificación en pizarrón." };
    const e1_1 = ex1[1] || e1_0;
    const e1_2 = ex1[2] || e1_1;

    const e2_0 = ex2[0] || e1_0;
    const e2_1 = ex2[1] || e1_1;
    const e2_2 = ex2[2] || e1_2;

    return [
      // ==================== SEMANA 1 (SESIONES 1 A 5) ====================
      {
        ...baseS1,
        numero: 1,
        semana: sem1,
        titulo: baseS1.titulo || `Exploración e Indagación: ${bloqueInfo.contenidoSintetico}`
      },
      {
        numero: 2,
        semana: sem1,
        titulo: `Formalización y Procedimiento Paso a Paso: ${baseS1.titulo}`,
        inicio: `Retomaré las conclusiones de la Sesión 1 mediante una lluvia de ideas rápida en el pizarrón: "¿Qué datos necesitamos identificar primero para aplicar el procedimiento de '${baseS1.titulo}'?".`,
        desarrollo: `Explicaré de forma estructurada las reglas, propiedades y despejes asociados a la primera parte del bloque.\n${orientaciones[0] ? "• Eje de trabajo de la Semana " + sem1 + ": " + orientaciones[0] : ""}\nResolveré un ejemplo modelo en el pizarrón y los alumnos resolverán en binas la Hoja de Trabajo de la Sesión 2.`,
        cierre: `Comparación de procedimientos entre parejas y verificación del Boleto de Salida.`,
        hojaActividad: {
          tituloHoja: `Formalización y Procedimiento (Sesión 2): ${bloqueInfo.contenidoSintetico}`,
          instrucciones: "Sigue el modelo matemático revisado en el pizarrón y anota cada paso de tu desarrollo.",
          notaTeorica: h1.notaTeorica || `PDA: ${bloqueInfo.pda}`,
          diagramType: diag1,
          ejercicios: [
            {
              enunciado: `1. Práctica Directa (Variación de Escala): Retoma el planteamiento "${e1_0.enunciado}" pero considera ahora que las medidas o datos iniciales se incrementan al triple. Calcula el nuevo resultado.`,
              respuesta: `Aplicando el factor de escala ×3 (o su relación cuadrática/cúbica según la magnitud) sobre el modelo base (${e1_0.respuesta}).`
            },
            {
              enunciado: `2. Aplicación Guiada: ${e1_1.enunciado}`,
              respuesta: e1_1.respuesta
            },
            {
              enunciado: `3. Despeje e Inversa: Si ya conoces el resultado final en un problema de "${baseS1.titulo}", explica cómo encontrar el dato inicial desconocido mediante operaciones inversas.`,
              respuesta: `Sustituir el valor conocido en la fórmula e invertir las operaciones (restar/sumar primero, dividir/multiplicar o extraer raíz al final). Reference: ${e1_2.respuesta}`
            }
          ],
          boletoSalida: `Escribe la fórmula o propiedad central vista hoy en "${baseS1.titulo}" e identifica qué representa cada literal.`
        }
      },
      {
        numero: 3,
        semana: sem1,
        titulo: `Taller de Práctica Guiada y Análisis de Casos (Semana ${sem1})`,
        inicio: `Escribiré en el pizarrón un ejercicio con un error intencional ("El Detective Matemático") relacionado con "${baseS1.titulo}" para que el grupo descubra en 3 minutos dónde está el fallo.`,
        desarrollo: `Taller práctico en el aula centrado en consolidar la fluidez operativa y el razonamiento geométrico/algebraico de la Semana ${sem1}. Los alumnos trabajarán en la Hoja de Actividad #3 mientras brindo retroalimentación personalizada a quienes presentan dudas.`,
        cierre: `Tres voluntarios pasarán al pizarrón a mostrar sus desarrollos y verificaremos las unidades de medida.`,
        hojaActividad: {
          tituloHoja: `Taller de Práctica Guiada (Sesión 3 - Semana ${sem1})`,
          instrucciones: "Resuelve los ejercicios graduados y detecta el error común en el reto del Detective Matemático.",
          notaTeorica: h1.notaTeorica || `Recordatorio: Verifica siempre unidades y signos antes de concluir.`,
          diagramType: diag1,
          ejercicios: [
            {
              enunciado: `1. Nivel Básico (Dominio Operativo): ${e1_0.enunciado}`,
              respuesta: e1_0.respuesta
            },
            {
              enunciado: `2. Nivel Intermedio (Razonamiento): ${e1_2.enunciado}`,
              respuesta: e1_2.respuesta
            },
            {
              enunciado: `3. El Detective Matemático: Un alumno de 3° resolvió un ejercicio de "${baseS1.titulo}" sin respetar el orden de operaciones ni las unidades correspondientes. Explica qué error se debe evitar y cuál es la forma correcta de comprobar el resultado.`,
              respuesta: `Se debe verificar la sustitución correcta en la fórmula, elevar al cuadrado/cubo antes de multiplicar cuando corresponda y expresar la unidad correcta (cm, cm², cm³ o grados).`
            }
          ],
          boletoSalida: `¿Cuál de los 3 ejercicios de hoy te pareció más sencillo y en cuál tuviste que poner más atención?`
        }
      },
      {
        numero: 4,
        semana: sem1,
        titulo: `Contexto Comunitario en Guaymas I: Sector Marítimo y Urbano`,
        inicio: `Plantearé cómo se utiliza el contenido "${baseS1.titulo}" en las actividades cotidianas del Puerto de Guaymas, el Malecón Turístico y los comercios cercanos a la Esc. Sec. Abelardo L. Rodríguez.`,
        desarrollo: `En equipos de 3 o 4 integrantes, los estudiantes modelarán problemas contextualizados en Guaymas aplicando el PDA: "${bloqueInfo.pda}". Impulsaré la discusión sobre qué estrategia resulta más eficiente.`,
        cierre: `Socialización de soluciones entre equipos y reflexión sobre el valor práctico de las matemáticas en nuestra comunidad.`,
        hojaActividad: {
          tituloHoja: `Matemáticas en Guaymas I (Sesión 4): Contexto Local`,
          instrucciones: "Analiza cada situación ambientada en nuestra comunidad de Guaymas, plantea el modelo matemático y halla la solución.",
          notaTeorica: h1.notaTeorica || `PDA: ${bloqueInfo.pda}`,
          diagramType: diag1,
          ejercicios: [
            {
              enunciado: `1. Caso en el Puerto de Guaymas: En una embarcación y almacén portuario se presenta el siguiente reto técnico: ${e1_1.enunciado}`,
              respuesta: e1_1.respuesta
            },
            {
              enunciado: `2. Caso en la Esc. Sec. Abelardo L. Rodríguez: Durante una jornada de mejora escolar de los grupos 3°G y 3°H: ${e1_2.enunciado}`,
              respuesta: e1_2.respuesta
            },
            {
              enunciado: `3. Reto de Modelación Local: Propón con tu equipo una situación real del Malecón o de tu colonia donde se aplique "${baseS1.titulo}", asigna medidas realistas y calcúlalo.`,
              respuesta: `Planteamiento coherente con datos reales, sustitución paso a paso y resultado con interpretación en contexto.`
            }
          ],
          boletoSalida: `Menciona un ejemplo concreto de Guaymas donde se observe o aplique lo aprendido en esta sesión.`
        }
      },
      {
        numero: 5,
        semana: sem1,
        titulo: `Cierre y Evaluación Formativa de la Primera Semana (Semana ${sem1})`,
        inicio: `Realizaré un repaso ágil de 5 minutos en el pizarrón sobre los puntos clave abordados de la Sesión 1 a la 4, aclarando cualquier duda previo al reto semanal.`,
        desarrollo: `Los alumnos resolverán la Hoja de Actividad Integradora de la Sesión 5 para valorar el grado de avance en la primera mitad del bloque (${orientaciones[0] || bloqueInfo.contenidoSintetico}).`,
        cierre: `Revisión cruzada entre pares (coevaluación) y registro del avance semanal en la bitácora del grupo.`,
        hojaActividad: {
          tituloHoja: `Evaluación Formativa de Cierre de la Semana ${sem1} (Sesión 5)`,
          instrucciones: "Resuelve de manera ordenada los problemas integradores de esta primera semana para comprobar tu avance.",
          notaTeorica: `Síntesis Semana ${sem1}: ${h1.notaTeorica || bloqueInfo.pda}`,
          diagramType: diag1,
          ejercicios: [
            {
              enunciado: `1. Problema Fundamental de la Semana ${sem1}: ${e1_0.enunciado}`,
              respuesta: e1_0.respuesta
            },
            {
              enunciado: `2. Problema de Aplicación Intermedia: ${e1_1.enunciado}`,
              respuesta: e1_1.respuesta
            },
            {
              enunciado: `3. Argumentación Matemática: Justifica con tus propias palabras y un ejemplo numérico por qué funciona el método aprendido esta semana en "${baseS1.titulo}".`,
              respuesta: `Argumentación clara apoyada en la relación geométrica/algebraica revisada (${e1_2.respuesta}).`
            }
          ],
          boletoSalida: `Balance de la Semana ${sem1}: ¿Qué concepto ya dominas al 100% y qué te gustaría reforzar en la siguiente semana?`
        }
      },

      // ==================== SEMANA 2 (SESIONES 6 A 10) ====================
      {
        ...baseS2,
        numero: 6,
        semana: sem2,
        titulo: baseS2 !== baseS1 ? baseS2.titulo : `Profundización y Segunda Fase: ${bloqueInfo.contenidoSintetico}`
      },
      {
        numero: 7,
        semana: sem2,
        titulo: `Modelado Avanzado y Despejes: ${baseS2.titulo}`,
        inicio: `Conectaré lo aprendido en la Sesión 6 con un nuevo reto en el pizarrón: "¿Cómo combinamos lo visto la semana pasada con '${baseS2.titulo}' para resolver problemas de dos o más pasos?".`,
        desarrollo: `Abordaremos casos de mayor profundidad matemática (despejes de variables, figuras o eventos compuestos y comparación de resultados).\n${orientaciones[1] ? "• Eje de trabajo de la Semana " + sem2 + ": " + orientaciones[1] : ""}\nLos estudiantes trabajarán en la Hoja de Actividad de la Sesión 7 con supervisión docente.`,
        cierre: `Puesta en común en el pizarrón destacando las estrategias más claras para despejar y comprobar.`,
        hojaActividad: {
          tituloHoja: `Modelado Avanzado y Despejes (Sesión 7 - Semana ${sem2})`,
          instrucciones: "Aplica las fórmulas y propiedades de la segunda semana para resolver cada planteamiento paso a paso.",
          notaTeorica: h2.notaTeorica || `PDA: ${bloqueInfo.pda}`,
          diagramType: diag2,
          ejercicios: [
            {
              enunciado: `1. Aplicación Paso a Paso: ${e2_0.enunciado}`,
              respuesta: e2_0.respuesta
            },
            {
              enunciado: `2. Problema de Comparación al Doble de Capacidad: En el caso "${e2_1.enunciado}", determina cómo se modifica el resultado si duplicamos la medida principal.`,
              respuesta: `Al duplicar la dimensión principal y operar en el modelo, se contrasta con el resultado original (${e2_1.respuesta}).`
            },
            {
              enunciado: `3. Reto de Despeje Inverso: ${e2_2.enunciado}`,
              respuesta: e2_2.respuesta
            }
          ],
          boletoSalida: `¿Cuál es la diferencia o conexión principal entre lo que estudiamos en la Semana ${sem1} y lo que estamos aplicando en la Semana ${sem2}?`
        }
      },
      {
        numero: 8,
        semana: sem2,
        titulo: `Taller Colaborativo y Pensamiento Crítico: ${bloqueInfo.contenidoSintetico}`,
        inicio: `Organizaré al grupo en parejas mediante una pregunta detonadora de Pensamiento Crítico sobre "${bloqueInfo.contenidoContextualizado}".`,
        desarrollo: `Sesión de resolución colaborativa donde cada pareja resuelve tres retos combinados (Semana ${sem1} + Semana ${sem2}) en la Hoja de Trabajo #8, verificando mutuamente sus operaciones antes de entregar.`,
        cierre: `Revisión grupal de los resultados y análisis de las distintas rutas de solución encontradas por los alumnos.`,
        hojaActividad: {
          tituloHoja: `Taller Colaborativo y Pensamiento Crítico (Sesión 8)`,
          instrucciones: "En parejas, resuelvan los siguientes problemas combinados verificando cada operación.",
          notaTeorica: h2.notaTeorica || h1.notaTeorica || `PDA: ${bloqueInfo.pda}`,
          diagramType: diag2,
          ejercicios: [
            {
              enunciado: `1. Caso Integrado A: ${e1_2.enunciado}`,
              respuesta: e1_2.respuesta
            },
            {
              enunciado: `2. Caso Integrado B: ${e2_1.enunciado}`,
              respuesta: e2_1.respuesta
            },
            {
              enunciado: `3. Verificación Cruzada: Comprueba matemáticamente que la respuesta del ejercicio 2 es correcta sustituyendo el valor obtenido en el planteamiento inicial.`,
              respuesta: `Sustitución directa del resultado (${e2_1.respuesta}) comprobando la igualdad entre ambos miembros.`
            }
          ],
          boletoSalida: `Explica cómo comprobaste con tu compañero(a) que sus respuestas de hoy son matemáticamente correctas.`
        }
      },
      {
        numero: 9,
        semana: sem2,
        titulo: `Proyecto Aplicado en Guaymas II: Solución de Problemas Reales`,
        inicio: `Presentaré un caso práctico inspirado en el entorno productivo, deportivo y escolar de Guaymas, Sonora, donde se requiere integrar todo el bloque "${bloqueInfo.contenidoSintetico}".`,
        desarrollo: `Trabajo por equipos en el Proyecto Aplicado de la Sesión 9. Los alumnos realizarán el planteamiento, trazarán o analizarán el esquema geométrico/estadístico y redactarán su conclusión argumentada.`,
        cierre: `Exposición breve de dos equipos frente al grupo y retroalimentación formativa.`,
        hojaActividad: {
          tituloHoja: `Proyecto Aplicado en Guaymas II (Sesión 9 - Semana ${sem2})`,
          instrucciones: "Resuelve el proyecto práctico ambientado en Guaymas integrando los aprendizajes de las dos semanas.",
          notaTeorica: `Aplicación Comunitaria del PDA: ${bloqueInfo.pda}`,
          diagramType: diag2,
          ejercicios: [
            {
              enunciado: `1. Etapa 1 del Proyecto (Diagnóstico y Cálculo Base): ${e2_0.enunciado}`,
              respuesta: e2_0.respuesta
            },
            {
              enunciado: `2. Etapa 2 del Proyecto (Optimización y Toma de Decisiones): ${e2_2.enunciado}`,
              respuesta: e2_2.respuesta
            },
            {
              enunciado: `3. Conclusión Técnica para la Comunidad: Redacta una recomendación o conclusión breve basada en los resultados numéricos obtenidos en las etapas 1 y 2.`,
              respuesta: `Recomendación fundamentada en los datos calculados, especificando medidas, unidades y beneficio práctico.`
            }
          ],
          boletoSalida: `¿Por qué tomar decisiones basadas en cálculos matemáticos es mejor que hacerlo por simple intuición?`
        }
      },
      {
        numero: 10,
        semana: sem2,
        titulo: `Reto Integrador Quincenal y Evaluación Formativa del Bloque (${bloqueInfo.semanas})`,
        inicio: `Daré las indicaciones para el Reto Integrador Final de la secuencia de 10 sesiones (${bloqueInfo.semanas}), repasando los indicadores de logro de la Evaluación Formativa.`,
        desarrollo: `Resolución individual del Reto Integrador de la Sesión 10 que abarca los aprendizajes de la Semana ${sem1} y la Semana ${sem2} para verificar el logro del PDA: "${bloqueInfo.pda}".`,
        cierre: `Autoevaluación, coevaluación en plenaria y registro final en la rúbrica de desempeño del bloque (Nivel III Logrado, Nivel II Medianamente logrado, Nivel I No logrado).`,
        hojaActividad: {
          tituloHoja: `Reto Integrador Final y Evaluación Formativa (Sesión 10)`,
          instrucciones: "Demuestra tu dominio completo del bloque resolviendo los ejercicios integradores de las dos semanas.",
          notaTeorica: `Meta alcanzada (PDA): ${bloqueInfo.pda}`,
          diagramType: diag2,
          ejercicios: [
            {
              enunciado: `1. Evaluación Parte I (Contenidos de la Semana ${sem1}): ${e1_1.enunciado}`,
              respuesta: e1_1.respuesta
            },
            {
              enunciado: `2. Evaluación Parte II (Contenidos de la Semana ${sem2}): ${e2_2.enunciado}`,
              respuesta: e2_2.respuesta
            },
            {
              enunciado: `3. Síntesis Magistral (3°G y 3°H): Resume en 3 pasos claros el método general para resolver cualquier problema de "${bloqueInfo.contenidoSintetico}".`,
              respuesta: `1) Identificar datos, incógnita y figura/modelo; 2) Plantear la fórmula, proporción o ecuación correcta; 3) Resolver respetando jerarquía de operaciones y verificar unidades.`
            }
          ],
          boletoSalida: `Autoevaluación Final del Bloque (${bloqueInfo.semanas}): Marca tu nivel [ ] Logrado [ ] Medianamente logrado [ ] Requiere apoyo, y anota tu mayor aprendizaje.`
        }
      }
    ];
  },

  ensureFullSessions(bloqueInfo, planData) {
    if (!planData || !planData.sesiones || planData.sesiones.length === 0) return planData;
    const targetCount = bloqueInfo.numSesiones || 5;
    if (planData.sesiones.length >= targetCount) return planData;

    const baseS1 = planData.sesiones[0];
    const baseS2 = planData.sesiones[1] || planData.sesiones[0];
    const diagram =
      bloqueInfo.diagramType ||
      (baseS1.hojaActividad && baseS1.hojaActividad.diagramType) ||
      "algebra_rect";
    const { sem1, sem2 } = this.extractWeekLabels(bloqueInfo, baseS1, baseS2);

    // Caso 1: Bloques de 2 semanas (10 sesiones) que parten de 2 sesiones semilla (B07 a B19)
    if (targetCount === 10 && planData.sesiones.length === 2) {
      return {
        ...planData,
        sesiones: this.buildTenSessionTwoWeeks(bloqueInfo, baseS1, baseS2, sem1, sem2, diagram)
      };
    }

    // Caso 2: Bloques de 1 semana (5 sesiones) que parten de menos de 5 sesiones (ej. Codiseño)
    if (targetCount === 5 && planData.sesiones.length < 5) {
      return {
        ...planData,
        sesiones: this.buildFiveSessionWeek(bloqueInfo, baseS1, baseS2, sem1, diagram)
      };
    }

    // Caso 3: Bloques que ya tienen entre 5 y 9 sesiones (ej. B06 con 6 sesiones o migración de localStorage)
    // Conservamos intactas las sesiones existentes y completamos hasta targetCount (10).
    const fullTemplate = this.buildTenSessionTwoWeeks(
      bloqueInfo,
      baseS1,
      planData.sesiones[planData.sesiones.length - 1] || baseS2,
      sem1,
      sem2,
      diagram
    );
    const mergedSesiones = [...planData.sesiones];
    for (let i = mergedSesiones.length; i < targetCount; i++) {
      const templateSes = fullTemplate[i] || fullTemplate[fullTemplate.length - 1];
      mergedSesiones.push({
        ... JSON.parse(JSON.stringify(templateSes)),
        numero: i + 1,
        semana: i < 5 ? sem1 : sem2
      });
    }

    return {
      ...planData,
      sesiones: mergedSesiones
    };
  }
};
