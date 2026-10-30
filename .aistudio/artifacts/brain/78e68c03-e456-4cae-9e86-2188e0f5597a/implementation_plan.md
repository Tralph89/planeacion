# Plan de Implementación: Modalidad Dual en Planes de Clase (Por Sesiones vs. Por Proyectos Sociocríticos NEM)

## 1. Objetivo
Permitir que en la **Etapa 4 (`4. Planes de Clase`)** cada bloque o secuencia curricular pueda organizarse y generarse en cualquiera de estas **dos modalidades**, a elección del docente:

1. **Por Sesiones de Clase (Secuencia Didáctica Diaria):** La estructura actual organizada por sesiones de 50 minutos con **Inicio (10 min)**, **Desarrollo (30 min)** y **Cierre (10 min)**.
2. **Por Proyectos Sociocríticos de la NEM (Las 4 Metodologías Oficiales):** Estructurado directamente por las **Fases, Etapas o Momentos oficiales** de la metodología seleccionada, e integrado con la **Etapa 5 (`5. Hojas de Actividad`)** para generar **una Hoja de Actividad por cada Fase/Momento del Proyecto**.

---

## 2. Las 4 Metodologías Oficiales de la NEM y sus Fases / Momentos

Al elegir la modalidad **Por Proyecto NEM**, el docente podrá seleccionar (con sugerencia automática según el Campo Formativo de la materia) cualquiera de las **4 metodologías oficiales de la SEP**:

1. **Aprendizaje Basado en Indagación (STEAM como enfoque)** *(Sugerido para Saberes y Pensamiento Científico)*:
   - **Fase 1:** Introducción al tema, uso de conocimientos previos e identificación de la problemática.
   - **Fase 2:** Diseño de investigación y desarrollo de la indagación.
   - **Fase 3:** Organizar y estructurar las respuestas a las preguntas específicas de indagación.
   - **Fase 4:** Presentación de los resultados de indagación y aplicación.
   - **Fase 5:** Metacognición (reflexión sobre los aprendizajes y procedimientos realizados).

2. **Aprendizaje Basado en Proyectos Comunitarios (ABPC)** *(Sugerido para Lenguajes)*:
   - **Fase 1 · Planeación:** Identificación, Recuperación y Planificación.
   - **Fase 2 · Acción:** Acercamiento, Comprensión y producción, Reconocimiento y Concreción.
   - **Fase 3 · Intervención:** Integración, Difusión, Consideraciones y Avances.

3. **Aprendizaje Basado en Problemas (ABP)** *(Sugerido para Ética, Naturaleza y Sociedades)*:
   - **Momento 1 · Presentemos:** Planteamiento de la reflexión inicial situada en el contexto.
   - **Momento 2 · Recolectemos:** Exploración y recuperación de saberes sociales y escolares.
   - **Momento 3 · Formulemos el problema:** Determinación clara del problema e inquietudes de los alumnos.
   - **Momento 4 · Organicemos la experiencia:** Ruta de trabajo, argumentos y posibles soluciones.
   - **Momento 5 · Vivamos la experiencia:** Indagación específica e intervención grupal/comunitaria.
   - **Momento 6 · Resultados y análisis:** Divulgación de hallazgos, acuerdos y evaluación del proceso.

4. **Aprendizaje Servicio (AS)** *(Sugerido para De lo Humano y lo Comunitario)*:
   - **Etapa 1:** Punto de partida (sensibilización e interés comunitario).
   - **Etapa 2:** Lo que sé y lo que quiero saber (diagnóstico participativo).
   - **Etapa 3:** Organicemos las actividades (articulación pedagógica y de servicio).
   - **Etapa 4:** Creatividad en marcha (puesta en práctica del proyecto de servicio).
   - **Etapa 5:** Compartimos y evaluamos lo aprendido (evaluación de resultados académicos y comunitarios).

---

## 3. Experiencia de Usuario (UX/UI) en las Etapas 4 y 5

