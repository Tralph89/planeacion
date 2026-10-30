import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

// Allow up to 25MB JSON payloads for base64 PDF uploads
app.use(express.json({ limit: "25mb" }));

const MODEL_NAME = "gemini-3.8-flash";

// Shared Gemini client utility initialized on the server
const getAIClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
};

// ============================================================================
// ETAPA 1: EXTRAER CONTENIDOS Y PDAs DESDE UN PDF DE PROGRAMA SINTÉTICO
// ============================================================================
app.post("/api/parse-sintetico-pdf", async (req, res) => {
  try {
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({
        error: "La clave GEMINI_API_KEY no está configurada en el servidor."
      });
    }

    const { pdfBase64, escuela = {} } = req.body || {};
    if (!pdfBase64) {
      return res.status(400).json({ error: "No se recibió el archivo PDF en base64." });
    }

    const cleanBase64 = String(pdfBase64).replace(/^data:application\/pdf;base64,/, "");
    const materia = escuela.asignatura || "Matemáticas";
    const grado = escuela.grado || "3° de Secundaria";
    const fase = escuela.fase || "Fase 6";
    const campo = escuela.campoFormativo || "Saberes y Pensamiento Científico";

    const promptText = `
Analiza el documento PDF adjunto del Programa Sintético de la Nueva Escuela Mexicana (NEM).
Extrae TODOS los Contenidos y Procesos de Desarrollo de Aprendizaje (PDA) oficiales completos que corresponden específicamente a:
- Fase: ${fase}
- Grado: ${grado}
- Campo Formativo: ${campo}
- Materia / Disciplina: ${materia}

Si el PDF contiene varias disciplinas o grados, filtra únicamente los que correspondan a "${materia}" de "${grado}", asegurándote de incluir la totalidad de los Contenidos oficiales del programa de esa disciplina (por ejemplo, los 14 contenidos completos en Geografía, Español, Formación Cívica y Ética, Inglés o Artes, o todos los contenidos oficiales de Biología, Física, Química, Historia, Tecnología o Educación Física) distribuidos en los 3 trimestres.
`.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: cleanBase64
          }
        },
        { text: promptText }
      ],
      config: {
        systemInstruction:
          "Eres un especialista curricular de la Nueva Escuela Mexicana (SEP). Devuelve siempre JSON válido con los Contenidos y PDAs extraídos en español.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            contenidos: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  contenido: {
                    type: Type.STRING,
                    description: "Nombre oficial del Contenido del Programa Sintético."
                  },
                  pda: {
                    type: Type.STRING,
                    description: "Proceso de Desarrollo de Aprendizaje (PDA) del grado correspondiente."
                  },
                  ejesSugeridos: {
                    type: Type.STRING,
                    description: "Ejes articuladores de la NEM vinculados con este contenido."
                  },
                  semanasSugeridas: {
                    type: Type.INTEGER,
                    description: "Duración sugerida en semanas (1, 2 o 3)."
                  },
                  trimestreSugerido: {
                    type: Type.INTEGER,
                    description: "Trimestre sugerido (1, 2 o 3)."
                  }
                },
                required: ["contenido", "pda", "ejesSugeridos", "semanasSugeridas", "trimestreSugerido"]
              }
            }
          },
          required: ["contenidos"]
        }
      }
    });

    const parsed = JSON.parse((response.text ?? "{}").trim());
    return res.json({ contenidos: parsed.contenidos || [] });
  } catch (error) {
    console.error("[parse-sintetico-pdf Error]:", error);
    return res.status(500).json({
      error: error?.message || "No fue posible analizar el PDF con IA."
    });
  }
});

