// ============================================================================
// DATOS DEL PROGRAMA SINTÉTICO (FASE 6) Y PROGRAMA ANALÍTICO (MATEMÁTICAS 3°)
// Esc. Sec. General Abelardo L. Rodríguez | CCT: 26DES0010E | Guaymas, Sonora
// Docente: José Rafael Leyva García | Grupos: G, H | Turno: Vespertino
// ============================================================================

window.ProgramaAnaliticoData = {
  escuela: {
    nombre: "Abelardo L. Rodríguez",
    cct: "26DES0010E",
    zonaEscolar: "3",
    municipio: "Guaymas, Sonora, México",
    docente: "José Rafael Leyva García",
    disciplina: "Matemáticas 3° de Secundaria",
    campoFormativo: "Saberes y Pensamiento Científico",
    grado: "3°",
    grupos: "G, H",
    turno: "Vespertino",
    cicloEscolar: "2025-2026"
  },

  vinculacionTransversalDefault: {
    lenguajes: [
      "Comprender la importancia del lenguaje algebraico para expresarse en matemática y las posibilidades que ese lenguaje les ofrece.",
      "Se espera que escriban, representen y usen expresiones algebraicas, tablas y gráficas para designar y comunicar relaciones matemáticas."
    ],
    eticaNaturalezaSociedad: [
      "Reflexión crítica y responsable: referida a un conjunto de habilidades asociadas a la capacidad de reflexionar sobre tecnología y problemáticas de la comunidad de Guaymas, considerando criterios de impacto social y ambiental, de calidad, de efectividad, de respeto y ética."
    ],
    deLoHumanoYLoComunitario: [
      "Trabajar colaborativamente, lo que se refleja en el compromiso por la prosecución de los objetivos del equipo; en asumir responsabilidades en el grupo y establecer maneras de trabajo eficiente; en aceptar consejos y críticas, escuchando y respetando al otro para llegar a acuerdos; en tomar conciencia y superar las dificultades personales y del trabajo; en aprender de los errores; en solicitar y prestar ayuda a sus pares para el cumplimiento de las metas del trabajo."
    ]
  },

  diagnosticoSocioeducativo: {
    comunidad: "La Escuela Secundaria General Abelardo L. Rodríguez se ubica en la zona centro de Guaymas, Sonora (CCT 26DES0010E, Zona Escolar 03). Cuenta con turnos matutino y vespertino (618 alumnos: 297 hombres y 321 mujeres). El contexto socioeconómico es medio-bajo con actividades pesqueras tradicionales, comercio local y manufactura en maquiladoras. A pesar de retos comunitarios en colonias aledañas, el plantel goza de un entorno cercano con gimnasio municipal, biblioteca pública, casa de la cultura, malecón turístico y auditorio cívico, además de equipo USAER y clima escolar democrático que impulsa las habilidades socioemocionales.",
    areasPrioritarias: [
      {
        id: "AP1",
        titulo: "1. Resolución de Ecuaciones Cuadráticas en Contexto",
        descripcion: "Dificultad al aplicar factorización y fórmula general en problemas aplicados. Se refuerza conectando el álgebra con situaciones geométricas de cálculo de áreas y diseño."
      },
      {
        id: "AP2",
        titulo: "2. Proporcionalidad, Variación Funcional y Escala",
        descripcion: "Área de oportunidad en proporcionalidad directa e inversa, lectura de gráficas y factores de escala. Se prioriza el tránsito entre representaciones tabulares, gráficas y algebraicas."
      },
      {
        id: "AP3",
        titulo: "3. Conversión entre Fracciones, Decimales y Porcentajes",
        descripcion: "Necesidad de fortalecer la fluidez operativa con fracciones, decimales, signos y jerarquía de operaciones en problemas financieros y cotidianos."
      }
    ]
  },

  // Catálogo oficial del Programa Sintético Fase 6 (Matemáticas 3°)
  programaSinteticoFase6: [
    { id: "PS-01", contenido: "Introducción al álgebra", pda: "Representa algebraicamente áreas y volúmenes de cuerpos geométricos y calcula el valor de una variable en función de las otras." },
    { id: "PS-02", contenido: "Ecuaciones lineales y cuadráticas", pda: "Resuelve ecuaciones de la forma Ax² + Bx + C = 0 por factorización y fórmula general." },
    { id: "PS-03", contenido: "Ecuaciones lineales y cuadráticas", pda: "Resuelve problemas cuyo planteamiento es una ecuación cuadrática." },
    { id: "PS-04", contenido: "Funciones", pda: "Relaciona e interpreta la variación de dos cantidades a partir de su representación tabular, gráfica y algebraica." },
    { id: "PS-05", contenido: "Funciones", pda: "Explora diversos procedimientos para resolver problemas de reparto proporcional." },
    { id: "PS-06", contenido: "Construcción y propiedades de las figuras planas y cuerpos", pda: "Aplica las propiedades de la congruencia y semejanza de triángulos al construir y resolver problemas." },
    { id: "PS-07", contenido: "Construcción y propiedades de las figuras planas y cuerpos", pda: "Reconoce las propiedades de los sólidos." },
    { id: "PS-08", contenido: "Construcción y propiedades de las figuras planas y cuerpos", pda: "Explora la generación de sólidos de revolución a partir de figuras planas." },
    { id: "PS-09", contenido: "Construcción y propiedades de las figuras planas y cuerpos", pda: "Explora y construye desarrollos planos de diferentes figuras tridimensionales, cilindros, pirámides y conos." },
    { id: "PS-10", contenido: "Medición y cálculo en diferentes contextos", pda: "Usa diferentes estrategias para calcular el volumen de prismas, pirámides y cilindros." },
    { id: "PS-11", contenido: "Medición y cálculo en diferentes contextos", pda: "Formula, justifica y usa el teorema de Pitágoras al resolver problemas." },
    { id: "PS-12", contenido: "Medición y cálculo en diferentes contextos", pda: "Resuelve problemas utilizando las razones trigonométricas seno, coseno y tangente." },
    { id: "PS-13", contenido: "Medición y cálculo en diferentes contextos", pda: "Encuentra relaciones de volumen de la esfera, el cono y el cilindro." },
    { id: "PS-14", contenido: "Obtención y representación de información", pda: "Lee, interpreta y comunica información de cualquier tipo de gráficas." },
    { id: "PS-15", contenido: "Interpretación de la información a través de medidas de tendencia central y de dispersión", pda: "Determina y compara las medidas de tendencia central (media, mediana y moda) y de dispersión (rango y desviación media) de dos conjuntos de datos para tomar decisiones." },
    { id: "PS-16", contenido: "Azar y probabilidad", pda: "Identifica eventos independientes y dependientes y calcula su probabilidad de ocurrencia." },
    { id: "PS-17", contenido: "Azar y probabilidad", pda: "Calcula la probabilidad de ocurrencia de dos eventos mutuamente excluyentes y de eventos complementarios (regla de la suma)." },
    { id: "PS-18", contenido: "Azar y probabilidad", pda: "Calcula la probabilidad de ocurrencia de dos eventos independientes (regla del producto)." }
  ],

  // Bloques de Planeación (38 Semanas del Programa Analítico + 4 de Codiseño)
  bloquesCurriculares: [
    // ================= TRIMESTRE 1 =================
    {
      id: "B01",
      trimestre: 1,
      semanas: "Semana 1",
      periodoSugerido: "08 al 12 de septiembre",
      numSemanas: 1,
      numSesiones: 5,
      contenidoSintetico: "Expresión de fracciones como decimales y viceversa; Funciones; Operaciones y relaciones inversas; Medición y cálculo en diferentes contextos.",
      contenidoContextualizado: "Examen diagnóstico y repaso activo de contenidos fundamentales de 1° y 2° grado.",
      pda: "Usa diversas estrategias al convertir números fraccionarios a decimales y viceversa. Relaciona e interpreta relaciones proporcional y no proporcional. Reconoce el significado de las cuatro operaciones básicas con números con signo. Identifica y aplica la jerarquía de operaciones (PEMDAS). Determina el perímetro y área de figuras compuestas.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Consolidar los aprendizajes fundamentales detectados en el diagnóstico de los grupos 3°G y 3°H antes de abordar el álgebra y las ecuaciones de segundo grado.",
      orientacionesDidacticas: [
        "Estaciones de conversión fracción-decimal y problemas cotidianos.",
        "Comparación gráfica entre situaciones proporcionales (cine) y afines (taxi).",
        "Simulación financiera con números con signo ('Mi Semana de Emprendedor').",
        "Aplicación escalonada de la jerarquía de operaciones PEMDAS y análisis de errores.",
        "Descomposición geométrica de fachadas para área y perímetro."
      ],
      diagramType: "compound_lt"
    },
    {
      id: "B02",
      trimestre: 1,
      semanas: "Semanas 2 y 3",
      periodoSugerido: "14 al 25 de septiembre",
      numSemanas: 1,
      numSesiones: 5,
      contenidoSintetico: "Introducción al álgebra.",
      contenidoContextualizado: "Practiquemos el álgebra con distintas y variadas figuras geométricas de la vida real o inventadas.",
      pda: "Representa algebraicamente áreas y volúmenes de cuerpos geométricos y calcula el valor de una variable en función de las otras.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Las literales representan cantidades desconocidas o variables. Formular expresiones algebraicas de figuras y cuerpos geométricos permite verificar equivalencias algebraica y geométricamente.",
      orientacionesDidacticas: [
        "Modelar situaciones de medición de áreas y perímetros usando expresiones algebraicas.",
        "Sumar y restar áreas de figuras compuestas (marcos, jardines con casetas).",
        "Expresar el volumen de prismas rectos y cubos mediante monomios y polinomios.",
        "Sustituir y despejar variables en fórmulas de área y volumen.",
        "Resolver el reto integrador de diseño de un contenedor industrial."
      ],
      diagramType: "algebra_rect"
    },
    {
      id: "B03",
      trimestre: 1,
      semanas: "Semanas 4, 5 y 6",
      periodoSugerido: "02 al 22 de octubre",
      numSemanas: 3,
      numSesiones: 15,
      contenidoSintetico: "Ecuaciones lineales y cuadráticas.",
      contenidoContextualizado: "Practiquemos la resolución de ecuaciones cuadráticas usando técnicas de factorización, fórmula general y planteamiento de problemas comunitarios.",
      pda: "Resuelve ecuaciones de la forma Ax² + Bx + C = 0 por factorización y fórmula general. Resuelve problemas cuyo planteamiento es una ecuación cuadrática.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Conectar el álgebra con problemas geométricos y de diseño (como construir una caja sin tapa de volumen específico) dota de significado al uso de la propiedad del producto cero y la fórmula general.",
      orientacionesDidacticas: [
        "Semana 1 (Sesiones 1-5): Forma general Ax²+Bx+C=0, ecuaciones incompletas (puras y mixtas) y factorización de trinomios.",
        "Semana 2 (Sesiones 6-10): Deducción y aplicación sistemática de la Fórmula General y análisis del discriminante (b² - 4ac).",
        "Semana 3 (Sesiones 11-15): Proyecto práctico 'Diseñar una caja sin tapa' de 1000 cm³ a partir de una lámina de 30x20 cm."
      ],
      diagramType: "open_box"
    },
    {
      id: "B04",
      trimestre: 1,
      semanas: "Semanas 7 y 8",
      periodoSugerido: "23 de octubre al 05 de noviembre",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Funciones.",
      contenidoContextualizado: "Analicemos de manera cualitativa y cuantitativa diferentes formas de variación a partir de sus representaciones tabulares, gráficas y algebraicas.",
      pda: "Relaciona e interpreta la variación de dos cantidades a partir de su representación tabular, gráfica y algebraica.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "El tránsito fluido entre tabla, gráfica y regla algebraica (y = kx, y = mx + b, y = k/x y cuadrática) permite modelar costos de servicios, tarifas de transporte y fenómenos físicos.",
      orientacionesDidacticas: [
        "Semana 1 (Sesiones 1-5): Variables dependiente e independiente, tabulación, graficación en plano cartesiano y constante de proporcionalidad.",
        "Semana 2 (Sesiones 6-10): Regla algebraica y = mx + b (pendiente y ordenada al origen), variación inversa y análisis comparativo de planes."
      ],
      diagramType: "cartesian"
    },
    {
      id: "B05",
      trimestre: 1,
      semanas: "Semanas 9 y 10",
      periodoSugerido: "06 al 19 de noviembre",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Funciones (Reparto Proporcional).",
      contenidoContextualizado: "Representemos y analicemos diversos casos prácticos de nuestra comunidad mediante el uso del reparto proporcional directo e inverso.",
      pda: "Explora diversos procedimientos para resolver problemas de reparto proporcional.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Analizar la noción de justicia distributiva en el trabajo comunitario, cooperativas pesqueras y finanzas mediante el valor unitario, regla de tres y números recíprocos.",
      orientacionesDidacticas: [
        "Semana 1 (Sesiones 1-5): Reparto equitativo vs. proporcional directo, método del valor unitario y regla de tres en ganancias comunitarias.",
        "Semana 2 (Sesiones 6-10): Reparto proporcional inverso con recíprocos, debate de casos de justicia y proyecto del Huerto Escolar."
      ],
      diagramType: "cartesian_inversa"
    },

    // ================= TRIMESTRE 2 =================
    {
      id: "B06",
      trimestre: 2,
      semanas: "Semanas 11 y 12",
      periodoSugerido: "23 de noviembre al 04 de diciembre",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Construcción y propiedades de las figuras planas y cuerpos.",
      contenidoContextualizado: "Determinemos cuáles son los datos mínimos que se necesita saber para garantizar la semejanza de triángulos y medir distancias inaccesibles.",
      pda: "Aplica las propiedades de la congruencia y semejanza de triángulos al construir y resolver problemas.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "La ciencia forestal, la navegación en el puerto de Guaymas y la arquitectura requieren calcular alturas y distancias inaccesibles mediante criterios de semejanza (LLL, LAL, AA) y el Teorema de Tales.",
      orientacionesDidacticas: [
        "Semana 1 (Sesiones 1-5): Escalas, polígonos semejantes, razón de semejanza (k) y criterios LLL, LAL y AA.",
        "Semana 2 (Sesiones 6-10): Teorema de Tales, método de las sombras y del espejo en el patio escolar para medir alturas inaccesibles."
      ],
      diagramType: "similar_triangles"
    },
    {
      id: "B07",
      trimestre: 2,
      semanas: "Semanas 13 y 14",
      periodoSugerido: "07 al 18 de diciembre",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Construcción y propiedades de las figuras planas y cuerpos.",
      contenidoContextualizado: "Exploremos todas aquellas figuras geométricas sólidas que encontramos a nuestro alrededor y determinemos sus propiedades y cómo calcular su volumen.",
      pda: "Reconoce las propiedades de los sólidos.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Identificar las propiedades tridimensionales (caras, vértices, aristas, Teorema de Euler) en poliedros regulares, prismas, pirámides y cuerpos redondos presentes en el entorno.",
      orientacionesDidacticas: [
        "Clasificación de sólidos en poliedros (regulares, prismas, pirámides) y cuerpos redondos.",
        "Verificación experimental de la Fórmula de Euler (C + V - A = 2) y cálculo de áreas/volúmenes de sólidos compuestos."
      ],
      diagramType: "algebra_prisma"
    },
    {
      id: "B08",
      trimestre: 2,
      semanas: "Semanas 15 y 16",
      periodoSugerido: "07 al 18 de enero",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Construcción y propiedades de las figuras planas y cuerpos.",
      contenidoContextualizado: "Descubramos qué son los sólidos de revolución y las formas de calcular el volumen de estos cuerpos geométricos.",
      pda: "Explora la generación de sólidos de revolución a partir de figuras planas.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Comprender cómo la rotación de un rectángulo, un triángulo rectángulo y un semicírculo alrededor de un eje genera el cilindro, el cono y la esfera, así como el análisis de secciones cónicas.",
      orientacionesDidacticas: [
        "Generación física y visual de cilindros, conos y esferas rotando figuras planas adheridas a un eje.",
        "Análisis de cortes planos (paralelos, perpendiculares e inclinados) a cilindros y conos."
      ],
      diagramType: "solids_3d"
    },
    {
      id: "B09",
      trimestre: 2,
      semanas: "Semanas 17 y 18",
      periodoSugerido: "21 de enero al 01 de febrero",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Construcción y propiedades de las figuras planas y cuerpos.",
      contenidoContextualizado: "Comparemos la tercera dimensión que observamos en nuestra comunidad con figuras tridimensionales, como cilindros, pirámides y conos.",
      pda: "Explora y construye desarrollos planos de diferentes figuras tridimensionales, cilindros, pirámides y conos.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "En la industria conservera y de envases de Guaymas, diseñar latas cilíndricas y empaques cónicos o piramidales exige calcular con precisión el arco del sector circular y la cara lateral.",
      orientacionesDidacticas: [
        "Deducción de la relación entre el perímetro de la base circular (2πr) y el largo del rectángulo lateral del cilindro.",
        "Cálculo de la generatriz y del ángulo del sector circular para construir conos y pirámides exactos."
      ],
      diagramType: "solids_3d"
    },
    {
      id: "B10",
      trimestre: 2,
      semanas: "Semanas 19 y 20",
      periodoSugerido: "04 al 15 de febrero",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Medición y cálculo en diferentes contextos.",
      contenidoContextualizado: "Desarrollemos fórmulas para calcular el volumen de cilindros y conos, tomando como referencia las fórmulas de prismas y pirámides.",
      pda: "Usa diferentes estrategias para calcular el volumen de prismas, pirámides y cilindros.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Calcular la capacidad en litros y metros cúbicos de tinacos, silos pesqueros, cisternas y envases mediante las fórmulas de prismas, pirámides, cilindros y conos.",
      orientacionesDidacticas: [
        "Transición conceptual del volumen de un prisma poligonal al cilindro (V = πr²h) y de la pirámide al cono (V = πr²h / 3).",
        "Resolución de problemas de capacidad (1 m³ = 1000 L) y despeje de radio o altura."
      ],
      diagramType: "solids_3d"
    },
    {
      id: "B11",
      trimestre: 2,
      semanas: "Semanas 21 y 22",
      periodoSugerido: "18 de febrero al 01 de marzo",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Medición y cálculo en diferentes contextos.",
      contenidoContextualizado: "Proyecto STEAM: Indaguemos cómo se aplica el Teorema de Pitágoras en la comunidad.",
      pda: "Formula, justifica y usa el teorema de Pitágoras al resolver problemas.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "A través de las 5 Fases de Indagación STEAM, los estudiantes justifican geométrica y algebraicamente que c² = a² + b² y lo aplican en el trazado de terrenos, rampas y estructuras en Guaymas.",
      orientacionesDidacticas: [
        "Fase 1 y 2: Demostración visual de áreas cuadradas sobre los lados de un triángulo rectángulo y regla 3-4-5 de los albañiles.",
        "Fase 3, 4 y 5: Cálculo de hipotenusas y catetos en problemas reales y elaboración del Reporte de trazado de terrenos comunitarios."
      ],
      diagramType: "pythagoras"
    },
    {
      id: "B12",
      trimestre: 2,
      semanas: "Semanas 23 y 24",
      periodoSugerido: "04 al 15 de marzo",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Medición y cálculo en diferentes contextos.",
      contenidoContextualizado: "Analicemos algunas características y relaciones de las razones trigonométricas y resolvamos problemas en diversos contextos.",
      pda: "Resuelve problemas utilizando las razones trigonométricas seno, coseno y tangente.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Construir las razones seno, coseno y tangente permite calcular distancias marítimas a embarcaciones, ángulos de elevación de faros y rampas de accesibilidad.",
      orientacionesDidacticas: [
        "Identificación de cateto opuesto, cateto adyacente e hipotenusa respecto a un ángulo agudo θ.",
        "Aplicación de SOH-CAH-TOA, ángulos notables (30°, 45°, 60°) y resolución de problemas de ángulos de elevación y depresión."
      ],
      diagramType: "trigonometry"
    },

    // ================= TRIMESTRE 3 =================
    {
      id: "B13",
      trimestre: 3,
      semanas: "Semanas 25 y 26",
      periodoSugerido: "18 al 29 de marzo",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Medición y cálculo en diferentes contextos.",
      contenidoContextualizado: "Investiguemos y apliquemos el descubrimiento de Arquímedes sobre las relaciones entre los volúmenes de la esfera, el cilindro y el cono.",
      pda: "Encuentra relaciones de volumen de la esfera, el cono y el cilindro.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Comprender experimental y algebraicamente que un cono, una esfera y un cilindro de igual radio y altura (h = 2r) guardan la proporción exacta 1 : 2 : 3.",
      orientacionesDidacticas: [
        "Demostración del experimento de Arquímedes: V_cono : V_esfera : V_cilindro = 1 : 2 : 3.",
        "Deducción de la fórmula del volumen de la esfera V = (4/3)πr³ y resolución de problemas de boyas marinas y tanques esféricos."
      ],
      diagramType: "solids_3d"
    },
    {
      id: "B14",
      trimestre: 3,
      semanas: "Semanas 27 y 28",
      periodoSugerido: "13 al 24 de abril",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Obtención y representación de información.",
      contenidoContextualizado: "Exploremos las ventajas de saber leer, interpretar, elaborar, comparar y analizar diversos datos de nuestro entorno a través de cualquier tipo de gráficas.",
      pda: "Lee, interpreta y comunica información de cualquier tipo de gráficas.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Formar ciudadanos críticos capaces de organizar censos y datos comunitarios en tablas de frecuencias agrupadas, histogramas, polígonos de frecuencia y gráficas circulares.",
      orientacionesDidacticas: [
        "Agrupación de datos en intervalos, marcas de clase y construcción de histogramas y polígonos de frecuencia.",
        "Análisis comparativo de dos o más gráficas estadísticas sobre problemáticas de Guaymas (temperatura, pesca, consumo de agua)."
      ],
      diagramType: "statistics"
    },
    {
      id: "B15",
      trimestre: 3,
      semanas: "Semanas 29 y 30",
      periodoSugerido: "27 de abril al 08 de mayo",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Interpretación de la información a través de medidas de tendencia central y de dispersión.",
      contenidoContextualizado: "Realicemos una discusión sobre el uso y la importancia de la estadística para la resolución de problemas reales de nuestro entorno.",
      pda: "Determina y compara las medidas de tendencia central (media, mediana y moda) y de dispersión (rango y desviación media) de dos conjuntos de datos para tomar decisiones.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "La media aritmética por sí sola no basta para tomar decisiones; la desviación media permite evaluar la regularidad, confiabilidad y dispersión entre dos conjuntos de datos reales.",
      orientacionesDidacticas: [
        "Cálculo e interpretación conjunta de media, mediana, moda, rango y desviación media (DM).",
        "Toma de decisiones comparando dos grupos de datos (rendimiento deportivo, control de calidad en maquiladoras, salarios)."
      ],
      diagramType: "statistics"
    },
    {
      id: "B16",
      trimestre: 3,
      semanas: "Semanas 31 y 32",
      periodoSugerido: "11 al 22 de mayo",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Obtención de información y medidas de tendencia central y dispersión.",
      contenidoContextualizado: "Proyecto STEAM: Aprendamos a optimizar las ganancias y administrar los recursos (Educación financiera para adolescentes).",
      pda: "Lee, interpreta y comunica información de cualquier tipo de gráficas. Determina y compara las medidas de tendencia central y de dispersión de dos conjuntos de datos para tomar decisiones.",
      ejesArticuladores: "Pensamiento Crítico y Vida Saludable",
      justificacion: "Desarrollar hábitos de educación financiera familiar y juvenil analizando presupuestos, ahorro, crédito e inflación mediante gráficas y medidas estadísticas.",
      orientacionesDidacticas: [
        "Fases 1 a 3: Diagnóstico de ingresos y gastos familiares, análisis estadístico de precios e intereses.",
        "Fases 4 y 5: Propuesta de plan de ahorro y Mesa de Diálogo '¿Sabes gestionar tu economía? Educación financiera para adolescentes'."
      ],
      diagramType: "statistics"
    },
    {
      id: "B17",
      trimestre: 3,
      semanas: "Semanas 33 y 34",
      periodoSugerido: "25 de mayo al 05 de junio",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Azar y probabilidad.",
      contenidoContextualizado: "Calculemos la probabilidad de que ocurran sucesos dependientes e independientes bajo contextos locales o comunitarios.",
      pda: "Identifica eventos independientes y dependientes y calcula su probabilidad de ocurrencia.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Distinguir cuándo la ocurrencia de un evento altera la probabilidad del siguiente (extracciones con y sin reemplazo, pronósticos climáticos y toma de decisiones).",
      orientacionesDidacticas: [
        "Comparación entre probabilidad frecuencial y teórica (Regla de Laplace) y uso del diagrama de árbol.",
        "Análisis de eventos con reemplazo (independientes) vs. sin reemplazo (dependientes / probabilidad condicional)."
      ],
      diagramType: "probability"
    },
    {
      id: "B18",
      trimestre: 3,
      semanas: "Semanas 35 y 36",
      periodoSugerido: "08 al 19 de junio",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Azar y probabilidad.",
      contenidoContextualizado: "Descubramos lo que significa que dos eventos sean mutuamente excluyentes o complementarios desde un contexto real y comunitario.",
      pda: "Calcula la probabilidad de ocurrencia de dos eventos mutuamente excluyentes y de eventos complementarios (regla de la suma).",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Comprender el espacio muestral y aplicar la regla de la suma P(A o B) = P(A) + P(B) y la propiedad de eventos complementarios P(A') = 1 - P(A).",
      orientacionesDidacticas: [
        "Experimentos con dados, ruletas y sorteos comunitarios para distinguir eventos mutuamente excluyentes de los no excluyentes.",
        "Aplicación de la Regla de la Suma y cálculo ágil mediante eventos complementarios."
      ],
      diagramType: "probability"
    },
    {
      id: "B19",
      trimestre: 3,
      semanas: "Semanas 37 y 38",
      periodoSugerido: "22 de junio al 03 de julio",
      numSemanas: 2,
      numSesiones: 10,
      contenidoSintetico: "Azar y probabilidad.",
      contenidoContextualizado: "Decidamos si participamos en juegos de azar en nuestra comunidad escolar calculando la probabilidad de ocurrencia de dos eventos independientes.",
      pda: "Calcula la probabilidad de ocurrencia de dos eventos independientes (regla del producto).",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Desmitificar las falacias de los juegos de azar y sorteos aplicando la regla del producto P(A y B) = P(A) × P(B) y combinando reglas aditiva y multiplicativa en diagramas de árbol.",
      orientacionesDidacticas: [
        "Deducción de la Regla del Producto a lo largo de las ramas de un diagrama de árbol.",
        "Evaluación matemática de la equidad de juegos de feria y diseño de un juego justo para la kermés escolar."
      ],
      diagramType: "probability"
    },

    // ================= PLANO DE CODISEÑO =================
    {
      id: "COD01",
      trimestre: 4,
      semanas: "Codiseño 1",
      periodoSugerido: "Bloque de Codiseño I",
      numSemanas: 1,
      numSesiones: 5,
      contenidoSintetico: "Plano de Codiseño (Álgebra Geométrica).",
      contenidoContextualizado: "Desarrollemos los productos notables de manera concreta, pictórica y simbólica: transformando productos en sumas y viceversa.",
      pda: "Aplica la propiedad distributiva y desarrolla productos notables (binomio al cuadrado, binomios conjugados y con término común) mediante composición geométrica de áreas.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Fortalecer la base algebraica para la factorización y el ingreso a Educación Media Superior mediante el modelo concreto-pictórico-simbólico.",
      orientacionesDidacticas: [
        "Composición y descomposición de cuadrados y rectángulos para deducir (a+b)² = a² + 2ab + b², (a+b)(a-b) = a² - b² y (x+a)(x+b)."
      ],
      diagramType: "codiseno_sectors"
    },
    {
      id: "COD02",
      trimestre: 4,
      semanas: "Codiseño 2",
      periodoSugerido: "Bloque de Codiseño II",
      numSemanas: 1,
      numSesiones: 5,
      contenidoSintetico: "Plano de Codiseño (Geometría Analítica Inicial).",
      contenidoContextualizado: "Graficamos relaciones lineales en dos variables de la forma f(x,y) = ax + by (haces de rectas paralelas, líneas de nivel, olas en el mar de Guaymas).",
      pda: "Elabora tablas y gráficas para ecuaciones de la forma ax + by = c, reconociendo la pendiente m = -a/b y modelando curvas de nivel.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Conectar las funciones lineales con fenómenos topográficos y costeros de Guaymas (pendientes de cerros, techos inclinados y propagación de olas).",
      orientacionesDidacticas: [
        "Graficación de familias de rectas ax + by = c en el plano cartesiano e interpretación física de la pendiente y las curvas de nivel."
      ],
      diagramType: "cartesian"
    },
    {
      id: "COD03",
      trimestre: 4,
      semanas: "Codiseño 3",
      periodoSugerido: "Bloque de Codiseño III",
      numSemanas: 1,
      numSesiones: 5,
      contenidoSintetico: "Plano de Codiseño (Geometría Circular).",
      contenidoContextualizado: "Desarrollemos la fórmula del área y del perímetro de sectores y segmentos circulares a partir de ángulos centrales de 60°, 90°, 120° y 180°.",
      pda: "Deduce y aplica las expresiones de longitud de arco, área de sector circular y coronas circulares a partir de ángulos centrales.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Complementar el estudio de desarrollos planos de conos y diseño de piezas mecánicas y arquitectónicas circulares.",
      orientacionesDidacticas: [
        "Fraccionamiento del círculo en 2, 3, 4 y 6 partes iguales para deducir la longitud de arco L = (2πr·θ)/360° y el área del sector A = (πr²·θ)/360°."
      ],
      diagramType: "codiseno_sectors"
    },
    {
      id: "COD04",
      trimestre: 4,
      semanas: "Codiseño 4",
      periodoSugerido: "Bloque de Codiseño IV",
      numSemanas: 1,
      numSesiones: 5,
      contenidoSintetico: "Plano de Codiseño (Modelación y Teorema de Euclides).",
      contenidoContextualizado: "Apliquemos propiedades de semejanza y de proporcionalidad a modelos a escala en situaciones de la vida diaria y otras disciplinas.",
      pda: "Construye modelos a escala y verifica pictórica y algebraicamente el Teorema de Euclides sobre las proyecciones en un triángulo rectángulo.",
      ejesArticuladores: "Pensamiento Crítico",
      justificacion: "Integrar la semejanza de triángulos con el Teorema de la Altura y de los Catetos de Euclides (h² = p·q) y el diseño de maquetas a escala.",
      orientacionesDidacticas: [
        "Modelado a escala de espacios públicos de Guaymas y demostración de los teoremas de Euclides en triángulos rectángulos."
      ],
      diagramType: "similar_triangles"
    }
  ]
};
