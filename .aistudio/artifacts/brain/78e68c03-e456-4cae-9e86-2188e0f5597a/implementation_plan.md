# Plan de Evolución UX/UI y Flujo Pedagógico NEM con IA (Multi-Materia y Multi-Grado)

## 1. Objetivo General
Unificar todo el trabajo actual de **Matemáticas 3° de Secundaria (38 semanas, Esc. Sec. Gral. Abelardo L. Rodríguez)** dentro de una **Plataforma de Diseño Curricular y Planeación NEM con IA** que funcione para **cualquier Fase (Fases 2 a 6), Grado y Materia/Disciplina**.

El sistema guiará al docente a través de una **Barra Superior de 5 Etapas con libre navegación**, donde cada etapa construye y alimenta de contexto a la siguiente, permitiendo editar cualquier texto manualmente y asegurando que la IA tome siempre tus ediciones más recientes como contexto real.

---

## 2. Arquitectura de UX/UI: Flujo Encadenado en 5 Etapas

### Barra Superior de Proyectos y Stepper de 5 Pasos
- **Selector de Curso / Proyecto Activo (Esquina Superior):**
  - Incluye por defecto tu proyecto completo: **`Matemáticas 3° · Secundaria (Fase 6) · Esc. Sec. Abelardo L. Rodríguez (38 Semanas)`** con todas sus secuencias, sesiones y hojas intactas.
  - Botón **`+ Nuevo Curso / Materia`** para crear planeaciones de cualquier otra asignatura o grado (ej. *Español 1° Sec.*, *Ciencias 2° Sec. - Física*, *Historia 3° Sec.*, *Primaria Fase 3/4/5*, etc.) y cambiar entre cursos con un clic.
- **Barra de 5 Pasos en la Cabecera (Navegación Libre con Indicador de Estado):**
  1. **`1. Datos y Programa Sintético`** — Registro/selección inicial de **Escuela, Clave CCT, Nombre del Docente, Materia/Disciplina, Fase, Grado, Grupos, Turno y Localidad**, seguido de la subida de PDF del Programa Sintético (o selección del catálogo NEM precargado) y extracción de Contenidos y PDAs.
  2. **`2. Programa Analítico`** — Primer Plano (Diagnóstico Socioeducativo de la escuela/comunidad) y Segundo Plano (Contextualización y dosificación de los contenidos en bloques semanales por trimestre).
  3. **`3. Codiseño`** — Tercer Plano (Incorporación o adaptación de contenidos/PDAs locales o regionales justificados por la realidad escolar, integrados al cronograma anual).
  4. **`4. Planes de Clase`** — Plano Didáctico (Generación con IA bajo demanda por bloque o trimestre y edición de secuencias didácticas con Inicio, Desarrollo, Cierre, Transversalidad y Evaluación Formativa).
  5. **`5. Hojas de Actividad`** — Generación con IA y edición de hojas de trabajo por sesión basadas directamente en el Plan de Clase editado, con esquemas visuales/diagramas adaptados a la materia, guía docente y exportación a Word (`.doc`) y PDF (`.pdf`).

---

## 3. Experiencia Detallada por Etapa y Conexión Contextual con IA

### Etapa 1: Datos de Identificación + Programa Sintético (Catálogo NEM + Subida de PDF con IA)
- **Sección 1A — Ficha Inicial de Datos de la Escuela, Docente y Materia (Punto de Partida):**
  - El flujo comienza capturando o seleccionando de plantillas guardadas los datos oficiales que encabezarán todos los formatos e informarán el contexto de la IA:
    - **Nombre de la Escuela** (ej. *Esc. Sec. Gral. Abelardo L. Rodríguez* o cualquier nuevo plantel).
    - **Clave de la Escuela (CCT)** (ej. *26DES0010E*).
    - **Nombre del Docente** (ej. *Prof. José Rafael Leyva García*).
    - **Nivel / Fase NEM** (*Fase 2 Preescolar, Fase 3 Primaria 1°-2°, Fase 4 Primaria 3°-4°, Fase 5 Primaria 5°-6°, Fase 6 Secundaria 1°-3°*).
    - **Campo Formativo y Materia / Disciplina** (*Matemáticas, Español, Ciencias [Biología, Física, Química], Historia, Geografía, Formación Cívica y Ética, Inglés, Artes, Tecnología, Educación Física, Tutoría*, etc.).
    - **Grado, Grupos, Turno, Ciclo Escolar y Municipio/Estado** (ej. *3° Grado, Grupos 3°G y 3°H, Matutino, Guaymas, Sonora*).
- **Sección 1B — Doble Vía de Carga del Programa Sintético:**
  1. **Catálogo Oficial NEM Precargado (Fases 2 a 6):** Al elegir la Fase, Grado y Materia en los datos iniciales, se cargan automáticamente los Contenidos y PDAs oficiales de esa asignatura (además del acceso directo al `Programa_Sintetico_Fase_6.pdf` incluido en el proyecto).
  2. **Subida de Archivo PDF (Drag & Drop):** El docente puede subir cualquier PDF de Programa Sintético o documento curricular. El servidor procesa el PDF con Gemini (`application/pdf` multimodal) filtrando por la **Materia y Grado** seleccionados para extraer automáticamente la tabla de **Contenidos y PDAs**.
- **Edición en Etapa 1:** El docente puede activar/desactivar, editar o agregar Contenidos y PDAs antes de pasar al Programa Analítico.

### Etapa 2: Programa Analítico (1° y 2° Plano con IA)
- **Primer Plano (Lectura de la Realidad / Diagnóstico Socioeducativo):**
  - Editor de contexto comunitario, escolar y áreas prioritarias de aprendizaje (o botón **"Redactar/Enriquecer Diagnóstico con IA"** a partir de las características de la localidad y escuela).
