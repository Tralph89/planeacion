// ============================================================================
// GENERADOR INTELIGENTE DE SESIONES Y VARIANTES CONTEXTUALIZADAS (NEM)
// Funciona 100% offline con motor de plantillas de Guaymas y online con Gemini API
// ============================================================================

window.AIGenerator = {
  contextosGuaymas: {
    pesca: {
      nombre: "Sector Pesquero y Marítimo de Guaymas",
      escenario: "las embarcaciones camaroneras y sardineras del Puerto de Guaymas, Sonora",
      unidades: "toneladas de captura, millas náuticas y cajas de congelación"
    },
    malecon: {
      nombre: "Malecón Turístico, Plaza y Comercios Locales",
      escenario: "el Malecón Turístico de Guaymas, la refresquería, papelería y comercios vecinos a la Sec. Abelardo L. Rodríguez",
      unidades: "visitantes, ventas diarias y metros de remodelación"
    },
    deportes: {
      nombre: "Deportes en el Gimnasio Municipal y Canchas Escolares",
      escenario: "los torneos deportivos de los grupos 3°G y 3°H en el Gimnasio Municipal frente a la secundaria",
      unidades: "puntos anotados, metros de cancha y tiempos de entrenamiento"
    },
    industria: {
      nombre: "Manufactura e Ingeniería en Empresas de la Región",
      escenario: "las plantas de manufactura y diseño de empaques industriales en Guaymas",
      unidades: "piezas producidas, contenedores y control de calidad"
    }
  },

  // Genera una nueva sesión + Hoja de Actividad contextualizada sin requerir internet
  generateContextualSession(bloqueInfo, contextoKey, customPrompt = "", nextSessionNumber = 6) {
    const ctx = this.contextosGuaymas[contextoKey] || this.contextosGuaymas.pesca;
    const tema = customPrompt.trim() || bloqueInfo.contenidoContextualizado;

    return {
      numero: nextSessionNumber,
      semana: bloqueInfo.semanas,
      titulo: `Taller Contextualizado (${ctx.nombre}): ${bloqueInfo.contenidoSintetico}`,
      inicio: `Comenzaré la sesión planteando una situación real vinculada con ${ctx.escenario}: "¿Cómo podemos aplicar el PDA '${bloqueInfo.pda}' para resolver un reto real de nuestra comunidad?". Anotaré las ideas previas de los alumnos en el pizarrón.`,
      desarrollo: `Organizaré al grupo en equipos colaborativos para trabajar la hoja de actividad centrada en: "${tema}".\n• Contexto aplicado: ${ctx.nombre}.\n• Los alumnos modelarán los datos, aplicarán el procedimiento matemático paso a paso y contrastarán sus resultados entre pares mientras superviso y realizo preguntas guía.`,
      cierre: `Para cerrar, un equipo voluntario expondrá su procedimiento en el pizarrón y aplicaremos el Boleto de Salida para verificar el logro individual del PDA.`,
      hojaActividad: {
        tituloHoja: `Actividad Contextualizada en Guaymas: ${ctx.nombre}`,
        instrucciones: `Resuelve los siguientes problemas ambientados en ${ctx.escenario}, aplicando lo aprendido en "${bloqueInfo.contenidoSintetico}".`,
        notaTeorica: `PDA que se impulsa: ${bloqueInfo.pda}`,
        diagramType: bloqueInfo.diagramType || "algebra_rect",
        ejercicios: [
          {
            enunciado: `1. Planteamiento en ${ctx.nombre}: En un proyecto sobre ${ctx.escenario} (${tema}), se registraron valores iniciales de 12 y 18 unidades. Modela la relación matemática y calcula el resultado al duplicar la capacidad operativa.`,
            respuesta: `Al modelar con los datos iniciales (12 y 18) y duplicar la escala operativa, se obtiene 24 y 36 (o razón constante k = 1.5).`
          },
          {
            enunciado: `2. Resolución Aplicada: Un equipo de trabajo en Guaymas necesita optimizar ${ctx.unidades} cumpliendo la condición del tema "${bloqueInfo.contenidoSintetico}". Si el total disponible es de 240 unidades repartidas en razón 3 : 5, ¿cuánto corresponde a cada parte?`,
            respuesta: `Suma de partes = 8 -> Valor unitario k = 240 / 8 = 30. Las partes corresponden a 90 y 150 unidades respectivamente.`
          },
          {
            enunciado: `3. Reto de Pensamiento Crítico: ${customPrompt ? customPrompt : "Propón una mejora o verificación matemática para comprobar que tu resultado anterior es correcto sin usar calculadora."}`,
            respuesta: `Verificación mediante operación inversa y comprobación de que la suma o sustitución en el modelo original satisface las condiciones del problema.`
          }
        ],
        boletoSalida: `Explica cómo se relaciona el tema "${bloqueInfo.contenidoSintetico}" con las actividades de ${ctx.escenario}.`
      }
    };
  },

  // Generación avanzada mediante API de Gemini (opcional si el docente ingresa su API Key)
  async generateWithGeminiAPI(apiKey, bloqueInfo, contextoKey, customPrompt, nextSessionNumber) {
    const ctx = this.contextosGuaymas[contextoKey] || this.contextosGuaymas.pesca;
    const prompt = `
Eres un profesor experto de Matemáticas de 3° de Secundaria en México bajo el modelo de la Nueva Escuela Mexicana (NEM), en la Escuela Secundaria General Abelardo L. Rodríguez de Guaymas, Sonora (Grupos 3°G y 3°H, turno vespertino).
Genera UNA sesión didáctica completa (Inicio 10 min, Desarrollo 30 min, Cierre 10 min) y su respectiva Hoja de Actividad para el aula con respuestas exactas.

Datos curriculares:
- Contenido: ${bloqueInfo.contenidoSintetico}
- Contextualización: ${bloqueInfo.contenidoContextualizado}
- PDA: ${bloqueInfo.pda}
- Contexto local de Guaymas a utilizar: ${ctx.nombre} (${ctx.escenario})
- Instrucción específica del docente: ${customPrompt || "Generar ejercicios claros, progresivos y retadores."}

Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta (sin bloques markdown):
{
  "numero": ${nextSessionNumber},
  "semana": "${bloqueInfo.semanas}",
  "titulo": "Título atractivo de la sesión",
  "inicio": "Descripción de la actividad de inicio (10 min) en primera persona...",
  "desarrollo": "Descripción detallada del desarrollo (30 min) en primera persona...",
  "cierre": "Descripción del cierre (10 min) y boleto de salida...",
  "hojaActividad": {
    "tituloHoja": "Título de la Hoja de Trabajo para el alumno",
    "instrucciones": "Instrucciones claras para el alumno",
    "notaTeorica": "Fórmula o recordatorio clave breve",
    "diagramType": "${bloqueInfo.diagramType || "algebra_rect"}",
    "ejercicios": [
      { "enunciado": "1. Problema o serie de ejercicios nivel 1...", "respuesta": "Respuesta detallada..." },
      { "enunciado": "2. Problema contextualizado en Guaymas nivel 2...", "respuesta": "Respuesta detallada..." },
      { "enunciado": "3. Reto final de pensamiento crítico...", "respuesta": "Respuesta detallada..." }
    ],
    "boletoSalida": "Pregunta o ejercicio rápido de boleto de salida"
  }
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.7 }
      })
    });

    if (!response.ok) {
      throw new Error(`Error de API (${response.status}): Verifica tu API Key de Gemini.`);
    }
    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  }
};
