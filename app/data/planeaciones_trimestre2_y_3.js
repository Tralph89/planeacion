// ============================================================================
// PLANEACIONES Y HOJAS DE ACTIVIDAD - TRIMESTRE 2, TRIMESTRE 3 Y CODISEÑO
// Basado en el Programa Analítico de la Esc. Sec. General Abelardo L. Rodríguez
// ============================================================================

window.PlaneacionesTrimestre2y3 = {
  // ================= TRIMESTRE 2: BLOQUES B06 A B12 =================
  B06: {
    id: "B06",
    periodo: "23 de noviembre al 04 de diciembre",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Identifica figuras trazadas a escala como polígonos semejantes con ángulos iguales y lados proporcionales.",
      "Determina la razón de semejanza (k) entre dos triángulos o polígonos.",
      "Aplica los criterios de semejanza de triángulos (LLL, LAL y AA) para justificar si dos triángulos son semejantes.",
      "Resuelve problemas reales de cálculo de alturas y distancias inaccesibles mediante sombras, espejos y el Teorema de Tales."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 11,
        titulo: "Figuras a Escala y Condiciones de Semejanza (~)",
        inicio: "Mostrar dos fotografías del Malecón de Guaymas: una ampliada proporcionalmente y otra deformada (estirada). Preguntar: '¿Cuál conserva la forma exacta y por qué?'",
        desarrollo: "Definir polígonos semejantes (~): 1) Sus ángulos correspondientes son exactamente iguales, y 2) Sus lados correspondientes son proporcionales (tienen la misma razón de semejanza k).",
        cierre: "Calcular la razón de semejanza k entre pares de rectángulos y triángulos.",
        hojaActividad: {
          tituloHoja: "Figuras Semejantes y Razón de Escala (k)",
          instrucciones: "Determina si los pares de figuras son semejantes calculando el cociente k entre sus lados correspondientes.",
          notaTeorica: "Dos polígonos son semejantes (~) si sus ángulos correspondientes son iguales y la razón entre sus lados homólogos es constante: a'/a = b'/b = c'/c = k.",
          diagramType: "similar_triangles",
          ejercicios: [
            { enunciado: "1. Un triángulo tiene lados de 3 cm, 4 cm y 5 cm. Otro triángulo mayor tiene lados de 9 cm, 12 cm y 15 cm. ¿Son semejantes? ¿Cuánto vale la razón k?", respuesta: "Sí son semejantes porque 9/3 = 12/4 = 15/5 = 3. La razón de semejanza es k = 3." },
            { enunciado: "2. Una foto de 10 cm de ancho por 15 cm de largo se amplía para un cartel de modo que el ancho mida 40 cm. ¿Cuánto debe medir el largo para que no se deforme?", respuesta: "k = 40/10 = 4 -> Largo = 15 × 4 = 60 cm." },
            { enunciado: "3. Si dos triángulos son semejantes y un ángulo del pequeño mide 53°, ¿cuánto mide el ángulo correspondiente en el triángulo ampliado al triple?", respuesta: "Mide exactamente 53° (en figuras semejantes los ángulos NO cambian, solo los lados)." }
          ],
          boletoSalida: "¿Por qué dos cuadrados de distinto tamaño SIEMPRE son semejantes entre sí, pero dos rectángulos cualesquiera no siempre lo son?"
        }
      },
      {
        numero: 2,
        semana: 11,
        titulo: "Criterio de Semejanza LLL (Lado-Lado-Lado)",
        inicio: "Plantear el reto: 'Si no tenemos transportador para medir los ángulos de dos triángulos, ¿basta con medir sus tres lados para saber si son semejantes?'",
        desarrollo: "Explicar el Criterio LLL de semejanza: Si los tres lados de un triángulo son proporcionales a los tres lados de otro, los triángulos son semejantes. Práctica de verificación de proporciones.",
        cierre: "Puesta en común ordenando siempre los lados de menor a mayor antes de dividir.",
        hojaActividad: {
          tituloHoja: "Criterio de Semejanza LLL (Lado - Lado - Lado)",
          instrucciones: "Ordena los lados de menor a mayor en cada par de triángulos, verifica si las tres razones son iguales y halla los lados faltantes.",
          notaTeorica: "Consejo clave: Antes de comparar dos triángulos por LLL, ordena sus lados (Menor con Menor, Mediano con Mediano, Mayor con Mayor).",
          ejercicios: [
            { enunciado: "1. Triángulo A: lados de 4, 6 y 8 cm. Triángulo B: lados de 10, 15 y 20 cm. Verifica por el criterio LLL si son semejantes.", respuesta: "10/4 = 2.5; 15/6 = 2.5; 20/8 = 2.5. Como las 3 razones valen k = 2.5, son semejantes por LLL." },
            { enunciado: "2. Triángulo P: lados de 5, 7 y 10 cm. Triángulo Q: lados de 10, 14 y 18 cm. ¿Son semejantes?", respuesta: "10/5 = 2, 14/7 = 2, pero 18/10 = 1.8. No son semejantes." },
            { enunciado: "3. Los lados de un jardín triangular miden 6 m, 8 m y 12 m. En una maqueta a escala el lado menor mide 3 cm. ¿Cuánto miden los otros dos lados en la maqueta?", respuesta: "k = 0.5 (la mitad) -> Los otros lados miden 4 cm y 6 cm." }
          ],
          boletoSalida: "Halla el valor de x para que los triángulos de lados (2, 5, 6) y (8, 20, x) sean semejantes por LLL."
        }
      },
      {
        numero: 3,
        semana: 11,
        titulo: "Criterios de Semejanza LAL (Lado-Ángulo-Lado) y AA (Ángulo-Ángulo)",
        inicio: "Preguntar: '¿Cuál es el mínimo de datos necesarios para asegurar que dos triángulos son semejantes sin medir los tres lados?'",
        desarrollo: "Explicar los criterios LAL (dos lados proporcionales y el ángulo comprendido entre ellos igual) y AA (dos ángulos respectivamente iguales). Ejercicios de identificación de criterio.",
        cierre: "Síntesis de los 3 criterios de semejanza (LLL, LAL y AA).",
        hojaActividad: {
          tituloHoja: "Criterios de Semejanza LAL y AA",
          instrucciones: "Determina qué criterio (LLL, LAL o AA) garantiza la semejanza en cada caso y calcula la medida solicitada.",
          notaTeorica: "• Criterio LAL: Dos lados proporcionales y el ángulo ENTRE ellos igual. | • Criterio AA: Basta con que dos ángulos sean iguales (el tercero lo será por sumar 180°).",
          ejercicios: [
            { enunciado: "1. Dos triángulos rectángulos tienen ambos un ángulo agudo de 35°. ¿Por qué criterio son semejantes y cuánto mide su tercer ángulo?", respuesta: "Son semejantes por el Criterio AA (tienen ángulos de 90° y 35°). El tercer ángulo mide 180° - 125° = 55°." },
            { enunciado: "2. El triángulo ABC tiene AB = 6 cm, ∠B = 60° y BC = 10 cm. El triángulo DEF tiene DE = 9 cm, ∠E = 60° y EF = 15 cm. ¿Por qué criterio son semejantes?", respuesta: "9/6 = 1.5 y 15/10 = 1.5, y el ángulo incluido es 60° en ambos -> Criterio LAL." },
            { enunciado: "3. En dos triángulos semejantes por AA, la base del primero es 8 m y su altura 5 m. Si la base del segundo es 24 m, ¿cuál es su altura?", respuesta: "k = 24/8 = 3 -> Altura = 5 × 3 = 15 m." }
          ],
          boletoSalida: "¿Cuáles son las siglas de los tres criterios de semejanza de triángulos?"
        }
      },
      {
        numero: 4,
        semana: 11,
        titulo: "El Método de las Sombras de Tales de Mileto",
        inicio: "Relatar cómo Tales de Mileto midió la Gran Pirámide de Egipto usando únicamente un bastón y las sombras proyectadas por el Sol.",
        desarrollo: "Modelar geométricamente por qué los rayos paralelos del Sol forman dos triángulos rectángulos semejantes (Criterio AA) y plantear la proporción: Altura_Mayor / Sombra_Mayor = Altura_Menor / Sombra_Menor.",
        cierre: "Resolver el cálculo de la altura de un árbol y del faro usando sombras.",
        hojaActividad: {
          tituloHoja: "Midiendo Gigantes con Sombras: El Método de Tales",
          instrucciones: "Observa el diagrama de triángulos semejantes, plantea la proporción h / S = a / s y despeja la altura inaccesible.",
          notaTeorica: "A la misma hora del día, los rayos del Sol inciden con el mismo ángulo, formando triángulos rectángulos semejantes: Altura Objeto / Sombra Objeto = Altura Persona / Sombra Persona.",
          diagramType: "similar_triangles",
          ejercicios: [
            { enunciado: "1. Observa el diagrama superior: Un árbol proyecta una sombra de 12 m al mismo instante en que un alumno de 1.65 m de estatura proyecta una sombra de 2.2 m. ¿Cuál es la altura (h) del árbol?", respuesta: "h / 12 = 1.65 / 2.2 -> h = (12 × 1.65) / 2.2 = 9 metros." },
            { enunciado: "2. Una antena en el cerro de Guaymas proyecta una sombra de 28 m. Al mismo tiempo, un poste vertical de 3 m proyecta una sombra de 2 m. ¿Qué altura tiene la antena?", respuesta: "h / 28 = 3 / 2 -> h = 42 metros." },
            { enunciado: "3. Un edificio de 20 m de altura proyecta una sombra de 15 m. ¿Qué sombra proyectará en ese mismo momento un semáforo de 4 m de altura?", respuesta: "20 / 15 = 4 / x -> x = (15 × 4) / 20 = 3 metros." }
          ],
          boletoSalida: "¿Por qué es indispensable que ambas sombras se midan exactamente a la misma hora del día?"
        }
      },
      {
        numero: 5,
        semana: 11,
        titulo: "Cálculo de Alturas con Espejo y Teorema de Tales en Triángulos",
        inicio: "Preguntar: '¿Y si está nublado o estamos dentro de un gimnasio techado donde no hay sombra del Sol? ¿Cómo medimos la altura del techo?' Introducir el método del espejo en el suelo.",
        desarrollo: "Explicar que en un espejo plano el ángulo de incidencia de la luz es igual al ángulo de reflexión, creando dos triángulos rectángulos semejantes. Introducir también el Teorema de Tales con rectas paralelas dentro de un triángulo.",
        cierre: "Puesta en común de ambos métodos ópticos y geométricos.",
        hojaActividad: {
          tituloHoja: "El Método Óptico del Espejo y el Teorema de Tales",
          instrucciones: "Plantea la proporción de semejanza en cada problema de reflexión óptica y de rectas paralelas.",
          notaTeorica: "Método del Espejo: Cuando ves la punta de un objeto reflejada en un espejo en el piso, se forman dos triángulos semejantes porque el ángulo de entrada de la luz es igual al de salida.",
          ejercicios: [
            { enunciado: "1. Para medir la altura del aro de basquetbol de la secundaria, colocas un espejo en el suelo a 6 m de la base del tablero. Te paras a 1.5 m del espejo y tus ojos están a 1.60 m del suelo. ¿A qué altura está el aro?", respuesta: "h / 6 = 1.60 / 1.5 -> h = (6 × 1.60) / 1.5 = 6.40 metros (o si está a 4.5 m del espejo: 3.05 m)." },
            { enunciado: "2. Para calcular el ancho de un canal en la marina, se trazan dos triángulos rectángulos semejantes en la orilla con medidas: base menor = 4 m, altura menor = 6 m y base mayor = 18 m. ¿Cuál es el ancho (altura mayor) del canal?", respuesta: "x / 18 = 6 / 4 -> x = (18 × 6) / 4 = 27 metros." },
            { enunciado: "3. En un triángulo ABC se traza una línea paralela a la base que divide un lado en segmentos de 3 cm y 6 cm (total 9 cm). Si la base pequeña mide 4 cm, ¿cuánto mide la base grande?", respuesta: "x / 4 = 9 / 3 -> x = 12 cm." }
          ],
          boletoSalida: "Dibuja un esquema simple de cómo colocarías un espejo en el suelo para medir la altura del asta bandera de la escuela."
        }
      },
      {
        numero: 6,
        semana: 12,
        titulo: "Práctica de Campo: Midiendo la Escuela con Semejanza (Sesión Integradora 6-10)",
        inicio: "Organizar brigadas de topografía escolar para aplicar el método de sombras o espejo en el patio de la Esc. Sec. Abelardo L. Rodríguez.",
        desarrollo: "Toma de mediciones reales (estatura del observador, distancia horizontal y sombra) de 3 objetos del plantel: asta bandera, cancha techada y árbol principal. Elaboración de memoria de cálculo.",
        cierre: "Comparación de estimaciones entre brigadas y evaluación formativa del bloque.",
        hojaActividad: {
          tituloHoja: "Brigada de Topografía Escolar: Reporte de Alturas Inaccesibles",
          instrucciones: "Registra las mediciones de tu equipo o resuelve los casos de topografía forestal y urbana de Guaymas.",
          notaTeorica: "Razón de semejanza k = Distancia Mayor / Distancia Menor. Altura Mayor = k × Altura Menor.",
          diagramType: "similar_triangles",
          ejercicios: [
            { enunciado: "1. Caso Asta Bandera: Un alumno cuyos ojos están a 1.50 m del suelo coloca un espejo a 2 m de sus pies y a 8 m de la base del asta bandera. Calcula la altura del asta bandera.", respuesta: "k = 8 / 2 = 4 -> Altura = 1.50 × 4 = 6.0 metros." },
            { enunciado: "2. Caso Ingeniería Forestal:Un pino proyecta una sombra de 15 m mientras una estaca vertical de 1.2 m proyecta una sombra de 0.8 m. ¿Cuál es la altura del pino?", respuesta: "h / 15 = 1.2 / 0.8 -> h = 22.5 metros." },
            { enunciado: "3. Dos triángulos semejantes tienen razón de semejanza k = 3. Si el perímetro del triángulo pequeño es 18 cm, ¿cuál es el perímetro del triángulo grande?", respuesta: "Perímetro grande = 18 × 3 = 54 cm." }
          ],
          boletoSalida: "Si los lados de un triángulo se duplican (k = 2), ¿su área se duplica o se cuadruplica? Compruébalo con un ejemplo."
        }
      }
    ]
  },

  B07: {
    id: "B07",
    periodo: "07 al 18 de diciembre",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Clasifica los sólidos geométricos en poliedros (regulares, prismas y pirámides) y cuerpos redondos.",
      "Verifica y aplica la relación de Euler (C + V - A = 2) en diversos poliedros.",
      "Identifica las diferencias geométricas entre prismas y pirámides según sus bases y caras laterales.",
      "Calcula el volumen de sólidos geométricos simples y compuestos del entorno."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 13,
        titulo: "Exploración de Sólidos: Poliedros vs. Cuerpos Redondos",
        inicio: "Mostrar objetos cotidianos (caja, balón, lata de sardinas, dado, cono vial) y pedir clasificarlos según tengan todas sus caras planas o superficies curvas.",
        desarrollo: "Definir Poliedros ('muchas caras planas': regulares, prismas y pirámides) y Cuerpos Redondos (cilindro, cono y esfera). Analizar los 5 Poliedros Regulares (Sólidos Platónicos) y comprobar la Fórmula de Euler: Caras + Vértices - Aristas = 2.",
        cierre: "Despejar el número de aristas o vértices de un poliedro usando la relación de Euler.",
        hojaActividad: {
          tituloHoja: "Propiedades de los Sólidos y Teorema de Euler (C + V - A = 2)",
          instrucciones: "Completa el análisis de caras, vértices y aristas de los poliedros y comprueba la fórmula de Euler.",
          notaTeorica: "En todo poliedro convexo se cumple la Fórmula de Euler: Caras (C) + Vértices (V) - Aristas (A) = 2.",
          diagramType: "algebra_prisma",
          ejercicios: [
            { enunciado: "1. Verifica la fórmula C + V - A = 2 para: a) Un Cubo (Hexaedro): C=6, V=8, A=___  b) Un Tetraedro (pirámide triangular): C=4, V=4, A=___", respuesta: "a) Cubo: 6 + 8 - 12 = 2 (A=12 aristas) | b) Tetraedro: 4 + 4 - 6 = 2 (A=6 aristas)." },
            { enunciado: "2. Un prisma pentagonal tiene 2 bases pentagonales y 5 caras rectangulares (C = 7 caras) y tiene V = 10 vértices. Usa la fórmula de Euler para calcular cuántas aristas (A) tiene.", respuesta: "7 + 10 - A = 2 -> 17 - A = 2 -> A = 15 aristas." },
            { enunciado: "3. ¿Cuál es la diferencia principal entre las caras laterales de un PRISMA y las caras laterales de una PIRÁMIDE?", respuesta: "En un prisma las caras laterales son rectángulos y tiene 2 bases; en una pirámide las caras laterales son triángulos y tiene 1 sola base y una cúspide." }
          ],
          boletoSalida: "Si un octaedro regular tiene 8 caras y 6 vértices, ¿cuántas aristas tiene?"
        }
      },
      {
        numero: 2,
        semana: 14,
        titulo: "Volumen de Prismas, Pirámides y Sólidos Compuestos",
        inicio: "Plantear el reto: 'Una bodega portuaria tiene forma de un prisma rectangular coronado por un techo en forma de prisma triangular. ¿Cómo calculamos el volumen total de aire dentro de la bodega?'",
        desarrollo: "Comparar las fórmulas de volumen de prismas (V = A_base × h) y pirámides (V = [A_base × h] / 3). Resolver problemas de sólidos geométricos compuestos sumando o restando volúmenes.",
        cierre: "Elaboración de formulario maestro de poliedros.",
        hojaActividad: {
          tituloHoja: "Cálculo de Volumen de Poliedros y Cuerpos Compuestos",
          instrucciones: "Calcula el volumen de cada sólido geométrico o descompón la figura tridimensional en cuerpos conocidos.",
          notaTeorica: "Volumen de un Prisma = Área de la base × Altura. | Volumen de una Pirámide = (Área de la base × Altura) ÷ 3 (exactamente la tercera parte de un prisma de igual base y altura).",
          diagramType: "algebra_prisma",
          ejercicios: [
            { enunciado: "1. Calcula el volumen de un prisma cuadrangular cuya base mide 6 cm de lado y su altura es de 10 cm. Luego calcula el volumen de una pirámide con exactamente la misma base y altura.", respuesta: "V_prisma = (6×6) × 10 = 360 cm³. V_pirámide = 360 ÷ 3 = 120 cm³." },
            { enunciado: "2. Sólido Compuesto (Monumento): Una columna está formada por un cubo de base de 2 m de arista y encima una pirámide cuadrangular de 2 m de lado de base y 3 m de altura. ¿Cuál es el volumen total del monumento?", respuesta: "V_cubo = 2³ = 8 m³. V_pirámide = (4 × 3)/3 = 4 m³. Volumen Total = 8 + 4 = 12 m³." },
            { enunciado: "3. Una tuerca metálica tiene forma de prisma cuadrangular de 4 cm × 4 cm y 2 cm de espesor, con un hueco central cúbico de 2 cm × 2 cm × 2 cm. ¿Cuál es el volumen de metal?", respuesta: "V_exterior = 4×4×2 = 32 cm³. V_hueco = 2×2×2 = 8 cm³. V_metal = 32 - 8 = 24 cm³." }
          ],
          boletoSalida: "¿Cuántas pirámides llenas de arena necesitas vaciar dentro de un prisma de igual base y altura para llenarlo por completo?"
        }
      }
    ]
  },

  B08: {
    id: "B08",
    periodo: "07 al 18 de enero",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Identifica qué figura plana (rectángulo, triángulo rectángulo o semicírculo) genera un cilindro, un cono o una esfera al rotar sobre un eje.",
      "Relaciona las medidas de la figura plana generatriz (base y altura) con el radio, altura y generatriz del sólido de revolución.",
      "Predice y describe las secciones planas que se obtienen al realizar cortes rectos o inclinados a un cilindro, cono y esfera."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 15,
        titulo: "Generación de Sólidos de Revolución a partir de Figuras Planas",
        inicio: "Pegar un rectángulo, un triángulo rectángulo y un semicírculo de cartulina a tres palitos de madera y girarlos rápidamente con las manos. Preguntar: '¿Qué cuerpo tridimensional aparece en el aire en cada caso?'",
        desarrollo: "Analizar la generación de sólidos de revolución: 1) Rectángulo → Cilindro, 2) Triángulo rectángulo → Cono, 3) Semicírculo → Esfera. Relacionar los lados de la figura plana con el radio (r), altura (h) y generatriz (g).",
        cierre: "Reto: ¿Qué cambia si un rectángulo de 4 × 10 cm gira sobre su lado largo vs. sobre su lado corto?",
        hojaActividad: {
          tituloHoja: "Sólidos de Revolución: Del Plano al Espacio 3D",
          instrucciones: "Determina qué sólido de revolución se genera al rotar cada figura plana e indica su radio (r) y su altura (h).",
          notaTeorica: "• Rectángulo que gira sobre un lado → Cilindro. | • Triángulo rectángulo que gira sobre un cateto → Cono. | • Semicírculo que gira sobre su diámetro → Esfera.",
          diagramType: "solids_3d",
          ejercicios: [
            { enunciado: "1. Un rectángulo de 5 cm de base y 12 cm de altura gira 360° alrededor de su lado de 12 cm. a) ¿Qué sólido genera? b) ¿Cuánto miden su radio y su altura? c) ¿Cuál es su volumen (π ≈ 3.14)?", respuesta: "a) Cilindro | b) r = 5 cm, h = 12 cm | c) V = 3.14 × 25 × 12 = 942 cm³." },
            { enunciado: "2. ¿Qué ocurre si ese mismo rectángulo de 5 × 12 cm gira ahora alrededor de su lado de 5 cm? Calcula el nuevo volumen y compara.", respuesta: "Ahora r = 12 cm y h = 5 cm -> V = 3.14 × 144 × 5 = 2,260.8 cm³ (el volumen cambia drásticamente porque el radio está al cuadrado)." },
            { enunciado: "3. Un triángulo rectángulo de catetos 6 cm y 8 cm e hipotenusa 10 cm gira alrededor del cateto de 8 cm. Indica el radio, la altura y la generatriz del cono formado.", respuesta: "Radio r = 6 cm, Altura h = 8 cm y Generatriz g = 10 cm." }
          ],
          boletoSalida: "Si un semicírculo de diámetro 14 cm gira alrededor de su diámetro, ¿qué sólido se forma y cuánto mide su radio?"
        }
      },
      {
        numero: 2,
        semana: 16,
        titulo: "Cortes y Secciones Planas en Cilindros, Conos y Esferas",
        inicio: "Mostrar un cilindro y un cono de plastilina (o fruta cilíndrica/esférica) y preguntar qué figura plana queda marcada al cortarlos horizontal, vertical o diagonalmente.",
        desarrollo: "Analizar las secciones planas y cónicas: cortes paralelos a la base (círculos de igual o menor radio), cortes perpendiculares a la base (rectángulo en el cilindro, triángulo isósceles en el cono) y cortes oblicuos (elipse, parábola, hipérbola).",
        cierre: "Cálculo del radio de un corte paralelo a la mitad de la altura de un cono usando semejanza de triángulos.",
        hojaActividad: {
          tituloHoja: "Secciones Planas y Cónicas en Sólidos de Revolución",
          instrucciones: "Identifica la figura plana que resulta de cada corte geométrico y calcula las dimensiones solicitadas.",
          notaTeorica: "Al cortar un cono paralelamente a su base a la mitad de su altura, por semejanza de triángulos el círculo resultante tiene exactamente la mitad del radio de la base.",
          diagramType: "solids_3d",
          ejercicios: [
            { enunciado: "1. Escribe qué figura plana se obtiene al hacer los siguientes cortes a un CILINDRO recto: a) Corte paralelo a la base: ________ b) Corte perpendicular que pasa por el centro de las bases: ________ c) Corte inclinado: ________", respuesta: "a) Círculo (del mismo radio que la base) | b) Rectángulo (de ancho 2r y alto h) | c) Elipse." },
            { enunciado: "2. Escribe qué figura se obtiene al cortar un CONO recto: a) Paralelo a la base: ________ b) Perpendicular pasando por el vértice: ________", respuesta: "a) Círculo de menor radio | b) Triángulo isósceles (de base 2r y altura h)." },
            { enunciado: "3. Un cono tiene radio de base R = 10 cm y altura H = 20 cm. Si se realiza un corte paralelo a la base a 10 cm del vértice (a la mitad de la altura), ¿cuánto mide el radio r del círculo que aparece en el corte?", respuesta: "Por semejanza de triángulos: r / 10 = 10 / 20 -> r = 5 cm." }
          ],
          boletoSalida: "¿Por qué cualquier corte plano que le hagas a una esfera (sin importar el ángulo) siempre produce un círculo?"
        }
      }
    ]
  },

  B09: {
    id: "B09",
    periodo: "21 de enero al 01 de febrero",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Reconoce y traza los desarrollos planos de prismas, pirámides, cilindros y conos.",
      "Calcula el largo exacto del rectángulo lateral de un cilindro a partir del perímetro de su base circular (L = 2πr).",
      "Determina la generatriz y el ángulo del sector circular necesario para construir un cono.",
      "Calcula el área superficial total de cilindros, conos y prismas en problemas de empaque."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 17,
        titulo: "Desarrollo Plano del Cilindro y Diseño de Envases en Guaymas",
        inicio: "Desplegar la etiqueta de una lata cilíndrica de sardinas de Guaymas y preguntar: '¿Por qué el largo de la etiqueta rectangular debe coincidir exactamente con el contorno del círculo de la tapa?'",
        desarrollo: "Deducir las medidas del desarrollo plano de un cilindro: 2 círculos de radio r y 1 rectángulo cuya altura es h y cuya base es igual al perímetro del círculo (L = π · d = 2πr). Calcular el área total superficial.",
        cierre: "Verificación de medidas para construir un cilindro sin que sobre ni falte papel.",
        hojaActividad: {
          tituloHoja: "Desarrollo Plano y Área Total del Cilindro",
          instrucciones: "Calcula las dimensiones de la plantilla plana (rectángulo lateral y tapas circulares) de cada cilindro (usa π = 3.14).",
          notaTeorica: "En el desarrollo plano de un cilindro de radio r y altura h: El largo del rectángulo lateral es el perímetro del círculo: L = 2 · π · r. | Área Total = 2πr² + 2πrh.",
          diagramType: "solids_3d",
          ejercicios: [
            { enunciado: "1. Quieres armar un cilindro en cartulina cuya base tenga un radio r = 5 cm y una altura h = 12 cm. a) ¿Cuánto debe medir el largo (L = 2πr) del rectángulo lateral? b) ¿Cuál es el área de ese rectángulo?", respuesta: "a) L = 2 × 3.14 × 5 = 31.4 cm | b) Área lateral = 31.4 × 12 = 376.8 cm²." },
            { enunciado: "2. Para el mismo cilindro anterior (r = 5 cm, h = 12 cm), calcula el área de las dos tapas circulares (2 × πr²) y el Área Total de cartulina necesaria.", respuesta: "Dos tapas = 2 × 3.14 × 25 = 157 cm². Área Total = 376.8 + 157 = 533.8 cm²." },
            { enunciado: "3. El rectángulo lateral de un cilindro mide 62.8 cm de largo y 15 cm de alto. ¿Cuánto mide el diámetro y el radio de las tapas circulares que embonan exactamente con él?", respuesta: "π · d = 62.8 -> d = 62.8 / 3.14 = 20 cm -> Radio r = 10 cm." }
          ],
          boletoSalida: "Si construyes un cilindro con un rectángulo de 18.84 cm de base y tapas de 2 cm de radio, ¿cerrará perfectamente? Demuéstralo."
        }
      },
      {
        numero: 2,
        semana: 18,
        titulo: "Desarrollo Plano del Cono y Pirámides: Arco y Generatriz",
        inicio: "Mostrar un gorro o vaso cónico de papel desarmado: se observa un círculo pequeño para la base y un sector circular ('rebanada de pizza') para el cuerpo lateral.",
        desarrollo: "Explicar la relación entre el radio de la base del cono (r), la generatriz (g, radio del sector grande) y el ángulo central θ del sector circular: θ = (r / g) × 360°.",
        cierre: "Calcular el ángulo del sector circular para construir conos exactos.",
        hojaActividad: {
          tituloHoja: "Desarrollo Plano de Conos y Pirámides",
          instrucciones: "Utiliza la relación entre el radio de la base (r) y la generatriz (g) para calcular el desarrollo plano del cono.",
          notaTeorica: "En un cono: El arco del sector circular mide lo mismo que el perímetro de la base (2πr). El ángulo del sector circular se calcula con: θ = (r / g) × 360°, y su área lateral es A_lat = π · r · g.",
          diagramType: "codiseno_sectors",
          ejercicios: [
            { enunciado: "1. Se desea construir un cono cuya base tenga radio r = 3 cm y cuya pared inclinada (generatriz) mida g = 9 cm. ¿De cuántos grados debe trazarse el ángulo θ del sector circular?", respuesta: "θ = (3 / 9) × 360° = (1/3) × 360° = 120°." },
            { enunciado: "2. Calcula el Área Lateral (π·r·g) y el Área Total (π·r·g + πr²) de un cono de radio r = 4 cm y generatriz g = 10 cm.", respuesta: "A_lateral = 3.14 × 4 × 10 = 125.6 cm². A_base = 3.14 × 16 = 50.24 cm². Área Total = 175.84 cm²." },
            { enunciado: "3. Una pirámide cuadrangular tiene una base de 6 cm de lado y sus 4 caras triangulares tienen una altura inclinada (apotema) de 8 cm. Calcula su área superficial total.", respuesta: "Área base = 36 cm². Área de los 4 triángulos = 4 × (6×8/2) = 96 cm². Área Total = 132 cm²." }
          ],
          boletoSalida: "Si recortas un semicírculo (θ = 180°) de radio g = 10 cm y lo enrollas para formar un cono, ¿cuánto medirá el radio r de la base de ese cono?"
        }
      }
    ]
  },

  B10: {
    id: "B10",
    periodo: "04 al 15 de febrero",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Deduce y aplica la fórmula del volumen del cilindro (V = πr²h) y del cono (V = πr²h / 3).",
      "Compara experimental y matemáticamente la capacidad de un cilindro y un cono de igual base y altura (relación 3 a 1).",
      "Convierte unidades de volumen a capacidad en litros (1 m³ = 1000 L y 1 L = 1000 cm³).",
      "Despeja la altura o el radio de un cilindro o cono cuando se conoce su volumen total."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 19,
        titulo: "Deducción y Cálculo del Volumen de Cilindros y Conos",
        inicio: "Comparar un prisma hexagonal, uno dodecagonal y un cilindro: a medida que aumentan los lados del polígono de la base, el prisma se convierte en un cilindro con V = A_base × h = πr²h.",
        desarrollo: "Demostrar que el volumen de un cono es exactamente la tercera parte del volumen de un cilindro de igual radio y altura: V_cono = (πr²h) / 3. Resolver problemas de envases y silos.",
        cierre: "Conversión de volúmenes a litros (1000 cm³ = 1 litro; 1 m³ = 1000 litros).",
        hojaActividad: {
          tituloHoja: "Volumen y Capacidad en Litros de Cilindros y Conos",
          instrucciones: "Aplica las fórmulas V_cilindro = πr²h y V_cono = (πr²h)/3 y convierte a litros cuando se solicite (usa π = 3.14).",
          notaTeorica: "Equivalencias de capacidad: 1 litro = 1,000 cm³ = 1 dm³ | 1 metro cúbico (1 m³) = 1,000 litros.",
          diagramType: "solids_3d",
          ejercicios: [
            { enunciado: "1. Un tinaco cilíndrico tiene un radio de base r = 1 m y una altura h = 1.5 m. a) Calcula su volumen en m³. b) ¿Cuántos litros de agua le caben?", respuesta: "a) V = 3.14 × (1)² × 1.5 = 4.71 m³ | b) Capacidad = 4.71 × 1000 = 4,710 litros." },
            { enunciado: "2. Un vaso cónico de papel tiene un diámetro de 8 cm (cuidado: calcula primero el radio) y una altura de 12 cm. ¿Cuál es su volumen en cm³?", respuesta: "Radio r = 4 cm. V = (3.14 × 4² × 12) / 3 = 3.14 × 16 × 4 = 200.96 cm³." },
            { enunciado: "3. Un silo de almacenamiento de grano en Sonora está formado por un cilindro de r = 3 m y h = 8 m, rematado en la parte inferior por una tolva cónica de r = 3 m y h = 2 m. ¿Cuál es el volumen total del silo?", respuesta: "V_cilindro = 3.14 × 9 × 8 = 226.08 m³. V_cono = (3.14 × 9 × 2)/3 = 18.84 m³. V_total = 244.92 m³." }
          ],
          boletoSalida: "Si tienes un cilindro cuyo volumen es de 900 cm³, ¿cuál es el volumen de un cono que tiene exactamente la misma base y la misma altura?"
        }
      },
      {
        numero: 2,
        semana: 20,
        titulo: "Despeje de Dimensiones y Variación del Volumen en Cilindros y Conos",
        inicio: "Preguntar: 'Si a un cilindro le duplicas la altura, su volumen se duplica. Pero ¿qué pasa si le duplicas el radio?'",
        desarrollo: "Comprobar que al duplicar el radio el volumen se cuadruplica (porque r está elevado al cuadrado). Practicar el despeje de la altura h = V / (πr²) y del radio r = √[V / (πh)].",
        cierre: "Socialización de estrategias de despeje.",
        hojaActividad: {
          tituloHoja: "Despeje de Radio y Altura en Cilindros y Conos",
          instrucciones: "Despeja la variable desconocida (altura h o radio r) a partir del volumen dado.",
          notaTeorica: "En el cilindro V = πr²h → Para hallar la altura: h = V / (πr²). | En el cono V = (πr²h)/3 → Para hallar la altura: h = 3V / (πr²).",
          ejercicios: [
            { enunciado: "1. Una lata cilíndrica debe contener un volumen de 628 cm³. Si el radio de su base es r = 5 cm, ¿qué altura (h) debe tener la lata?", respuesta: "h = 628 / (3.14 × 25) = 628 / 78.5 = 8 cm." },
            { enunciado: "2. Un cono de helado tiene un volumen de 94.2 cm³ y un radio de 3 cm. ¿Cuál es su altura h?", respuesta: "h = (3 × 94.2) / (3.14 × 9) = 282.6 / 28.26 = 10 cm." },
            { enunciado: "3. Análisis de variación: Compara el volumen de un cilindro A (r = 2 cm, h = 10 cm) con un cilindro B que tiene el doble de radio (r = 4 cm, h = 10 cm). ¿Cuántas veces mayor es el volumen B?", respuesta: "V_A = 125.6 cm³ y V_B = 502.4 cm³. Es exactamente 4 veces mayor (2² = 4)." }
          ],
          boletoSalida: "Un depósito cilíndrico tiene un volumen de 314 m³ y una altura de 4 m. ¿Cuánto mide su radio r?"
        }
      }
    ]
  },

  B11: {
    id: "B11",
    periodo: "18 de febrero al 01 de marzo",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Formula y justifica geométrica y algebraicamente el Teorema de Pitágoras (c² = a² + b²).",
      "Calcula la longitud de la hipotenusa o de cualquiera de los catetos en un triángulo rectángulo.",
      "Aplica el recíproco del Teorema de Pitágoras (como la escuadra 3-4-5) para verificar ángulos rectos en terrenos.",
      "Desarrolla las 5 Fases del Proyecto de Indagación STEAM y entrega el reporte de aplicación en su comunidad."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 21,
        titulo: "Proyecto STEAM Pitágoras (Fases 1 y 2): ¿Pasará el Espejo por la Puerta?",
        inicio: "Fase 1 STEAM: Plantear el problema del Programa Analítico: 'Si una puerta mide 2.4 m de altura y 1.8 m de ancho, ¿podrá pasar por ahí un espejo cuadrado rígido de 2.9 m de lado inclinándolo en diagonal?'",
        desarrollo: "Fase 2 STEAM (Indagación geométrica y algebraica): Construir cuadrados sobre los lados del triángulo rectángulo 3-4-5 (áreas 9 + 16 = 25) para demostrar c² = a² + b². Calcular la diagonal máxima de la puerta.",
        cierre: "Responder la pregunta de indagación: la diagonal mide 3.0 m, por lo que el espejo de 2.9 m ¡sí pasa!",
        hojaActividad: {
          tituloHoja: "Proyecto STEAM: Descubriendo y Aplicando el Teorema de Pitágoras",
          instrucciones: "Demuestra la relación de áreas c² = a² + b² y calcula las hipotenusas y diagonales solicitadas.",
          notaTeorica: "Teorema de Pitágoras: En todo triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: c = √(a² + b²). Para hallar un cateto: a = √(c² - b²).",
          diagramType: "pythagoras",
          ejercicios: [
            { enunciado: "1. Reto de la Puerta (Fase 1): Una puerta mide a = 2.4 m de alto y b = 1.8 m de ancho. Calcula cuánto mide su diagonal (hipotenusa c) y determina si pasa un espejo cuadrado de 2.9 m de lado.", respuesta: "c = √(2.4² + 1.8²) = √(5.76 + 3.24) = √9 = 3.0 metros. Como 3.0 m > 2.9 m, el espejo SÍ pasa inclinado." },
            { enunciado: "2. Calcula la longitud de la hipotenusa c en los triángulos rectángulos cuyos catetos miden: a) a = 6 cm, b = 8 cm   b) a = 5 m, b = 12 m", respuesta: "a) c = √(36 + 64) = √100 = 10 cm | b) c = √(25 + 144) = √169 = 13 m." },
            { enunciado: "3. Despeje de Cateto: Una escalera de 10 m de largo (hipotenusa) se apoya contra un muro. Si su pie está a 6 m de la base del muro, ¿a qué altura llega la escalera?", respuesta: "a = √(10² - 6²) = √(100 - 36) = √64 = 8 metros." }
          ],
          boletoSalida: "¿Cómo usan los albañiles de Guaymas una cuerda con nudos de 3 m, 4 m y 5 m para asegurarse de que la esquina de una casa quede exactamente a 90°?"
        }
      },
      {
        numero: 2,
        semana: 22,
        titulo: "Proyecto STEAM Pitágoras (Fases 3, 4 y 5): Trazado de Terrenos y Reporte",
        inicio: "Fase 3 STEAM: Analizar cómo se trazan canchas deportivas, rampas y terrenos rectangulares en la comunidad verificando sus diagonales.",
        desarrollo: "Fases 4 y 5 STEAM: Resolución de problemas comunitarios (cableado de antenas, navegación en la bahía, apotema de conos/pirámides) e integración del Reporte Final de Indagación.",
        cierre: "Presentación de reportes y reflexión metacognitiva de la Fase 5.",
        hojaActividad: {
          tituloHoja: "Proyecto STEAM (Fases 3 a 5): Pitágoras en la Ingeniería Comunitaria",
          instrucciones: "Resuelve los problemas aplicados a nuestro entorno y redacta la conclusión del reporte comunitario.",
          notaTeorica: "Si al medir los lados a, b y la diagonal c de una esquina se cumple que a² + b² = c², el ángulo es exactamente recto (90°).",
          diagramType: "pythagoras",
          ejercicios: [
            { enunciado: "1. Navegación en la Bahía de Guaymas: Una lancha sale del muelle y navega 8 km hacia el Norte y luego 15 km hacia el Este. ¿A qué distancia en línea recta se encuentra del muelle de partida?", respuesta: "d = √(8² + 15²) = √(64 + 225) = √289 = 17 km." },
            { enunciado: "2. Verificación de Cancha: Se trazó una cancha escolar de 12 m de ancho por 16 m de largo. Al medir la diagonal con cinta métrica dio 20 m. ¿Las esquinas están perfectamente escuadradas a 90°? Demuéstralo.", respuesta: "12² + 16² = 144 + 256 = 400, y 20² = 400. Sí está perfectamente escuadrada a 90°." },
            { enunciado: "3. Un poste de luz de 12 m de altura se va a sujetar con un cable tensado desde su punta hasta una estaca en el suelo ubicada a 5 m de su base. ¿Cuántos metros de cable se necesitan?", respuesta: "c = √(12² + 5²) = √(144 + 25) = √169 = 13 metros de cable." }
          ],
          boletoSalida: "Conclusión del Proyecto STEAM: Describe una situación real de tu casa o colonia donde se utilice el Teorema de Pitágoras."
        }
      }
    ]
  },

  B12: {
    id: "B12",
    periodo: "04 al 15 de marzo",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Identifica el cateto opuesto y el cateto adyacente respecto a un ángulo agudo dado en un triángulo rectángulo.",
      "Calcula los valores de las razones trigonométricas seno, coseno y tangente a partir de las medidas de los lados.",
      "Reconoce que el valor de sen, cos y tan depende únicamente del ángulo y no del tamaño del triángulo.",
      "Resuelve problemas de alturas y distancias usando ángulos de elevación y depresión."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 23,
        titulo: "Construcción de las Razones Trigonométricas: Seno, Coseno y Tangente",
        inicio: "Contextualizar con Aristarco de Samos y la navegación marítima: ¿Cómo podemos calcular la altura de un cerro o la distancia a un barco si solo conocemos UN lado y UN ángulo agudo?",
        desarrollo: "Enseñar a distinguir el Cateto Opuesto (C.O., enfrente del ángulo θ) y el Cateto Adyacente (C.A., junto al ángulo θ) y definir las tres razones trigonométricas (SOH-CAH-TOA).",
        cierre: "Expresar sen θ, cos θ y tan θ como fracción y como decimal en un triángulo 3-4-5.",
        hojaActividad: {
          tituloHoja: "Razones Trigonométricas en el Triángulo Rectángulo (SOH-CAH-TOA)",
          instrucciones: "Identifica los catetos respecto al ángulo señalado y calcula el Seno, Coseno y Tangente en fracción y en decimal.",
          notaTeorica: "Respecto al ángulo agudo θ:  sen(θ) = Cateto Opuesto / Hipotenusa  |  cos(θ) = Cateto Adyacente / Hipotenusa  |  tan(θ) = Cateto Opuesto / Cateto Adyacente.",
          diagramType: "trigonometry",
          ejercicios: [
            { enunciado: "1. En un triángulo rectángulo cuyos lados miden Cateto Opuesto = 3, Cateto Adyacente = 4 e Hipotenusa = 5 respecto al ángulo θ, calcula en fracción y en decimal: a) sen(θ) = _____  b) cos(θ) = _____  c) tan(θ) = _____", respuesta: "a) sen(θ) = 3/5 = 0.6 | b) cos(θ) = 4/5 = 0.8 | c) tan(θ) = 3/4 = 0.75." },
            { enunciado: "2. Si ahora nos fijamos en el otro ángulo agudo α del mismo triángulo (donde el opuesto pasa a ser 4 y el adyacente 3), calcula sen(α), cos(α) y tan(α).", respuesta: "sen(α) = 4/5 = 0.8 | cos(α) = 3/5 = 0.6 | tan(α) = 4/3 ≈ 1.33." },
            { enunciado: "3. En un triángulo rectángulo los catetos miden 5 cm y 12 cm. Calcula primero la hipotenusa con Pitágoras y luego escribe las 3 razones trigonométricas para el ángulo menor.", respuesta: "Hipotenusa = 13 cm. sen = 5/13, cos = 12/13, tan = 5/12." }
          ],
          boletoSalida: "¿Por qué el seno y el coseno de un ángulo agudo siempre son números menores que 1?"
        }
      },
      {
        numero: 2,
        semana: 24,
        titulo: "Cálculo de Alturas y Distancias con Ángulos de Elevación y Depresión",
        inicio: "Plantear el reto del Faro de Cabo Haro en Guaymas: 'Desde una lancha se observa la punta de un faro con un ángulo de elevación de 30°. Si la lancha está a 50 m de la base, ¿qué razón trigonométrica relaciona los datos?'",
        desarrollo: "Enseñar cómo elegir entre sen, cos y tan según los datos disponibles (por ejemplo, si tenemos Cateto Adyacente y buscamos Cateto Opuesto, usamos tan θ = C.O. / C.A.) y resolver problemas con ángulos de 30°, 45° y 60°.",
        cierre: "Revisión de problemas trigonométricos y evaluación formativa del Segundo Trimestre.",
        hojaActividad: {
          tituloHoja: "Aplicaciones de la Trigonometría: Alturas y Distancias Reales",
          instrucciones: "Dibuja o analiza el triángulo rectángulo de cada situación, elige la razón trigonométrica adecuada y despeja la incógnita (usa: sen 30°=0.5, cos 30°=0.866, tan 30°=0.577, tan 45°=1, tan 60°=1.732).",
          notaTeorica: "Guía de elección: • Opuesto e Hipotenusa → SENO. • Adyacente e Hipotenusa → COSENO. • Opuesto y Adyacente → TANGENTE.",
          diagramType: "trigonometry",
          ejercicios: [
            { enunciado: "1. Cuando los rayos del Sol forman un ángulo de elevación de 45° con el suelo, la sombra del auditorio cívico mide 18 metros. Como tan(45°) = 1, ¿cuál es la altura del auditorio?", respuesta: "tan(45°) = h / 18 -> 1 = h / 18 -> h = 18 metros." },
            { enunciado: "2. Una rampa de acceso sube con un ángulo de inclinación de 30°. Si el largo inclinado de la rampa (hipotenusa) es de 8 metros, ¿qué altura vertical (cateto opuesto) alcanza? (Usa sen 30° = 0.5).", respuesta: "sen(30°) = h / 8 -> h = 8 × 0.5 = 4 metros." },
            { enunciado: "3. Desde un punto situado a 20 m de la base de una torre de telecomunicaciones, el ángulo de elevación hacia su punta es de 60°. Calcula la altura de la torre (Usa tan 60° = 1.732).", respuesta: "tan(60°) = h / 20 -> h = 20 × 1.732 = 34.64 metros." }
          ],
          boletoSalida: "Si observas la punta de una palmera con un ángulo de elevación de 45° estando a 9 metros de su tronco (y tus ojos están a 1.6 m del suelo), ¿cuánto mide en total la palmera?"
        }
      }
    ]
  }
};