- **Segundo Plano (Contextualización y Dosificación Anual):**
  - Botón **"Generar/Actualizar Contextualización por Trimestre con IA"**: Toma los Contenidos y PDAs de la Etapa 1 + el Diagnóstico Socioeducativo (incluyendo cualquier cambio manual) y propone la dosificación en bloques semanales con su *Contenido Contextualizado*, *Justificación Pedagógica* y *Ejes Articuladores*.
  - Tabla interactiva editable donde el docente puede modificar semanas, textos, orden de bloques o pedirle a la IA que re-contextualice un bloque específico.

### Etapa 3: Codiseño Curricular (3° Plano con IA)
- **Panel Dedicado de Codiseño:**
  - Muestra las problemáticas comunitarias o necesidades académicas detectadas en el Diagnóstico.
  - Botón **"Proponer Bloques de Codiseño con IA"**: Sugiere contenidos locales/regionales no previstos en el Programa Sintético, con su PDA específico, justificación comunitaria y semanas asignadas.
  - Controles para agregar manualmente nuevos bloques de Codiseño, editarlos e insertarlos en el calendario del curso.
  - Botón para exportar el documento oficial completo de **Programa Analítico + Codiseño** en Word (`.doc`) y PDF (`.pdf`).

### Etapa 4: Planes de Clase (Plano Didáctico conectado al Analítico y Codiseño)
- **Barra Lateral de Secuencias (Semanas / Trimestres + Codiseño):** Muestra todos los bloques del curso activo e indica cuáles ya tienen Plan de Clase detallado y cuáles están listos para generarse o actualizarse.
- **Generación IA Contextual Bajo Demanda:**
  - Botón **"Generar / Regenerar Plan de Clase de este Bloque con IA"** (y opción de generar por trimestre): Envía al servidor el **contexto encadenado real**: Datos de la escuela + Diagnóstico Socioeducativo editado + Contenido Sintético + Contenido Contextualizado/Codiseño editado + PDA + instrucciones del docente.
  - Genera todas las sesiones del bloque (5 o 10 sesiones según las semanas del bloque) con *Inicio (10 min)*, *Desarrollo (30 min)*, *Cierre (10 min)*, *Vinculación Transversal* y *Evaluación Formativa*.
- **Edición Manual Completa:** El docente puede editar cualquier sesión en pantalla, agregar/quitar sesiones y exportar el Plan de Clase en Word y PDF.

### Etapa 5: Hojas de Actividad (Conectadas al Plan de Clase Editado)
- **Sincronización con el Plan de Clase:**
  - Cada sesión del Plan de Clase tiene su Hoja de Actividad.
  - Si el docente modificó manualmente las actividades de una sesión en la Etapa 4 (o todo el bloque), cuenta con el botón **"Sincronizar / Generar Hoja(s) con IA desde el Plan de Clase"**: la IA lee el texto exacto de *Inicio, Desarrollo y Cierre* que el docente dejó en el Plan de Clase y genera la nota teórica, los ejercicios contextualizados, las respuestas para el docente y el boleto de salida en total coherencia con esa sesión.
- **Esquemas Visuales Multi-Materia:**
  - Además de los diagramas matemáticos actuales, se amplía el catálogo de esquemas SVG para otras asignaturas (organizadores gráficos, mapas conceptuales, líneas del tiempo, tablas comparativas, esquemas de método científico y diagramas causa-efecto).

---

## 4. Cambios Técnicos por Archivo

1. **`/app/data/catalogo_sintetico_nem.js` (Nuevo):**
   - Catálogo estructurado de Fases (2 a 6), Grados, Campos Formativos y Disciplinas con Contenidos y PDAs oficiales de la NEM listos para seleccionarse sin conexión o complementarse con PDF.
2. **`/server.js` (Actualización de Endpoints IA):**
   - `POST /api/parse-sintetico-pdf`: Recibe el PDF (en base64) + grado/materia y extrae Contenidos y PDAs estructurados en JSON usando Gemini (`gemini-3-flash-preview`).
   - `POST /api/generate-analitico`: Recibe los Contenidos/PDAs seleccionados + Diagnóstico Socioeducativo y genera/actualiza la contextualización trimestral.
   - `POST /api/generate-codiseno`: Propone bloques de Codiseño a partir del diagnóstico y contexto local.
   - `POST /api/generate-plan-bloque`: Genera el Plan de Clase completo de un bloque (y sus sesiones) tomando como contexto el Programa Analítico y Codiseño editados.
   - `POST /api/generate-hojas-from-plan`: Genera o actualiza las Hojas de Actividad tomando como insumo directo las actividades reales (editadas por el docente) del Plan de Clase.
3. **`/app/js/ai_generator.js` y `/app/js/svg_diagrams.js`:**
   - Cliente para los nuevos endpoints contextuales en cascada y plantillas de respaldo multi-materia.
   - Nuevos esquemas visuales SVG interdisciplinarios (línea del tiempo, mapa conceptual, cuadro comparativo, diagrama experimental) adicionales a los 9 geométricos/matemáticos existentes.
4. **`/app/index.html`, `/app/css/styles.css` y `/app/js/app.js`:**
   - Gestor multi-curso con persistencia en `localStorage` y exportación/importación JSON de todos los cursos.
   - Barra superior con el Stepper de 5 Etapas (`1. Sintético` → `2. Analítico` → `3. Codiseño` → `4. Plan de Clase` → `5. Hojas de Actividad`).
   - Vistas interactivas y editables para las Etapas 1, 2 y 3, e integración de las Etapas 4 y 5 con los botones de sincronización contextual con IA.
