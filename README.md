# Sistema de Planeación Didáctica y Hojas de Actividad · Matemáticas 3° (NEM Fase 6)

Sistema web interactivo y portable (*offline-first*) para la gestión curricular, diseño de secuencias didácticas y generación de hojas de trabajo de **Matemáticas 3° de Secundaria**, diseñado bajo los lineamientos oficiales de la **Nueva Escuela Mexicana (NEM)**.

- **Institución:** Escuela Secundaria General "Abelardo L. Rodríguez" (CCT: 26DES0010E)
- **Zona Escolar:** 03 · Guaymas, Sonora, México
- **Docente:** Prof. José Rafael Leyva García
- **Grupos:** 3°G y 3°H (Turno Vespertino)
- **Ciclo Escolar:** 2025 - 2026

---

## 🚀 Características Principales

### 1. 📋 Planes de Clase Oficiales (NEM Fase 6)
- Estructura institucional completa con vinculación transversal (*Lenguajes*, *Ética, Naturaleza y Sociedades*, *De lo Humano y lo Comunitario*).
- Formulación de secuencias didácticas divididas en **Inicio (10 min)**, **Desarrollo (30 min)** y **Cierre (10 min)**.
- Rúbricas de evaluación formativa con escala tripartita (*Logrado*, *Medianamente logrado*, *No logrado*).

### 2. 📝 Hojas de Actividad Imprimibles por Sesión
- Generación de cuadernillos y fichas individuales para el alumno con membrete oficial, espacio para operaciones y *Boletos de Salida* (*exit tickets*).
- **Modo Guía Docente**: Alternador para visualizar u ocultar las respuestas modelo y procedimientos esperados.
- **Diagramas Matemáticos SVG integrados**: Planos cartesianos graduados, parábolas, triángulos semejantes, cuerpos 3D, teorema de Pitágoras, trigonometría, estadística y diagramas de árbol de probabilidad.

### 3. 🗺️ Programa Analítico Anual y Codiseño
- Diagnóstico socioeducativo territorial del puerto y comunidad de Guaymas.
- Desglose curricular de las **38 semanas lectivas** organizadas en bloques trimestrales (T1, T2, T3).
- **4 Bloques de Codiseño** (Geometría Analítica, Sectores Circulares, Modelación a Escala y Teorema de Euclides).

### 4. ✏️ Edición en Vivo con Autoguardado
- Modificación directa de textos, fechas, actividades y ejercicios en pantalla (*contenteditable*) con persistencia en `localStorage`.

### 5. 📄 Exportación a Microsoft Word (.doc) y PDF
- Descarga de documentos con maquetación limpia.
- **Rasterización automática de SVGs a imágenes de alta definición**, garantizando compatibilidad total con Microsoft Word.

### 6. ✨ Generador Contextualizado & Asistente IA
- Generación de variantes de ejercicios contextualizados en la economía de Guaymas (sector pesquero/marítimo, malecón turístico, deportes y sector manufacturero).
- Integración opcional con la API de Google Gemini para redactar retos personalizados.

---

## 📂 Estructura del Repositorio

```text
├── Abrir_Sistema_Planeacion.bat   # Acceso directo para Windows
├── index.html                     # Redirección automática a la aplicación
├── README.md                      # Documentación del proyecto
├── .gitignore
├── Matematicas 3 1T Rafael Leyva.pdf                # Documento fuente curricular
├── Programa Analitico Matematicas 3 Rafael Leyva ALR.pdf # Programa analítico fuente
├── Programa_Sintetico_Fase_6.pdf                    # Catálogo sintético nacional
└── app/
    ├── index.html                 # Interfaz principal de la aplicación
    ├── css/
    │   └── styles.css             # Estilos oficiales (paleta guinda/dorado institucional)
    ├── data/
    │   ├── programa_analitico_data.js     # Catálogo curricular y diagnóstico
    │   ├── planeaciones_trimestre1.js     # Secuencias didácticas Trimestre 1
    │   └── planeaciones_trimestre2_y_3.js # Secuencias didácticas Trimestres 2, 3 y Codiseño
    └── js/
        ├── app.js                 # Controlador principal y gestión de estado
        ├── session_expander.js    # Expansor pedagógico de sesiones
        ├── svg_diagrams.js        # Generador de gráficos y figuras geométricas SVG
        ├── export_docx.js         # Motor de exportación a Word y PDF
        └── ai_generator.js        # Motor de contextualización e integración Gemini
```

---

## 💻 Instrucciones de Uso

### Opción 1: En tu computadora (Offline / Local)
1. Clona este repositorio o descarga el código como archivo ZIP:
   ```bash
   git clone https://github.com/Tralph89/planeacion.git
   ```
2. En Windows, haz doble clic sobre el archivo **`Abrir_Sistema_Planeacion.bat`** (o abre directamente `app/index.html` en tu navegador favorito: Chrome, Edge, Firefox).
3. No requiere instalar Node.js, Python ni configurar ningún servidor local.

### Opción 2: En línea (GitHub Pages)
Si activas GitHub Pages en la configuración del repositorio (`Settings` > `Pages` > `Deploy from a branch` > `main` / `root`), podrás acceder a la aplicación desde cualquier navegador, tableta o teléfono móvil.

---

## 🛠️ Tecnologías Empleadas
- **HTML5 & CSS3** (Variables CSS, Flexbox, Grid y media queries `@media print`).
- **JavaScript Moderno (ES6+)** (Vanilla JS modular sin dependencias externas).
- **SVG Dinámico & Canvas API** (Renderizado vectorial e interpolación de imágenes).
- **Google Gemini API** (Opcional, modelo `gemini-1.5-flash`).

---

## 📜 Licencia y Derechos
Desarrollado para fines educativos y de planeación docente en la **Esc. Sec. Gral. Abelardo L. Rodríguez**.
Libre para uso pedagógico y adaptaciones dentro de la comunidad escolar.
