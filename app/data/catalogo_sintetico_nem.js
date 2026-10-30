// ============================================================================
// CATÁLOGO OFICIAL DE PROGRAMAS SINTÉTICOS (NUEVA ESCUELA MEXICANA - FASES 2 A 6)
// Incluye todos los Contenidos y Procesos de Desarrollo de Aprendizaje (PDA)
// oficiales de la SEP por disciplina y fase (incluyendo los 14 Contenidos
// oficiales completos de Geografía, Español, Biología, Física, Química,
// Historia, Formación Cívica y Ética, Inglés, Artes, Tecnología y Educación Física).
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

  // Contenidos y PDAs oficiales completos por disciplina (SEP Fase 6 y Fases 2-5)
  contenidosPorMateria: {
    // =========================================================================
    // GEOGRAFÍA (FASE 6 - 14 CONTENIDOS OFICIALES COMPLETOS SEP)
    // =========================================================================
    geografia: [
      {
        contenido: "1. El espacio geográfico como una construcción social y colectiva.",
        pda: "Comprende que el espacio geográfico se conforma de interrelaciones sociedad-naturaleza. Reconoce que el patrimonio biocultural es resultado de la relación entre las formas de organización económico-social, la cultura y la biodiversidad a través del tiempo. Distingue la distribución de las principales regiones bioculturales en México y el mundo.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Las categorías de análisis espacial y representaciones del espacio geográfico.",
        pda: "Reconoce saberes ancestrales acerca del espacio geográfico, formas de ubicación y representaciones en México y el mundo. Comprende las categorías de análisis espacial para explicar las características del espacio geográfico: lugar, región, paisaje y territorio. Utiliza los conceptos de localización, distribución, diversidad, temporalidad y cambio e interacción para el estudio del espacio geográfico.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. La distribución y dinámica de las aguas continentales y oceánicas en la Tierra.",
        pda: "Analiza la distribución de las aguas continentales en México y el mundo: principales ríos, lagos, aguas subterráneas, llanuras inundables y humedales. Reconoce la importancia de las cuencas hidrográficas como un sistema para el desarrollo económico en México, así como para la conservación del agua y tierra. Valora el mar territorial, la zona económica exclusiva de México y sus litorales, como recursos que contribuyen al desarrollo del país, lo que fortalece la conciencia marítima.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "4. La relación de las placas tectónicas con el relieve, la sismicidad y el vulcanismo.",
        pda: "Identifica qué son las placas tectónicas, cuáles son sus características y dinámica. Argumenta la relación entre las placas tectónicas con las regiones sísmicas y volcánicas en México y el mundo, para fortalecer la cultura de la prevención. Relaciona los movimientos de las placas tectónicas con la distribución del relieve de la superficie terrestre y reconoce otros agentes que lo modelan.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "5. Los riesgos de desastre, su relación con los procesos naturales y la vulnerabilidad de la población en lugares específicos.",
        pda: "Identifica que los desastres pueden ser originados por procesos naturales o por las actividades humanas. Relaciona los efectos ambientales, sociales y económicos de los desastres recientes en México y el mundo, tomando en cuenta la vulnerabilidad de la población. Valora la importancia de consolidar una cultura de prevención de desastres con la participación de instituciones, organismos y sociedad.",
        ejesSugeridos: "Vida saludable, Pensamiento crítico e Inclusión",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "6. Crecimiento, distribución, composición y migración de la población.",
        pda: "Analiza las implicaciones sociales, ambientales y económicas del crecimiento, distribución y composición de la población en diferentes países, con base en información estadística y cartográfica. Emplea las nociones de concentración y dispersión de la población para explicar los rasgos y problemas del espacio urbano y el rural. Distingue la movilidad como un derecho humano, las causas y consecuencias de la migración interna y externa, y su impacto socioeconómico y cultural.",
        ejesSugeridos: "Inclusión, Interculturalidad crítica y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Los procesos productivos y sus consecuencias ambientales y sociales en la comunidad, México y el mundo.",
        pda: "Compara procesos productivos y espacios económicos en México y el mundo, a partir de estadísticas y representaciones cartográficas, para reconocer sus implicaciones sociales, económicas y ambientales. Analiza y relaciona distintos procesos productivos sustantivos en la conformación social, económica y espacial de las sociedades a nivel mundial, para identificar sus contradicciones y desigualdades.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "8. Las prácticas de producción, distribución y consumo sustentables como alternativas para preservar el medio ambiente y asegurar el bienestar de las generaciones presentes y futuras.",
        pda: "Comprende qué es la sustentabilidad e identifica prácticas de producción, distribución y consumo sustentables. Argumenta sobre prácticas sustentables de producción, distribución y consumo que pueden contribuir al bienestar de la comunidad y de México. Propone alternativas sustentables de desarrollo social para la preservación del medio ambiente y el bienestar de las generaciones presentes y futuras.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "9. Las desigualdades socioeconómicas en México y el mundo, y sus efectos en la calidad de vida de las personas.",
        pda: "Comprende qué son las desigualdades socioeconómicas e identifica sus efectos y repercusiones en la vida de las personas. Argumenta las desigualdades socioeconómicas en México y el mundo, mediante la interpretación del Índice de Desarrollo Humano (IDH) y el Índice para una vida mejor, para explicar sus efectos en la calidad de vida. Propone acciones para reducir las desigualdades socioeconómicas en la comunidad, México y el mundo.",
        ejesSugeridos: "Inclusión, Igualdad de género y Pensamiento crítico",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "10. Los conflictos territoriales actuales en México y el mundo, y sus implicaciones ambientales y sociales.",
        pda: "Debate acerca de la multicausalidad de los conflictos territoriales en México y el mundo, la importancia de la ubicación geográfica de las partes involucradas y las consecuencias ambientales, sociales, económicas y políticas en México y el mundo. Promueve alternativas de resolución justa y pacífica a los conflictos territoriales que afectan a la comunidad, a México y al mundo.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "11. Los retos sociales y ambientales en la comunidad, en México y el mundo.",
        pda: "Reconoce cómo las problemáticas sociales y ambientales afectan a la comunidad. Asume responsabilidad como agente de cambio para encontrar soluciones a las problemáticas sociales y ambientales de la comunidad.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "12. La diversidad de grupos sociales y culturales en México.",
        pda: "Reconoce la diversidad de pueblos originarios, afromexicanos, migrantes, grupos urbanos, grupos sociales en México, como parte de la identidad nacional pluricultural y la compara con la diversidad social y cultural en el mundo. Valora la importancia del espacio en la conformación de las identidades juveniles.",
        ejesSugeridos: "Interculturalidad crítica e Inclusión",
        semanasSugeridas: 2,
        trimestreSugerido: 3
      },
      {
        contenido: "13. El suelo, recurso estratégico para la seguridad alimentaria y la vida en el planeta.",
        pda: "Indaga sobre el origen, los usos y los problemas del suelo en la localidad. Reflexiona acerca de la contradicción que existe entre los países con suelo de vocación agrícola y la poca productividad asociada con los problemas del suelo (sobreexplotación, degradación, pérdida, entre otros). Comparte alternativas para la protección y recuperación del suelo y colabora de manera organizada y solidaria en acciones comunitarias orientadas a ese fin en la localidad donde vive.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "14. El reto del cambio climático.",
        pda: "Reconoce las relaciones e interacciones entre los elementos y los factores del clima como base para comprender, de manera general, la distribución de las regiones naturales en la Tierra, y analizar la biodiversidad en el mundo. Indaga y analiza de manera crítica los cambios ocurridos en el clima, sus causas y consecuencias en México y el mundo. Asume una postura crítica y activa ante los fenómenos derivados del calentamiento global y el cambio climático.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // ESPAÑOL / LENGUA MATERNA (FASE 6 - 14 CONTENIDOS OFICIALES COMPLETOS SEP)
    // =========================================================================
    espanol: [
      {
        contenido: "1. La diversidad de lenguas y su uso en la comunicación familiar, escolar y comunitaria.",
        pda: "Reconoce la riqueza lingüística de México y el mundo, a partir de obras literarias procedentes de distintas culturas y analiza variantes lingüísticas de la lengua española para valorarla como riqueza cultural.",
        ejesSugeridos: "Interculturalidad crítica y Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "2. La diversidad étnica, cultural y lingüística de México a favor de una sociedad intercultural.",
        pda: "Comprende las ideas centrales y secundarias de textos relacionados con la diversidad étnica, cultural y lingüística, que favorecen una sociedad intercultural, para comentarlas en forma oral y escrita.",
        ejesSugeridos: "Interculturalidad crítica e Inclusión",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Las lenguas como manifestación de la identidad y del sentido de pertenencia.",
        pda: "Describe en un texto cómo el lenguaje oral manifiesta las identidades personal y colectiva, para reconocer lo común y lo diferente.",
        ejesSugeridos: "Interculturalidad crítica y Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "4. El dinamismo de las lenguas y su relevancia como patrimonio cultural.",
        pda: "Identifica y expresa la relevancia de valorar las lenguas como legado de la comunidad y analiza neologismos, juegos de lenguajes, caló, jerga, préstamos lingüísticos y extranjerismos como parte del dinamismo de la lengua española.",
        ejesSugeridos: "Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "5. Estudio de la lengua indígena de situaciones sociocomunicativas e intereses comunitarios.",
        pda: "Identifica una situación problemática de la comunidad, haciendo uso del pensamiento crítico, para plantear diversas formas creativas de resolverla, por ejemplo, con un cuento o una crónica.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "6. La función creativa del español en la expresión de necesidades e intereses comunitarios.",
        pda: "Expresa, mediante un ensayo o texto argumentativo, una postura crítica sobre necesidades, intereses y problemas de la comunidad, e investiga acciones colectivas a favor de la inclusión.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Los elementos y los recursos estéticos de la lengua española en la literatura oral y escrita.",
        pda: "Reconoce los recursos estéticos en textos literarios líricos, orales y escritos, y disfruta de poemas, canciones y juegos de palabras, entre otros.",
        ejesSugeridos: "Artes y experiencias estéticas y Apropiación de las culturas",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "8. Textos literarios escritos en español o traducidos.",
        pda: "Reconoce el valor estético de diversos géneros literarios en textos de su libre elección, para elaborar comentarios que promuevan su lectura.",
        ejesSugeridos: "Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "9. Creaciones literarias tradicionales y contemporáneas.",
        pda: "Recupera y clasifica creaciones literarias de la comunidad o de un lugar de interés, como mitos, leyendas, fábulas, epopeyas y cantares de gesta, para promover de manera creativa su lectura.",
        ejesSugeridos: "Artes y experiencias estéticas e Interculturalidad crítica",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "10. Recursos literarios en lengua española para expresar sensaciones, emociones, sentimientos e ideas vinculados con las familias, la escuela y la comunidad.",
        pda: "Identifica recursos literarios en lengua española y los emplea en la elaboración de cartas personales y biografías, para expresar sensaciones, emociones, sentimientos e ideas que experimenta en su entorno familiar, escolar o comunitario.",
        ejesSugeridos: "Inclusión y Apropiación de las culturas",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "11. Los géneros periodísticos y sus recursos para comunicar sucesos significativos familiares, escolares, comunitarios y sociales.",
        pda: "Identifica sucesos significativos familiares, escolares, comunitarios y sociales que forman parte de la memoria colectiva y los comunica haciendo uso de las características de los géneros periodísticos informativos y de opinión.",
        ejesSugeridos: "Pensamiento crítico y Apropiación de las culturas",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "12. Comunicación asertiva y dialógica para erradicar expresiones de violencia.",
        pda: "Realiza, de manera colectiva, una propuesta oral o por escrito, para promover acciones que posibiliten erradicar la violencia en las familias y la escuela. Elabora solicitudes de gestión de espacios y recursos para dar a conocer la propuesta.",
        ejesSugeridos: "Igualdad de género, Inclusión y Pensamiento crítico",
        semanasSugeridas: 2,
        trimestreSugerido: 3
      },
      {
        contenido: "13. Mensajes para promover una vida saludable, expresados en medios comunitarios o masivos de comunicación.",
        pda: "Identifica las características y recursos de mensajes que promueven una vida saludable a través de los diferentes medios comunitarios o masivos de comunicación impresos o audiovisuales.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 2,
        trimestreSugerido: 3
      },
      {
        contenido: "14. Textos de divulgación científica y manifestaciones culturales y artísticas que favorecen una sociedad incluyente.",
        pda: "Identifica las características del texto de divulgación científica y elabora uno; reconoce manifestaciones culturales y artísticas creadas o ejecutadas por personas con alguna discapacidad, para distinguir sus valores estéticos y creativos.",
        ejesSugeridos: "Pensamiento crítico, Inclusión y Artes y experiencias estéticas",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // CIENCIAS I: BIOLOGÍA (FASE 6 - 9 CONTENIDOS OFICIALES COMPLETOS SEP)
    // =========================================================================
    ciencias_biologia: [
      {
        contenido: "1. Funcionamiento del cuerpo humano coordinado por los sistemas nervioso y endocrino.",
        pda: "Explica la participación de los sistemas nervioso y endocrino en la coordinación de las funciones del cuerpo humano, reconoce el papel general de las hormonas y sus efectos en la maduración sexual y en la reproducción. Explica los efectos del consumo de sustancias adictivas en el sistema nervioso y en el funcionamiento integral del cuerpo humano.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 4,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Salud sexual y reproductiva: prevención de infecciones de transmisión sexual y del embarazo en adolescentes.",
        pda: "Compara las maneras en que la cultura influye en el concepto de sexualidad; reconoce que todas las culturas tienen maneras distintas de comprender el género, la sexualidad y la reproducción. Cuestiona creencias, estereotipos y costumbres que impactan negativamente en la salud sexual y reproductiva de las niñas y mujeres, y compara la efectividad de los métodos anticonceptivos.",
        ejesSugeridos: "Igualdad de género, Vida saludable e Inclusión",
        semanasSugeridas: 4,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Prevención de enfermedades relacionadas con la alimentación y el consumo de alimentos ultraprocesados.",
        pda: "Identifica causas de la obesidad y la diabetes relacionadas con la dieta y el sedentarismo a fin de formular su proyecto de vida saludable, incluye factores protectores y propone acciones para reducir factores de riesgo, incluyendo su entorno familiar y comunitario.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 4,
        trimestreSugerido: 1
      },
      {
        contenido: "4. La diversidad de saberes e intercambio de conocimientos acerca de los seres vivos y las relaciones con el medio ambiente.",
        pda: "Reconoce la importancia de los conocimientos, prácticas e innovaciones de los pueblos originarios acerca de los seres vivos, intercambia vivencias y experiencias asociadas al aprovechamiento y la protección como el uso de la herbolaria, la milpa o la conservación de los bosques.",
        ejesSugeridos: "Interculturalidad crítica y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "5. Los procesos vitales de los seres vivos: nutrición, relación con el medio y reproducción.",
        pda: "Compara las características comunes de los seres vivos, identifica que todos tienen estructuras especializadas asociadas a la nutrición, la relación con el medio y la reproducción y los distingue como rasgos adaptativos que favorecen la sobrevivencia de las especies.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "6. La biodiversidad como expresión del cambio de los seres vivos en el tiempo.",
        pda: "Analiza información acerca del estado de la biodiversidad local a partir de fuentes directas, orales, escritas, audiovisuales o internet, expone razones sobre su importancia cultural, biológica, estética y ética, propone acciones para su cuidado. Indaga las principales aportaciones de Darwin y Wallace como explicaciones acerca del origen de la biodiversidad.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "7. El calentamiento global como una consecuencia de la alteración de los ciclos biogeoquímicos en los ecosistemas.",
        pda: "Representa la transferencia de materia y energía entre los organismos de un ecosistema mediante redes y pirámides tróficas; elabora explicaciones, inferencias y predicciones consistentes con los modelos generados acerca de la pérdida o incremento de organismos en los eslabones. Analiza las prácticas de consumo que han alterado los ciclos biogeoquímicos del carbono y nitrógeno.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 4,
        trimestreSugerido: 3
      },
      {
        contenido: "8. Importancia del microscopio para el conocimiento de la unidad y la diversidad de los seres vivos.",
        pda: "Compara cómo han cambiado las primeras observaciones microscópicas respecto de las actuales, valora el avance en el conocimiento de las bacterias, las células y los virus. Describe las estructuras y funciones básicas de la célula a partir de modelos, explica la participación de la membrana y el citoplasma en las funciones de nutrición y relación, y del núcleo en la reproducción y herencia.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 4,
        trimestreSugerido: 3
      },
      {
        contenido: "9. Las vacunas: su relevancia en el control de algunas enfermedades infecciosas.",
        pda: "Describe las características generales de las bacterias y los virus, formula hipótesis en torno al por qué de la rápida propagación de las enfermedades infecciosas que causan, y las contrasta con evidencias reportadas en fuentes con sustento científico. Valora la importancia y la necesidad de proteger la salud a partir del uso de las vacunas.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // CIENCIAS II: FÍSICA (FASE 6 - 10 CONTENIDOS OFICIALES COMPLETOS SEP)
    // =========================================================================
    ciencias_fisica: [
      {
        contenido: "1. El pensamiento científico, una forma de plantear y solucionar problemas y su incidencia en la transformación de la sociedad.",
        pda: "Describe problemas comunes de la vida cotidiana explicando cómo se procede para buscarles solución, conoce y caracteriza el pensamiento científico para plantearse y resolver problemas en la escuela y su cotidianeidad. Indaga en diferentes fuentes de consulta las aportaciones de mujeres y hombres en el desarrollo de la Física.",
        ejesSugeridos: "Pensamiento crítico e Igualdad de género",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Unidades y medidas utilizados en Física.",
        pda: "Identifica las unidades de medición que se ocupan en su entorno escolar, familiar y en su comunidad. Identifica cuáles son, cómo se definen y cuál es la simbología de las unidades básicas y derivadas del Sistema Internacional de Unidades. Conoce los instrumentos de medición y realiza conversiones con los múltiplos y submúltiplos.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Estructura, propiedades y características de la materia.",
        pda: "Indaga sobre los saberes y prácticas del uso de materiales y sus propiedades y características para construcción, vestimenta, artefactos de uso común. Relaciona e interpreta las teorías sobre estructura de la materia, a partir de los modelos atómicos y de partículas y los fenómenos que les dieron origen. Explora algunos avances recientes en la comprensión de la constitución de la materia.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 4,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Estados de agregación de la materia.",
        pda: "Experimenta e interpreta los modelos atómicos y de partículas al proponer hipótesis que expliquen los tres estados de la materia, sus propiedades físicas como la temperatura de fusión, ebullición, densidad, entre otros.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "5. Interacciones en fenómenos relacionados con la fuerza y el movimiento.",
        pda: "Identifica los elementos y los diferentes tipos de movimiento relacionados con la velocidad y aceleración y realiza experimentos sencillos. Identifica y describe la presencia de fuerzas en interacciones cotidianas (fricción, fuerzas en equilibrio) y representa e interpreta las Leyes de Newton.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "6. Principios de Pascal y de Arquímedes.",
        pda: "Experimenta e interpreta las interacciones de la fuerza y el movimiento relacionados con los principios de Pascal y de Arquímedes, para explicar actividades cotidianas.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Saberes y prácticas para el aprovechamiento de energías y la sustentabilidad.",
        pda: "Analiza las características de la energía mecánica (cinética y potencial) y describe casos donde se conserva. Relaciona al calor como una forma de energía y describe los motores que funcionan con energía calorífica, los efectos del calor disipado, los gases expelidos y valora sus efectos en la atmósfera. Identifica saberes, prácticas y artefactos sobre el aprovechamiento de las diversas formas de energía renovables y no renovables.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "8. Interacciones de la electricidad y el magnetismo.",
        pda: "Experimenta e interpreta algunas manifestaciones y aplicaciones de la electricidad, e identifica los cuidados que requiere su uso al revisar los protocolos de seguridad. Relaciona e interpreta fenómenos comunes del magnetismo y experimenta con la interacción entre imanes. Experimenta e interpreta el comportamiento de la luz como resultado de la interacción entre electricidad y magnetismo.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 4,
        trimestreSugerido: 3
      },
      {
        contenido: "9. Composición del Universo y Sistema Solar.",
        pda: "Explora algunos avances recientes en la comprensión sobre la evolución del Universo y su composición. Indaga cómo se lleva a cabo la exploración de los cuerpos celestes, por medio de la detección y procesamiento de las ondas electromagnéticas que emiten. Relaciona e interpreta las características y dinámica del Sistema Solar con la gravitación y el movimiento de los planetas.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "10. Fenómenos, procesos y factores asociados al cambio climático.",
        pda: "Formula hipótesis que relacionan la actividad humana con el aumento de temperatura en el planeta. Diferencia entre calor, radiación y temperatura al explicar los procesos que originan el efecto invernadero. Explica cómo la emisión de ciertos gases contribuye al efecto invernadero y propone medidas de mitigación.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // CIENCIAS III: QUÍMICA (FASE 6 - 12 CONTENIDOS OFICIALES COMPLETOS SEP)
    // =========================================================================
    ciencias_quimica: [
      {
        contenido: "1. Los hitos que contribuyeron al avance del conocimiento científico y tecnológico en el ámbito nacional e internacional, así como su relación en la satisfacción de necesidades humanas y sus implicaciones en la naturaleza.",
        pda: "Reconoce los aportes de saberes de diferentes pueblos y culturas en la satisfacción de necesidades humanas en diversos ámbitos (medicina, construcción, artesanías, textiles y alimentos). Indaga en fuentes de consulta orales y escritas las aportaciones de mujeres y hombres en el desarrollo del conocimiento científico y tecnológico.",
        ejesSugeridos: "Pensamiento crítico, Interculturalidad crítica e Igualdad de género",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Las propiedades extensivas e intensivas, como una forma de identificar sustancias y materiales de uso común, así como el aprovechamiento en actividades humanas.",
        pda: "Formula hipótesis para diferenciar propiedades extensivas e intensivas, mediante actividades experimentales y, con base en el análisis de resultados, elabora conclusiones. Reconoce la importancia del uso de instrumentos de medición para identificar y diferenciar propiedades de sustancias y materiales cotidianos.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Composición de las mezclas y su clasificación en homogéneas y heterogéneas, así como métodos de separación (evaporación, decantación, filtración, extracción, sublimación, cromatografía y cristalización) aplicados en diferentes contextos.",
        pda: "Describe los componentes de una mezcla (soluto – disolvente; fase dispersa y fase dispersante) mediante actividades experimentales y las clasifica en homogéneas y heterogéneas en materiales de uso cotidiano. Deduce métodos para separar mezclas mediante actividades experimentales con base en las propiedades físicas de las sustancias involucradas, así como su funcionalidad en actividades humanas.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Importancia de la concentración de sustancias en mezclas de productos de uso cotidiano.",
        pda: "Analiza la concentración de sustancias de una mezcla expresadas en porcentaje en masa y porcentaje en volumen en productos de higiene personal, alimentos y limpieza, entre otros, para la toma de decisiones orientadas al cuidado de la salud y al consumo responsable. Relaciona la concentración de una mezcla con la efectividad o composición de diversos productos de uso cotidiano.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "5. Presencia de contaminantes y su concentración, relacionada con la degradación y contaminación ambiental en la comunidad.",
        pda: "Indaga situaciones problemáticas relacionadas con la degradación y contaminación en la comunidad, vinculadas con el uso de productos y procesos químicos. Sistematiza la información de diferentes fuentes de consulta, orales y escritas, acerca de la concentración de contaminantes (partes por millón, -ppm-) en aire, agua y suelo.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "6. Mezclas, compuestos y elementos representados con el modelo corpuscular de la materia en sólidos, líquidos y gases, así como su caracterización mediante actividades experimentales.",
        pda: "Explica semejanzas y diferencias de mezclas, compuestos y elementos, a partir de actividades experimentales y los clasifica en materiales de uso cotidiano. Construye modelos corpusculares de mezclas, compuestos y elementos, a fin de comprender la estructura interna de los materiales en diferentes estados de agregación.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "7. La Tabla periódica: criterios de clasificación de los elementos químicos y sus propiedades (electronegatividad, energía de ionización y radio atómico).",
        pda: "Reconoce la presencia y predominancia de algunos elementos químicos que conforman a los seres vivos, la Tierra y el Universo, así como su ubicación en la Tabla periódica: metales, no metales y semimetales. Interpreta la información de la Tabla periódica ordenada por el número atómico, así como por grupos y periodos e identifica las propiedades periódicas de elementos representativos. Construye modelos atómicos de Bohr y representa diagramas de Lewis.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "8. Los compuestos iónicos y moleculares: propiedades y estructura, así como su importancia en diferentes ámbitos.",
        pda: "Experimenta y diferencia los compuestos iónicos y moleculares, a partir de las propiedades identificadas en actividades experimentales; elabora conclusiones, inferencias y predicciones con base en la evidencia obtenida. Analiza la formación y estructura de compuestos iónicos y moleculares, a partir de las propiedades de la Tabla periódica.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "9. Los alimentos como fuente de energía química: carbohidratos, proteínas y lípidos.",
        pda: "Reconoce los saberes de pueblos y culturas acerca de la diversidad de los alimentos y su importancia en el diseño de menús, orientados a una dieta saludable, acorde al contexto. Explica cómo obtiene el cuerpo humano la energía a partir de los nutrimentos e identifica los alimentos que los contienen. Valora la importancia de vitaminas, minerales y agua simple potable.",
        ejesSugeridos: "Vida saludable e Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "10. Las reacciones químicas: manifestaciones, propiedades e interpretación de las ecuaciones químicas con base en la Ley de conservación de la materia, así como la absorción o desprendimiento de energía en forma de calor.",
        pda: "Reconoce distintas reacciones químicas en su entorno y en actividades experimentales, a partir de sus manifestaciones y el cambio de propiedades de reactivos a productos. Representa reacciones mediante modelos tridimensionales y ecuaciones químicas, con base en el lenguaje científico y la Ley de la conservación de la materia. Explica y representa intercambios de energía en reacciones endotérmicas y exotérmicas.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "11. Propiedades de ácidos y bases, reacciones de neutralización y modelo de Arrhenius.",
        pda: "Distingue las propiedades de ácidos y bases en su entorno, a partir de indicadores e interpreta la escala de acidez y basicidad. Deduce los productos de reacciones de neutralización sencillas, con base en el modelo de Arrhenius, mediante actividades experimentales. Diseña y lleva a cabo reacciones de neutralización, a fin de obtener productos útiles en la vida cotidiana.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "12. Las reacciones de óxido-reducción (redox): identificación del número de oxidación y de agentes oxidantes y reductores.",
        pda: "Identifica reacciones de óxido-reducción en su entorno y comprende su importancia en diferentes ámbitos. Analiza la transferencia de electrones entre reactivos y productos en reacciones de óxido-reducción (redox), con base en el cambio del número de oxidación, a partir de actividades experimentales. Valora los beneficios y el costo ambiental de procesos y productos derivados de las reacciones redox.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // HISTORIA (FASE 6 - 12 CONTENIDOS OFICIALES COMPLETOS SEP)
    // =========================================================================
    historia: [
      {
        contenido: "1. Los albores de la humanidad: los pueblos antiguos del mundo y su devenir.",
        pda: "Busca, localiza y estudia con sus pares fuentes que dan cuenta de mitos fundacionales de pueblos antiguos. Reflexiona acerca de la importancia de las fuentes históricas para la interpretación de hechos y procesos, y compara mitos fundacionales de distintos pueblos de México y el mundo.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "2. La conformación de las metrópolis y los sistemas de dominación.",
        pda: "Formula preguntas, recopila información y comparte sus hallazgos en torno a los pueblos originarios de México: ¿cuántos pueblos son? ¿dónde están? ¿de dónde llegaron? ¿cómo vivían antes? ¿Cómo viven ahora? Indaga los orígenes de la población afromexicana, sus aportaciones sociales y a la cultura de nuestro país.",
        ejesSugeridos: "Interculturalidad crítica, Inclusión y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Las gestas de resistencia y los movimientos independentistas.",
        pda: "Indaga sobre rebeliones y levantamientos de pueblos indígenas y afromexicanos en la historia de nuestro país y se acerca a comprender sus causas. Emite juicios acerca de agravios o crímenes a los que han sido sujetos los pueblos indígenas y afromexicanos, y relaciona la revolución de Independencia de 1810 con las demandas sociales de libertad y soberanía.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Las revoluciones modernas y sus tendencias.",
        pda: "Ubica la confluencia de causas para que el siglo XVIII y XIX marquen el inicio de las revoluciones modernas, la industrialización y el surgimiento de los Estados nacionales. Establece las características y el contexto en que se desarrolla la dictadura de Antonio López de Santa Anna, la Reforma Liberal y la defensa de la soberanía nacional.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "5. Las tensiones en el siglo XX.",
        pda: "Analiza y comprende la causalidad de la Revolución Mexicana de 1910, identifica la heterogeneidad en su composición y demandas sociales. Pondera las demandas sociales que orientaron el movimiento revolucionario y las plasmadas en la Constitución de 1917.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "6. La construcción histórica de las ideas sobre las juventudes e infancias.",
        pda: "Identifica las ideas y representaciones de las personas de acuerdo con su edad en diversos momentos históricos. Comprende los cambios y permanencias en las características y tareas que las sociedades asignan a las personas, de acuerdo con su edad.",
        ejesSugeridos: "Inclusión y Pensamiento crítico",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Las mujeres y sus historias.",
        pda: "Revisa fuentes históricas para identificar la participación de las mujeres en la sociedad en diversos momentos históricos. Indaga sobre el protagonismo social de las mujeres en diferentes procesos históricos nacionales y regionales, para reconocer la relevancia de su participación.",
        ejesSugeridos: "Igualdad de género y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "8. Las luchas de las mujeres por sus derechos.",
        pda: "Identifica los orígenes históricos de movimientos y organizaciones de mujeres en la lucha por la igualdad y el reconocimiento de sus derechos. Comprende los cambios y permanencias en las luchas de las mujeres por una vida igualitaria y libre de violencia.",
        ejesSugeridos: "Igualdad de género e Inclusión",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "9. Relaciones de poder y lucha por los derechos de grupos históricamente discriminados o subrepresentados.",
        pda: "Identifica las problemáticas de violencia hacia pueblos originarios, afrodescendientes, migrantes y comunidad LGBTTTIQ+ en distintos procesos históricos. Argumenta sobre los cambios y permanencias en la lucha por erradicar la violencia contra grupos históricamente discriminados.",
        ejesSugeridos: "Inclusión, Igualdad de género e Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "10. Discriminación, racismo, antisemitismo y xenofobia: perspectiva histórica y contemporánea.",
        pda: "Identifica las causas históricas del racismo y la xenofobia y las relaciona críticamente con sus consecuencias. Analiza las causas y el sentido de la carrera armamentista y los conflictos bélicos del siglo XX, y comprende la urgencia de promover la cultura de paz y el respeto a los derechos humanos.",
        ejesSugeridos: "Inclusión y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "11. Movilidades humanas, migraciones y nuevos escenarios para la vida.",
        pda: "Comprende procesos históricos relevantes en los que grupos humanos se desplazaron por los territorios a lo largo del tiempo. Explica procesos históricos relevantes en los que grupos humanos se desplazaron por territorios de México y el mundo en el siglo XX y XXI.",
        ejesSugeridos: "Interculturalidad crítica e Inclusión",
        semanasSugeridas: 2,
        trimestreSugerido: 3
      },
      {
        contenido: "12. Amor, amistad, familias y relaciones entre las personas en la historia.",
        pda: "Comprende que la forma en la que las personas piensan y actúan en relación con el amor, la amistad y las familias se construyen en la sociedad y cambian históricamente. Explica los cambios que las concepciones sobre el amor, la amistad y las familias han tenido a lo largo del tiempo.",
        ejesSugeridos: "Inclusión e Igualdad de género",
        semanasSugeridas: 2,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // FORMACIÓN CÍVICA Y ÉTICA (FASE 6 - 14 CONTENIDOS OFICIALES COMPLETOS SEP)
    // =========================================================================
    fce: [
      {
        contenido: "1. Grupos sociales y culturales en la conformación de las identidades juveniles.",
        pda: "Valora la diversidad de grupos e identidades juveniles en la escuela y en la comunidad y fortalece el respeto a formas de ser, pensar y expresarse en el marco de los derechos humanos. Promueve espacios de participación juvenil, presenciales o virtuales, para construir comunidades que promuevan la colaboración y el respeto.",
        ejesSugeridos: "Inclusión, Interculturalidad crítica e Igualdad de género",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Los derechos humanos en México y en el mundo como valores compartidos por las sociedades actuales.",
        pda: "Asume una postura crítica acerca de la vigencia de los derechos humanos como valores compartidos por distintas sociedades del mundo. Debate acerca de la importancia de defender y exigir el respeto a los derechos humanos, como un reto de las sociedades actuales para vivir con dignidad, libertad, justicia e inclusión.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Movimientos sociales y políticos por los derechos humanos en el mundo y en México.",
        pda: "Asume una postura ética acerca de los movimientos sociales y políticos que originaron los derechos humanos en el mundo y su influencia en México. Explica la trascendencia de los movimientos sociales y políticos en México y América Latina para garantizar la igualdad, la libertad de las personas y el bienestar colectivo.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Consecuencias de la desigualdad en la calidad de vida de las personas y comunidades.",
        pda: "Distingue las diferencias en la calidad de vida de la población en México y el mundo y las compara con su derecho a la igualdad y a una vida digna. Actúa éticamente para reducir las desigualdades, fomentando el respeto y la solidaridad en los pueblos más vulnerados en su comunidad, México y América Latina.",
        ejesSugeridos: "Inclusión y Pensamiento crítico",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "5. Normas, leyes, instituciones y organizaciones encargadas de proteger, defender y exigir la aplicación de los derechos humanos en la convivencia diaria.",
        pda: "Aprecia los beneficios de participar en la comunidad y el país, en la construcción y aplicación de normas y leyes para garantizar la convivencia y el ejercicio de los derechos humanos. Analiza la función de instituciones y organizaciones nacionales e internacionales, para demandar la aplicación de normas y leyes que defienden y exigen respeto a los derechos humanos.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "6. El conflicto en la convivencia humana desde la cultura de paz.",
        pda: "Analiza distintos tipos de conflictos en sus espacios de convivencia, su estructura y formas de solucionarlos desde la cultura de paz como una oportunidad de crecimiento personal y social. Valora la resolución pacífica de conflictos sociales y políticos en México y el mundo y gestiona estrategias de participación y transformación social hacia una cultura de paz.",
        ejesSugeridos: "Inclusión y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "7. La cultura de paz y la creación de ambientes que garanticen el respeto a la vida y la dignidad del ser humano.",
        pda: "Comprende la influencia que tiene la cultura de paz en la convivencia escolar, familiar y comunitaria, para favorecer ambientes libres de discriminación y racismo. Colabora con personas de la escuela, la comunidad, el país y el mundo, para fortalecer la convivencia pacífica, la cultura de paz y realizar acciones de rechazo y denuncia a la violencia.",
        ejesSugeridos: "Inclusión, Igualdad de género y Pensamiento crítico",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "8. Personas, grupos y organizaciones a favor de la cultura de paz.",
        pda: "Aprecia las acciones de personas, grupos u organizaciones en México a favor de la cultura de paz para promover ambientes libres de violencia. Valora las acciones que pueblos, grupos y organizaciones han realizado en México y América Latina para resolver los conflictos de manera no violenta y a favor de la cultura de paz.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "9. Principios éticos como referente para un desarrollo sustentable.",
        pda: "Reflexiona éticamente acerca de la relación de las comunidades con su contexto socionatural para impulsar acciones que promuevan el desarrollo sustentable, así como actitudes de cuidado y respeto a otros seres vivos. Implementa acciones de colaboración, reciprocidad, solidaridad y de participación igualitaria como valores para un desarrollo sustentable.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "10. Igualdad sustantiva en el marco de la interculturalidad, la inclusión y la perspectiva de género.",
        pda: "Aprecia la interculturalidad y el respeto al derecho a la igualdad sustantiva para establecer relaciones incluyentes y respetuosas de la diversidad, rechazando la discriminación y el racismo. Participa en acciones dirigidas a reducir brechas de desigualdad para promover y fortalecer la interculturalidad, la inclusión y la perspectiva de género.",
        ejesSugeridos: "Igualdad de género, Inclusión e Interculturalidad crítica",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "11. Medidas de protección y mecanismos de denuncia en el rechazo a la violencia de género, sexual y la trata de personas.",
        pda: "Analiza situaciones de violencia escolar, de género, sexual y la trata de personas, con base en la perspectiva de género y demanda la aplicación de medidas de protección para garantizar el derecho a una vida libre de violencia. Promueve mecanismos de denuncia en el contexto presencial y en las redes sociales.",
        ejesSugeridos: "Igualdad de género, Vida saludable e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "12. Principios y valores de la cultura democrática como forma de gobierno y de vida.",
        pda: "Aprecia en los principios y valores de la democracia una forma de vida y de gobierno, para tomar decisiones que fortalezcan la convivencia en los espacios donde participa. Participa de manera activa, responsable e informada en la promoción, defensa y reivindicación de los principios y valores de la democracia.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "13. Proyectos como un recurso para atender problemáticas de la comunidad desde una ciudadanía democrática.",
        pda: "Participa en actividades y proyectos en su entorno escolar y social, en donde aplica mecanismos de participación democrática y los rasgos de la ciudadanía responsable y crítica. Colabora en proyectos con la comunidad para responder a necesidades colectivas en sus dimensiones política, civil y social.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "14. Instituciones, organizaciones y mecanismos de representación democrática, y defensa y exigencia de derechos ciudadanos.",
        pda: "Aprecia la función de las instituciones y organizaciones sociales y políticas, así como de los mecanismos de participación y representación ciudadana, que fortalecen la vida democrática. Destaca la importancia de la participación ciudadana, organizaciones sociales y partidos políticos en México, para evaluar los alcances y límites del gobierno democrático y exigir la rendición de cuentas.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // LENGUA EXTRANJERA: INGLÉS (FASE 6 - 14 CONTENIDOS OFICIALES COMPLETOS SEP)
    // =========================================================================
    ingles: [
      {
        contenido: "1. La diversidad lingüística y sus formas de expresión en México y el mundo.",
        pda: "Hace uso del alfabeto, los números y las expresiones básicas en inglés, para nombrar y recuperar datos factuales y características básicas de lenguas reconocidas en México y el mundo.",
        ejesSugeridos: "Interculturalidad crítica y Apropiación de las culturas",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "2. La identidad y cultura de pueblos de habla inglesa.",
        pda: "Recupera información para llevar a cabo presentaciones en inglés, orales y escritas, que describan rasgos étnicos, culturales e identitarios de hablantes de lengua inglesa.",
        ejesSugeridos: "Interculturalidad crítica",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Las manifestaciones culturales, lingüísticas y artísticas en inglés, a favor de la interculturalidad.",
        pda: "Elabora un cómic o manga en inglés sobre situaciones donde se rescata la importancia de la interculturalidad.",
        ejesSugeridos: "Interculturalidad crítica y Artes y experiencias estéticas",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Uso de diversos textos en inglés que promueven la preservación y conservación de las lenguas.",
        pda: "Recupera textos informativos y científicos en inglés, que refieran formas de conservación y preservación de las lenguas, y las difunde.",
        ejesSugeridos: "Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "5. El uso de la lengua inglesa para expresar necesidades, intereses y problemas de la comunidad.",
        pda: "Investiga en textos en inglés soluciones implementadas sobre problemas de una comunidad, e informa de manera oral o escrita sus hallazgos.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "6. Elementos y recursos estéticos del inglés.",
        pda: "Recupera de distintos tipos de textos literarios en inglés, expresiones, elementos y recursos estéticos y elabora un glosario.",
        ejesSugeridos: "Artes y experiencias estéticas",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Manifestaciones artísticas y culturales del inglés.",
        pda: "Realiza una lectura crítica y emite su opinión en inglés sobre diversas manifestaciones culturales y artísticas de pueblos de habla inglesa.",
        ejesSugeridos: "Artes y experiencias estéticas e Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "8. Creaciones literarias tradicionales y contemporáneas en inglés.",
        pda: "Selecciona textos literarios en inglés que aborden temas de la comunidad o de algún lugar de interés, los resume y difunde por distintos medios.",
        ejesSugeridos: "Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "9. La lengua inglesa para expresar sensaciones, emociones, sentimientos e ideas vinculados con las familias, la escuela y la comunidad.",
        pda: "Lleva a cabo juegos del lenguaje en inglés para expresar sensaciones, emociones, sentimientos e ideas sobre las familias y la escuela.",
        ejesSugeridos: "Inclusión y Apropiación de las culturas",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "10. Relatos en inglés para expresar sucesos significativos familiares, escolares, comunitarios y sociales.",
        pda: "Entrevista y narra en inglés sucesos significativos familiares, escolares, comunitarios o sociales recuperados de la memoria colectiva.",
        ejesSugeridos: "Pensamiento crítico y Apropiación de las culturas",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "11. Comunicación asertiva y dialógica en inglés, para sensibilizar sobre la erradicación de la violencia en las familias y la escuela.",
        pda: "Recupera de distintos textos en inglés, expresiones de violencia presentes en las familias y las escuelas. Reflexiona y comunica de forma oral y escrita una postura de rechazo a la violencia, mediante la comunicación asertiva y dialógica.",
        ejesSugeridos: "Igualdad de género e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "12. Mensajes en inglés en medios de comunicación masiva, que promuevan una vida saludable.",
        pda: "Recupera en lengua inglesa mensajes que promuevan una vida saludable y los difunde de manera oral o escrita, a través de distintos medios de comunicación.",
        ejesSugeridos: "Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "13. El uso de la lengua inglesa en la construcción de mensajes a favor de la inclusión.",
        pda: "Investiga en diversas fuentes en inglés las características de los mensajes que presentan información a favor de la interacción, sensibilización y empatía con la diversidad y expone su punto de vista.",
        ejesSugeridos: "Inclusión e Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "14. El uso de la lengua inglesa en las manifestaciones culturales y artísticas que favorecen la construcción de una sociedad incluyente.",
        pda: "Elabora semblanzas en inglés sobre personas en condición de discapacidad, destacadas por contribuir a la cultura y las artes, y las difunde.",
        ejesSugeridos: "Inclusión y Artes y experiencias estéticas",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // ARTES (FASE 6 - 14 CONTENIDOS OFICIALES COMPLETOS SEP)
    // =========================================================================
    artes: [
      {
        contenido: "1. Diversidad de lenguajes artísticos en la riqueza pluricultural de México y del mundo.",
        pda: "Reconoce en manifestaciones artísticas de México y del mundo el uso del cuerpo, del espacio y del tiempo, para valorarlas como parte de la riqueza pluricultural.",
        ejesSugeridos: "Artes y experiencias estéticas e Interculturalidad crítica",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Manifestaciones culturales y artísticas que conforman la diversidad étnica, cultural y lingüística.",
        pda: "Identifica diferentes manifestaciones culturales y artísticas de pueblos indígenas y afrodescendientes de México y del mundo, para interpretar significados que permitan fomentar una sociedad incluyente.",
        ejesSugeridos: "Interculturalidad crítica e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Identidad y sentido de pertenencia en manifestaciones artísticas.",
        pda: "Aprecia la intención expresiva en diversas manifestaciones artísticas, para la construcción crítica de las identidades personal y colectiva.",
        ejesSugeridos: "Artes y experiencias estéticas",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Patrimonio cultural de la comunidad en manifestaciones artísticas que fomentan la identidad y el sentido de pertenencia.",
        pda: "Interpreta manifestaciones artísticas del patrimonio cultural de la comunidad y de México, para fomentar las identidades personal y colectiva, así como el sentido de pertenencia.",
        ejesSugeridos: "Artes y experiencias estéticas e Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "5. Los lenguajes artísticos en la expresión de problemas de la comunidad.",
        pda: "Usa intencionalmente formas, colores, movimientos, sonidos, entre otros elementos de las artes, para recrear una situación problemática de su contexto y manifestar una postura crítica.",
        ejesSugeridos: "Pensamiento crítico y Artes y experiencias estéticas",
        semanasSugeridas: 2,
        trimestreSugerido: 1
      },
      {
        contenido: "6. Elementos de las artes y recursos estéticos apreciados en el entorno natural y social, así como en diversas manifestaciones artísticas.",
        pda: "Identifica el uso intencional del cuerpo, del espacio y del tiempo en manifestaciones artísticas, para apreciar e interpretar sus sentidos y significados. Percibe cualidades estéticas en el entorno natural y social, para interpretar sus sentidos y significados.",
        ejesSugeridos: "Artes y experiencias estéticas",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Valor estético de la naturaleza, de la vida cotidiana y de diferentes manifestaciones culturales y artísticas.",
        pda: "Disfruta de manifestaciones culturales y artísticas de la comunidad y de otros lugares, para reconocer sus gustos e intereses estéticos. Disfruta de los valores estéticos presentes en la naturaleza, para apreciarla y expresarla.",
        ejesSugeridos: "Artes y experiencias estéticas y Vida saludable",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "8. Creaciones artísticas que tienen su origen en textos literarios.",
        pda: "Explora con formas, colores, movimientos, sonidos, entre otros elementos de las artes, para reinterpretar textos literarios de la comunidad u otros lugares, haciendo uso de diversos lenguajes artísticos.",
        ejesSugeridos: "Artes y experiencias estéticas y Apropiación de las culturas",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "9. Expresión artística de sensaciones, emociones, sentimientos e ideas, a partir de experiencias familiares, escolares o comunitarias.",
        pda: "Recrea lúdicamente sensaciones, emociones, sentimientos e ideas, mediante el uso del cuerpo, del espacio y del tiempo, para expresar la relación con su entorno familiar.",
        ejesSugeridos: "Artes y experiencias estéticas e Inclusión",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "10. Memoria colectiva representada por medios artísticos, para registrar experiencias comunitarias.",
        pda: "Recupera de la memoria colectiva acontecimientos significativos de las familias, escuela o comunidad, para representarlos de manera artística.",
        ejesSugeridos: "Artes y experiencias estéticas y Pensamiento crítico",
        semanasSugeridas: 2,
        trimestreSugerido: 2
      },
      {
        contenido: "11. Procesos creativos que ponen en práctica la comunicación dialógica, como estrategia para erradicar expresiones de violencia.",
        pda: "Expresa, mediante elementos de las artes como las formas, colores, movimientos y sonidos, la relevancia del diálogo como una alternativa a las manifestaciones de violencia presentes en la familia, escuela y comunidad.",
        ejesSugeridos: "Igualdad de género, Inclusión y Artes y experiencias estéticas",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "12. Vida saludable expresada a través de mensajes construidos con elementos de las artes, para difundirlos por distintos medios de comunicación.",
        pda: "Emplea intencionalmente formas, colores, movimientos, sonidos, entre otros elementos de las artes, para representar una vida saludable y la difunde por un medio de comunicación escolar.",
        ejesSugeridos: "Vida saludable y Artes y experiencias estéticas",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "13. Sistemas alternativos y aumentativos de comunicación, como herramientas creativas que favorecen la inclusión.",
        pda: "Identifica algunas características sensoriales de la Lengua de Señas Mexicana, el código Braille, los tableros de comunicación y otros sistemas alternativos y aumentativos, para fomentar la interacción, sensibilización y empatía con la diversidad.",
        ejesSugeridos: "Inclusión y Artes y experiencias estéticas",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "14. Manifestaciones artísticas que emplean sistemas alternativos y aumentativos de comunicación, elaboradas por personas en condición de discapacidad y/o diseñadas para ellas.",
        pda: "Reconoce los valores estéticos y creativos de las manifestaciones artísticas realizadas por personas con alguna discapacidad, para fomentar la inclusión y la no discriminación.",
        ejesSugeridos: "Inclusión y Artes y experiencias estéticas",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // TECNOLOGÍA (FASE 6 - 8 CONTENIDOS OFICIALES COMPLETOS SEP)
    // =========================================================================
    tecnologia: [
      {
        contenido: "1. Herramientas, máquinas e instrumentos, como extensión corporal, en la satisfacción continua de intereses y necesidades humanas.",
        pda: "Explora las posibilidades corporales y la delegación de funciones en herramientas, máquinas, instrumentos y formas de organización para identificar sus funciones y procesos de cambio técnico, en la satisfacción de intereses y necesidades de diversas sociedades.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 4,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Materiales, procesos técnicos y comunidad.",
        pda: "Distingue el origen, transformación y características tecnológicas de los materiales que comparten técnicas similares, para utilizarlos desde una perspectiva local, eficiente y sustentable.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 4,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Usos e implicaciones de la energía en los procesos técnicos.",
        pda: "Comprende la función de la energía en los sistemas técnicos y sus implicaciones en el desarrollo tecnológico para la toma de decisiones responsables, que permitan prever y disminuir riesgos personales, sociales y naturales.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 4,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Factores que inciden en los procesos técnicos.",
        pda: "Comprende la satisfacción de necesidades como la base de la creación e innovación técnica para reflexionar acerca de la influencia de intereses, prejuicios, estereotipos y aspiraciones, que favorecen o limitan la igualdad de oportunidades, en el desarrollo de procesos técnicos.",
        ejesSugeridos: "Igualdad de género, Inclusión y Pensamiento crítico",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "5. Procesos técnicos.",
        pda: "Describe los elementos que interactúan en los sistemas técnicos (formas de organización, medios, materiales, energía, conocimientos, saberes, experiencias) para comprender su vínculo con la sociedad, la cultura y la naturaleza.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 5,
        trimestreSugerido: 2
      },
      {
        contenido: "6. Comunicación y representación técnica.",
        pda: "Explora la importancia del lenguaje técnico y el consenso en su uso desde diferentes contextos, para proponer formas de representación y comunicar sus ideas.",
        ejesSugeridos: "Pensamiento crítico y Apropiación de las culturas",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Pensamiento estratégico y creativo en la resolución de problemas.",
        pda: "Analiza necesidades del entorno cercano para plantear un problema, investigar alternativas de solución y seleccionar la que mejor se adapte a los criterios y condiciones contextuales.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 5,
        trimestreSugerido: 3
      },
      {
        contenido: "8. Evaluación de sistemas tecnológicos.",
        pda: "Comprende la importancia de la evaluación de los procesos como parte de la innovación y mejora continua, para el logro de la eficiencia, eficacia, fiabilidad y factibilidad de los sistemas técnicos.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 5,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // EDUCACIÓN FÍSICA (FASE 6 - 5 CONTENIDOS OFICIALES COMPLETOS SEP EN 10 BLOQUES)
    // =========================================================================
    educacion_fisica: [
      {
        contenido: "1. Capacidades, habilidades y destrezas motrices (Exploración y Diagnóstico).",
        pda: "Explora las capacidades, habilidades y destrezas motrices, para enriquecer y ampliar el potencial propio y de las demás personas.",
        ejesSugeridos: "Vida saludable e Inclusión",
        semanasSugeridas: 4,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Potencialidades cognitivas, expresivas, motrices, creativas y de relación (Imagen corporal y bienestar).",
        pda: "Pone en práctica los elementos de la condición física en actividades motrices y recreativas, para reconocerlas como alternativas que fomentan el bienestar individual y colectivo.",
        ejesSugeridos: "Vida saludable e Igualdad de género",
        semanasSugeridas: 4,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Estilos de vida activos y saludables (Juegos y actividad física cotidiana).",
        pda: "Implementa acciones que le permiten mantenerse físicamente activo en diferentes momentos del día, para favorecer la práctica de estilos de vida saludables.",
        ejesSugeridos: "Vida saludable",
        semanasSugeridas: 4,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Pensamiento lúdico, divergente y estratégico (Resolución táctica en juegos modificados).",
        pda: "Toma decisiones individuales y colectivas en situaciones de juego (defensivas u ofensivas), con el propósito de valorar su efectividad.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "5. Interacción motriz (Juego limpio, normas y convivencia inclusiva).",
        pda: "Promueve relaciones asertivas con las demás personas en situaciones de juego, iniciación deportiva y deporte educativo, para fortalecer su autoestima y fomentar el juego limpio y la confrontación lúdica.",
        ejesSugeridos: "Inclusión e Igualdad de género",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "6. Capacidades, habilidades y destrezas motrices aplicadas a la iniciación deportiva.",
        pda: "Integra sus capacidades, habilidades y destrezas motrices, para poner a prueba el potencial individual y de conjunto en secuencias de cooperación y oposición.",
        ejesSugeridos: "Vida saludable e Inclusión",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Potencialidades expresivas y rítmicas en proyectos motrices escolares.",
        pda: "Analiza el incremento de su condición física, al participar en actividades recreativas, de iniciación deportiva y deporte educativo, para reflexionar acerca de su relación con el bienestar.",
        ejesSugeridos: "Vida saludable y Artes y experiencias estéticas",
        semanasSugeridas: 4,
        trimestreSugerido: 3
      },
      {
        contenido: "8. Pensamiento estratégico y creativo en torneos y ferias deportivas escolares.",
        pda: "Valora las estrategias de juego que utiliza ante distintas condiciones que se presentan, para reestructurarlas e incrementar su efectividad en equipo.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 4,
        trimestreSugerido: 3
      },
      {
        contenido: "9. Interacción motriz y organización de eventos recreativos comunitarios.",
        pda: "Organiza e implementa situaciones de juego e iniciación deportiva, para favorecer la convivencia en la escuela y la comunidad.",
        ejesSugeridos: "Inclusión, Igualdad de género y Vida saludable",
        semanasSugeridas: 4,
        trimestreSugerido: 3
      }
    ],

    // =========================================================================
    // PRIMARIA Y PREESCOLAR (FASES 2 A 5 - CONTENIDOS OFICIALES COMPLETOS)
    // =========================================================================
    primaria_spc: [
      {
        contenido: "1. Estructura y funcionamiento del cuerpo humano: sistemas circulatorio, respiratorio e inmunológico, y su relación con la salud ambiental.",
        pda: "Describe y representa mediante modelos la relación de la nariz, tráquea y pulmones en el intercambio de gases y explica acciones para el cuidado de la salud respiratoria y circulatoria.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Alimentación saludable: características de la dieta correcta, costumbres de la comunidad y riesgos del consumo de alimentos ultraprocesados.",
        pda: "Explica las características de la dieta correcta (variada, completa, equilibrada, inocua, suficiente) y las contrasta con sus hábitos de alimentación para tomar decisiones en beneficio de su salud.",
        ejesSugeridos: "Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Estudio de los números naturales, decimales y fraccionarios en contextos cotidianos.",
        pda: "Expresa oralmente y por escrito la sucesión numérica, ordena, lee, escribe e identifica regularidades en números naturales, fraccionarios y decimales vinculados a situaciones de su entorno.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Suma, resta, multiplicación y división: su relación como operaciones inversas en la resolución de problemas.",
        pda: "Resuelve situaciones problemáticas vinculadas a su contexto que implican sumas, restas, multiplicaciones y divisiones con números naturales, decimales y fracciones.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "5. Funciones vitales que caracterizan a plantas y animales como seres vivos, y su relación con el entorno natural.",
        pda: "Indaga y explica cambios en los seres vivos y en el entorno natural a través del tiempo, y comprende la importancia de la conservación de la biodiversidad local.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "6. Cuerpos geométricos, figuras planas y cálculo de perímetro, área y volumen.",
        pda: "Reconoce y describe semejanzas y diferencias entre prismas, cilindros, pirámides y figuras planas; construye desarrollos planos y resuelve problemas de cálculo de perímetro y área.",
        ejesSugeridos: "Pensamiento crítico y Artes y experiencias estéticas",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Propiedades de los materiales: dureza, flexibilidad, permeabilidad y transformaciones térmicas.",
        pda: "Experimenta con diversos materiales las propiedades de dureza, flexibilidad y permeabilidad y analiza su aplicación en la satisfacción de necesidades comunitarias.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "8. Organización e interpretación de datos en tablas y gráficas de barras y circulares.",
        pda: "Construye tablas y gráficas de barras o circulares e interpreta información cuantitativa y cualitativa contenida en ellas, así como la moda y la media aritmética para responder preguntas.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "9. Costos y beneficios del consumo de agua, energía eléctrica y combustibles en la satisfacción de necesidades personales.",
        pda: "Indaga y analiza la cantidad de agua y energía eléctrica que se consume en diversas actividades en la casa y la escuela, y propone acciones para su aprovechamiento sustentable.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "10. Sistema Tierra-Luna-Sol: interacciones, cambios y regularidades en fenómenos naturales.",
        pda: "Indaga la formación de eclipses de Sol y de Luna, el movimiento de rotación y traslación de la Tierra, y describe las similitudes y diferencias entre ellos mediante modelos.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    primaria_lenguajes: [
      {
        contenido: "1. Narración de sucesos autobiográficos y del pasado y del presente de la comunidad.",
        pda: "Lee textos autobiográficos y crónicas comunitarias e identifica las relaciones temporales de secuencia, simultaneidad y duración para redactar relatos propios.",
        ejesSugeridos: "Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Comprensión y producción de textos explicativos y expositivos.",
        pda: "Lee distintos tipos de textos explicativos y reflexiona sobre sus características y funciones para producir textos propios con información organizada en esquemas y cuadros.",
        ejesSugeridos: "Pensamiento crítico y Apropiación de las culturas",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Participación en debates sobre temas de interés común.",
        pda: "Reconoce que hay temas donde las opiniones se dividen, y es necesario sustentar las propias con argumentos basados en datos y fuentes confiables.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Elaboración e intercambio de reseñas de diversos textos y/o audiovisuales.",
        pda: "Reconoce las características y función de las reseñas y describe un texto leído y construye una opinión acerca del mismo, explicando su parecer.",
        ejesSugeridos: "Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "5. Reconocimiento de la diversidad lingüística de México.",
        pda: "Investiga en fuentes impresas y/o electrónicas sobre la diversidad lingüística en México y sobre la influencia de las lenguas originarias en el español en México.",
        ejesSugeridos: "Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "6. Análisis de cuentos y poemas para su disfrute y comprensión.",
        pda: "Lee cuentos y poemas mexicanos seleccionados a partir de sus intereses y gustos, y comparte los motivos de su elección mediante antologías ilustradas.",
        ejesSugeridos: "Artes y experiencias estéticas y Apropiación de las culturas",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Seguimiento crítico de noticias en diferentes medios de comunicación escrita y audiovisual.",
        pda: "Expresa interés por una noticia particular y busca notas informativas relacionadas en distintos medios de comunicación escrita para comparar las perspectivas.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "8. Producción y envío de cartas personales y documentos administrativos.",
        pda: "Lee distintas cartas personales reales y literarias y analiza sus características para escribir mensajes formales y personales dirigidos a su comunidad.",
        ejesSugeridos: "Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "9. Análisis y representación de guiones teatrales y expresiones artísticas comunitarias.",
        pda: "Crea personajes y escenografías para la historia de una obra de teatro infantil y la sonoriza para representarla ante la comunidad.",
        ejesSugeridos: "Artes y experiencias estéticas e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    primaria_ens: [
      {
        contenido: "1. Valoración de la biodiversidad en el territorio donde se ubica la localidad, entidad, México y el mundo.",
        pda: "Comprende la biodiversidad, su función como elemento vital en la Tierra y en el equilibrio de la biosfera, así como la importancia para la vida humana y de las demás especies.",
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Riesgos de desastre y crisis humanitarias, asociados a fenómenos naturales y generados por acciones humanas.",
        pda: "Comprende que los desastres no son naturales, sino eventos repentinos que ocasionan daños materiales, humanos y sociales, y participa en planes de prevención escolar.",
        ejesSugeridos: "Vida saludable e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Construcción de la cultura de paz: análisis de conflictos vecinales y/o territoriales del pasado y del presente.",
        pda: "Indaga en fuentes orales, escritas o digitales acerca de conflictos vecinales entre personas y/o grupos de su comunidad y propone alternativas de negociación y mediación.",
        ejesSugeridos: "Inclusión y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "4. La democracia como forma de gobierno en México y su construcción a través de la historia.",
        pda: "Indaga acerca de las transformaciones en las formas de gobierno de nuestro país y argumenta por qué se requiere de la participación de todas las personas y pueblos que integran una sociedad.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "5. Derechos humanos: a un ambiente sano y acceso al agua potable, y protección de la dignidad de niñas, niños y adolescentes.",
        pda: "Dialoga acerca del derecho humano a un ambiente sano y adecuado para su desarrollo y bienestar, y reconoce el derecho de niñas, niños y adolescentes a la protección y al respeto de su integridad.",
        ejesSugeridos: "Inclusión, Igualdad de género y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "6. Movimientos sociales en el México de los siglos XIX y XX: la Independencia y la Revolución Mexicana.",
        pda: "Indaga en fuentes bibliográficas, hemerográficas, digitales y fotográficas, las causas del movimiento de independencia y de la Revolución Mexicana, la injusticia social y la participación de distintos grupos.",
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Pueblos y culturas de América y el mundo: el respeto a las costumbres, tradiciones y formas de vivir de diferentes culturas.",
        pda: "Explora la vida cotidiana de pueblos originarios, comunidades y grupos sociales de diferentes lugares delContinente Americano, del pasado y el presente.",
        ejesSugeridos: "Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "8. Cumplimiento de los derechos humanos: estudio de casos de actos de discriminación, racismo o violencias.",
        pda: "Analiza críticamente un caso de racismo, discriminación o violencia en México, identificando las causas y las consecuencias culturales, económicas, políticas y sociales, y propone acciones solidarias.",
        ejesSugeridos: "Inclusión e Igualdad de género",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "9. Migración y derechos humanos: migración interna y externa, causas y consecuencias sociales, económicas, culturales, políticas y ambientales.",
        pda: "Reconoce los procesos de migración que se realizan en el territorio nacional (interna) y de México hacia otros países (externa) y reflexiona acerca de los impactos en la identidad y los derechos humanos.",
        ejesSugeridos: "Interculturalidad crítica e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ],

    primaria_hyc: [
      {
        contenido: "1. Las familias como espacio para el desarrollo del sentido de pertenencia y autonomía, para una sana convivencia.",
        pda: "Participa en distintas formas de convivencia en la familia, para fortalecer su sentido de pertenencia y afecto, y reflexiona acerca de los valores heredados.",
        ejesSugeridos: "Inclusión e Igualdad de género",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Alternativas ante conflictos y problemas de la vida en la comunidad.",
        pda: "Reflexiona sobre los conflictos que tiene en la escuela y la familia, para valorar las posibles alternativas de solución a través del diálogo.",
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. La escuela como ventana hacia el futuro y construcción del proyecto de vida.",
        pda: "Intercambia experiencias de estudio, para visualizar las opciones que tiene en su futuro y replantear metas individuales y grupales en favor del bienestar común.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Formas de ser, pensar, actuar y relacionarse en favor de la equidad y la inclusión.",
        pda: "Reflexiona acerca de las formas de ser, pensar, actuar y relacionarse que tienen las personas y los factores que las originan para propiciar el entendimiento mutuo.",
        ejesSugeridos: "Inclusión e Igualdad de género",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "5. Capacidades, habilidades y destrezas motrices, y estilos de vida activos y saludables.",
        pda: "Reconoce posibilidades y límites al participar en situaciones de juego e iniciación deportiva, individuales y colectivas, y plantea alternativas de actividades físicas que puede practicar dentro y fuera de la escuela.",
        ejesSugeridos: "Vida saludable",
        semanasSugeridas: 4,
        trimestreSugerido: 2
      },
      {
        contenido: "6. Los afectos y su influencia en el bienestar.",
        pda: "Distingue los factores que influyen en el estado de ánimo y la vida cotidiana, para mejorar la convivencia y el autocuidado mediante estrategias de regulación emocional.",
        ejesSugeridos: "Vida saludable e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Acciones individuales que repercuten en la conservación y mejora de la salud e higiene comunitaria.",
        pda: "Construye alternativas saludables y sostenibles asociadas con hábitos de higiene personal y limpieza de los espacios, para promover la toma de conciencia sobre su impacto en el bienestar personal y social.",
        ejesSugeridos: "Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "8. Sentido de comunidad y satisfacción de necesidades humanas mediante proyectos colaborativos.",
        pda: "Argumenta acerca de la pertinencia de ideas, conocimientos y prácticas culturales de la comunidad, para valorar sus beneficios y áreas de oportunidad en favor del bienestar individual y colectivo.",
        ejesSugeridos: "Interculturalidad crítica y Pensamiento crítico",
        semanasSugeridas: 4,
        trimestreSugerido: 3
      }
    ],

    preescolar_integrado: [
      {
        contenido: "1. Comunicación oral de necesidades, emociones, gustos, ideas y saberes, a través de los diversos lenguajes, desde una perspectiva comunitaria.",
        pda: "Emplea palabras, gestos, señas, imágenes, sonidos o movimientos corporales que aprende en su comunidad, para expresar necesidades, ideas, emociones y gustos.",
        ejesSugeridos: "Inclusión y Apropiación de las culturas",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "2. Narración de historias mediante diversos lenguajes, en un ambiente donde niñas y niños participen y se apropien de la cultura.",
        pda: "Evoca y narra lo que interpreta y entiende de diferentes textos literarios —leyendas, cuentos, fábulas, historias—, y relatos de la comunidad, que escucha en voz de otras personas.",
        ejesSugeridos: "Artes y experiencias estéticas y Apropiación de las culturas",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "3. Exploración de la diversidad natural que existe en la comunidad y en otros lugares.",
        pda: "Usa sus sentidos para percibir en su entorno cercano plantas y animales que le llaman la atención y describe características tales como: su olor, color, forma, textura o tamaño.",
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: "4. Los saberes numéricos como herramienta para resolver situaciones del entorno, en diversos contextos socioculturales.",
        pda: "Dice en orden los números que conoce y gradualmente amplía su rango de conteo; cuenta objetos y elementos de su entorno en su lengua materna con diversos propósitos.",
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "5. El dominio del espacio y reconocimiento de formas en el entorno desde diversos puntos de observación y mediante desplazamientos o recorridos.",
        pda: "Ubica personas, objetos y elementos de su entorno con referentes personales y los comunica a sus pares y otras personas; construye y reproduce objetos y figuras con bloques y materiales de arte.",
        ejesSugeridos: "Pensamiento crítico y Artes y experiencias estéticas",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "6. Interacción, cuidado, conservación y regeneración de la naturaleza, que favorece la construcción de una conciencia socioambiental.",
        pda: "Convive con su entorno natural, con plantas y animales; expresa lo que percibe y disfruta acerca de ellos y desarrolla actitudes de cuidado y empatía hacia los seres vivos.",
        ejesSugeridos: "Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: "7. Construcción de la identidad personal a partir de su pertenencia a un territorio, su origen étnico, cultural y lingüístico.",
        pda: "Representa la imagen que tiene de sí, a través del modelado, dibujo, pintura y otros recursos de los lenguajes artísticos, y respeta las producciones de sus pares.",
        ejesSugeridos: "Inclusión e Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "8. Las emociones en la interacción con diversas personas y situaciones.",
        pda: "Identifica emociones como alegría, tristeza, sorpresa, miedo o enojo, al participar en juegos de representación y dialoga para resolver conflictos de forma pacífica.",
        ejesSugeridos: "Inclusión y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: "9. Cuidado de la salud personal y colectiva, al llevar a cabo acciones de higiene, limpieza, y actividad física.",
        pda: "Practica hábitos de higiene personal y limpieza en los espacios físicos donde se desenvuelve y al usar objetos, como medidas de conservación de la salud y de prevención de enfermedades.",
        ejesSugeridos: "Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ]
  },

  // Detecta el ID de materia del catálogo a partir de materiaId o del nombre de la asignatura
  resolveMateriaId(materiaId, asignaturaNombre = "") {
    if (materiaId && this.contenidosPorMateria[materiaId]) {
      return materiaId;
    }
    if (materiaId === "matematicas") return "matematicas";

    const norm = String(asignaturaNombre || materiaId || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (norm.includes("geograf")) return "geografia";
    if (norm.includes("espanol") || norm.includes("lengua materna")) return "espanol";
    if (norm.includes("biolog") || norm.includes("ciencias i ") || norm === "ciencias i") return "ciencias_biologia";
    if (norm.includes("fisica") && !norm.includes("educacion")) return "ciencias_fisica";
    if (norm.includes("quimica") || norm.includes("ciencias iii")) return "ciencias_quimica";
    if (norm.includes("historia")) return "historia";
    if (norm.includes("civica") || norm.includes("etica") || norm === "fce") return "fce";
    if (norm.includes("ingles") || norm.includes("extranjera")) return "ingles";
    if (norm.includes("arte")) return "artes";
    if (norm.includes("tecnolog")) return "tecnologia";
    if (norm.includes("educacion fisica")) return "educacion_fisica";
    if (norm.includes("matematic")) return "matematicas";
    if (norm.includes("preescolar")) return "preescolar_integrado";
    if (norm.includes("saberes y pensamiento")) return "primaria_spc";
    if (norm.includes("etica, naturaleza")) return "primaria_ens";
    if (norm.includes("humano y lo comunitario")) return "primaria_hyc";
    if (norm.includes("lenguajes")) return "primaria_lenguajes";

    return materiaId;
  },

  // Devuelve todos los Contenidos y PDAs oficiales para cualquier materia seleccionada
  getContenidosForMateria(materiaId, gradoNombre = "3° de Secundaria", asignaturaNombre = "") {
    const resolvedId = this.resolveMateriaId(materiaId, asignaturaNombre);

    if (resolvedId === "matematicas" && window.ProgramaAnaliticoData) {
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

    const baseList = this.contenidosPorMateria[resolvedId] || [
      {
        contenido: `1. Fundamentos disciplinares de ${asignaturaNombre || gradoNombre} y su relación con la comunidad.`,
        pda: `Comprende y aplica los conceptos esenciales de la disciplina en ${gradoNombre} para analizar situaciones reales de su escuela y localidad.`,
        ejesSugeridos: "Pensamiento crítico e Inclusión",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: `2. Análisis de fuentes de información y saberes comunitarios en ${asignaturaNombre || gradoNombre}.`,
        pda: `Indaga en fuentes orales, escritas y digitales acerca de los procesos y fenómenos estudiados en ${gradoNombre}, valorando los saberes locales.`,
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: `3. Resolución de problemas contextualizados y estudio de casos en el entorno escolar.`,
        pda: `Formula hipótesis y diseña estrategias colaborativas para resolver problemáticas identificadas en su comunidad escolar.`,
        ejesSugeridos: "Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: `4. Interacción sociedad, cultura y naturaleza desde el enfoque de la Nueva Escuela Mexicana.`,
        pda: `Relaciona los procesos estudiados en la asignatura con el cuidado del medio ambiente, la salud y el bienestar colectivo.`,
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 1
      },
      {
        contenido: `5. Investigación e indagación sobre problemáticas socioambientales y culturales de la región.`,
        pda: `Diseña y desarrolla proyectos de indagación con base en evidencias para proponer mejoras en su localidad.`,
        ejesSugeridos: "Pensamiento crítico y Vida saludable",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: `6. Diversidad, inclusión e igualdad de derechos en la práctica cotidiana de la disciplina.`,
        pda: `Promueve relaciones de respeto, equidad de género e inclusión durante el trabajo colaborativo en el aula y la escuela.`,
        ejesSugeridos: "Inclusión e Igualdad de género",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: `7. Aplicación de herramientas, modelos y representaciones gráficas de la asignatura.`,
        pda: `Construye esquemas, modelos, mapas o representaciones para explicar fenómenos y procesos propios de ${gradoNombre}.`,
        ejesSugeridos: "Pensamiento crítico y Apropiación de las culturas",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: `8. Prácticas sustentables y prevención de riesgos en la escuela y la comunidad.`,
        pda: `Propone acciones preventivas y sustentables orientadas al bienestar de las generaciones presentes y futuras.`,
        ejesSugeridos: "Vida saludable y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 2
      },
      {
        contenido: `9. Comunicación, argumentación y difusión de hallazgos ante la comunidad escolar.`,
        pda: `Socializa los resultados de sus investigaciones y proyectos mediante producciones escritas, visuales o exposiciones orales.`,
        ejesSugeridos: "Apropiación de las culturas a través de la lectura y la escritura",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: `10. Cultura de paz, diálogo y participación democrática en la solución de retos colectivos.`,
        pda: `Participa activamente en acuerdos y propuestas pacíficas que fortalecen la convivencia escolar y comunitaria.`,
        ejesSugeridos: "Inclusión y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: `11. Innovación creativa y expresión de propuestas de transformación comunitaria.`,
        pda: `Integra saberes disciplinares y creativos para diseñar alternativas de solución a necesidades detectadas en su entorno.`,
        ejesSugeridos: "Artes y experiencias estéticas y Pensamiento crítico",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      },
      {
        contenido: `12. Proyecto integrador comunitario vinculado con los Ejes Articuladores de la NEM.`,
        pda: `Evalúa de manera formativa el impacto de las propuestas desarrolladas en el ciclo escolar y reflexiona sobre su proceso de aprendizaje.`,
        ejesSugeridos: "Pensamiento crítico e Interculturalidad crítica",
        semanasSugeridas: 3,
        trimestreSugerido: 3
      }
    ];

    const total = baseList.length;
    return baseList.map((item, idx) => {
      const defaultTrim =
        idx < Math.ceil(total / 3)
          ? 1
          : idx < Math.ceil((total * 2) / 3)
          ? 2
          : 3;
      return {
        id: `CS-${String(idx + 1).padStart(2, "0")}`,
        contenido: item.contenido,
        pda: item.pda,
        ejesSugeridos: item.ejesSugeridos || "Pensamiento crítico",
        semanasSugeridas: item.semanasSugeridas || 2,
        trimestreSugerido: item.trimestreSugerido || defaultTrim,
        seleccionado: true
      };
    });
  }
};
