import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

app.use(express.json({ limit: "2mb" }));

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

// Server-side endpoint for generating contextualized NEM math sessions
app.post("/api/generate-session", async (req, res) => {
  try {
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({
        error: "La clave GEMINI_API_KEY no está configurada en el servidor."
      });
    }

    const { bloqueInfo, contexto, customPrompt, nextSessionNumber } = req.body || {};
    if (!bloqueInfo || !contexto) {
      return res.status(400).json({ error: "Faltan datos curriculares del bloque o contexto." });
    }

    const prompt = `
Eres un profesor experto de Matemáticas de 3° de Secundaria en México bajo el modelo de la Nueva Escuela Mexicana (NEM), en la Escuela Secundaria General Abelardo L. Rodríguez de Guaymas, Sonora (Grupos 3°G y 3°H, turno vespertino).
Genera UNA sesión didáctica completa (Inicio 10 min, Desarrollo 30 min, Cierre 10 min) y su respectiva Hoja de Actividad para el aula con 3 ejercicios graduados y sus respuestas exactas.

Datos curriculares:
- Bloque / Semanas: ${bloqueInfo.semanas}
- Contenido Sintético: ${bloqueInfo.contenidoSintetico}
- Contextualización: ${bloqueInfo.contenidoContextualizado}
- PDA: ${bloqueInfo.pda}
- Contexto local de Guaymas a utilizar: ${contexto.nombre} (${contexto.escenario}; unidades sugeridas: ${contexto.unidades})
- Instrucción específica del docente: ${customPrompt || "Generar 3 ejercicios claros, progresivos y retadores con datos numéricos precisos y solución paso a paso."}
- Número de sesión a asignar: ${nextSessionNumber || 6}
- Tipo de diagrama por defecto: ${bloqueInfo.diagramType || "algebra_rect"}
`.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "Responde siempre en español con rigor matemático para 3° de secundaria (Fase 6 NEM). Redacta las actividades de inicio, desarrollo y cierre en primera persona del singular como planeación docente lista para el aula.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            numero: {
              type: Type.INTEGER,
              description: "Número consecutivo de la sesión."
            },
            semana: {
              type: Type.STRING,
              description: "Semana o semanas del bloque."
            },
            titulo: {
              type: Type.STRING,
              description: "Título atractivo y pedagógico de la sesión."
            },
            inicio: {
              type: Type.STRING,
              description: "Actividad de inicio (10 min) redactada en primera persona."
            },
            desarrollo: {
              type: Type.STRING,
              description: "Actividad de desarrollo (30 min) detallada en primera persona."
            },
            cierre: {
              type: Type.STRING,
              description: "Actividad de cierre (10 min) y verificación formativa."
            },
            hojaActividad: {
              type: Type.OBJECT,
              properties: {
                tituloHoja: {
                  type: Type.STRING,
                  description: "Título de la Hoja de Trabajo para el alumno."
                },
                instrucciones: {
                  type: Type.STRING,
                  description: "Instrucciones claras y directas para el estudiante."
                },
                notaTeorica: {
                  type: Type.STRING,
                  description: "Fórmula o recordatorio matemático clave."
                },
                diagramType: {
                  type: Type.STRING,
                  description: "Identificador del diagrama SVG del bloque."
                },
                ejercicios: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      enunciado: {
                        type: Type.STRING,
                        description: "Enunciado numerado del problema o ejercicio."
                      },
                      respuesta: {
                        type: Type.STRING,
                        description: "Procedimiento resumido y respuesta exacta para la guía docente."
                      }
                    },
                    required: ["enunciado", "respuesta"]
                  }
                },
                boletoSalida: {
                  type: Type.STRING,
                  description: "Pregunta o ejercicio breve de evaluación formativa de cierre."
                }
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
            "semana",
            "titulo",
            "inicio",
            "desarrollo",
            "cierre",
            "hojaActividad"
          ]
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

// Serve static files from the root directory (includes /app, /index.html, and PDFs)
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.redirect("/app/index.html");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