// ============================================================================
// ETAPA 2A: REDACTAR O ENRIQUECER DIAGNÓSTICO SOCIOEDUCATIVO (PRIMER PLANO)
// ============================================================================
app.post("/api/generate-diagnostico", async (req, res) => {
  try {
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({ error: "GEMINI_API_KEY no disponible." });
    }

    const { escuela = {}, diagnosticoActual = {}, promptExtra = "" } = req.body || {};

    const prompt = `
Redacta o enriquece el Primer Plano (Diagnóstico Socioeducativo / Lectura de la Realidad) para el Programa Analítico de la Nueva Escuela Mexicana con los siguientes datos reales:
- Escuela: ${escuela.nombre} (CCT: ${escuela.cct})
- Docente: ${escuela.docente}
- Localidad / Municipio: ${escuela.municipio || "Guaymas, Sonora"}
- Fase y Grado: ${escuela.fase || "Fase 6"} · ${escuela.grado || "3° de Secundaria"} (Grupos: ${escuela.grupos || "A, B"}, Turno: ${escuela.turno || "Matutino"})
- Campo Formativo: ${escuela.campoFormativo || "Saberes y Pensamiento Científico"}
- Materia / Disciplina: ${escuela.asignatura || "Matemáticas"}
- Texto actual del docente (respetar y enriquecer este contexto): ${diagnosticoActual.comunidad || ""}
- Indicaciones adicionales del docente: ${promptExtra || "Incluir características socioeconómicas, culturales y académicas pertinentes para contextualizar la asignatura."}
`.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction:
          "Eres un asesor técnico pedagógico experto en el Programa Analítico de la NEM en México. Responde en español formal y realista.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            comunidad: {
              type: Type.STRING,
              description: "Párrafo integral del diagnóstico comunitario, escolar y de los grupos."
            },
            areasPrioritarias: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  titulo: { type: Type.STRING },
                  descripcion: { type: Type.STRING }
                },
                required: ["titulo", "descripcion"]
              }
            }
          },
          required: ["comunidad", "areasPrioritarias"]
        }
      }
    });

    const parsed = JSON.parse((response.text ?? "{}").trim());
    return res.json({ diagnostico: parsed });
  } catch (error) {
    console.error("[generate-diagnostico Error]:", error);
    return res.status(500).json({ error: error?.message || "Error al generar diagnóstico." });
  }
});

// ============================================================================
// ETAPA 2B: CONTEXTUALIZAR BLOQUES DEL PROGRAMA ANALÍTICO (SEGUNDO PLANO)
// ============================================================================
app.post("/api/generate-analitico", async (req, res) => {
  try {
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({ error: "GEMINI_API_KEY no disponible." });
    }

    const { escuela = {}, diagnostico = {}, contenidosSinteticos = [], promptExtra = "" } = req.body || {};

    const prompt = `
Con base en los Contenidos y PDAs del Programa Sintético seleccionados por el docente y el Diagnóstico Socioeducativo de la escuela, construye la Contextualización y Dosificación Curricular (Segundo Plano del Programa Analítico NEM).

Datos del Curso:
- Escuela: ${escuela.nombre} (${escuela.cct}) en ${escuela.municipio || "México"}
- Docente: ${escuela.docente}
- Materia y Grado: ${escuela.asignatura} (${escuela.grado}, ${escuela.fase})
- Diagnóstico Socioeducativo (Primer Plano): ${diagnostico.comunidad || ""}
- Indicaciones adicionales del docente: ${promptExtra || "Contextualizar cada contenido con situaciones reales del municipio/comunidad y distribuir en los 3 trimestres."}

Contenidos Sintéticos de entrada:
${JSON.stringify(contenidosSinteticos, null, 2)}
`.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction:
          "Eres un experto en diseño curricular NEM. Transforma cada Contenido Sintético en un bloque contextualizado a la realidad comunitaria de la escuela, asignando semanas consecutivas y trimestre (1, 2 o 3).",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bloques: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  trimestre: { type: Type.INTEGER },
                  semanas: { type: Type.STRING, description: "Ej. 'Semanas 1 y 2' o 'Semanas 3 y 4'" },
                  numSemanas: { type: Type.INTEGER },
                  numSesiones: { type: Type.INTEGER },
                  contenidoSintetico: { type: Type.STRING },
                  contenidoContextualizado: { type: Type.STRING },
                  pda: { type: Type.STRING },
                  justificacion: { type: Type.STRING },
                  ejesArticuladores: { type: Type.STRING }
                },
                required: [
                  "trimestre",
                  "semanas",
                  "numSemanas",
                  "numSesiones",
                  "contenidoSintetico",
                  "contenidoContextualizado",
                  "pda",
                  "justificacion",
                  "ejesArticuladores"
                ]
              }
            }
          },
          required: ["bloques"]
        }
      }
    });

    const parsed = JSON.parse((response.text ?? "{}").trim());
    return res.json({ bloques: parsed.bloques || [] });
  } catch (error) {
    console.error("[generate-analitico Error]:", error);
    return res.status(500).json({ error: error?.message || "Error al generar contextualización." });
  }
});

