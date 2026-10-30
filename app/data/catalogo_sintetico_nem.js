// ============================================================================
// CATÁLOGO OFICIAL DE PROGRAMAS SINTÉTICOS (NUEVA ESCUELA MEXICANA - FASES 2 A 6)
// Incluye Fases, Grados, Campos Formativos, Disciplinas y Contenidos/PDAs base
// para cualquier materia y grado, además de soporte para extracción vía PDF.
// ============================================================================

window.CatalogoSinteticoNEM = {
  fases: [
    {
      id: "Fase 6",
      nombre: "Fase 6 · Educación Secundaria (1°, 2° y 3°)",
      grados: ["1° de Secundaria", "2° de Secundaria", "3° de Secundaria"],
      materias: [
        {
          id: "matematicas",
          nombre: "Matemáticas",
          campoFormativo: "Saberes y Pensamiento Científico",
          diagramDefault: "algebra_rect"
        },
        {
          id: "espanol",
          nombre: "Español (Lengua Materna)",
          campoFormativo: "Lenguajes",
          diagramDefault: "concept_map"
        },
        {
          id: "ciencias_biologia",
          nombre: "Ciencias I (Énfasis en Biología)",
          campoFormativo: "Saberes y Pensamiento Científico",
          diagramDefault: "scientific_method"
        },
        {
          id: "ciencias_fisica",
          nombre: "Ciencias II (Énfasis en Física)",
          campoFormativo: "Saberes y Pensamiento Científico",
          diagramDefault: "scientific_method"
        },
        {
          id: "ciencias_quimica",
          nombre: "Ciencias III (Énfasis en Química)",
          campoFormativo: "Saberes y Pensamiento Científico",
          diagramDefault: "scientific_method"
        },
        {
          id: "historia",
          nombre: "Historia",
          campoFormativo: "Ética, Naturaleza y Sociedades",
          diagramDefault: "timeline"
        },
        {
          id: "geografia",
          nombre: "Geografía",
          campoFormativo: "Ética, Naturaleza y Sociedades",
          diagramDefault: "cause_effect"
        },
        {
          id: "fce",
          nombre: "Formación Cívica y Ética",
          campoFormativo: "Ética, Naturaleza y Sociedades",
          diagramDefault: "comparative_table"
        },
        {
          id: "ingles",
          nombre: "Lengua Extranjera (Inglés)",
          campoFormativo: "Lenguajes",
          diagramDefault: "comparative_table"
        },
        {
          id: "artes",
          nombre: "Artes",
          campoFormativo: "Lenguajes",
          diagramDefault: "concept_map"
        },
        {
          id: "tecnologia",
          nombre: "Tecnología",
          campoFormativo: "De lo Humano y lo Comunitario",
          diagramDefault: "cause_effect"
        },
        {
          id: "educacion_fisica",
          nombre: "Educación Física",
          campoFormativo: "De lo Humano y lo Comunitario",
          diagramDefault: "concept_map"
        }
      ]
    },
    {
      id: "Fase 5",
      nombre: "Fase 5 · Educación Primaria Alta (5° y 6°)",
      grados: ["5° de Primaria", "6° de Primaria"],
      materias: [
        { id: "primaria_spc", nombre: "Saberes y Pensamiento Científico (Matemáticas y Ciencias)", campoFormativo: "Saberes y Pensamiento Científico", diagramDefault: "algebra_rect" },
        { id: "primaria_lenguajes", nombre: "Lenguajes (Español y Expresión Artística)", campoFormativo: "Lenguajes", diagramDefault: "concept_map" },
        { id: "primaria_ens", nombre: "Ética, Naturaleza y Sociedades (Historia, Geografía y Civismo)", campoFormativo: "Ética, Naturaleza y Sociedades", diagramDefault: "timeline" },
        { id: "primaria_hyc", nombre: "De lo Humano y lo Comunitario", campoFormativo: "De lo Humano y lo Comunitario", diagramDefault: "cause_effect" }
      ]
    },
    {
      id: "Fase 4",
      nombre: "Fase 4 · Educación Primaria Media (3° y 4°)",
      grados: ["3° de Primaria", "4° de Primaria"],
      materias: [
        { id: "primaria_spc", nombre: "Saberes y Pensamiento Científico (Matemáticas y Ciencias)", campoFormativo: "Saberes y Pensamiento Científico", diagramDefault: "algebra_rect" },
        { id: "primaria_lenguajes", nombre: "Lenguajes (Español y Expresión Artística)", campoFormativo: "Lenguajes", diagramDefault: "concept_map" },
        { id: "primaria_ens", nombre: "Ética, Naturaleza y Sociedades", campoFormativo: "Ética, Naturaleza y Sociedades", diagramDefault: "timeline" },
        { id: "primaria_hyc", nombre: "De lo Humano y lo Comunitario", campoFormativo: "De lo Humano y lo Comunitario", diagramDefault: "cause_effect" }
      ]
    },
    {
      id: "Fase 3",
      nombre: "Fase 3 · Educación Primaria Baja (1° y 2°)",
      grados: ["1° de Primaria", "2° de Primaria"],
      materias: [
        { id: "primaria_spc", nombre: "Saberes y Pensamiento Científico", campoFormativo: "Saberes y Pensamiento Científico", diagramDefault: "algebra_rect" },
        { id: "primaria_lenguajes", nombre: "Lenguajes (Lectoescritura y Expresión)", campoFormativo: "Lenguajes", diagramDefault: "concept_map" },
        { id: "primaria_ens", nombre: "Ética, Naturaleza y Sociedades", campoFormativo: "Ética, Naturaleza y Sociedades", diagramDefault: "cause_effect" },
        { id: "primaria_hyc", nombre: "De lo Humano y lo Comunitario", campoFormativo: "De lo Humano y lo Comunitario", diagramDefault: "comparative_table" }
      ]
    },
    {
      id: "Fase 2",
      nombre: "Fase 2 · Educación Preescolar (1°, 2° y 3°)",
      grados: ["1° de Preescolar", "2° de Preescolar", "3° de Preescolar"],
      materias: [
        { id: "preescolar_integrado", nombre: "Campos Formativos Integrados (Preescolar)", campoFormativo: "Saberes y Pensamiento Científico / Lenguajes", diagramDefault: "concept_map" }
      ]
    }
  ],

  // Contenidos y PDAs oficiales por disciplina para poblar el Programa Sintético
  contenidosPorMateria: {
    espanol: [
      {
        contenido: "La diversidad de lenguas y su uso en la comunicación familiar, escolar y comunitaria.",
        pda: "Analiza y reconoce algunas variantes lingüísticas de la lengua española, para valorarla como riqueza cultural y fortalecer la identidad comunitaria.",
        ejesSugeridos: "Interculturalidad crítica y Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 2
      },
      {
        contenido: "Textos de divulgación científica y argumentativos sobre problemáticas del entorno.",
        pda: "Elabora una propuesta de divulgación científica o ensayo argumentativo con la participación de la comunidad escolar, para fomentar el conocimiento de las ciencias y el pensamiento crítico.",
        ejesSugeridos: "Pensamiento crítico y Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 2
      },
      {
        contenido: "Los géneros periodísticos y sus recursos para comunicar sucesos significativos familiares, escolares, comunitarios y sociales.",
        pda: "Analiza los sucesos más significativos de su comunidad y los comunica empleando las características de los géneros periodísticos de opinión y crónica.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 2
      },
      {
        contenido: "Comunicación asertiva y dialógica para erradicar expresiones de violencia en la escuela y la comunidad.",
        pda: "Discute de forma colectiva y diseña una estrategia sobre la importancia de sensibilizar a la comunidad acerca de la convivencia pacífica y la erradicación de la violencia.",
        ejesSugeridos: "Igualdad de género e Inclusión",
        semanasSugeridas: 2
      },
      {
        contenido: "Creaciones literarias tradicionales y contemporáneas de la región.",
        pda: "Crea textos narrativos, poéticos, dramáticos o guiones audiovisuales a partir de recursos literarios para exponer situaciones reales o ficticias de su comunidad.",
        ejesSugeridos: "Artes y experiencias estéticas",
        semanasSugeridas: 2
      },
      {
        contenido: "Mensajes para promover una vida saludable, expresados en medios comunitarios o masivos de comunicación.",
        pda: "Construye narrativas y campañas acerca de una vida saludable haciendo uso del lenguaje audiovisual y las transmite por medios comunitarios o escolares.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 2
      }
    ],
    ciencias_quimica: [
      {
        contenido: "Los hitos que contribuyeron al avance del conocimiento científico y tecnológico en el ámbito nacional e internacional.",
        pda: "Reconoce los aportes de saberes de diferentes pueblos y culturas en la satisfacción de necesidades humanas en diversos ámbitos (medicina, construcción, artesanías, textiles y alimentos).",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 2
      },
      {
        contenido: "Las propiedades extensivas e intensivas, como una forma de identificar sustancias y materiales de uso común.",
        pda: "Formula hipótesis para diferenciar propiedades extensivas e intensivas mediante actividades experimentales y, con base en el análisis de resultados, elabora conclusiones.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 2
      },
      {
        contenido: "Composición de las mezclas y su clasificación en homogéneas y heterogéneas, así como métodos de separación.",
        pda: "Describe los componentes de una mezcla (soluto – disolvente) y aplica métodos de separación (evaporación, decantación, filtración, extracción, cromatografía y destilación) en contextos cotidianos.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 2
      },
      {
        contenido: "La Tabla periódica: criterios de clasificación de los elementos químicos y sus propiedades (electronegatividad, energía de ionización y radio atómico).",
        pda: "Reconoce la presencia y predominancia de algunos elementos químicos que conforman a los seres vivos, la Tierra y el Universo, así como su ubicación en la Tabla periódica.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 2
      },
      {
        contenido: "Las reacciones químicas: manifestaciones, propiedades e interpretación de las ecuaciones químicas con base en la Ley de conservación de la materia.",
        pda: "Representa reacciones mediante modelos tridimensionales y ecuaciones químicas, con base en el lenguaje científico y la Ley de la conservación de la materia.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 2
      },
      {
        contenido: "Propiedades de ácidos y bases, reacciones de neutralización y modelo de Arrhenius.",
        pda: "Distingue las propiedades de ácidos y bases en su entorno a partir de indicadores e interpreta la escala de acidez y basicidad (pH).",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 2
      }
    ],
    ciencias_fisica: [
      {
        contenido: "El pensamiento científico, una forma de plantear y solucionar problemas y su incidencia en la transformación de la sociedad.",
        pda: "Describe problemas comunes de la vida cotidiana explicando cómo se procede para buscarles solución, conoce y caracteriza el pensamiento científico para plantearse y resolver problemas en la escuela y su cotidianeidad.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 2
      },
      {
        contenido: "Interacciones en fenómenos relacionados con la fuerza y el movimiento.",
        pda: "Identifica los elementos y los diferentes tipos de movimiento relacionados con la velocidad y aceleración y realiza experimentos sencillos; representa e interpreta las Leyes de Newton en situaciones cotidianas.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 2
      },
      {
        contenido: "Principios de Pascal y de Arquímedes en fenómenos cotidianos y marítimos.",
        pda: "Experimenta e interpreta las interacciones de la fuerza y el movimiento relacionados con los principios de Pascal y de Arquímedes, para explicar actividades cotidianas y de navegación.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 2
      },
      {
        contenido: "Saberes y prácticas para el aprovechamiento de energías y la sustentabilidad.",
        pda: "Analiza las características de la energía mecánica (cinética y potencial) y describe casos donde se conserva, así como el aprovechamiento de la energía solar y limpia en su comunidad.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 2
      }
    ],
    ciencias_biologia: [
      {
        contenido: "Funcionamiento del cuerpo humano coordinado por los sistemas nervioso y endocrino.",
        pda: "Explica la participación de los sistemas nervioso y endocrino en la coordinación de las funciones del cuerpo humano y reconoce el papel general de las hormonas.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 2
      },
      {
        contenido: "La biodiversidad como expresión del cambio de los seres vivos en el tiempo y su importancia cultural y ecológica.",
        pda: "Analiza información acerca del estado de la biodiversidad local a partir de fuentes directas, orales, escritas, audiovisuales o internet, expone razones sobre su importancia y propone acciones para su cuidado.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 2
      },
      {
        contenido: "El calentamiento global como una consecuencia de la alteración de los ciclos biogeoquímicos en los ecosistemas.",
        pda: "Representa la transferencia de materia y energía entre los organismos de un ecosistema mediante redes y pirámides tróficas y analiza las implicaciones del cuidado ambiental.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 2
      },
      {
        contenido: "Prevención de enfermedades relacionadas con la alimentación y el consumo de alimentos ultraprocesados.",
        pda: "Identifica causas de la obesidad y la diabetes relacionadas con la dieta y el sedentarismo a fin de formular su proyecto de vida saludable.",
        ejesSugeridos: "Vida saludable",
        semanasSugeridas: 2
      }
    ],
    historia: [
      {
        contenido: "Los albores de la humanidad, las revoluciones modernas y sus tendencias históricas.",
        pda: "Establece relaciones de cambio, continuidad y/o ruptura en el desarrollo histórico y explica las causas y consecuencias de los movimientos sociales en México y el mundo.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 2
      },
      {
        contenido: "Las gestas de resistencia y los movimientos independentistas y revolucionarios en México.",
        pda: "Relaciona la revolución de Independencia y la Revolución Mexicana con las demandas sociales de tierra, libertad, justicia y soberanía en su región.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 2
      },
      {
        contenido: "Las tensiones en el siglo XX y la construcción del México contemporáneo.",
        pda: "Analiza y comprende la causalidad de los procesos de industrialización, migración y desarrollo regional en el siglo XX y sus huellas en la comunidad actual.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 2
      },
      {
        contenido: "Las mujeres y sus historias en la construcción de la sociedad.",
        pda: "Indaga sobre el protagonismo social de las mujeres en diferentes procesos históricos nacionales y regionales, para reconocer la relevancia de su participación.",
        ejesSugeridos: "Igualdad de género y Pensamiento crítico",
        semanasSugeridas: 2
      }
    ],
    geografia: [
      {
        contenido: "El espacio geográfico como una construcción social y colectiva.",
        pda: "Comprende que el espacio geográfico se conforma de interrelaciones sociedad-naturaleza y distingue la distribución de las regiones bioculturales y económicas en su entidad.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 2
      },
      {
        contenido: "La distribución y dinámica de las aguas continentales y oceánicas en la Tierra.",
        pda: "Analiza la distribución de las aguas continentales y oceánicas en México y el mundo, y valora la importancia de las cuencas hidrológicas y litorales marítimos para el desarrollo económico.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 2
      },
      {
        contenido: "Los riesgos de desastre, su relación con los procesos naturales y la vulnerabilidad de la población en lugares específicos.",
        pda: "Relaciona los efectos ambientales, sociales y económicos de los fenómenos hidrometeorológicos y sísmicos, y participa en acciones de prevención en su escuela y localidad.",
        ejesSugeridos: "Vida saludable e Inclusión",
        semanasSugeridas: 2
      }
    ],
    fce: [
      {
        contenido: "Grupos sociales y culturales en la conformación de las identidades juveniles.",
        pda: "Promueve espacios de participación juvenil, presenciales o virtuales, para construir comunidades que promuevan la colaboración, el respeto y el ejercicio de los derechos de niñas, niños y adolescentes.",
        ejesSugeridos: "Inclusión e Igualdad de género",
        semanasSugeridas: 2
      },
      {
        contenido: "Los derechos humanos en México y en el mundo como valores compartidos por las sociedades actuales.",
        pda: "Debate acerca de la importancia de defender y exigir el respeto a los derechos humanos, como un reto de las sociedades actuales para vivir con dignidad, libertad, justicia e inclusión.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 2
      },
      {
        contenido: "El conflicto en la convivencia humana desde la cultura de paz.",
        pda: "Valora la resolución pacífica de conflictos sociales y escolares a partir de la cultura de paz, el diálogo y la mediación comunitaria.",
        ejesSugeridos: "Inclusión y Pensamiento crítico",
        semanasSugeridas: 2
      }
    ],
    ingles: [
      {
        contenido: "La diversidad lingüística y sus formas de expresión en México y el mundo en lengua inglesa.",
        pda: "Utiliza diversos tipos de texto y medios de comunicación en inglés para expresar y difundir prácticas culturales y describir su comunidad.",
        ejesSugeridos: "Interculturalidad crítica y Apropiación de las culturas",
        semanasSugeridas: 2
      },
      {
        contenido: "Relatos en inglés para expresar sucesos significativos familiares, escolares, comunitarios y sociales.",
        pda: "Recupera un acontecimiento histórico o cotidiano comunitario y elabora un texto oral y escrito en inglés, para expresar su postura de manera estructurada.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 2
      },
      {
        contenido: "Mensajes en inglés en medios de comunicación masiva, que promuevan una vida saludable.",
        pda: "Cuenta historias y diseña carteles informativos en inglés sobre ejemplos de vida saludable y cuidado del entorno.",
        ejesSugeridos: "Vida saludable",
        semanasSugeridas: 2
      }
    ]
  },

  // Devuelve los Contenidos y PDAs para cualquier materia seleccionada
  getContenidosForMateria(materiaId, gradoNombre = "3° de Secundaria") {
    if (materiaId === "matematicas" && window.ProgramaAnaliticoData) {
      // Extraer los contenidos sintéticos oficiales del programa de Matemáticas
      return window.ProgramaAnaliticoData.bloquesCurriculares
        .filter((b) => b.trimestre <= 3)
        .map((b, idx) => ({
          id: `CS-${String(idx + 1).padStart(2, "0")}`,
          contenido: b.contenidoSintetico,
          pda: b.pda,
          ejesSugeridos: b.ejesArticuladores,
          semanasSugeridas: b.numSemanas || 2,
          trimestreSugerido: b.trimestre || 1,
          seleccionado: true
        }));
    }

    const baseList = this.contenidosPorMateria[materiaId] || [
      {
        contenido: `Saberes fundamentales de la disciplina (${gradoNombre}) y su aplicación en el entorno comunitario.`,
        pda: `Analiza, comprende y resuelve situaciones reales de su escuela y localidad aplicando los conceptos y metodologías de la asignatura en ${gradoNombre}.`,
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 2
      },
      {
        contenido: `Investigación e indagación sobre problemáticas socioambientales y culturales de la región.`,
        pda: `Diseña y desarrolla proyectos colaborativos con base en fuentes confiables para proponer soluciones a retos reales de su comunidad.`,
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 2
      },
      {
        contenido: `Comunicación, representación y argumentación de hallazgos en el aula y la escuela.`,
        pda: `Socializa los resultados de sus actividades mediante producciones escritas, visuales o experimentales, valorando la diversidad de ideas.`,
        ejesSugeridos: "Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 2
      },
      {
        contenido: `Proyecto integrador comunitario vinculado con los Ejes Articuladores de la NEM.`,
        pda: `Evalúa de manera formativa el impacto de las propuestas desarrolladas en el trimestre y reflexiona sobre su proceso de aprendizaje.`,
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 2
      }
    ];

    return baseList.map((item, idx) => ({
      id: `CS-${String(idx + 1).padStart(2, "0")}`,
      contenido: item.contenido,
      pda: item.pda,
      ejesSugeridos: item.ejesSugeridos || "Pensamiento crítico",
      semanasSugeridas: item.semanasSugeridas || 2,
      trimestreSugerido: (idx % 3) + 1,
      seleccionado: true
    }));
  }
};