// ============================================================================
// TRIMESTRE 3 (BLOQUES B13 A B19) Y PLANO DE CODISEÑO (COD01 A COD04)
// ============================================================================

Object.assign(window.PlaneacionesTrimestre2y3, {
  B13: {
    id: "B13",
    periodo: "18 al 29 de marzo",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Comprende la demostración de Arquímedes sobre la relación de volúmenes entre el cono, la esfera y el cilindro circunscrito (1 : 2 : 3).",
      "Deduce que el volumen de la esfera equivale a 2/3 del volumen del cilindro circunscrito (V = 4/3 πr³).",
      "Calcula el volumen y el área superficial de esferas, semiesferas, conos y cilindros en problemas reales."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 25,
        titulo: "El Descubrimiento de Arquímedes: Cono, Esfera y Cilindro (1 : 2 : 3)",
        inicio: "Relatar la historia de la tumba de Arquímedes en Siracusa, donde pidió grabar una esfera inscrita dentro de un cilindro por considerarlo su mayor hallazgo matemático.",
        desarrollo: "Analizar un cono, una esfera y un cilindro que tienen exactamente el mismo radio r y la misma altura h = 2r (el diámetro de la esfera). Demostrar que: V_cono = (2/3)πr³, V_esfera = (4/3)πr³ y V_cilindro = 2πr³ = (6/3)πr³. Es decir, guardan la proporción perfecta 1 : 2 : 3.",
        cierre: "Comprobar que V_cono + V_esfera = V_cilindro.",
        hojaActividad: {
          tituloHoja: "El Teorema de Arquímedes: La Proporción 1 : 2 : 3",
          instrucciones: "Utiliza la proporción descubierta por Arquímedes (Cono = 1/3, Esfera = 2/3, Cilindro = 3/3) y la fórmula V_esfera = (4/3)πr³.",
          notaTeorica: "Para un cono, una esfera y un cilindro de igual radio r y altura h = 2r:  V_esfera = (2/3) V_cilindro  |  V_cono = (1/3) V_cilindro  |  Fórmula de la esfera: V = (4/3) · π · r³.",
          diagramType: "solids_3d",
          ejercicios: [
            { enunciado: "1. Una esfera cabe de forma exacta dentro de un cilindro cuyo volumen total es de 300 cm³. Sin usar pi ni medir el radio, ¿cuál es el volumen de la esfera y cuál es el volumen del cono de igual base y altura?", respuesta: "V_esfera = (2/3)(300) = 200 cm³. V_cono = (1/3)(300) = 100 cm³. (Además 200 + 100 = 300 cm³)." },
            { enunciado: "2. Calcula el volumen de una boya marina esférica en la bahía de Guaymas cuyo radio es r = 3 dm (usa π = 3.14).", respuesta: "V = (4/3) × 3.14 × (3)³ = 4 × 3.14 × 9 = 113.04 dm³ (113.04 litros)." },
            { enunciado: "3. Una copa semiesférica (media esfera) tiene un radio interior de 6 cm. ¿Cuántos cm³ de líquido le caben al llenarse por completo?", respuesta: "V_esfera_completa = (4/3) × 3.14 × 216 = 904.32 cm³. Media esfera = 452.16 cm³." }
          ],
          boletoSalida: "Si llenas de agua un cono y una esfera de radio r y altura 2r y los vacías dentro de un cilindro de las mismas medidas, ¿hasta qué fracción se llena el cilindro?"
        }
      },
      {
        numero: 2,
        semana: 26,
        titulo: "Cálculo de Volúmenes y Superficies de Cuerpos Esféricos y Compuestos",
        inicio: "Observar una cápsula médica o un tanque de gas estacionario: está formado por un cilindro central y dos semiesferas en los extremos (que juntas forman 1 esfera completa).",
        desarrollo: "Resolver problemas de diseño industrial y comunitario combinando cilindro + esfera y cono + semiesfera (como un helado o boya de señalización).",
        cierre: "Síntesis comparativa de las tres fórmulas de cuerpos redondos.",
        hojaActividad: {
          tituloHoja: "Aplicaciones de Esferas, Conos y Cilindros Compuestos",
          instrucciones: "Descompón cada cuerpo industrial en sólidos simples (cilindro, cono, esfera) y calcula su volumen total (π = 3.14).",
          notaTeorica: "Dos semiesferas del mismo radio r forman exactamente 1 esfera completa de volumen V = (4/3)πr³. El área superficial de una esfera es A = 4πr².",
          diagramType: "solids_3d",
          ejercicios: [
            { enunciado: "1. Un tanque de almacenamiento tiene forma de un cilindro de radio r = 3 m y largo h = 10 m, con dos tapas semiesféricas de radio r = 3 m en sus extremos. Calcula el volumen del cilindro, el de la esfera que forman las tapas y el volumen total.", respuesta: "V_cilindro = 3.14 × 9 × 10 = 282.6 m³. V_esfera = (4/3) × 3.14 × 27 = 113.04 m³. Volumen Total = 395.64 m³." },
            { enunciado: "2. Calcula cuántos metros cuadrados de pintura anticorrosiva se necesitan para pintar un depósito esférico de radio r = 5 m usando A = 4πr².", respuesta: "A = 4 × 3.14 × 25 = 314 m²." },
            { enunciado: "3. Un barquillo cónico de radio r = 3 cm y altura h = 10 cm se llena de helado por dentro y se le coloca encima una bola esférica de helado de radio r = 3 cm. ¿Cuál es el volumen total de helado?", respuesta: "V_cono = (3.14 × 9 × 10)/3 = 94.2 cm³. V_esfera = (4/3) × 3.14 × 27 = 113.04 cm³. Total = 207.24 cm³." }
          ],
          boletoSalida: "Si el radio de una esfera se duplica de 3 cm a 6 cm, ¿por cuánto se multiplica su volumen? (Pista: 2³)."
        }
      }
    ]
  },

  B14: {
    id: "B14",
    periodo: "13 al 24 de abril",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Agrupa conjuntos de datos en intervalos de clase y construye tablas de frecuencias absolutas y relativas.",
      "Elabora e interpreta histogramas y polígonos de frecuencia identificando las marcas de clase.",
      "Distingue cuándo conviene utilizar un histograma, un polígono de frecuencias, una gráfica de línea o una gráfica circular.",
      "Compara dos o más gráficas estadísticas en un mismo plano para extraer conclusiones críticas."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 27,
        titulo: "Datos Agrupados: Histogramas y Polígonos de Frecuencia",
        inicio: "Contextualizar con la historia de los censos antiguos y las tablas de John Graunt en Londres (1662). Preguntar: 'Si encuestamos las edades o tiempos de traslado de los 618 alumnos de la secundaria, ¿cómo graficamos tantos datos sin hacer 618 barras?'",
        desarrollo: "Explicar la agrupación de datos en intervalos (ej. 10-20, 20-30...), el cálculo del punto medio o Marca de Clase (Xm) y la diferencia entre el Histograma (barras pegadas sin espacio entre ellas) y el Polígono de Frecuencia (línea que une los puntos medios superiores).",
        cierre: "Lectura e interpretación del intervalo modal en el histograma.",
        hojaActividad: {
          tituloHoja: "Construcción e Interpretación de Histogramas y Polígonos de Frecuencia",
          instrucciones: "Analiza la gráfica estadística, completa la tabla de frecuencias por intervalos y responde las preguntas de interpretación.",
          notaTeorica: "• Histograma: Gráfica de barras adyacentes (sin huecos) para datos continuos o agrupados en intervalos. | • Polígono de Frecuencia: Línea poligonal que une las marcas de clase (puntos medios de cada intervalo).",
          diagramType: "statistics",
          ejercicios: [
            { enunciado: "1. Calcula la Marca de Clase (punto medio Xm = [Límite inf + Límite sup] / 2) para los 5 intervalos del gráfico: 10-20, 20-30, 30-40, 40-50 y 50-60.", respuesta: "Xm = 15, 25, 35, 45 y 55 respectivamente." },
            { enunciado: "2. En un estudio sobre los minutos que tardan 50 trabajadores de Guaymas en llegar a su empleo se obtuvieron las frecuencias: [10-20): 8 personas, [20-30): 15 personas, [30-40): 18 personas, [40-50): 6 personas, [50-60]: 3 personas. ¿Cuál es el intervalo con mayor frecuencia y qué porcentaje de los 50 trabajadores tarda menos de 30 minutos?", respuesta: "Intervalo modal: [30-40) con 18 personas. Tardan menos de 30 min: 8 + 15 = 23 personas, que representan (23/50)×100 = 46%." },
            { enunciado: "3. ¿Cuál es la diferencia visual y conceptual entre una Gráfica de Barras simple y un Histograma?", respuesta: "En la gráfica de barras las categorías están separadas; en el histograma las barras van unidas porque representan intervalos numéricos continuos." }
          ],
          boletoSalida: "¿Por qué para trazar un polígono de frecuencias se coloca el punto exactamente a la mitad del techo de cada barra del histograma?"
        }
      },
      {
        numero: 2,
        semana: 28,
        titulo: "Comparación Crítica de Gráficas de Línea y Polígonos en el Entorno",
        inicio: "Mostrar una gráfica con dos líneas superpuestas: temperatura en Guaymas en invierno vs. verano, o capturas pesqueras de dos embarcaciones.",
        desarrollo: "Entrenar la habilidad de elegir el tipo de gráfico óptimo según los datos (Circular para porcentajes de un total, Línea para evolución en el tiempo, Histograma/Polígono para distribución de intervalos) y comparar dos distribuciones en el mismo plano.",
        cierre: "Socialización de hallazgos y detección de gráficas engañosas en medios de comunicación.",
        hojaActividad: {
          tituloHoja: "Análisis Comparativo de Gráficas Estadísticas",
          instrucciones: "Selecciona el tipo de gráfica ideal para cada estudio y analiza comparativamente los datos presentados.",
          notaTeorica: "Elección de Gráfica: 1) Evolución a lo largo del tiempo → Gráfica de Línea. 2) Porcentajes que suman 100% → Gráfica Circular (Pastel). 3) Datos agrupados en intervalos → Histograma o Polígono de Frecuencias.",
          diagramType: "statistics",
          ejercicios: [
            { enunciado: "1. Indica qué tipo de gráfica (Circular, Línea o Histograma) conviene usar en cada caso: a) Variación del precio del dólar día tras día en un mes: __________ b) Distribución del presupuesto familiar en % (renta, comida, transporte, ahorro): __________ c) Estaturas de 200 alumnos agrupadas de 5 en 5 cm: __________", respuesta: "a) Gráfica de Línea | b) Gráfica Circular | c) Histograma." },
            { enunciado: "2. Dos polígonos de frecuencia comparan las calificaciones de 3°G y 3°H: en 3°G la cima del polígono está en el intervalo 80-90, mientras que en 3°H es más ancha entre 60 y 100. ¿Qué grupo tuvo resultados más concentrados alrededor de 85?", respuesta: "El grupo 3°G, porque su polígono tiene un pico más alto y estrecho en el intervalo 80-90." }
          ],
          boletoSalida: "¿Cómo puede una gráfica de barras engañar a primera vista si el eje vertical (Y) no comienza en cero?"
        }
      }
    ]
  },

  B15: {
    id: "B15",
    periodo: "27 de abril al 08 de mayo",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Calcula con precisión las medidas de tendencia central (media aritmética, mediana y moda).",
      "Calcula las medidas de dispersión (rango y desviación media DM) de un conjunto de datos.",
      "Compara dos conjuntos de datos con igual media pero distinta desviación media para evaluar su consistencia.",
      "Toma decisiones argumentadas basadas en el análisis conjunto de tendencia central y dispersión."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 29,
        titulo: "Más Allá del Promedio: Rango y Desviación Media (DM)",
        inicio: "Plantear el dilema deportivo: 'Dos beisbolistas (Jugador A y Jugador B) tienen exactamente el mismo promedio de bateo (media = 8 hits por semana), pero solo queda 1 lugar en la selección de Guaymas. ¿A quién elegimos?'",
        desarrollo: "Mostrar los datos: Jugador A = {7, 8, 8, 8, 9} y Jugador B = {2, 5, 8, 11, 14}. Ambos tienen Media = 8 y Mediana = 8. Introducir las Medidas de Dispersión: Rango (Máx - Mín) y Desviación Media (DM = promedio de las distancias absolutas |x - x̄| respecto a la media).",
        cierre: "Concluir que una menor Desviación Media indica mayor regularidad, estabilidad y confiabilidad.",
        hojaActividad: {
          tituloHoja: "Tendencia Central y Dispersión: La Desviación Media (DM)",
          instrucciones: "Calcula la Media (x̄), la Mediana, la Moda, el Rango y la Desviación Media (DM) para comparar ambos conjuntos de datos.",
          notaTeorica: "Desviación Media (DM): 1° Calcula la media (x̄). 2° Resta cada dato menos la media sin importar el signo |x - x̄|. 3° Suma esas distancias y divide entre el total de datos (n).",
          ejercicios: [
            { enunciado: "1. Analiza al Jugador A con datos {7, 8, 8, 8, 9}: a) Media x̄ = ____  b) Rango (Máx - Mín) = ____  c) Distancias |x - 8| = ____, ____, ____, ____, ____  d) Desviación Media (DM) = ____", respuesta: "a) Media = 8 | b) Rango = 9 - 7 = 2 | c) Distancias: 1, 0, 0, 0, 1 | d) DM = 2 / 5 = 0.4." },
            { enunciado: "2. Analiza al Jugador B con datos {2, 5, 8, 11, 14}: a) Media x̄ = ____  b) Rango = ____  c) Distancias |x - 8| = ____, ____, ____, ____, ____  d) Desviación Media (DM) = ____", respuesta: "a) Media = 8 | b) Rango = 14 - 2 = 12 | c) Distancias: 6, 3, 0, 3, 6 | d) DM = 18 / 5 = 3.6." },
            { enunciado: "3. Toma de Decisión: Si el entrenador busca un jugador confiable y constante que no falle en la final, ¿a quién debe elegir y por qué?", respuesta: "Al Jugador A, porque tiene la misma media (8) pero una desviación media mucho menor (0.4 vs 3.6), lo que demuestra gran regularidad." }
          ],
          boletoSalida: "¿Qué significa que la Desviación Media de las calificaciones de un alumno sea exactamente igual a 0?"
        }
      },
      {
        numero: 2,
        semana: 30,
        titulo: "Toma de Decisiones en Salud, Industria y Economía con Estadística",
        inicio: "Retomar el ejemplo de salud del Programa Analítico: comparar dos tratamientos médicos o dos máquinas empacadoras.",
        desarrollo: "Analizar casos donde un dato extremo ('valor atípico') distorsiona la media aritmética haciendo que la Mediana sea mejor representante, y casos de control de calidad mediante la Desviación Media.",
        cierre: "Debate grupal argumentando decisiones con números estadísticos.",
        hojaActividad: {
          tituloHoja: "Toma de Decisiones Estadísticas en Contextos Reales",
          instrucciones: "Calcula las medidas estadísticas de cada caso y redacta tu decisión justificada.",
          notaTeorica: "Cuando en un grupo de datos hay un valor extremadamente alto o bajo (atípico), la MEDIANA representa mejor al grupo que la Media. Para medir la precisión de una máquina se usa la DESVIACIÓN MEDIA.",
          ejercicios: [
            { enunciado: "1. En una pequeña empresa, 4 empleados ganan $8,000, $8,000, $9,000 y $10,000, y el dueño gana $65,000. a) Calcula la Media salarial. b) Calcula la Mediana y la Moda. ¿Cuál medida refleja mejor lo que gana un trabajador típico ahí?", respuesta: "a) Media = $100,000 / 5 = $20,000 (distorsionada por el sueldo del dueño). b) Mediana = $9,000 y Moda = $8,000 (representan mucho mejor la realidad)." },
            { enunciado: "2. Dos máquinas llenan latas de 200 g en Guaymas. En 4 pruebas, la Máquina X pesó {199, 200, 200, 201} y la Máquina Y pesó {195, 198, 202, 205}. Calcula la Media y la Desviación Media de ambas e indica cuál máquina está mejor calibrada.", respuesta: "Ambas tienen Media = 200 g. DM de X = (1+0+0+1)/4 = 0.5 g; DM de Y = (5+2+2+5)/4 = 3.5 g. La Máquina X está mucho mejor calibrada." }
          ],
          boletoSalida: "Resume en una frase: ¿Para qué sirven las medidas de tendencia central y para qué sirven las de dispersión?"
        }
      }
    ]
  },

  B16: {
    id: "B16",
    periodo: "11 al 22 de mayo",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Analiza presupuestos, ingresos, gastos fijos y gastos hormiga mediante tablas, gráficas circulares e histogramas.",
      "Compara opciones de ahorro, inversión y crédito utilizando porcentajes y medidas de tendencia central y dispersión.",
      "Participa en el Debate / Mesa de Diálogo '¿Sabes gestionar tu economía? Educación financiera para adolescentes'."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 31,
        titulo: "Proyecto STEAM Educación Financiera (Fases 1 a 3): Diagnóstico de Gastos y Ahorro",
        inicio: "Fase 1 STEAM: Preguntar: '¿Alguna vez han sentido que el dinero de la semana desaparece sin darse cuenta en pequeños antojos?' Introducir el concepto de 'gasto hormiga' y presupuesto.",
        desarrollo: "Fases 2 y 3 STEAM: Analizar un registro semanal de ingresos y gastos familiares/juveniles. Clasificar en Necesidades Básicas (50%), Gastos Personales (30%) y Ahorro (20%). Calcular media, rango y porcentajes para una gráfica circular.",
        cierre: "Descubrir cuánto suman al año $35 diarios de gasto hormiga ($12,775 al año).",
        hojaActividad: {
          tituloHoja: "Proyecto STEAM: Educación Financiera y Análisis de Presupuesto",
          instrucciones: "Realiza el análisis estadístico y porcentual del presupuesto y detecta el impacto anual de los gastos hormiga.",
          notaTeorica: "Regla Financiera 50 / 30 / 20: Destina 50% a necesidades básicas, 30% a gustos/personales y al menos 20% al ahorro. En una gráfica circular, 1% equivale a 3.6°.",
          diagramType: "statistics",
          ejercicios: [
            { enunciado: "1. Impacto del Gasto Hormiga: Si un adolescente gasta $30 diarios en refrescos o golosinas durante los 5 días de clases: a) ¿Cuánto gasta a la semana? b) ¿Cuánto gasta en las 40 semanas del ciclo escolar?", respuesta: "a) $150 a la semana | b) $150 × 40 = $6,000 en el ciclo escolar." },
            { enunciado: "2. Una familia de Guaymas tiene un ingreso mensual de $15,000. Aplicando la regla 50% / 30% / 20%, ¿cuánto dinero debe asignar a: a) Necesidades básicas (50%)  b) Gastos personales (30%)  c) Ahorro (20%)?", respuesta: "a) $7,500 | b) $4,500 | c) $3,000 de ahorro mensual." },
            { enunciado: "3. Para representar ese presupuesto (50%, 30% y 20%) en una Gráfica Circular (360°), ¿cuántos grados mide el sector de cada categoría?", respuesta: "50% = 180° | 30% = 108° | 20% = 72° (Suma = 360°)." }
          ],
          boletoSalida: "Calcula tu propio gasto semanal promedio y propón una meta realista de ahorro del 20%."
        }
      },
      {
        numero: 2,
        semana: 32,
        titulo: "Proyecto STEAM Educación Financiera (Fases 4 y 5): Crédito, Intereses y Mesa de Diálogo",
        inicio: "Fase 4 STEAM: Comparar dos ofertas para comprar una computadora de $10,000: Contado con ahorro previo vs. Crédito pagando 12 mensualidades de $1,100.",
        desarrollo: "Analizar estadísticamente dos fondos de ahorro/inversión (comparando su rendimiento medio y su riesgo/desviación media) y realizar la Mesa de Diálogo final: '¿Sabes gestionar tu economía? Educación financiera para adolescentes'.",
        cierre: "Fase 5 STEAM: Reflexión metacognitiva y conclusiones financieras.",
        hojaActividad: {
          tituloHoja: "Proyecto STEAM (Fases 4 y 5):Decisiones de Crédito, Inversión y Foro",
          instrucciones: "Evalúa matemáticamente el costo real de los créditos y compara las opciones financieras antes de la Mesa de Diálogo.",
          notaTeorica: "Al analizar un crédito, multiplica el número de pagos por el monto de cada cuota para conocer el Costo Total y réstale el precio de contado para hallar los intereses pagados.",
          ejercicios: [
            { enunciado: "1. Análisis de Crédito: Una laptop cuesta $10,000 de contado. A crédito se ofrece en 12 pagos mensuales de $1,100. a) ¿Cuánto terminas pagando en total a crédito? b) ¿Cuánto dinero extra pagaste de interés y qué porcentaje representa?", respuesta: "a) 12 × $1,100 = $13,200 | b) Pagaste $3,200 extra de intereses, es decir, un 32% más cara." },
            { enunciado: "2. Riesgo e Inversión: En los últimos 4 meses, el Negocio A dio ganancias mensuales de {$4,000, $4,200, $3,800, $4,000} y el Negocio B dio {$1,000, $8,000, $0, $7,000}. Calcula la Media y la Desviación Media de ambos. ¿Cuál negocio es más estable para una familia?", respuesta: "Ambos tienen Media = $4,000. Pero DM_A = $100 y DM_B = $3,500. El Negocio A es mucho más seguro y estable." },
            { enunciado: "3. Argumento para la Mesa de Diálogo: Escribe 3 reglas de oro basadas en las matemáticas para que un joven de 3° de secundaria administre bien su dinero.", respuesta: "1) Registrar ingresos y gastos, 2) Ahorrar el 20% antes de gastar, y 3) Comparar la tasa de interés antes de usar un crédito." }
          ],
          boletoSalida: "¿Cuándo sí vale la pena utilizar un crédito (por ejemplo, para una herramienta de trabajo) y cuándo no?"
        }
      }
    ]
  },

  B17: {
    id: "B17",
    periodo: "25 de mayo al 05 de junio",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Calcula y compara la probabilidad frecuencial y la probabilidad teórica (clásica) de un evento.",
      "Utiliza el diagrama de árbol para enumerar todos los resultados posibles de un experimento aleatorio.",
      "Distingue entre eventos independientes (la ocurrencia de uno no afecta al otro) y eventos dependientes (probabilidad condicional)."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 33,
        titulo: "Probabilidad Frecuencial vs. Teórica y Diagramas de Árbol",
        inicio: "Lanzar una moneda 10 veces en el salón y anotar cuántas veces cayó Águila. Preguntar: 'Si la teoría dice que la probabilidad es 1/2 (50%), ¿por qué en 10 lanzamientos pueden salir 7 águilas?'",
        desarrollo: "Contrastas la Probabilidad Frecuencial (casos observados / total de intentos) con la Probabilidad Teórica o de Laplace (casos favorables / total de casos posibles). Construir diagramas de árbol para enumerar el espacio muestral al lanzar 2 monedas o 1 moneda y 1 dado.",
        cierre: "Comprobar que al aumentar el número de repeticiones, la probabilidad frecuencial se acerca a la teórica.",
        hojaActividad: {
          tituloHoja: "Probabilidad Teórica, Frecuencial y Diagramas de Árbol",
          instrucciones: "Construye el espacio muestral y calcula las probabilidades en fracción, decimal y porcentaje.",
          notaTeorica: "Regla de Laplace (Probabilidad Teórica): P(A) = Número de casos favorables / Número total de casos posibles.",
          diagramType: "probability",
          ejercicios: [
            { enunciado: "1. En un experimento se lanzó un dado 20 veces y el número '5' salió 5 veces. a) ¿Cuál fue su probabilidad frecuencial? b) ¿Cuál es su probabilidad teórica exacta?", respuesta: "a) P_frec = 5/20 = 1/4 = 25% | b) P_teórica = 1/6 ≈ 16.6%." },
            { enunciado: "2. Si lanzas dos monedas al aire simultáneamente, escribe los 4 resultados posibles del espacio muestral (usando A = Águila y S = Sol) y calcula la probabilidad de obtener exactamente dos Águilas (AA).", respuesta: "Espacio muestral = {AA, AS, SA, SS} (4 casos). P(AA) = 1/4 = 0.25 = 25%." },
            { enunciado: "3. Si lanzas una moneda (2 opciones) y un dado de 6 caras (6 opciones), ¿cuántas ramas finales tendrá el diagrama de árbol y cuál es la probabilidad de sacar 'Águila y el número 6'?", respuesta: "2 × 6 = 12 resultados posibles. P(Águila y 6) = 1/12." }
          ],
          boletoSalida: "¿Puede la probabilidad de algún evento ser mayor que 1 (mayor que 100%)? ¿Por qué?"
        }
      },
      {
        numero: 2,
        semana: 34,
        titulo: "Eventos Independientes (Con Reemplazo) vs. Dependientes (Sin Reemplazo)",
        inicio: "Mostrar una bolsa con 3 canicas rojas y 2 azules (5 en total). Preguntar: 'Si saco una canica roja y NO la regreso a la bolsa, ¿cambia la probabilidad de que la segunda canica también sea roja?'",
        desarrollo: "Explicar la diferencia fundamental:\n• Eventos Independientes (con reemplazo, o lanzar dados/monedas): P(B|A) = P(B), el total no cambia.\n• Eventos Dependientes (sin reemplazo, o 'día nublado y llover'): El primer evento altera el espacio muestral del segundo.",
        cierre: "Clasificar y calcular probabilidades en extracciones con y sin devolución.",
        hojaActividad: {
          tituloHoja: "Sucesos Independientes y Dependientes en Contexto",
          instrucciones: "Identifica si los eventos son Independientes o Dependientes y calcula cómo cambia la probabilidad en la segunda extracción.",
          notaTeorica: "• Independientes (Con reemplazo): Se devuelve el objeto a la urna; la probabilidad se mantiene igual. | • Dependientes (Sin reemplazo): NO se devuelve; disminuye en 1 el total de objetos.",
          diagramType: "probability",
          ejercicios: [
            { enunciado: "1. Una urna contiene 4 esferas verdes y 6 blancas (10 en total). Sacas una esfera verde en el primer intento. a) ¿Cuál fue la probabilidad de esa primera extracción? b) Si NO la devuelves a la urna, ¿cuál es ahora la probabilidad de sacar otra esfera verde en el segundo intento?", respuesta: "a) Primera: 4/10 (2/5) | b) Segunda (sin reemplazo): quedan 3 verdes de 9 esferas en total -> P = 3/9 = 1/3." },
            { enunciado: "2. ¿Qué pasaría en el problema anterior si SÍ devuelves la primera esfera verde a la urna antes de sacar la segunda? ¿Son eventos dependientes o independientes?", respuesta: "La probabilidad vuelve a ser 4/10 y los eventos son INDEPENDIENTES." },
            { enunciado: "3. Clasifica en Independientes (I) o Dependientes (D): a) Sacar dos cartas seguidas de una baraja sin regresar la primera (___). b) Lanzar una moneda dos veces seguidas (___). c) Horas de estudio para el examen y aprobar matemáticas (___).", respuesta: "a) D (Dependientes) | b) I (Independientes) | c) D (Dependientes: estudiar influye en la probabilidad de aprobar)." }
          ],
          boletoSalida: "Si lanzas una moneda justa 4 veces y las 4 veces cae Sol, ¿cuál es la probabilidad de que en el 5° lanzamiento caiga Águila? (¡Cuidado con la intuición!)."
        }
      }
    ]
  },

  B18: {
    id: "B18",
    periodo: "08 al 19 de junio",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Identifica cuándo dos eventos son mutuamente excluyentes (no pueden ocurrir al mismo tiempo).",
      "Aplica la Regla de la Suma P(A o B) = P(A) + P(B) para calcular la probabilidad de eventos mutuamente excluyentes.",
      "Reconoce los eventos complementarios y utiliza P(A') = 1 - P(A) para simplificar cálculos."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 35,
        titulo: "Eventos Mutuamente Excluyentes y la Regla de la Suma P(A o B)",
        inicio: "Preguntar: 'Al lanzar un solo dado, ¿puedes sacar al mismo tiempo un número par y un número impar? ¿Y puedes sacar al mismo tiempo un número par y un número mayor que 3?'",
        desarrollo: "Definir Eventos Mutuamente Excluyentes: aquellos que no tienen ningún resultado en común (no pueden ocurrir simultáneamente). Presentar la Regla de la Suma: Si A y B son mutuamente excluyentes, P(A o B) = P(A) + P(B).",
        cierre: "Contrastar con eventos NO excluyentes (donde hay elementos repetidos que no deben contarse dos veces).",
        hojaActividad: {
          tituloHoja: "Eventos Mutuamente Excluyentes y la Regla de la Suma",
          instrucciones: "Determina si los eventos son mutuamente excluyentes y calcula la probabilidad de que ocurra uno u otro: P(A o B) = P(A) + P(B).",
          notaTeorica: "Dos eventos A y B son Mutuamente Excluyentes si no pueden ocurrir al mismo tiempo. En ese caso: P(A o B) = P(A) + P(B).",
          ejercicios: [
            { enunciado: "1. Al lanzar un dado de 6 caras {1, 2, 3, 4, 5, 6}, considera el Evento A = 'Sacar el número 2' y el Evento B = 'Sacar un número mayor que 4 {5, 6}'. a) ¿Son mutuamente excluyentes? b) Calcula P(A), P(B) y P(A o B).", respuesta: "a) Sí son mutuamente excluyentes | b) P(A) = 1/6, P(B) = 2/6 -> P(A o B) = 1/6 + 2/6 = 3/6 = 1/2 (50%)." },
            { enunciado: "2. En una tómbola escolar hay 5 boletos rojos, 3 azules y 2 dorados (10 en total). Si sacas 1 boleto al azar, ¿cuál es la probabilidad de que sea Rojo O Dorado?", respuesta: "P(Rojo o Dorado) = 5/10 + 2/10 = 7/10 = 70%." },
            { enunciado: "3. ¡Cuidado con los No Excluyentes!: Al lanzar un dado, sea A = 'Sacar número par {2, 4, 6}' y B = 'Sacar número mayor que 3 {4, 5, 6}'. ¿Por qué NO son mutuamente excluyentes y cuáles son los resultados reales de (A o B)?", respuesta: "No son excluyentes porque comparten el 4 y el 6. La unión es {2, 4, 5, 6}, por lo que P(A o B) = 4/6 = 2/3." }
          ],
          boletoSalida: "Al lanzar dos dados y multiplicar sus puntos, ¿pueden ocurrir al mismo tiempo 'que ambos dados sean pares' y 'que su producto sea impar'? ¿Por qué?"
        }
      },
      {
        numero: 2,
        semana: 36,
        titulo: "Eventos Complementarios: La Suma que Siempre da 1 (100%)",
        inicio: "Preguntar: 'Si el pronóstico meteorológico en Guaymas dice que hoy hay un 30% de probabilidad de lluvia, ¿cuál es la probabilidad de que NO llueva?'",
        desarrollo: "Definir Eventos Complementarios (A y A'): son dos eventos mutuamente excluyentes que juntos cubren TODO el espacio muestral, por lo que P(A) + P(A') = 1, es decir: P(no A) = 1 - P(A).",
        cierre: "Resolver problemas usando el atajo del complemento.",
        hojaActividad: {
          tituloHoja: "Eventos Complementarios: P(A) + P(no A) = 1",
          instrucciones: "Utiliza la propiedad de los eventos complementarios P(A') = 1 - P(A) para resolver cada situación de forma rápida.",
          notaTeorica: "El complemento de un evento A (escrito A' o 'no A') contiene todos los resultados donde NO ocurre A. Siempre se cumple: P(no A) = 1 - P(A).",
          ejercicios: [
            { enunciado: "1. Al lanzar un dado de 6 caras, la probabilidad de sacar el número '6' es 1/6. Usando el complemento, ¿cuál es la probabilidad de NO sacar un 6 (es decir, sacar 1, 2, 3, 4 o 5)?", respuesta: "P(no 6) = 1 - 1/6 = 5/6." },
            { enunciado: "2. En una rifa de 200 boletos para ayudar a la graduación de 3° de secundaria compraste 8 boletos. a) ¿Cuál es tu probabilidad de ganar? b) ¿Cuál es la probabilidad de NO ganar?", respuesta: "a) P(ganar) = 8/200 = 1/25 (4%) | b) P(no ganar) = 1 - 1/25 = 24/25 (96%)." },
            { enunciado: "3. Al lanzar dos dados simultáneamente hay 36 combinaciones posibles. Solo hay 1 combinación que suma 12 (sacar 6 y 6). ¿Cuál es la probabilidad de que la suma de los dos dados sea MENOR que 12?", respuesta: "Es el complemento de sumar 12: P(suma < 12) = 1 - 1/36 = 35/36." }
          ],
          boletoSalida: "Si la probabilidad de extraer una pieza defectuosa en una fábrica es de 0.02, ¿cuál es la probabilidad de extraer una pieza en buen estado?"
        }
      }
    ]
  },

  B19: {
    id: "B19",
    periodo: "22 de junio al 03 de julio",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Aplica la Regla del Producto P(A y B) = P(A) × P(B) para calcular la probabilidad de dos o más eventos independientes.",
      "Reconoce que en un diagrama de árbol se multiplica a lo largo de una misma rama y se suma al unir ramas distintas.",
      "Evalúa matemáticamente juegos de azar en su comunidad escolar para decidir de forma crítica si son equitativos."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 37,
        titulo: "La Regla del Producto en Eventos Independientes: P(A y B) = P(A) × P(B)",
        inicio: "Plantear el reto: 'Para ganar el premio mayor de la kermés debes lanzar una moneda y sacar Águila (1/2) Y ADEMÁS girar una ruleta de 4 colores y atinarle al Rojo (1/4). ¿Qué tan probable es lograr ambas cosas seguidas?'",
        desarrollo: "Demostrar mediante el diagrama de árbol la Regla del Producto para eventos independientes: la probabilidad de que ocurran A y B es el producto de sus probabilidades individuales: P(A y B) = P(A) × P(B).",
        cierre: "Generalizar la regla del producto para 3 eventos consecutivos (ej. lanzar una moneda 3 veces).",
        hojaActividad: {
          tituloHoja: "La Regla del Producto: P(A y B) = P(A) × P(B)",
          instrucciones: "Multiplica las probabilidades a lo largo de las ramas para hallar la probabilidad de que ocurran ambos eventos independientes.",
          notaTeorica: "Regla del Producto: Si A y B son independientes, la probabilidad de que ocurra A Y TAMBIÉN ocurra B se obtiene multiplicando: P(A y B) = P(A) × P(B).",
          diagramType: "probability",
          ejercicios: [
            { enunciado: "1. Juego de la Kermés: Lanzas una moneda (P(Águila) = 1/2) y giras una ruleta de 4 sectores iguales (P(Rojo) = 1/4). ¿Cuál es la probabilidad de obtener Águila Y Rojo?", respuesta: "P(Águila y Rojo) = (1/2) × (1/4) = 1/8 = 0.125 (12.5%)." },
            { enunciado: "2. Si lanzas un dado dos veces seguidas, ¿cuál es la probabilidad de obtener un '6' en el primer lanzamiento Y otro '6' en el segundo lanzamiento?", respuesta: "P(6 y 6) = (1/6) × (1/6) = 1/36 ≈ 2.77%." },
            { enunciado: "3. En un examen sorpresa hay 3 preguntas de Verdadero o Falso. Si un alumno contesta las 3 completamente al azar, ¿cuál es la probabilidad de que acierte las 3 seguidas?", respuesta: "P = (1/2) × (1/2) × (1/2) = 1/8 = 12.5%." }
          ],
          boletoSalida: "¿Por qué al multiplicar dos fracciones propias como 1/2 × 1/3 el resultado (1/6) es más pequeño? ¿Qué significa eso en probabilidad?"
        }
      },
      {
        numero: 2,
        semana: 38,
        titulo: "Combinando Regla Aditiva y Multiplicativa: ¿Participamos en el Juego de Azar?",
        inicio: "Presentar un juego de feria: 'Se lanzan dos monedas; si salen iguales (AA o SS) gana elJugador 1, y si salen diferentes (AS o SA) gana el Jugador 2. ¿Es un juego justo?'",
        desarrollo: "Combinar la Regla Multiplicativa (a lo largo de cada rama) y la Regla Aditiva (sumando ramas ganadoras). Analizar juegos justos vs. juegos con ventaja oculta para la banca.",
        cierre: "Cierre del Ciclo Escolar y Evaluación Formativa del Tercer Trimestre.",
        hojaActividad: {
          tituloHoja: "Análisis Matemático de Juegos de Azar: ¿Es un Juego Justo?",
          instrucciones: "Utiliza el diagrama de árbol y las reglas del producto y de la suma para decidir si cada juego es equitativo.",
          notaTeorica: "En un Diagrama de Árbol: 1) Se MULTIPLICA al avanzar de izquierda a derecha por una rama. 2) Se SUMA de arriba hacia abajo cuando varias ramas finales nos hacen ganar.",
          diagramType: "probability",
          ejercicios: [
            { enunciado: "1. En una bolsa hay 3 canicas rojas y 1 azul (P(R) = 3/4, P(A) = 1/4). Se saca una canica, se anota el color, SE REGRESA a la bolsa y se saca otra. Calcula con la regla del producto: a) P(Roja y Roja) = ______  b) P(Azul y Azul) = ______", respuesta: "a) P(R y R) = (3/4)×(3/4) = 9/16 | b) P(A y A) = (1/4)×(1/4) = 1/16." },
            { enunciado: "2. En el juego anterior, el Organizador propone: 'Si salen las dos del mismo color (RR o AA) gano yo; si salen de diferente color (RA o AR) ganas tú'. Suma las probabilidades de cada quien y decide si te conviene jugar.", respuesta: "P(Organizador: RR o AA) = 9/16 + 1/16 = 10/16 (62.5%). P(Jugador: RA o AR) = 3/16 + 3/16 = 6/16 (37.5%). ¡No es un juego justo; el organizador tiene ventaja!" },
            { enunciado: "3. Diseña una regla justa con el lanzamiento de 2 dados para que ambos jugadores tengan exactamente 1/2 (50%) de probabilidad de ganar.", respuesta: "Ejemplo: Jugador 1 gana si la suma es par (18/36 = 1/2) y Jugador 2 gana si la suma es impar (18/36 = 1/2)." }
          ],
          boletoSalida: "Reflexión de Fin de Curso: ¿Cómo te ayuda conocer las reglas de la probabilidad para tomar mejores decisiones en la vida cotidiana?"
        }
      }
    ]
  },

  // ================= PLANO DE CODISEÑO: BLOQUES COD01 A COD04 =================
  COD01: {
    id: "COD01",
    periodo: "Plano de Codiseño - Bloque I",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "1 semana (5 sesiones)",
    evaluacionFormativa: [
      "Reconoce los productos notables como casos especiales de la multiplicación algebraica y la propiedad distributiva.",
      "Representa geométricamente el cuadrado de un binomio (a + b)² = a² + 2ab + b² mediante descomposición de áreas.",
      "Aplica el cuadrado de un binomio, los binomios conjugados y los binomios con término común en problemas concretos."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 39,
        titulo: "Productos Notables: De lo Concreto y Pictórico a lo Simbólico",
        inicio: "Mostrar un cuadrado de lado (a + b) dividido en 4 regiones (dos cuadrados y dos rectángulos) y preguntar: '¿Por qué (a + b)² NO es igual a solo a² + b²? ¿Qué piezas faltan?'",
        desarrollo: "Deducir visual y algebraicamente los tres productos notables fundamentales:\n1. Binomio al cuadrado: (a + b)² = a² + 2ab + b².\n2. Binomios conjugados (suma por diferencia): (a + b)(a - b) = a² - b².\n3. Binomios con término común: (x + a)(x + b) = x² + (a+b)x + ab.",
        cierre: "Verificación numérica evaluando para a = 4.",
        hojaActividad: {
          tituloHoja: "Codiseño I: Productos Notables Geométricos y Algebraicos",
          instrucciones: "Observa el modelo geométrico de áreas y desarrolla cada producto notable aplicando su regla directa.",
          notaTeorica: "1) (a + b)² = a² + 2ab + b²  |  2) (a + b)(a - b) = a² - b²  |  3) (x + a)(x + b) = x² + (a+b)x + ab.",
          diagramType: "codiseno_sectors",
          ejercicios: [
            { enunciado: "1. Observando el cuadrado dividido del diagrama superior, desarrolla el área de: a) (x + 3)² = ____________   b) (a + 4)² = ____________", respuesta: "a) x² + 6x + 9 | b) a² + 8a + 16." },
            { enunciado: "2. Si en la expresión (a + 5)² = a² + 10a + 25 sustituimos el valor a = 4, comprueba que ambos lados de la igualdad dan exactamente el mismo número.", respuesta: "Izquierda: (4 + 5)² = 9² = 81. Derecha: 4² + 10(4) + 25 = 16 + 40 + 25 = 81." },
            { enunciado: "3. Desarrolla los binomios conjugados y con término común: a) (x + 6)(x - 6) = ________   b) (x + 2)(x + 5) = ________", respuesta: "a) x² - 36 | b) x² + 7x + 10." }
          ],
          boletoSalida: "Explica geométricamente por qué al elevar (a + b)² aparece el término central '2ab'."
        }
      }
    ]
  },

  COD02: {
    id: "COD02",
    periodo: "Plano de Codiseño - Bloque II",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "1 semana (5 sesiones)",
    evaluacionFormativa: [
      "Comprende una relación lineal en dos variables de la forma ax + by = c.",
      "Reconoce el cociente m = -a/b como la pendiente de la recta y grafica haces de rectas paralelas.",
      "Interpreta curvas de nivel en planos inclinados, techos y propagación de olas en el mar."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 40,
        titulo: "Relaciones Lineales ax + by = c, Haces de Rectas y Curvas de Nivel",
        inicio: "Observar cómo llegan las olas paralelas a la playa de Miramar en Guaymas o las líneas de nivel de un cerro en un mapa topográfico.",
        desarrollo: "Analizar la ecuación general lineal ax + by = c dejando fijos a y b y variando c para obtener un haz de rectas paralelas con pendiente m = -a/b. Graficar usando las intersecciones con los ejes X e Y.",
        cierre: "Inferir que líneas de nivel más juntas representan una pendiente más inclinada.",
        hojaActividad: {
          tituloHoja: "Codiseño II: Familia de Rectas ax + by = c y Curvas de Nivel",
          instrucciones: "Calcula la pendiente m = -a/b, encuentra los cruces con los ejes y grafica el haz de rectas paralelas.",
          notaTeorica: "En la ecuación lineal ax + by = c: La pendiente es m = -a/b. Al cambiar únicamente el valor de 'c', se obtienen rectas paralelas (líneas de nivel).",
          diagramType: "cartesian",
          ejercicios: [
            { enunciado: "1. Dada la ecuación 2x + y = 6: a) Despeja 'y' en la forma y = mx + b. b) ¿Cuánto vale la pendiente m = -a/b? c) Calcula y para x = 0, 1, 2, 3.", respuesta: "a) y = -2x + 6 | b) m = -2/1 = -2 | c) Para x = 0, 1, 2, 3 -> y = 6, 4, 2, 0." },
            { enunciado: "2. Ahora considera las ecuaciones 2x + y = 4 y 2x + y = 8 junto con la anterior. ¿Por qué las tres gráficas forman un haz de rectas paralelas en el plano cartesiano?", respuesta: "Porque las tres tienen exactamente la misma pendiente m = -2 y solo cambia su ordenada al origen (4, 6 y 8)." },
            { enunciado: "3. Interpretación topográfica: En un mapa de los cerros de Guaymas, si las líneas de nivel ax + by = c están muy pegadas entre sí, ¿el terreno es plano o muy empinado?", respuesta: "Es muy empinado (mayor pendiente o razón de cambio de la altura)." }
          ],
          boletoSalida: "¿Cuál es la pendiente m de la recta representada por la ecuación 6x + 3y = 12?"
        }
      }
    ]
  },

  COD03: {
    id: "COD03",
    periodo: "Plano de Codiseño - Bloque III",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "1 semana (5 sesiones)",
    evaluacionFormativa: [
      "Reconoce la proporción entre el ángulo central (60°, 90°, 120°, 180°) y la fracción correspondiente del círculo (1/6, 1/4, 1/3, 1/2).",
      "Calcula el área y el perímetro de sectores circulares y coronas circulares en problemas reales."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 41,
        titulo: "Área y Perímetro de Sectores Circulares (60°, 90°, 120° y 180°)",
        inicio: "Dividir un círculo de papel en 2, 3, 4 y 6 partes iguales y preguntar cuántos grados mide el ángulo central de cada rebanada.",
        desarrollo: "Deducir que 180° = 1/2 círculo, 120° = 1/3, 90° = 1/4 y 60° = 1/6 del círculo completo (360°). Formular el Área del Sector A = (πr² · θ) / 360° y el Perímetro del Sector P = Longitud de arco + 2r.",
        cierre: "Resolver problemas de limpiaparabrisas, faros marítimos y abanicos.",
        hojaActividad: {
          tituloHoja: "Codiseño III: Área y Perímetro de Sectores Circulares",
          instrucciones: "Relaciona cada ángulo central con su fracción del círculo y calcula el área y perímetro del sector circular (π = 3.14).",
          notaTeorica: "Fracciones de los 360°: 180° = 1/2 | 120° = 1/3 | 90° = 1/4 | 60° = 1/6. Área del Sector = (πr² · θ)/360°. Perímetro del Sector = Arco + 2r.",
          diagramType: "codiseno_sectors",
          ejercicios: [
            { enunciado: "1. Relaciona cada ángulo central con la fracción del área del círculo que representa: a) 180° = ____  b) 120° = ____  c) 90° = ____  d) 60° = ____", respuesta: "a) 1/2 | b) 1/3 | c) 1/4 | d) 1/6." },
            { enunciado: "2. El haz de luz de un faro en Guaymas ilumina un sector circular de radio r = 60 m con un ángulo de giro de 60° (1/6 de círculo). ¿Qué área del mar ilumina el faro?", respuesta: "A = (3.14 × 60²) / 6 = (3.14 × 3600) / 6 = 3.14 × 600 = 1,884 m²." },
            { enunciado: "3. Calcula la longitud del arco y el perímetro total de una rebanada de pastel (sector circular) de radio r = 10 cm y ángulo central de 90° (1/4 de círculo).", respuesta: "Arco = (2 × 3.14 × 10) / 4 = 15.7 cm. Perímetro total = Arco + 2 radios = 15.7 + 20 = 35.7 cm." }
          ],
          boletoSalida: "Si tienes un sector circular grande de radio R = 10 cm y le recortas un sector concéntrico pequeño de r = 4 cm con ángulo de 180°, ¿cuál es el área de la franja resultante?"
        }
      }
    ]
  },

  COD04: {
    id: "COD04",
    periodo: "Plano de Codiseño - Bloque IV",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "1 semana (5 sesiones)",
    evaluacionFormativa: [
      "Determina la escala numérica entre un modelo o maqueta y un espacio real.",
      "Comprueba y aplica el Teorema de la Altura de Euclides (h² = p · q) mediante triángulos semejantes dentro de un triángulo rectángulo."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 42,
        titulo: "Modelos a Escala Interdisciplinarios y el Teorema de Euclides",
        inicio: "Mostrar el plano de una plaza cívica trazado a escala 1 : 200 y preguntar qué significa que 1 cm en el dibujo represente 200 cm (2 metros) en la realidad.",
        desarrollo: "Practicar la conversión de medidas en maquetas a escala y demostrar mediante semejanza de triángulos el Teorema de la Altura de Euclides en un triángulo rectángulo: cuando se traza la altura h hacia la hipotenusa dividiéndola en dos proyecciones p y q, se cumple que h² = p · q.",
        cierre: "Resolución de problemas arquitectónicos con escalas y el Teorema de Euclides.",
        hojaActividad: {
          tituloHoja: "Codiseño IV: Modelos a Escala y Teorema de Euclides (h² = p · q)",
          instrucciones: "Calcula las dimensiones reales a partir de la escala y aplica el Teorema de Euclides en triángulos rectángulos.",
          notaTeorica: "• Escala 1 : E → Medida Real = Medida en el Modelo × E. | • Teorema de la Altura de Euclides: En un triángulo rectángulo, la altura h sobre la hipotenusa cumple h² = p · q (donde p y q son las dos partes en que se divide la hipotenusa).",
          diagramType: "similar_triangles",
          ejercicios: [
            { enunciado: "1. En una maqueta de la plaza de Guaymas construida a escala 1 : 150, la cancha mide 20 cm de largo por 12 cm de ancho. ¿Cuáles son sus medidas reales en metros?", respuesta: "Largo = 20 × 150 = 3,000 cm = 30 m. Ancho = 12 × 150 = 1,800 cm = 18 m." },
            { enunciado: "2. Teorema de Euclides: El techo de una nave industrial tiene forma de triángulo rectángulo. La columna vertical central (altura h) divide la viga horizontal (hipotenusa) en dos segmentos de p = 4 m y q = 9 m. Usando h² = p · q, ¿cuánto mide la altura h de la columna?", respuesta: "h² = 4 × 9 = 36 -> h = √36 = 6 metros." },
            { enunciado: "3. En otro triángulo rectángulo, la altura sobre la hipotenusa mide h = 8 cm y una de las proyecciones mide p = 4 cm. ¿Cuánto mide la otra proyección q y cuánto mide la hipotenusa completa?", respuesta: "8² = 4 · q -> 64 = 4q -> q = 16 cm. Hipotenusa total = 4 + 16 = 20 cm." }
          ],
          boletoSalida: "¿Por qué la altura trazada hacia la hipotenusa divide a un triángulo rectángulo en dos triángulos más pequeños que son semejantes al original?"
        }
      }
    ]
  }
});