// ============================================================================
// ETAPA 3: PROPONER BLOQUES DE CODISEÑO CURRICULAR (TERCER PLANO)
// ============================================================================
app.post("/api/generate-codiseno", async (req, res) => {
  try {
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({ error: "GEMINI_API_KEY no disponible." });
    }

    const { escuela = {}, diagnostico = {}, promptExtra = "" } = req.body || {};

    const prompt = `
Propón 2 bloques de Codiseño Curricular (Tercer Plano del Programa Analítico NEM) para incorporar saberes o necesidades locales/regionales que no vienen explícitamente en el Programa Sintético nacional, pero son prioritarios para los alumnos.

Datos del Curso:
- Escuela: ${escuela.nombre} (${escuela.cct}) en ${escuela.municipio || "México"}
- Materia y Grado: ${escuela.asignatura} (${escuela.grado}, ${escuela.fase})
- Campo Formativo: ${escuela.campoFormativo}
- Diagnóstico Socioeducativo: ${diagnostico.comunidad || ""}
- Solicitud específica del docente para el Codiseño: ${promptExtra || "Atender necesidades reales de la comunidad y fortalecer habilidades fundamentales de la asignatura."}
`.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction:
          "Diseña bloques de Codiseño pertinentes para la Nueva Escuela Mexicana (trimestre = 4 para identificarlos como Codiseño). Responde en español.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bloquesCodiseno: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  semanas: { type: Type.STRING, description: "Ej. 'Codiseño 1 (1 Semana)'" },
                  numSemanas: { type: Type.INTEGER },
                  numSesiones: { type: Type.INTEGER },
                  contenidoSintetico: { type: Type.STRING, description: "Contenido de Codiseño Local" },
                  contenidoContextualizado: { type: Type.STRING },
                  pda: { type: Type.STRING, description: "PDA específico creado en Codiseño" },
                  justificacion: { type: Type.STRING, description: "Justificación comunitaria y pedagógica del Codiseño" },
                  ejesArticuladores: { type: Type.STRING }
                },
                required: [
                  "semanas",
                  "numSemanas",
                  "numSesiones",
                  "contenidoSintetico",
                  "contenidoContextualizado",
                  "pda",
                  "justificacion",
                  "ejesArticuladores"
                ]
              }
            }
          },
          required: ["bloquesCodiseno"]
        }
      }
    });

    const parsed = JSON.parse((response.text ?? "{}").trim());
    return res.json({ bloquesCodiseno: parsed.bloquesCodiseno || [] });
  } catch (error) {
    console.error("[generate-codiseno Error]:", error);
    return res.status(500).json({ error: error?.message || "Error al generar Codiseño." });
  }
});