### A. Selector de Modalidad en Etapa 4 (`4. Planes de Clase`)
- En el panel superior de la Etapa 4 se agregará un **Selector de Modalidad de Planeación del Bloque**:
  - **`Por Sesiones de Clase (Inicio / Desarrollo / Cierre)`** *(vista tradicional por sesión diaria)*.
  - **`Por Proyecto NEM (Fases y Momentos Oficiales)`** + selector desplegable de las **4 Metodologías NEM** (*STEAM por Indagación*, *Proyectos Comunitarios ABPC*, *Basado en Problemas ABP*, *Aprendizaje Servicio AS*).
- Al cambiar un bloque a **Por Proyecto NEM**:
  - Se genera (o adapta instantáneamente) la estructura oficial del proyecto para ese bloque: **Nombre del Proyecto**, **Problemática / Situación Comunitaria**, **Propósito del Proyecto**, **Producto / Entregable Final** y la tabla oficial con cada una de las **Fases / Momentos de la metodología elegida** (incluyendo sesiones/tiempo estimado, actividades docentes y estudiantiles, evidencias parciales y recursos).
  - El botón de IA permite **"Generar / Actualizar Proyecto NEM con IA"** tomando como contexto los datos de la escuela, el Diagnóstico Socioeducativo, el Contenido Contextualizado/Codiseño y la metodología seleccionada.
  - Todo el contenido del proyecto (nombre, problemática, producto final y cada Fase/Momento) es **100% editable en pantalla** y exportable a **Word (`.doc`)** y **PDF (`.pdf`)** con formato institucional de la NEM.
  - Si el docente regresa a **Por Sesiones de Clase**, se conserva intacta su secuencia de sesiones diarias con Inicio, Desarrollo y Cierre.

### B. Adaptación Automática en Etapa 5 (`5. Hojas de Actividad`)
- Cuando el bloque activo está configurado **Por Sesiones de Clase**, el Paso 5 muestra y genera una Hoja de Actividad por cada **Sesión diaria** (como funciona actualmente).
- Cuando el bloque activo está configurado **Por Proyecto NEM**, el Paso 5 se adapta automáticamente:
  - La barra de navegación de hojas muestra las **Fases / Momentos del Proyecto** (ej. *Fase 1: Introducción*, *Fase 2: Indagación*, ..., *Ver Todas las Fases*).
  - Cada **Fase o Momento** cuenta con su propia **Hoja de Actividad del Proyecto** (con guía metodológica de esa fase, esquema visual/organizador gráfico, actividades prácticas de indagación/desarrollo del proyecto, guía de respuestas para el docente y entregable/avance de la fase).
  - El botón **"Sincronizar Hojas con el Proyecto (IA)"** toma las Fases/Momentos editados por el docente en la Etapa 4 y actualiza las hojas de trabajo de cada fase.

---

## 4. Archivos a Modificar
1. **`/server.js`:**
   - Ampliar `/api/generate-plan-bloque` y `/api/generate-hojas-from-plan` (o agregar soporte de `modalidadPlaneacion` y `metodologiaProyecto`) para que Gemini genere tanto secuencias por sesiones como proyectos completos con las Fases/Momentos exactos de las 4 metodologías NEM y sus hojas de trabajo por fase.
2. **`/app/js/ai_generator.js`:**
   - Incorporar el catálogo de las **4 metodologías oficiales NEM** con sus Fases/Momentos, generador local inteligente de proyectos y de hojas de actividad por fase/momento, y conexión con el backend IA.
3. **`/app/js/app.js` y `/app/css/styles.css`:**
   - Selector de modalidad (`Por Sesiones` vs. `Por Proyecto NEM`) y selector de metodología en la Etapa 4.
   - Renderizado editable del documento oficial de **Planeación por Proyecto NEM** (Ficha del proyecto + Tabla de Fases/Momentos + Evaluación Formativa) y sincronización con la Etapa 5 (**Hojas de Actividad por Fase/Momento**) y con Firebase Firestore.

