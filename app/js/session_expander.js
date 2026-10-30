// ============================================================================
// EXPANSOR PEDAGÓGICO DE SESIONES COMPLETAS (5 O 10 SESIONES POR BLOQUE)
// Garantiza que cada bloque del Trimestre 2, 3 y Codiseño tenga todas sus
// sesiones individuales (Sesión 1, 2, 3, 4, 5...) con Hoja de Trabajo propia.
// ============================================================================

window.SessionExpander = {
  ensureFullSessions(bloqueInfo, planData) {
    if (!planData || !planData.sesiones) return planData;
    const targetCount = bloqueInfo.numSesiones || 5;
    if (planData.sesiones.length >= 5) return planData;

    const baseS1 = planData.sesiones[0];
    const baseS2 = planData.sesiones[1] || planData.sesiones[0];
    const orientaciones = bloqueInfo.orientacionesDidacticas || [];
    const diagram = bloqueInfo.diagramType || (baseS1.hojaActividad && baseS1.hojaActividad.diagramType) || "algebra_rect";

    // Construimos las 5 sesiones completas de la secuencia didáctica semanal
    const fullSesiones = [
      // Sesión 1: Exploración y Conceptos Base (basada en baseS1)
      {
        ...baseS1,
        numero: 1,
        titulo: baseS1.titulo || `Exploración Inicial: ${bloqueInfo.contenidoContextualizado.slice(0, 55)}...`
      },
      // Sesión 2: Formalización y Procedimiento Paso a Paso
      {
        ...baseS2,
        numero: 2,
        titulo: baseS2 !== baseS1 ? baseS2.titulo : `Procedimientos y Modelado: ${bloqueInfo.contenidoSintetico}`
      },
      // Sesión 3: Práctica Guiada y Resolución de Problemas Tipo
      {
        numero: 3,
        semana: baseS1.semana,
        titulo: `Taller de Práctica Guiada: ${bloqueInfo.contenidoSintetico}`,
        inicio: `Comenzaré la sesión con un reto rápido en el pizarrón retomando los conceptos clave de "${baseS1.titulo}". Solicitaré a dos voluntarios que expliquen la estrategia utilizada en la sesión anterior.`,
        desarrollo: `Será una sesión de práctica estructurada centrada en el PDA: "${bloqueInfo.pda}".\n${orientaciones[0] ? "• Orientación central: " + orientaciones[0] : ""}\nLos estudiantes resolverán de manera individual y en parejas la Hoja de Trabajo de la Sesión 3 con acompañamiento docente paso a paso.`,
        cierre: `Revisión grupal en el pizarrón identificando los pasos críticos y respondiendo el Boleto de Salida de verificación rápida.`,
        hojaActividad: {
          tituloHoja: `Práctica Guiada (Sesión 3): ${bloqueInfo.contenidoSintetico}`,
          instrucciones: "Resuelve los siguientes ejercicios aplicando el procedimiento paso a paso revisado en clase. Incluye todas tus operaciones.",
          notaTeorica: baseS1.hojaActividad.notaTeorica,
          diagramType: diagram,
          ejercicios: [
            {
              enunciado: `1. Ejercicio de Consolidación A (Nivel Básico): Aplica la regla o fórmula principal vista en "${baseS1.titulo}" cambiando los datos iniciales al doble y verifica cómo cambia el resultado.`,
              respuesta: `Al duplicar las magnitudes lineales, el resultado cambia proporcionalmente (o al cuadrado/cubo si se trata de área o volumen). Revisar procedimiento con ${baseS1.hojaActividad.ejercicios[0].respuesta}`
            },
            {
              enunciado: `2. Ejercicio de Consolidación B (Nivel Intermedio): ${baseS1.hojaActividad.ejercicios[1] ? baseS1.hojaActividad.ejercicios[1].enunciado : "Resuelve el caso práctico aplicando el modelo matemático del bloque."}`,
              respuesta: baseS1.hojaActividad.ejercicios[1] ? baseS1.hojaActividad.ejercicios[1].respuesta : "Verificación paso a paso en pizarrón."
            },
            {
              enunciado: `3. Análisis de Error ("El Detective Matemático"): Un estudiante intentó resolver un problema de este tema pero olvidó aplicar correctamente la propiedad principal. Explica qué paso es indispensable cuidar siempre.`,
              respuesta: `Es indispensable verificar unidades, despejes y sustitución correcta en la fórmula antes de operar.`
            }
          ],
          boletoSalida: `Explica en dos renglones cuál es el paso más importante para no equivocarse al resolver problemas de: ${bloqueInfo.pda}`
        }
      },
      // Sesión 4: Aplicación en el Contexto Comunitario de Guaymas, Sonora
      {
        numero: 4,
        semana: baseS2.semana || baseS1.semana,
        titulo: `Aplicación en el Contexto de Guaymas: Problemas Reales`,
        inicio: `Plantearé una situación contextualizada en nuestra comunidad de Guaymas, Sonora (el malecón turístico, la actividad pesquera, el comercio local o las canchas de la Esc. Sec. Abelardo L. Rodríguez) vinculada con: "${bloqueInfo.contenidoContextualizado}".`,
        desarrollo: `En equipos colaborativos, los alumnos analizarán y resolverán problemas aplicados a nuestro entorno local.\n${orientaciones[1] ? "• Enfoque didáctico: " + orientaciones[1] : ""}\nYo recorreré el aula haciendo preguntas guía para impulsar el Pensamiento Crítico.`,
        cierre: `Puesta en común donde cada equipo expone su planteamiento y se redacta la conclusión sobre la utilidad comunitaria del tema.`,
        hojaActividad: {
          tituloHoja: `Matemáticas en Guaymas (Sesión 4): Aplicaciones Comunitarias`,
          instrucciones: "Lee con atención cada problema contextualizado en nuestra comunidad, realiza el planteamiento matemático y encuentra la solución.",
          notaTeorica: baseS2.hojaActividad.notaTeorica,
          diagramType: diagram,
          ejercicios: [
            {
              enunciado: `1. Contexto Portuario y Comunitario: ${baseS2.hojaActividad.ejercicios[0].enunciado}`,
              respuesta: baseS2.hojaActividad.ejercicios[0].respuesta
            },
            {
              enunciado: `2. Aplicación Escolar en la Sec. Abelardo L. Rodríguez: ${baseS2.hojaActividad.ejercicios[1] ? baseS2.hojaActividad.ejercicios[1].enunciado : baseS1.hojaActividad.ejercicios[0].enunciado}`,
              respuesta: baseS2.hojaActividad.ejercicios[1] ? baseS2.hojaActividad.ejercicios[1].respuesta : baseS1.hojaActividad.ejercicios[0].respuesta
            },
            {
              enunciado: `3. Problema de Diseño Propio: Redacta en equipo un problema real de tu colonia o de Guaymas que se resuelva con este mismo procedimiento y resuélvelo aquí.`,
              respuesta: `Problema libre contextualizado con planteamiento, operaciones y respuesta con unidades.`
            }
          ],
          boletoSalida: `¿En qué oficio, profesión o actividad económica de Guaymas resulta indispensable dominar este aprendizaje?`
        }
      },
      // Sesión 5: Reto Integrador y Evaluación Formativa de la Secuencia
      {
        numero: 5,
        semana: baseS2.semana || baseS1.semana,
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
              enunciado: `1. Desafío Fundamental: ${baseS1.hojaActividad.ejercicios[baseS1.hojaActividad.ejercicios.length - 1].enunciado}`,
              respuesta: baseS1.hojaActividad.ejercicios[baseS1.hojaActividad.ejercicios.length - 1].respuesta
            },
            {
              enunciado: `2. Desafío Avanzado de Aplicación: ${baseS2.hojaActividad.ejercicios[baseS2.hojaActividad.ejercicios.length - 1].enunciado}`,
              respuesta: baseS2.hojaActividad.ejercicios[baseS2.hojaActividad.ejercicios.length - 1].respuesta
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

    return {
      ...planData,
      sesiones: fullSesiones
    };
  }
};