// ============================================================================
// ETAPA 4: GENERAR PLAN DE CLASE COMPLETO DE UN BLOQUE DESDE ANALÍTICO/CODISEÑO
// ============================================================================
app.post("/api/generate-plan-bloque", async (req, res) => {
  try {
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({ error: "GEMINI_API_KEY no disponible." });
    }

    const { escuela = {}, diagnostico = {}, bloque = {}, promptExtra = "" } = req.body || {};
    const numSesiones = Math.min(10, Math.max(3, Number(bloque.numSesiones) || 5));

    const prompt = `
Eres el docente "${escuela.docente}" de la escuela "${escuela.nombre}" (CCT: ${escuela.cct}) ubicada en ${escuela.municipio || "México"}.
Impartes la materia de "${escuela.asignatura}" en ${escuela.grado} (${escuela.fase}), grupos ${escuela.grupos} (${escuela.turno}).

Con base en el Diagnóstico Socioeducativo y el Bloque del Programa Analítico / Codiseño (que ya incluye las ediciones del docente), genera el PLAN DE CLASE COMPLETO con ${numSesiones} sesiones secuenciales (Inicio 10 min, Desarrollo 30 min, Cierre 10 min) y sus Hojas de Actividad.

Contexto del Diagnóstico:
${diagnostico.comunidad || ""}

Datos del Bloque (Programa Analítico / Codiseño):
- ID: ${bloque.id} (${bloque.semanas})
- Contenido Sintético: ${bloque.contenidoSintetico}
- Contenido Contextualizado: ${bloque.contenidoContextualizado}
- PDA: ${bloque.pda}
- Justificación Pedagógica: ${bloque.justificacion || ""}
- Ejes Articuladores: ${bloque.ejesArticuladores || ""}
- Diagrama sugerido: ${bloque.diagramType || "concept_map"}
- Instrucción adicional del docente: ${promptExtra || "Desarrollar una progresión didáctica clara desde la indagación inicial hasta la aplicación práctica y evaluación formativa."}
`.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction:
          "Redacta las sesiones en primera persona del singular como planeación docente oficial NEM lista para el aula. Cada sesión debe incluir su hojaActividad con 3 actividades/ejercicios graduados y sus respuestas para el docente.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            periodo: { type: Type.STRING },
            tiempoRealizacion: { type: Type.STRING },
            evaluacionFormativa: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            sesiones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  numero: { type: Type.INTEGER },
                  semana: { type: Type.STRING },
                  titulo: { type: Type.STRING },
                  inicio: { type: Type.STRING },
                  desarrollo: { type: Type.STRING },
                  cierre: { type: Type.STRING },
                  hojaActividad: {
                    type: Type.OBJECT,
                    properties: {
                      tituloHoja: { type: Type.STRING },
                      instrucciones: { type: Type.STRING },
                      notaTeorica: { type: Type.STRING },
                      diagramType: { type: Type.STRING },
                      ejercicios: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            enunciado: { type: Type.STRING },
                            respuesta: { type: Type.STRING }
                          },
                          required: ["enunciado", "respuesta"]
                        }
                      },
                      boletoSalida: { type: Type.STRING }
                    },
                    required: [
                      "tituloHoja",
                      "instrucciones",
                      "notaTeorica",
                      "diagramType",
                      "ejercicios",
                      "boletoSalida"
                    ]
                  }
                },
                required: ["numero", "semana", "titulo", "inicio", "desarrollo", "cierre", "hojaActividad"]
              }
            }
          },
          required: ["periodo", "tiempoRealizacion", "evaluacionFormativa", "sesiones"]
        }
      }
    });

    const planGenerado = JSON.parse((response.text ?? "{}").trim());
    return res.json({ plan: planGenerado });
  } catch (error) {
    console.error("[generate-plan-bloque Error]:", error);
    return res.status(500).json({ error: error?.message || "Error al generar el Plan de Clase." });
  }
});

// ============================================================================
// ETAPA 5: SINCRONIZAR / GENERAR HOJAS DE ACTIVIDAD DESDE EL PLAN DE CLASE EDITADO
// ============================================================================
app.post("/api/sync-hojas-from-plan", async (req, res) => {
  try {
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({ error: "GEMINI_API_KEY no disponible." });
    }

    const { escuela = {}, bloque = {}, sesionesPlan = [], promptExtra = "" } = req.body || {};

    const resumenSesiones = sesionesPlan.map((s) => ({
      numero: s.numero,
      titulo: s.titulo,
      inicio: s.inicio,
      desarrollo: s.desarrollo,
      cierre: s.cierre,
      diagramType: s.hojaActividad?.diagramType || bloque.diagramType || "concept_map"
    }));

    const prompt = `
El docente "${escuela.docente}" (${escuela.nombre}, ${escuela.municipio || "México"}) ha diseñado y editado las siguientes sesiones en su Plan de Clase de la materia "${escuela.asignatura}" (${escuela.grado}):

- Bloque: ${bloque.semanas} · ${bloque.contenidoContextualizado}
- PDA: ${bloque.pda}
- Indicación extra para las hojas de actividad: ${promptExtra || "Alinear estrictamente cada hoja de actividad con lo que dice el Inicio, Desarrollo y Cierre de su sesión correspondiente."}

Sesiones actuales del Plan de Clase (respeta cada cambio hecho por el docente):
${JSON.stringify(resumenSesiones, null, 2)}

Genera la Hoja de Actividad actualizada para cada una de las sesiones listadas.
`.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction:
          "Diseña hojas de trabajo para el estudiante que reflejen con exactitud las actividades planteadas por el docente en cada sesión del Plan de Clase. Incluye 3 ejercicios/actividades claras con su respuesta para el docente y un boleto de salida.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hojasPorSesion: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  numero: { type: Type.INTEGER },
                  hojaActividad: {
                    type: Type.OBJECT,
                    properties: {
                      tituloHoja: { type: Type.STRING },
                      instrucciones: { type: Type.STRING },
                      notaTeorica: { type: Type.STRING },
                      diagramType: { type: Type.STRING },
                      ejercicios: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            enunciado: { type: Type.STRING },
                            respuesta: { type: Type.STRING }
                          },
                          required: ["enunciado", "respuesta"]
                        }
                      },
                      boletoSalida: { type: Type.STRING }
                    },
                    required: [
                      "tituloHoja",
                      "instrucciones",
                      "notaTeorica",
                      "diagramType",
                      "ejercicios",
                      "boletoSalida"
                    ]
                  }
                },
                required: ["numero", "hojaActividad"]
              }
            }
          },
          required: ["hojasPorSesion"]
        }
      }
    });

    const parsed = JSON.parse((response.text ?? "{}").trim());
    return res.json({ hojasPorSesion: parsed.hojasPorSesion || [] });
  } catch (error) {
    console.error("[sync-hojas-from-plan Error]:", error);
    return res.status(500).json({ error: error?.message || "Error al sincronizar hojas de actividad." });
  }
});

// ============================================================================
// GENERACIÓN DE UNA SESIÓN INDIVIDUAL (MULTI-MATERIA Y CONTEXTUALIZADA)
// ============================================================================
app.post("/api/generate-session", async (req, res) => {
  try {
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({
        error: "La clave GEMINI_API_KEY no está configurada en el servidor."
      });
    }

    const { bloqueInfo, contexto, customPrompt, nextSessionNumber, escuela = {} } = req.body || {};
    if (!bloqueInfo || !contexto) {
      return res.status(400).json({ error: "Faltan datos curriculares del bloque o contexto." });
    }

    const materia = escuela.asignatura || "Matemáticas";
    const grado = escuela.grado || "3° de Secundaria";
    const nombreEsc = escuela.nombre || "Escuela Secundaria General Abelardo L. Rodríguez";
    const municipio = escuela.municipio || "Guaymas, Sonora";

    const prompt = `
Eres un profesor experto de ${materia} de ${grado} en México bajo el modelo de la Nueva Escuela Mexicana (NEM), en la escuela ${nombreEsc} de ${municipio} (Grupos ${escuela.grupos || "3°G y 3°H"}, turno ${escuela.turno || "vespertino"}).
Genera UNA sesión didáctica completa (Inicio 10 min, Desarrollo 30 min, Cierre 10 min) y su respectiva Hoja de Actividad para el aula con 3 ejercicios/actividades graduadas y sus respuestas exactas.

Datos curriculares:
- Materia y Grado: ${materia} · ${grado}
- Bloque / Semanas: ${bloqueInfo.semanas}
- Contenido Sintético: ${bloqueInfo.contenidoSintetico}
- Contextualización: ${bloqueInfo.contenidoContextualizado}
- PDA: ${bloqueInfo.pda}
- Contexto local a utilizar: ${contexto.nombre} (${contexto.escenario}; elementos sugeridos: ${contexto.unidades})
- Instrucción específica del docente: ${customPrompt || "Generar 3 actividades o ejercicios claros, progresivos y retadores con solución paso a paso."}
- Número de sesión a asignar: ${nextSessionNumber || 6}
- Tipo de diagrama por defecto: ${bloqueInfo.diagramType || "algebra_rect"}
`.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: `Responde siempre en español con rigor pedagógico para ${materia} de ${grado} (NEM). Redacta las actividades de inicio, desarrollo y cierre en primera persona del singular como planeación docente lista para el aula.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            numero: { type: Type.INTEGER },
            semana: { type: Type.STRING },
            titulo: { type: Type.STRING },
            inicio: { type: Type.STRING },
            desarrollo: { type: Type.STRING },
            cierre: { type: Type.STRING },
            hojaActividad: {
              type: Type.OBJECT,
              properties: {
                tituloHoja: { type: Type.STRING },
                instrucciones: { type: Type.STRING },
                notaTeorica: { type: Type.STRING },
                diagramType: { type: Type.STRING },
                ejercicios: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      enunciado: { type: Type.STRING },
                      respuesta: { type: Type.STRING }
                    },
                    required: ["enunciado", "respuesta"]
                  }
                },
                boletoSalida: { type: Type.STRING }
              },
              required: [
                "tituloHoja",
                "instrucciones",
                "notaTeorica",
                "diagramType",
                "ejercicios",
                "boletoSalida"
              ]
            }
          },
          required: ["numero", "semana", "titulo", "inicio", "desarrollo", "cierre", "hojaActividad"]
        }
      }
    });

    const jsonText = (response.text ?? "{}").trim();
    const sessionObj = JSON.parse(jsonText);
    sessionObj.numero = nextSessionNumber || sessionObj.numero || 6;
    if (sessionObj.hojaActividad && !sessionObj.hojaActividad.diagramType) {
      sessionObj.hojaActividad.diagramType = bloqueInfo.diagramType || "algebra_rect";
    }

    return res.json({ session: sessionObj });
  } catch (error) {
    console.error("[Gemini API Error]:", error);
    return res.status(500).json({
      error: error?.message || "No fue posible generar la sesión con IA en el servidor."
    });
  }
});

// ============================================================================
// ETAPA 4 (MODALIDAD PROYECTO NEM): GENERAR PROYECTO POR FASES / MOMENTOS OFICIALES
// ============================================================================
app.post("/api/generate-proyecto-bloque", async (req, res) => {
  try {
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({ error: "GEMINI_API_KEY no disponible." });
    }

    const {
      escuela = {},
      diagnostico = {},
      bloque = {},
      metodologia = {},
      promptExtra = ""
    } = req.body || {};

    const fasesBase = Array.isArray(metodologia.fasesOficiales)
      ? metodologia.fasesOficiales
      : [];

    const prompt = `
Eres el docente "${escuela.docente}" de la escuela "${escuela.nombre}" (CCT: ${escuela.cct}) ubicada en ${escuela.municipio || "México"}.
Impartes la materia de "${escuela.asignatura}" en ${escuela.grado} (${escuela.fase}), Campo Formativo "${escuela.campoFormativo}", grupos ${escuela.grupos} (${escuela.turno}).

Diseña un PROYECTO DIDÁCTICO COMPLETO DE LA NUEVA ESCUELA MEXICANA (NEM) para este bloque utilizando la metodología sociocrítica oficial:
- Metodología elegida: ${metodologia.nombre || "Aprendizaje Basado en Indagación (STEAM como enfoque)"}
- Fases / Momentos oficiales que DEBES respetar en orden exacto (${fasesBase.length} fases):
${fasesBase.map((f, idx) => `  ${idx + 1}. ${f.faseClave}: ${f.descripcion}`).join("\n")}

Contexto del Diagnóstico Socioeducativo:
${diagnostico.comunidad || ""}

Datos del Bloque (Programa Analítico / Codiseño):
- ID: ${bloque.id} (${bloque.semanas}, ${bloque.numSesiones || 5} sesiones en total)
- Contenido Sintético: ${bloque.contenidoSintetico}
- Contenido Contextualizado: ${bloque.contenidoContextualizado}
- PDA: ${bloque.pda}
- Ejes Articuladores: ${bloque.ejesArticuladores || ""}
- Diagrama sugerido: ${bloque.diagramType || "concept_map"}
- Instrucción adicional del docente: ${promptExtra || "Desarrollar cada fase/momento con actividades claras para el docente y los alumnos, y generar una Hoja de Actividad completa por cada Fase/Momento del proyecto."}
`.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction:
          "Diseña el proyecto sociocrítico oficial de la NEM en español, respetando estrictamente las Fases o Momentos oficiales de la metodología indicada. Cada Fase/Momento debe incluir su propia hojaActividad con 3 ejercicios/actividades prácticas, guía de respuestas para el docente y boleto de salida/reflexión de la fase.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nombreProyecto: { type: Type.STRING },
            problematica: { type: Type.STRING },
            proposito: { type: Type.STRING },
            productoFinal: { type: Type.STRING },
            evaluacionFormativa: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            fases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  numero: { type: Type.INTEGER },
                  faseClave: { type: Type.STRING },
                  sesionesEstimadas: { type: Type.STRING },
                  actividades: { type: Type.STRING },
                  evidencia: { type: Type.STRING },
                  recursos: { type: Type.STRING },
                  hojaActividad: {
                    type: Type.OBJECT,
                    properties: {
                      tituloHoja: { type: Type.STRING },
                      instrucciones: { type: Type.STRING },
                      notaTeorica: { type: Type.STRING },
                      diagramType: { type: Type.STRING },
                      ejercicios: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            enunciado: { type: Type.STRING },
                            respuesta: { type: Type.STRING }
                          },
                          required: ["enunciado", "respuesta"]
                        }
                      },
                      boletoSalida: { type: Type.STRING }
                    },
                    required: [
                      "tituloHoja",
                      "instrucciones",
                      "notaTeorica",
                      "diagramType",
                      "ejercicios",
                      "boletoSalida"
                    ]
                  }
                },
                required: [
                  "numero",
                  "faseClave",
                  "sesionesEstimadas",
                  "actividades",
                  "evidencia",
                  "recursos",
                  "hojaActividad"
                ]
              }
            }
          },
          required: [
            "nombreProyecto",
            "problematica",
            "proposito",
            "productoFinal",
            "evaluacionFormativa",
            "fases"
          ]
        }
      }
    });

    const parsed = JSON.parse((response.text ?? "{}").trim());
    return res.json({ proyecto: parsed });
  } catch (error) {
    console.error("[generate-proyecto-bloque Error]:", error);
    return res.status(500).json({
      error: error?.message || "Error al generar el Proyecto NEM con IA."
    });
  }
});

// ============================================================================
// ETAPA 5 (MODALIDAD PROYECTO NEM): SINCRONIZAR HOJAS POR CADA FASE/MOMENTO DEL PROYECTO
// ============================================================================
app.post("/api/sync-hojas-from-proyecto", async (req, res) => {
  try {
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({ error: "GEMINI_API_KEY no disponible." });
    }

    const {
      escuela = {},
      bloque = {},
      proyecto = {},
      fasesTarget = [],
      promptExtra = ""
    } = req.body || {};

    const resumenFases = fasesTarget.map((f) => ({
      numero: f.numero,
      faseClave: f.faseClave,
      sesionesEstimadas: f.sesionesEstimadas,
      actividades: f.actividades,
      evidencia: f.evidencia,
      diagramType: f.hojaActividad?.diagramType || bloque.diagramType || "concept_map"
    }));

    const prompt = `
El docente "${escuela.docente}" (${escuela.nombre}, ${escuela.municipio || "México"}) ha diseñado y editado el siguiente Proyecto NEM en la materia "${escuela.asignatura}" (${escuela.grado}):

- Metodología NEM: ${proyecto.metodologiaNombre || "Proyecto NEM"}
- Nombre del Proyecto: ${proyecto.nombreProyecto || bloque.contenidoContextualizado}
- Problemática Comunitaria: ${proyecto.problematica || ""}
- Producto Final: ${proyecto.productoFinal || ""}
- PDA: ${bloque.pda}
- Indicación adicional: ${promptExtra || "Alinear cada Hoja de Actividad directamente con las actividades y evidencia parcial de su Fase o Momento del proyecto."}

Fases / Momentos del Proyecto (respeta los cambios hechos por el docente):
${JSON.stringify(resumenFases, null, 2)}

Genera la Hoja de Actividad actualizada para cada Fase o Momento listado.
`.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction:
          "Diseña una Hoja de Actividad por cada Fase o Momento del Proyecto NEM que guíe a los alumnos en las actividades e indagaciones de esa fase específica, con 3 ejercicios/actividades prácticas, guía de respuestas para el docente y reflexión/entregable de cierre de la fase.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hojasPorFase: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  numero: { type: Type.INTEGER },
                  hojaActividad: {
                    type: Type.OBJECT,
                    properties: {
                      tituloHoja: { type: Type.STRING },
                      instrucciones: { type: Type.STRING },
                      notaTeorica: { type: Type.STRING },
                      diagramType: { type: Type.STRING },
                      ejercicios: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            enunciado: { type: Type.STRING },
                            respuesta: { type: Type.STRING }
                          },
                          required: ["enunciado", "respuesta"]
                        }
                      },
                      boletoSalida: { type: Type.STRING }
                    },
                    required: [
                      "tituloHoja",
                      "instrucciones",
                      "notaTeorica",
                      "diagramType",
                      "ejercicios",
                      "boletoSalida"
                    ]
                  }
                },
                required: ["numero", "hojaActividad"]
              }
            }
          },
          required: ["hojasPorFase"]
        }
      }
    });

    const parsed = JSON.parse((response.text ?? "{}").trim());
    return res.json({ hojasPorFase: parsed.hojasPorFase || [] });
  } catch (error) {
    console.error("[sync-hojas-from-proyecto Error]:", error);
    return res.status(500).json({
      error: error?.message || "Error al sincronizar hojas de actividad del proyecto."
    });
  }
});

// Serve static files from the root directory (includes /app, /index.html, and PDFs)
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.redirect("/app/index.html");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
