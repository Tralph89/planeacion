// ============================================================================
// PLANEACIONES Y HOJAS DE ACTIVIDAD - TRIMESTRE 1 (BLOQUES B01 A B05)
// Basado íntegramente en "Matematicas 3 1T Rafael Leyva.pdf"
// ============================================================================

window.PlaneacionesTrimestre1 = {
  B01: {
    id: "B01",
    periodo: "08 al 12 de septiembre",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "1 semana (5 sesiones)",
    evaluacionFormativa: [
      "Usa diversas estrategias al convertir números fraccionarios a decimales y viceversa.",
      "Relaciona e interpreta relaciones proporcional y no proporcional a partir de su representación gráfica y con diagramas.",
      "Reconoce el significado de las cuatro operaciones básicas y sus relaciones inversas con números con signo.",
      "Identifica y aplica la jerarquía de operaciones y símbolos de agrupación al realizar cálculos.",
      "Utiliza estrategias diversas para determinar el perímetro y el área de figuras compuestas."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 1,
        titulo: "Estaciones de Conversión: Fracciones y Decimales",
        inicio: "Comenzaré la clase con el reto 'El Intruso'. Escribiré en el pizarrón el conjunto de números: 0.5, 5/10, 1/2, 0.2. En parejas, identificarán cuál número no pertenece al grupo y explicarán por qué.",
        desarrollo: "Explicación rápida de los dos caminos: de fracción a decimal (dividiendo numerador entre denominador) y de decimal finito a fracción (usando potencias de 10). Actividad 'Estaciones de Conversión' con 4 estaciones rotativas cada 6 minutos:\n• Estación 1 (Fracciones a Decimales): 3/4, 2/5, 7/8, 5/3 (periódico).\n• Estación 2 (Decimales a Fracciones): 0.25, 0.8, 1.5, 0.125.\n• Estación 3 (Problemas de la Vida Real): 0.75 tazas de harina, 2.5 km como mixto, 3/8 de pizza en decimal y porcentaje.\n• Estación 4 (Reto con Calculadora): 2/7 y 5/9 (identificar patrones periódicos).",
        cierre: "Boleto de Salida individual en tarjeta:\n• Lado A: Convierte la fracción 3/8 a su equivalente en decimal.\n• Lado B: Convierte el número decimal 0.6 a su fracción irreducible.",
        hojaActividad: {
          tituloHoja: "Estaciones de Conversión: Fracciones y Decimales",
          instrucciones: "Completa el reto inicial y resuelve cada una de las 4 estaciones de conversión anotando tus operaciones.",
          notaTeorica: "De Fracción a Decimal: Divide el numerador entre el denominador (a ÷ b). | De Decimal a Fracción: Escribe los dígitos sin punto sobre 10, 100 o 1000 según la posición decimal y simplifica.",
          ejercicios: [
            { enunciado: "Reto Inicial 'El Intruso': Entre los números 0.5, 5/10, 1/2 y 0.2, ¿cuál no pertenece al grupo y por qué?", respuesta: "0.2 no pertenece porque equivale a 1/5, mientras que 0.5 = 5/10 = 1/2." },
            { enunciado: "Estación 1 (Fracción a Decimal): Convierte a) 3/4   b) 2/5   c) 7/8   d) 5/3 (indica el periodo).", respuesta: "a) 0.75 | b) 0.4 | c) 0.875 | d) 1.666... (periódico)" },
            { enunciado: "Estación 2 (Decimal a Fracción simplificada): Convierte a) 0.25   b) 0.8   c) 1.5   d) 0.125.", respuesta: "a) 1/4 | b) 4/5 | c) 3/2 (o 1 ½) | d) 1/8" },
            { enunciado: "Estación 3 (Vida Real): 1) Una receta pide 0.75 tazas de harina, ¿qué fracción es? 2) Corriste 2.5 km, exprésalo como número mixto. 3) De una pizza de 8 rebanadas comiste 3, ¿qué decimal y porcentaje representa?", respuesta: "1) 3/4 de taza | 2) 2 ½ km | 3) 0.375 = 37.5%" },
            { enunciado: "Estación 4 (Patrones con Calculadora): Calcula el decimal de 2/7 y de 5/9. ¿Qué patrón observas en sus cifras decimales?", respuesta: "2/7 = 0.285714285714... (periodo de 6 cifras) y 5/9 = 0.555... (el numerador se repite)." }
          ],
          boletoSalida: "Lado A: Convierte la fracción 3/8 a decimal. | Lado B: Convierte el decimal 0.6 a su fracción más simple."
        }
      },
      {
        numero: 2,
        semana: 1,
        titulo: "Graficando Nuestros Gastos: Proporcional vs. No Proporcional",
        inicio: "Plantearé dos historias cotidianas:\n1. Historia 1 (Cine - Proporcional): Cada boleto cuesta $50. Si compro 1 pago $50, si compro 2 pago $100, si compro 0 pago $0.\n2. Historia 2 (Taxi - No Proporcional): El taxista cobra $15 de banderazo fijo más $10 por cada kilómetro avanzado.",
        desarrollo: "Actividad central 'Graficando Nuestros Gastos':\n1. Llenando las Tablas (10 min): Completar costos para x = 0, 1, 2, 3 boletos de cine (0, 50, 100, 150) y kilómetros en taxi (15, 25, 35, 45).\n2. A Graficar en Equipo (20 min): En plano cartesiano, graficar los puntos de ambas tablas y unirlos con regla.",
        cierre: "Exposición de Gráficas y Conclusión: Comparar ambas rectas. Concluir: 'Una relación es de PROPORCIONALIDAD DIRECTA cuando su gráfica es una LÍNEA RECTA que pasa por el ORIGEN (0,0). ¡Como el cine!'",
        hojaActividad: {
          tituloHoja: "Graficando Nuestros Gastos: El Cine vs. El Taxi",
          instrucciones: "Completa las tablas de valores para ambas historias, ubica las coordenadas (x, y) en el plano cartesiano y responde las preguntas de análisis.",
          notaTeorica: "Proporcionalidad Directa (y = kx): Al duplicar x se duplica y, y si x = 0 entonces y = 0 (pasa por el origen). | Relación Afín No Proporcional (y = mx + b): Tiene un costo inicial fijo b distinto de cero.",
          diagramType: "cartesian",
          ejercicios: [
            { enunciado: "1. Tabla Boletos de Cine ($50 c/u): Calcula el costo (y) para x = 0, 1, 2, 3 y 4 boletos.", respuesta: "Para x = 0, 1, 2, 3, 4 -> Costo y = $0, $50, $100, $150, $200." },
            { enunciado: "2. Tabla Viaje en Taxi ($15 banderazo + $10 por km): Calcula el costo (y) para x = 0, 1, 2, 3 y 4 km.", respuesta: "Para x = 0, 1, 2, 3, 4 -> Costo y = $15, $25, $35, $45, $55." },
            { enunciado: "3. Traza ambas rectas en el plano cartesiano superior usando dos colores distintos.", respuesta: "Ambas son líneas rectas; Cine inicia en (0,0) y Taxi inicia en (0,15)." },
            { enunciado: "4. ¿En qué se parecen las dos gráficas y cuál es la GRAN diferencia visual entre ellas en el punto de inicio?", respuesta: "Ambas son rectas crecientes, pero solo la del Cine pasa por el origen (0,0)." }
          ],
          boletoSalida: "Explica con tus palabras: ¿Por qué el cobro del taxi NO es de proporcionalidad directa aunque aumente de 10 en 10?"
        }
      },
      {
        numero: 3,
        semana: 1,
        titulo: "Mi Semana de Emprendedor: Operaciones con Números con Signo",
        inicio: "Actividad 'Estado de Cuenta Rápido': En tu cartera tienes $50, tu amigo te paga $30 que te debía, compras papitas de $15 y pagas $40 que debías a tu mamá. Resolver 50 + 30 - 15 - 40 en el pizarrón.",
        desarrollo: "Hoja de trabajo individual 'Mi Semana de Emprendedor' con Capital Inicial de +$100:\n• Lunes (Suma): Ganaste $85 -> 100 + 85\n• Martes (Resta): Factura de luz de $120 -> Saldo - 120\n• Miércoles (Multiplicación con negativo): 3 clientes no pagaron deuda de $50 -> Saldo + (3 × -50)\n• Jueves (División con negativo): Deuda de $200 entre 4 socios -> Saldo + (-200 / 4)\n• Viernes (Combinadas): Vendiste 2 productos de $60 y pagaste $30 de envío -> Saldo + (2 × 60) - 30\n• Sábado (Multiplicación de negativos): Cancelaste 2 deudas de -$40 -> Saldo + (-2 × -40)\n• Domingo (Reto Final): Pagaste mitad de deuda de $150 y recibiste bono de $25 -> Saldo - (150/2) + 25.",
        cierre: "Verificación Grupal en el Pizarrón día por día y Boleto de Salida 'Mi Resumen Financiero'.",
        hojaActividad: {
          tituloHoja: "Mi Semana de Emprendedor (Números con Signo)",
          instrucciones: "Eres un emprendedor y comienzas la semana con un capital inicial de +$100. Registra la operación y calcula el nuevo saldo acumulado al final de cada día.",
          notaTeorica: "Leyes de los signos en multiplicación y división: (+)×(+) = + | (-)×(-) = + | (+)×(-) = - | (-)×(+) = -",
          ejercicios: [
            { enunciado: "Calentamiento: Resuelve el estado de cuenta rápido: 50 + 30 - 15 - 40 = ________", respuesta: "+$25" },
            { enunciado: "Lunes (Capital inicial +$100): Tuviste un gran día de ventas y ganaste $85. Operación: 100 + 85 | Nuevo Saldo: ______", respuesta: "+$185" },
            { enunciado: "Martes: Pagaste la factura de internet y luz ($120). Operación: 185 - 120 | Nuevo Saldo: ______", respuesta: "+$65" },
            { enunciado: "Miércoles: Tres clientes no pagaron una deuda de $50 cada uno. Operación: 65 + (3 × -50) | Nuevo Saldo: ______", respuesta: "65 - 150 = -$85" },
            { enunciado: "Jueves: Una deuda de $200 con un proveedor se dividió entre 4 socios. Operación: -85 + (-200 ÷ 4) | Nuevo Saldo: ______", respuesta: "-85 - 50 = -$135" },
            { enunciado: "Viernes: Vendiste 2 productos de $60 c/u y pagaste $30 de envío. Operación: -135 + (2 × 60) - 30 | Nuevo Saldo: ______", respuesta: "-135 + 120 - 30 = -$45" },
            { enunciado: "Sábado: Recuperaste (cancelaste) 2 deudas perdidas de -$40 c/u. Operación: -45 + (-2 × -40) | Nuevo Saldo: ______", respuesta: "-45 + 80 = +$35" },
            { enunciado: "Domingo (Reto Final): Pagaste la mitad de una deuda de $150 y recibiste un bono de $25. Operación: 35 - (150 ÷ 2) + 25 | Saldo Final: ______", respuesta: "35 - 75 + 25 = -$15" }
          ],
          boletoSalida: "1. Si +10 significa 'ganar $10', ¿qué significa (-5) × 3 en un contexto de dinero? | 2. ¿Cuál fue el paso donde tuviste mayor cuidado con los signos?"
        }
      },
      {
        numero: 4,
        semana: 1,
        titulo: "El Desafío PEMDAS: Jerarquía de Operaciones",
        inicio: "Acertijo 'El Cálculo Ambiguo': Resolver 7 + 3 × 5 de izquierda a derecha (50) vs. multiplicación primero (22). Reflexionar sobre la necesidad de un orden universal.",
        desarrollo: "Repaso visual de PEMDAS (1. Paréntesis, 2. Exponentes y Raíces, 3. Multiplicación y División de izq. a der., 4. Adición y Sustracción). Resolución individual por niveles de 'El Desafío PEMDAS'.",
        cierre: "Actividad 'El Caso del Cálculo Incorrecto': Analizar el procedimiento erróneo de 5 × (4 + 2) - 12 / 2² donde se restó antes de dividir, e identificar que el resultado correcto es 27.",
        hojaActividad: {
          tituloHoja: "El Desafío PEMDAS y El Detective Matemático",
          instrucciones: "Resuelve las operaciones paso a paso respetando estrictamente el código PEMDAS.",
          notaTeorica: "Orden PEMDAS: 1° Paréntesis ( ) [ ] | 2° Exponentes y Raíces (x², √) | 3° Multiplicación y División (de izquierda a derecha) | 4° Suma y Resta (de izquierda a derecha).",
          ejercicios: [
            { enunciado: "Nivel 1 (Calentamiento):  a) 20 - 5 × 2 = ________     b) 8 + 12 ÷ 4 = ________", respuesta: "a) 20 - 10 = 10 | b) 8 + 3 = 11" },
            { enunciado: "Nivel 2 (Cuidado con los Paréntesis):  c) (9 - 4) × 5 = ________     d) 30 ÷ (2 + 3) + 4 = ________", respuesta: "c) 5 × 5 = 25 | d) 30 ÷ 5 + 4 = 10" },
            { enunciado: "Nivel 3 (El Poder de los Exponentes):  e) 6² - 10 ÷ 2 = ________     f) 5 × (1 + 2)² - 15 = ________", respuesta: "e) 36 - 5 = 31 | f) 5 × 9 - 15 = 30" },
            { enunciado: "Nivel 4 (¡El Reto Final!):  g) 40 ÷ (3 + 1)² + (6 × 3 - 8) = ________", respuesta: "40 ÷ 16 + (18 - 8) = 2.5 + 10 = 12.5" }
          ],
          boletoSalida: "Caso de Detective: En 5 × (4 + 2) - 12 ÷ 2², un alumno hizo: Paso 1: 5×6 - 12÷2²; Paso 2: 30 - 12÷2²; Paso 3: 18 ÷ 2² = 4.5. ¿En qué paso exacto rompió PEMDAS y cuál es la respuesta correcta?"
        }
      },
      {
        numero: 5,
        semana: 1,
        titulo: "El Reto del Nuevo Edificio: Perímetro y Área de Figuras Compuestas",
        inicio: "Reto 'El Contorno Engañoso': Figura en forma de L en el pizarrón (lado vertical izq. 10 m, superior 4 m, vertical der. 6 m, base 9 m). Deducir los dos lados internos faltantes (5 m y 4 m) para hallar el perímetro.",
        desarrollo: "Hoja de trabajo individual 'El Reto del Nuevo Edificio': Fachada en forma de T invertida (base 20 m, altura total 15 m, primer nivel altura 10 m, segundo nivel ancho 8 m). Calcular Área Total (para pintura) y Perímetro Total (para luces decorativas).",
        cierre: "Puesta en Común y Verificación de Estrategias: Comparar área sumando dos rectángulos (20×10 + 8×5 = 240 m²) vs. restando esquinas, y verificar el perímetro de 70 m sin sumar líneas internas.",
        hojaActividad: {
          tituloHoja: "El Reto del Nuevo Edificio: Arquitectos en Acción",
          instrucciones: "Observa los diagramas de las figuras compuestas, deduce las medidas de los lados que faltan y calcula el área total y el perímetro exterior.",
          notaTeorica: "Área de figura compuesta: Divide la figura en rectángulos conocidos y suma sus áreas parciales. | Perímetro: Suma ÚNICAMENTE los lados que forman el contorno exterior.",
          diagramType: "compound_lt",
          ejercicios: [
            { enunciado: "1. Reto Inicial (Figura en 'L'): Deduce cuánto mide el lado horizontal interno y el lado vertical interno faltantes. ¿Cuál es el perímetro total recorrido por la hormiga?", respuesta: "Horizontal interno = 9 - 4 = 5 m; Vertical interno = 10 - 6 = 4 m. Perímetro = 10 + 4 + 6 + 5 + 4 + 9 = 38 m." },
            { enunciado: "2. Fachada del Nuevo Edificio - Paso 1 (Área Total): Divide la fachada en dos rectángulos (Nivel 1 inferior y Nivel 2 superior). Anota: Área 1 = _______ | Área 2 = _______ | Área Total = _______", respuesta: "Área 1 (base) = 20 m × 10 m = 200 m². Altura nivel 2 = 15 - 10 = 5 m -> Área 2 = 8 m × 5 m = 40 m². Área Total = 240 m²." },
            { enunciado: "3. Fachada del Nuevo Edificio - Paso 2 (Perímetro Total): Si la base total mide 20 m y la torre superior mide 8 m de ancho, ¿cuánto mide cada 'hombro' horizontal? Suma todo el contorno exterior.", respuesta: "Los dos hombros suman 20 - 8 = 12 m (6 m cada uno). Perímetro = 20 + 10 + 6 + 5 + 8 + 5 + 6 + 10 = 70 m." }
          ],
          boletoSalida: "¿Cuál es el error más común al calcular el perímetro de una figura dividida en dos rectángulos y cómo lo evitaste?"
        }
      }
    ]
  },

  B02: {
    id: "B02",
    periodo: "14 al 25 de septiembre",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "1 semana (5 sesiones)",
    evaluacionFormativa: [
      "Representa algebraicamente perímetros y áreas de figuras geométricas planas usando literales.",
      "Suma y resta expresiones algebraicas para modelar el área de figuras compuestas.",
      "Formula expresiones algebraicas para el volumen de cubos y prismas rectos.",
      "Calcula el valor numérico de una expresión o despeja una variable en función de las otras."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 2,
        titulo: "Fórmulas Personalizadas: Perímetro y Área con Literales",
        inicio: "Dibujar un rectángulo de largo = 10 y ancho = 4. Calcular perímetro y área. Luego preguntar: 'Si el largo de un corral es x y su ancho es 6 m, ¿cuál sería la expresión para su perímetro y su área?'",
        desarrollo: "Explicar que el álgebra permite crear fórmulas generales para cualquier medida. Resolver 5 problemas de traducción geométrica a expresiones algebraicas (cuadrado, rectángulo, celular, triángulo).",
        cierre: "Boleto de Salida: Dibuja un rectángulo de base 7 y altura desconocida 'h' y escribe su Perímetro y Área.",
        hojaActividad: {
          tituloHoja: "Álgebra Geométrica: Perímetros y Áreas con Literales",
          instrucciones: "Escribe la expresión algebraica simplificada para el perímetro y el área de cada figura descrita.",
          notaTeorica: "En álgebra, las letras (literales) representan medidas variables. Recuerda: x + x = 2x, mientras que x · x = x².",
          diagramType: "algebra_rect",
          ejercicios: [
            { enunciado: "1. El lado de un cuadrado mide x. Escribe la expresión para: a) Su perímetro: ________  b) Su área: ________", respuesta: "a) P = 4x | b) A = x²" },
            { enunciado: "2. La base de un rectángulo mide b y su altura mide h. Escribe: a) Su perímetro: ________  b) Su área: ________", respuesta: "a) P = 2b + 2h | b) A = bh" },
            { enunciado: "3. El ancho de un celular mide w. Su largo es 5 cm más que el doble de su ancho. Escribe: a) El largo: ________  b) El perímetro: ________  c) El área: ________", respuesta: "a) Largo = 2w + 5 | b) P = 6w + 10 | c) A = w(2w + 5) = 2w² + 5w" },
            { enunciado: "4. La base de un triángulo mide b y su altura es el doble de su base (2b). Escribe la expresión para su área.", respuesta: "A = (b · 2b) / 2 = b²" },
            { enunciado: "5. Un rectángulo tiene base x y su altura es 3 unidades menor que su base (x - 3). Escribe: a) Su perímetro: ________  b) Su área: ________", respuesta: "a) P = 4x - 6 | b) A = x(x - 3) = x² - 3x" }
          ],
          boletoSalida: "Dibuja un rectángulo con base 7 y altura desconocida 'h'. Escribe la expresión para su Perímetro: ________ y su Área: ________."
        }
      },
      {
        numero: 2,
        semana: 2,
        titulo: "Suma y Resta de Áreas Algebraicas en Figuras Compuestas",
        inicio: "Dibujar una figura en forma de 'C' cuadrada en el pizarrón y preguntar: 'Si esta fuera la pieza de un logo, ¿qué estrategias usarían para calcular su área total?' (Sumar partes o restar el hueco).",
        desarrollo: "Trabajo en equipos aplicando suma y resta de polinomios en 3 problemas geométricos: Figura formada por cuadrado y rectángulo, Jardín con caseta cuadrada y Marco para fotos.",
        cierre: "Revisión grupal en pizarrón. Conclusión: 'Sumando o restando expresiones algebraicas podemos describir el área de cualquier figura compuesta.'",
        hojaActividad: {
          tituloHoja: "Adición y Sustracción de Áreas Compuestas",
          instrucciones: "Observa o traza cada figura compuesta y obtén la expresión algebraica reducida del área solicitada.",
          notaTeorica: "Términos semejantes: Solo se pueden sumar o restar términos que tienen exactamente la misma literal y el mismo exponente (ejemplo: x² + 3x² = 4x²).",
          diagramType: "algebra_rect",
          ejercicios: [
            { enunciado: "1. Suma de Áreas: Una figura está formada por un cuadrado de lado x pegado a un rectángulo de base 3x y altura x. a) Área del cuadrado: _____ b) Área del rectángulo: _____ c) Área total: _____", respuesta: "a) x² | b) 3x² | c) Área total = x² + 3x² = 4x²" },
            { enunciado: "2. Resta de Áreas (El Jardín): Un jardín rectangular mide (x + 5) de largo y x de ancho. En una esquina se construye una caseta cuadrada de lado 2. Escribe la expresión para el área de césped libre.", respuesta: "Área jardín = x(x + 5) = x² + 5x. Área caseta = 4. Área césped = x² + 5x - 4." },
            { enunciado: "3. Reto de Diseño (El Marco): Un marco exterior mide 2x de largo por x de ancho. El hueco interior para la foto mide (2x - 4) de largo por (x - 2) de ancho. Escribe y simplifica el área del marco sombreado.", respuesta: "A_ext = 2x². A_int = (2x-4)(x-2) = 2x² - 8x + 8. Área marco = 2x² - (2x² - 8x + 8) = 8x - 8." }
          ],
          boletoSalida: "Si tienes un cuadrado grande de área 9x² y le recortas en el centro un cuadrado pequeño de área x², ¿cuál es la expresión del área restante?"
        }
      },
      {
        numero: 3,
        semana: 2,
        titulo: "Modelado Algebraico del Volumen de Prismas y Cubos",
        inicio: "Mostrar una caja de zapatos y preguntar: 'Ya sabemos calcular el área de cada cara, pero si queremos saber cuánto espacio ocupa adentro, ¿qué tres medidas necesitamos?'",
        desarrollo: "Explicar la fórmula general Volumen = Área de la base × altura. Resolver 5 ejercicios de modelado algebraico de volúmenes (prisma rectangular, dado cúbico, cisterna, pilar triangular y caja).",
        cierre: "Revisión grupal. Conclusión: 'El volumen representa el espacio en tres dimensiones y se calcula multiplicando el área de la base por la altura.'",
        hojaActividad: {
          tituloHoja: "Expresiones Algebraicas de Volumen en 3D",
          instrucciones: "Utiliza la fórmula V = Área de la base × Altura para escribir la expresión algebraica del volumen de cada cuerpo geométrico.",
          notaTeorica: "Ley de exponentes al multiplicar potencias de la misma base: xᵃ · xᵇ = xᵃ⁺ᵇ (por ejemplo: w · w · 10 = 10w²; a · a · a = a³).",
          diagramType: "algebra_prisma",
          ejercicios: [
            { enunciado: "1. La base de un prisma rectangular mide x de ancho y y de largo. Su altura es h. Escribe la expresión para su volumen: ________", respuesta: "V = xyh" },
            { enunciado: "2. Un dado es un cubo cuya arista mide a. Escribe la expresión para su volumen: ________", respuesta: "V = a³" },
            { enunciado: "3. Una cisterna de agua tiene una base cuadrada de lado L y una altura fija de 5 metros. Escribe la expresión para su volumen: ________", respuesta: "V = 5L²" },
            { enunciado: "4. Un pilar tiene como base un triángulo de base b y altura h. La altura del pilar es H. Escribe la expresión para su volumen: ________", respuesta: "V = (b · h · H) / 2" },
            { enunciado: "5. Reto: Una caja tiene un ancho w, su largo es el doble de su ancho (2w) y su altura es de 10 unidades. Escribe y simplifica su volumen: ________", respuesta: "V = w · (2w) · 10 = 20w²" }
          ],
          boletoSalida: "Una barra de acero tiene base cuadrada de lado m y su largo es el triple del lado de la base (3m). ¿Cuál es la expresión algebraica de su volumen?"
        }
      },
      {
        numero: 4,
        semana: 2,
        titulo: "Sustitución y Despeje de Variables en Fórmulas Geométricas",
        inicio: "Retomar la expresión V = 20w² de la caja anterior y preguntar: 'Si el diseñador decide que el ancho w sea de 3 cm, ¿qué hacemos para hallar el volumen exacto?'",
        desarrollo: "Explicar la diferencia entre 'sustituir' (conocemos la variable y buscamos el total) y 'despejar' (conocemos el total y buscamos una dimensión faltante). Resolver 5 problemas prácticos.",
        cierre: "Puesta en común en el pizarrón. Conclusión: 'El álgebra permite calcular valores desconocidos cuando tenemos suficiente información.'",
        hojaActividad: {
          tituloHoja: "Sustitución Numérica y Despeje en Geometría",
          instrucciones: "Sustituye los valores conocidos o despeja la incógnita indicada en cada problema geométrico.",
          notaTeorica: "Al sustituir un valor en una potencia como 5x², primero eleva al cuadrado la variable (x²) y después multiplica por el coeficiente 5.",
          ejercicios: [
            { enunciado: "1. La expresión para el área de un terreno es A = 5x² + 2x. Calcula el área exacta si x = 10 metros.", respuesta: "A = 5(10)² + 2(10) = 5(100) + 20 = 520 m²" },
            { enunciado: "2. El volumen de un prisma está dado por V = 2y³ + y. Calcula el volumen si y = 4 cm.", respuesta: "V = 2(4)³ + 4 = 2(64) + 4 = 132 cm³" },
            { enunciado: "3. El área de un campo de fútbol rectangular es de 7000 m². Si su largo es de 100 m y su ancho es x, plantea la ecuación y calcula x.", respuesta: "100x = 7000 -> x = 7000 / 100 = 70 m" },
            { enunciado: "4. El volumen de una caja es de 600 cm³. Si el área de su base es de 50 cm² y su altura es h, calcula el valor de h.", respuesta: "50h = 600 -> h = 600 / 50 = 12 cm" },
            { enunciado: "5. El perímetro de un corral cuadrado es de 36 metros. Si el lado mide s, ¿cuál es la expresión para el perímetro y cuánto vale s?", respuesta: "P = 4s = 36 -> s = 9 metros" }
          ],
          boletoSalida: "Si el volumen de una cisterna de base cuadrada V = 5L² es igual a 80 m³, ¿cuánto mide el lado L de su base?"
        }
      },
      {
        numero: 5,
        semana: 2,
        titulo: "Reto de Ingeniería: Diseño Integral de un Contenedor",
        inicio: "Lanzar el reto final de la semana: 'Una empresa naviera de Guaymas necesita un nuevo contenedor prismático: su base debe ser cuadrada (lado x) y su altura debe medir 5 metros más que el lado de la base (x + 5).'",
        desarrollo: "En equipos, resolver el 'Reto del Contenedor':\n1. Dibujar el contenedor con sus 3 dimensiones algebraicas.\n2. Desarrollar la expresión para el Volumen.\n3. Desarrollar la expresión para el Área de Superficie Total (2 bases + 4 caras laterales).\n4. Evaluar todas las medidas cuando x = 2 metros.",
        cierre: "Socialización de resultados de diseño por equipo y retroalimentación formativa.",
        hojaActividad: {
          tituloHoja: "Reto de Ingeniería: Diseño del Contenedor Industrial",
          instrucciones: "Trabaja en equipo para modelar algebraicamente el contenedor y calcular sus especificaciones reales cuando x = 2 m.",
          notaTeorica: "Prisma de base cuadrada (lado x y altura h): Volumen = x² · h | Área Superficial Total = 2x² (tapa y fondo) + 4xh (las 4 paredes laterales).",
          diagramType: "algebra_prisma",
          ejercicios: [
            { enunciado: "1. Escribe las 3 dimensiones del contenedor usando solo la literal x: Ancho = _____, Largo = _____, Altura = _____", respuesta: "Ancho = x, Largo = x, Altura = x + 5" },
            { enunciado: "2. Escribe y desarrolla la expresión algebraica para el VOLUMEN del contenedor:", respuesta: "V = x²(x + 5) = x³ + 5x²" },
            { enunciado: "3. Escribe y simplifica la expresión para el ÁREA DE SUPERFICIE TOTAL (2 bases cuadradas + 4 caras rectangulares):", respuesta: "A_total = 2x² + 4x(x + 5) = 2x² + 4x² + 20x = 6x² + 20x" },
            { enunciado: "4. Si la empresa decide que el lado de la base sea x = 2 metros, calcula: a) Dimensiones finales  b) Volumen en m³  c) Área total de material en m².", respuesta: "a) 2 m × 2 m × 7 m | b) V = (2)³ + 5(2)² = 8 + 20 = 28 m³ | c) A = 6(4) + 20(2) = 64 m²" }
          ],
          boletoSalida: "Si el metro cuadrado de lámina metálica cuesta $100, ¿cuánto costará el material para fabricar el contenedor del ejercicio anterior?"
        }
      }
    ]
  },

  B03: {
    id: "B03",
    periodo: "02 al 22 de octubre",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "3 semanas (15 sesiones)",
    evaluacionFormativa: [
      "Reconoce una ecuación cuadrática y la puede transformar a su forma general (Ax² + Bx + C = 0).",
      "Resuelve ecuaciones cuadráticas incompletas (puras y mixtas) y completas por factorización.",
      "Utiliza la fórmula general de manera sistemática y precisa para resolver cualquier ecuación cuadrática.",
      "Analiza el discriminante (b² - 4ac) para determinar la naturaleza de las soluciones.",
      "Traduce un problema expresado en lenguaje común a una ecuación cuadrática.",
      "Evalúa las soluciones matemáticas y elige la que es lógicamente válida dentro del contexto del problema."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 4,
        titulo: "Forma General de la Ecuación Cuadrática (Ax² + Bx + C = 0)",
        inicio: "Plantear el problema: 'El área de un terreno rectangular es de 50 m². Si el largo es el doble que el ancho, ¿cómo lo expresamos?' Pasar de x(2x) = 50 a 2x² - 50 = 0.",
        desarrollo: "Explicar la forma canónica Ax² + Bx + C = 0 identificando el término cuadrático (Ax²), lineal (Bx) e independiente (C). Ejercicios de identificación de coeficientes A, B y C.",
        cierre: "Concluir que las ecuaciones cuadráticas surgen en problemas de áreas y siempre deben igualarse a cero antes de resolverse.",
        hojaActividad: {
          tituloHoja: "Anatomía de las Ecuaciones Cuadráticas: Ax² + Bx + C = 0",
          instrucciones: "Transforma cada ecuación a su forma general igualada a cero e identifica con su signo los coeficientes A, B y C.",
          notaTeorica: "Forma General: Ax² + Bx + C = 0 (con A ≠ 0). Si falta el término lineal Bx, entonces B = 0; si falta el término constante C, entonces C = 0.",
          ejercicios: [
            { enunciado: "1. Del problema inicial: Si el ancho es x y el largo es 2x con un área de 50 m², desarrolla x(2x) = 50 e iguala a cero.", respuesta: "2x² - 50 = 0 (donde A = 2, B = 0, C = -50)" },
            { enunciado: "2. Identifica los valores de A, B y C en:  a) 3x² + 5x - 2 = 0   b) x² - 9 = 0   c) 4x² + 8x = 0", respuesta: "a) A=3, B=5, C=-2 | b) A=1, B=0, C=-9 | c) A=4, B=8, C=0" },
            { enunciado: "3. Ordena e iguala a cero las siguientes ecuaciones e indica A, B y C:  a) 5x² = 3x + 14   b) x(x - 6) = 7", respuesta: "a) 5x² - 3x - 14 = 0 (A=5, B=-3, C=-14) | b) x² - 6x - 7 = 0 (A=1, B=-6, C=-7)" }
          ],
          boletoSalida: "Escribe en forma general Ax² + Bx + C = 0 la ecuación del área de un terreno de ancho x y largo (x + 4) cuya área es 45 m²."
        }
      },
      {
        numero: 2,
        semana: 4,
        titulo: "Ecuaciones Cuadráticas Incompletas: Puras y Mixtas",
        inicio: "Preguntar: '¿Qué pasa en la ecuación x² - 9 = 0? ¿Qué término falta?' Introducir las ecuaciones cuadráticas incompletas.",
        desarrollo: "Enseñar los dos métodos de resolución:\n1. Puras (falta Bx, Ax² + C = 0): Despejar x² y extraer raíz cuadrada (±).\n2. Mixtas (falta C, Ax² + Bx = 0): Factorizar por factor común x(Ax + B) = 0.",
        cierre: "Concluir que las ecuaciones incompletas se resuelven sin requerir fórmulas largas y suelen tener dos soluciones.",
        hojaActividad: {
          tituloHoja: "Resolución de Ecuaciones Cuadráticas Incompletas",
          instrucciones: "Clasifica cada ecuación en Pura o Mixta y encuentra sus dos raíces o soluciones (x₁ y x₂).",
          notaTeorica: "Incompleta Pura (Ax² + C = 0): Se despeja x = ±√(-C/A). | Incompleta Mixta (Ax² + Bx = 0): Se extrae factor común x(Ax + B) = 0, por lo que una solución siempre es x₁ = 0.",
          ejercicios: [
            { enunciado: "1. Resuelve las ecuaciones puras:  a) x² - 25 = 0     b) 2x² - 18 = 0     c) 5x² - 20 = 0", respuesta: "a) x₁=5, x₂=-5 | b) x²=9 -> x₁=3, x₂=-3 | c) x²=4 -> x₁=2, x₂=-2" },
            { enunciado: "2. Resuelve las ecuaciones mixtas por factor común:  a) 3x² + 9x = 0     b) 4x² + 16x = 0     c) x² - x = 0", respuesta: "a) 3x(x+3)=0 -> x₁=0, x₂=-3 | b) 4x(x+4)=0 -> x₁=0, x₂=-4 | c) x(x-1)=0 -> x₁=0, x₂=1" },
            { enunciado: "3. Aplicación: El doble del cuadrado de un número positivo es igual a 72. Plantea la ecuación y encuéntralo.", respuesta: "2x² = 72 -> x² = 36 -> x = 6" }
          ],
          boletoSalida: "Resuelve: a) x² - 49 = 0   y   b) 2x² - 10x = 0."
        }
      },
      {
        numero: 3,
        semana: 4,
        titulo: "Factorización de Trinomios x² + bx + c = 0 (Los Números Mágicos)",
        inicio: "Acertijo mental: 'Busquen dos números que multiplicados den 12 y sumados den 7'. Activar la búsqueda de pares de factores.",
        desarrollo: "Explicar cómo factorizar x² + bx + c = (x + m)(x + n) = 0 y usar la Propiedad del Producto Cero para despejar x₁ y x₂.",
        cierre: "Resolver problema de aplicación: 'El área de un rectángulo es 24 m². Su largo es x + 2 y su ancho es x. Encuentra el valor de x.'",
        hojaActividad: {
          tituloHoja: "Factorización de Trinomios de la Forma x² + bx + c = 0",
          instrucciones: "Encuentra los dos 'números mágicos' que multiplicados dan c y sumados dan b, factoriza el trinomio y halla las dos soluciones.",
          notaTeorica: "Propiedad del Producto Cero: Si (x + m)(x + n) = 0, entonces x₁ = -m y x₂ = -n.",
          ejercicios: [
            { enunciado: "1. Entrenamiento mental: Halla dos números que: a) Multiplicados den 12 y sumados 7: ____  b) Multiplicados den -15 y sumados 2: ____", respuesta: "a) 4 y 3 | b) +5 y -3" },
            { enunciado: "2. Resuelve por factorización:  a) x² + 5x + 6 = 0     b) x² - 7x + 10 = 0     c) x² + 2x - 15 = 0", respuesta: "a) (x+2)(x+3)=0 -> x₁=-2, x₂=-3 | b) (x-5)(x-2)=0 -> x₁=5, x₂=2 | c) (x+5)(x-3)=0 -> x₁=-5, x₂=3" },
            { enunciado: "3. Problema de cierre: El área de un rectángulo es 24 m². Su largo mide (x + 2) y su ancho mide x. Plantea la ecuación cuadrática y determina sus dimensiones.", respuesta: "x(x+2) = 24 -> x² + 2x - 24 = 0 -> (x+6)(x-4)=0 -> x = 4 m (ancho 4 m y largo 6 m)." }
          ],
          boletoSalida: "Factoriza y resuelve la ecuación: x² - 8x + 15 = 0."
        }
      },
      {
        numero: 4,
        semana: 4,
        titulo: "Práctica Intensiva: Trinomios, Diferencia de Cuadrados y TCP",
        inicio: "Competencia rápida por filas en el pizarrón encontrando pares de factores.",
        desarrollo: "Batería intensiva de factorización incluyendo trinomios generales, diferencia de cuadrados (x² - 16 = 0) y trinomio cuadrado perfecto (x² + 8x + 16 = 0).",
        cierre: "Revisión grupal de los casos especiales.",
        hojaActividad: {
          tituloHoja: "Taller de Factorización y Casos Especiales",
          instrucciones: "Factoriza cada expresión cuadrática e indica el conjunto solución {x₁, x₂}.",
          notaTeorica: "Diferencia de cuadrados: x² - a² = (x + a)(x - a). | Trinomio Cuadrado Perfecto: x² + 2ax + a² = (x + a)² (tiene una raíz doble).",
          ejercicios: [
            { enunciado: "1. Resuelve:  a) x² - 9x + 20 = 0     b) x² + 6x + 5 = 0     c) x² - 3x - 10 = 0", respuesta: "a) (x-5)(x-4)=0 -> x=5, 4 | b) (x+5)(x+1)=0 -> x=-5, -1 | c) (x-5)(x+2)=0 -> x=5, -2" },
            { enunciado: "2. Caso Diferencia de Cuadrados:  a) x² - 16 = 0     b) x² - 81 = 0", respuesta: "a) (x+4)(x-4)=0 -> x=4, -4 | b) (x+9)(x-9)=0 -> x=9, -9" },
            { enunciado: "3. Caso Trinomio Cuadrado Perfecto:  a) x² + 8x + 16 = 0     b) x² - 10x + 25 = 0", respuesta: "a) (x+4)²=0 -> x = -4 (raíz única) | b) (x-5)²=0 -> x = 5" }
          ],
          boletoSalida: "¿Por qué la ecuación x² + 8x + 16 = 0 tiene una sola solución real en lugar de dos?"
        }
      },
      {
        numero: 5,
        semana: 4,
        titulo: "Factorización de Trinomios de la Forma Ax² + bx + c = 0",
        inicio: "Mostrar la ecuación 2x² + 7x + 3 = 0 y preguntar: '¿Por qué el método directo anterior cambia cuando x² tiene un coeficiente distinto de 1?'",
        desarrollo: "Explicar el método de la 'tijera' o agrupación para factorizar Ax² + bx + c = 0. Resolver ejemplos guiados y práctica en clase.",
        cierre: "Plantear la ecuación x² + 5x + 3 = 0 y preguntar si existen dos enteros que multiplicados den 3 y sumados 5, motivando la Fórmula General para la siguiente semana.",
        hojaActividad: {
          tituloHoja: "Factorización de la Forma Ax² + bx + c = 0 (Método de Tijera)",
          instrucciones: "Descompón el término cuadrático y el término independiente para factorizar por el método de la tijera.",
          notaTeorica: "En Ax² + bx + c = 0, buscamos factores de Ax² y de c tales que la suma de sus productos cruzados sea igual al término central bx.",
          ejercicios: [
            { enunciado: "1. Ejemplo guiado: Factoriza y resuelve 2x² + 7x + 3 = 0.", respuesta: "(2x + 1)(x + 3) = 0 -> x₁ = -1/2, x₂ = -3" },
            { enunciado: "2. Resuelve:  a) 3x² + 8x + 5 = 0     b) 2x² - 5x - 3 = 0     c) 6x² + 7x + 2 = 0", respuesta: "a) (3x+5)(x+1)=0 -> x₁=-5/3, x₂=-1 | b) (2x+1)(x-3)=0 -> x₁=-1/2, x₂=3 | c) (3x+2)(2x+1)=0 -> x₁=-2/3, x₂=-1/2" },
            { enunciado: "3. Reflexión de Cierre: Intenta buscar dos números enteros que multiplicados den 3 y sumados den 5 para x² + 5x + 3 = 0. ¿Qué sucede?", respuesta: "No existen números enteros con esa propiedad; sus soluciones son irracionales y requieren la Fórmula General." }
          ],
          boletoSalida: "Factoriza y encuentra las dos soluciones de: 2x² + 5x + 2 = 0."
        }
      },
      {
        numero: 6,
        semana: 5,
        titulo: "La Llave Maestra: Introducción a la Fórmula General",
        inicio: "Retomar x² + 5x + 3 = 0 y presentar la Fórmula General como la 'llave maestra' capaz de resolver cualquier ecuación cuadrática.",
        desarrollo: "Presentar x = [-b ± √(b² - 4ac)] / (2a). Explicar cada componente y resolver paso a paso x² + 5x + 3 = 0 cuidando leyes de signos.",
        cierre: "Ejercicio de precisión: Identificar A, B y C y sustituirlos en la estructura de la fórmula general para 3 ecuaciones.",
        hojaActividad: {
          tituloHoja: "La Llave Maestra: La Fórmula General Cuadrática",
          instrucciones: "Identifica los coeficientes a, b y c (con su signo) y sustitúyelos paso a paso en la Fórmula General.",
          notaTeorica: "Fórmula General: x = [ -b ± √(b² - 4ac) ] / 2a. ¡Cuidado!: Si b es negativo, -b se vuelve positivo, y b² SIEMPRE es positivo.",
          ejercicios: [
            { enunciado: "1. Resuelve paso a paso el reto pendiente: x² + 5x + 3 = 0 (aproxima la raíz a 1 decimal: √13 ≈ 3.6).", respuesta: "a=1, b=5, c=3 -> x = (-5 ± √(25 - 12))/2 = (-5 ± √13)/2 -> x₁ ≈ -0.7, x₂ ≈ -4.3" },
            { enunciado: "2. Identifica a, b, c y realiza la sustitución completa en la fórmula general para: x² + 6x + 8 = 0.", respuesta: "a=1, b=6, c=8 -> x = (-6 ± √(36 - 32))/2 = (-6 ± 2)/2 -> x₁ = -2, x₂ = -4" },
            { enunciado: "3. Sustituye y resuelve cuidando el signo negativo de b: x² - 4x + 3 = 0.", respuesta: "a=1, b=-4, c=3 -> x = (4 ± √(16 - 12))/2 = (4 ± 2)/2 -> x₁ = 3, x₂ = 1" }
          ],
          boletoSalida: "En la ecuación 3x² - 7x - 6 = 0, ¿cuánto vale exactamente -b y cuánto vale b²?"
        }
      },
      {
        numero: 7,
        semana: 5,
        titulo: "Práctica Guiada con la Fórmula General",
        inicio: "Repaso coral de la Fórmula General y de las reglas de signos en -4ac.",
        desarrollo: "Sesión de práctica guiada resolviendo ecuaciones con coeficientes diversos y términos independientes negativos.",
        cierre: "Análisis grupal de los errores más frecuentes (elevar negativos al cuadrado y signo de -4ac).",
        hojaActividad: {
          tituloHoja: "Dominando la Fórmula General Paso a Paso",
          instrucciones: "Resuelve las siguientes ecuaciones cuadráticas utilizando la Fórmula General y comprueba tus dos soluciones.",
          notaTeorica: "Cuando el coeficiente 'c' es negativo, el producto -4ac se convierte en una SUMA dentro de la raíz cuadrada.",
          ejercicios: [
            { enunciado: "1. Resuelve usando la Fórmula General: 2x² + 9x + 10 = 0", respuesta: "a=2, b=9, c=10 -> Δ = 81 - 80 = 1 -> x = (-9 ± 1)/4 -> x₁ = -2, x₂ = -2.5" },
            { enunciado: "2. Resuelve prestando atención a los signos negativos: x² - 4x - 5 = 0", respuesta: "a=1, b=-4, c=-5 -> Δ = 16 - 4(1)(-5) = 16 + 20 = 36 -> x = (4 ± 6)/2 -> x₁ = 5, x₂ = -1" },
            { enunciado: "3. Resuelve: 3x² - 13x + 4 = 0", respuesta: "a=3, b=-13, c=4 -> Δ = 169 - 48 = 121 -> x = (13 ± 11)/6 -> x₁ = 4, x₂ = 1/3" }
          ],
          boletoSalida: "Resuelve por fórmula general: x² - 2x - 15 = 0."
        }
      },
      {
        numero: 8,
        semana: 5,
        titulo: "La Bola de Cristal: El Discriminante (Δ = b² - 4ac)",
        inicio: "Preguntar al grupo: '¿Creen que todas las ecuaciones cuadráticas tienen dos soluciones reales? ¿Podrían tener solo una o ninguna?'",
        desarrollo: "Explicar el discriminante Δ = b² - 4ac y sus tres casos: Positivo (2 soluciones reales), Cero (1 solución real doble), Negativo (0 soluciones reales). Resolver ejercicios de predicción.",
        cierre: "Concluir que el discriminante nos anticipa la naturaleza de las raíces antes de terminar todo el cálculo.",
        hojaActividad: {
          tituloHoja: "El Discriminante (Δ = b² - 4ac): Naturaleza de las Soluciones",
          instrucciones: "Calcula el discriminante Δ = b² - 4ac de cada ecuación y determina cuántas soluciones reales tiene.",
          notaTeorica: "Si b² - 4ac > 0 → 2 soluciones reales distintas. | Si b² - 4ac = 0 → 1 solución real (doble). | Si b² - 4ac < 0 → No tiene soluciones reales.",
          ejercicios: [
            { enunciado: "1. Analiza x² + 4x + 4 = 0: Calcula Δ = b² - 4ac e indica cuántas soluciones reales tiene.", respuesta: "Δ = 4² - 4(1)(4) = 16 - 16 = 0 -> Tiene 1 solución real única (x = -2)." },
            { enunciado: "2. Analiza 2x² + 5x + 3 = 0: Calcula Δ e indica cuántas soluciones reales tiene.", respuesta: "Δ = 5² - 4(2)(3) = 25 - 24 = 1 (>0) -> Tiene 2 soluciones reales distintas." },
            { enunciado: "3. Analiza x² + 2x + 5 = 0: Calcula Δ e indica cuántas soluciones reales tiene.", respuesta: "Δ = 2² - 4(1)(5) = 4 - 20 = -16 (<0) -> No tiene soluciones reales." },
            { enunciado: "4. Reto: ¿Qué valor debe tener 'c' en x² - 6x + c = 0 para que el discriminante sea exactamente cero?", respuesta: "(-6)² - 4(1)(c) = 0 -> 36 - 4c = 0 -> c = 9." }
          ],
          boletoSalida: "Sin resolver toda la ecuación, calcula el discriminante de 3x² - 2x + 4 = 0 y di cuántas soluciones reales tiene."
        }
      },
      {
        numero: 9,
        semana: 5,
        titulo: "Problemas de Áreas y Contexto Real con Fórmula General",
        inicio: "Retomar 2x² - 50 = 0 y comprobar que la fórmula general también funciona con B = 0.",
        desarrollo: "En equipos, plantear y resolver el problema del patio rectangular: 'El largo de un patio rectangular es 3 metros más grande que su ancho. Si el área total es de 70 m², ¿cuáles son sus dimensiones?'",
        cierre: "Discutir por qué se descarta la raíz negativa en contextos de longitudes físicas.",
        hojaActividad: {
          tituloHoja: "Modelado y Resolución de Problemas Geométricos Reales",
          instrucciones: "Plantea la ecuación cuadrática de cada problema, resuélvela y selecciona la solución que tiene sentido físico.",
          notaTeorica: "Al resolver problemas geométricos, las longitudes (lados, tiempos, distancias) deben ser positivas (x > 0), por lo que descartamos la raíz negativa.",
          ejercicios: [
            { enunciado: "1. El largo de un patio rectangular es 3 metros más grande que su ancho (x). Si el área total es de 70 m², plantea la ecuación cuadrática y halla el ancho y el largo.", respuesta: "x(x + 3) = 70 -> x² + 3x - 70 = 0 -> x₁ = 7, x₂ = -10. Ancho = 7 m y Largo = 10 m." },
            { enunciado: "2. La base de una vela triangular de un barco en Guaymas mide 2 m menos que su altura. Si su área es de 24 m², ¿cuánto miden su base y su altura?", respuesta: "h(h - 2)/2 = 24 -> h² - 2h - 48 = 0 -> h = 8 m y base = 6 m." },
            { enunciado: "3. El producto de dos números enteros positivos consecutivos es 110. Plantea x(x + 1) = 110 y encuéntralos.", respuesta: "x² + x - 110 = 0 -> x = 10, por lo que los números son 10 y 11." }
          ],
          boletoSalida: "Si al resolver un problema sobre la edad de una persona obtienes x₁ = 14 y x₂ = -18, ¿cuál eliges y por qué?"
        }
      },
      {
        numero: 10,
        semana: 5,
        titulo: "Taller de Estrategia: ¿Factorización o Fórmula General?",
        inicio: "Comparar en el pizarrón x² + 5x + 6 = 0 vs. 2x² + 9x + 5 = 0. Preguntar cuál conviene resolver por factorización rápida y cuál por fórmula general.",
        desarrollo: "Taller en equipos con 5 ecuaciones cuadráticas donde deben elegir y justificar el método más eficiente para cada una.",
        cierre: "Conclusión: 'La factorización es más rápida si la vemos al instante; la fórmula general es nuestra herramienta confiable que nunca falla.'",
        hojaActividad: {
          tituloHoja: "Taller Estratégico: Eligiendo el Mejor Método Cuadrático",
          instrucciones: "Para cada ecuación, indica qué método elegiste (Despeje directo, Factorización o Fórmula General), justifica por qué y resuélvela.",
          notaTeorica: "Estrategia experta: 1) Si falta bx, despeja x². 2) Si es fácil hallar los dos números, factoriza. 3) Si los coeficientes son complejos, usa la Fórmula General.",
          ejercicios: [
            { enunciado: "1. Ecuación A: x² + 7x + 12 = 0  | Método elegido: _____________ | Soluciones: ________", respuesta: "Factorización directa: (x+3)(x+4)=0 -> x₁=-3, x₂=-4" },
            { enunciado: "2. Ecuación B: 3x² - 75 = 0  | Método elegido: _____________ | Soluciones: ________", respuesta: "Despeje (incompleta pura): x²=25 -> x₁=5, x₂=-5" },
            { enunciado: "3. Ecuación C: 2x² + 9x + 5 = 0  | Método elegido: _____________ | Soluciones: ________", respuesta: "Fórmula General: Δ = 81 - 40 = 41 -> x = (-9 ± √41)/4" },
            { enunciado: "4. Ecuación D: 5x² - 15x = 0  | Método elegido: _____________ | Soluciones: ________", respuesta: "Factor común (incompleta mixta): 5x(x-3)=0 -> x₁=0, x₂=3" },
            { enunciado: "5. Ecuación E: 2x² - 3x - 2 = 0  | Método elegido: _____________ | Soluciones: ________", respuesta: "Fórmula General o Tijera: (2x+1)(x-2)=0 -> x₁=-1/2, x₂=2" }
          ],
          boletoSalida: "¿En qué caso una ecuación cuadrática es mucho más rápida de resolver por despeje directo que por la fórmula general?"
        }
      },
      {
        numero: 11,
        semana: 6,
        titulo: "Proyecto Caja sin Tapa (Parte 1): Modelado Algebraico del Volumen",
        inicio: "Presentar el reto de la semana: 'Diseñar una caja sin tapa' a partir de una lámina rectangular de cartón de 30 cm por 20 cm recortando cuadrados de lado x en las 4 esquinas.",
        desarrollo: "Deducir en equipo las nuevas dimensiones al doblar las pestañas: Largo = 30 - 2x, Ancho = 20 - 2x, Altura = x, y formular V = (30 - 2x)(20 - 2x)x.",
        cierre: "Plantear la misión de la semana: Encontrar el valor de x para un volumen específico.",
        hojaActividad: {
          tituloHoja: "Proyecto de Ingeniería (Sesión 1): Modelando la Caja sin Tapa",
          instrucciones: "Analiza el esquema de la lámina de cartón de 30 cm × 20 cm y deduce las expresiones algebraicas de la caja.",
          notaTeorica: "Al recortar un cuadrado de lado x en cada esquina y doblar hacia arriba, el largo y el ancho pierden 2x (una x de cada lado), y la altura de la caja pasa a ser x.",
          diagramType: "open_box",
          ejercicios: [
            { enunciado: "1. Si la hoja mide 30 cm de largo y recortamos x en ambos extremos, ¿cuál es la expresión del largo de la base de la caja?", respuesta: "Largo de la base = 30 - 2x" },
            { enunciado: "2. Si la hoja mide 20 cm de ancho y recortamos x en ambos extremos, ¿cuál es la expresión del ancho de la base y cuál es la altura?", respuesta: "Ancho de la base = 20 - 2x | Altura = x" },
            { enunciado: "3. Multiplica los binomios (30 - 2x)(20 - 2x) para obtener la expresión algebraica del ÁREA DE LA BASE de la caja.", respuesta: "Área Base = 600 - 60x - 40x + 4x² = 4x² - 100x + 600" },
            { enunciado: "4. Si x = 2 cm, ¿cuál sería el área de la base y cuál el volumen de la caja?", respuesta: "Base = (26)(16) = 416 cm²; Volumen = 416 × 2 = 832 cm³" }
          ],
          boletoSalida: "¿Cuál es el valor máximo lógico que podría tomar x antes de que el ancho de 20 cm desaparezca por completo?"
        }
      },
      {
        numero: 12,
        semana: 6,
        titulo: "Proyecto Caja sin Tapa (Parte 2): Planteamiento de la Ecuación Cuadrática",
        inicio: "Retomar las expresiones de la caja de 30 × 20 cm.",
        desarrollo: "Establecer la condición del cliente: para que la base soporte un volumen de 1000 cm³ con una altura estándar de diseño (o una superficie de base de 336 cm²), plantear la ecuación cuadrática igualada a cero y simplificarla a la forma Ax² + Bx + C = 0.",
        cierre: "Verificación por equipos de la ecuación cuadrática simplificada.",
        hojaActividad: {
          tituloHoja: "Proyecto de Ingeniería (Sesión 2): Del Diseño a la Ecuación Ax² + Bx + C = 0",
          instrucciones: "Plantea y simplifica la ecuación cuadrática del diseño de la caja hasta llegar a su forma general igualada a cero.",
          notaTeorica: "Para resolver una ecuación cuadrática donde un producto está igualado a un número, primero desarrollamos los paréntesis y luego pasamos todos los términos al lado izquierdo para igualar a 0.",
          diagramType: "open_box",
          ejercicios: [
            { enunciado: "1. Condición de Diseño A (Base de la caja): El cliente requiere que el área de la base rectangular (30 - 2x)(20 - 2x) sea exactamente de 336 cm². Iguala la expresión a 336.", respuesta: "4x² - 100x + 600 = 336" },
            { enunciado: "2. Pasa el 336 restando al lado izquierdo para obtener la forma Ax² + Bx + C = 0.", respuesta: "4x² - 100x + 264 = 0" },
            { enunciado: "3. Divide toda la ecuación entre 4 para simplificar los coeficientes y facilitar el cálculo.", respuesta: "x² - 25x + 66 = 0" },
            { enunciado: "4. Condición de Diseño B (Volumen de 1000 cm³): Completa la tabla de exploración para V = (30 - 2x)(20 - 2x)x evaluando x = 1, 2, 3, 4 y 5 cm. ¿En qué valores de x el volumen supera o se acerca a 1000 cm³?", respuesta: "x=1 -> V=504; x=2 -> V=832; x=3 -> V=1008 cm³; x=4 -> V=1056 cm³; x=5 -> V=1000 cm³ exactos." }
          ],
          boletoSalida: "Escribe los coeficientes A, B y C de la ecuación simplificada x² - 25x + 66 = 0."
        }
      },
      {
        numero: 13,
        semana: 6,
        titulo: "Proyecto Caja sin Tapa (Parte 3): Resolución con Fórmula General y Análisis",
        inicio: "Revisar la ecuación cuadrática del diseño de la caja.",
        desarrollo: "En equipos, resolver la ecuación cuadrática mediante la Fórmula General para encontrar los dos posibles valores de corte x₁ y x₂.",
        cierre: "Discusión grupal: '¿Ambas soluciones matemáticas tienen sentido físico en una hoja de 20 cm de ancho?'",
        hojaActividad: {
          tituloHoja: "Proyecto de Ingeniería (Sesión 3): Resolviendo el Tamaño del Corte (x)",
          instrucciones: "Aplica la Fórmula General para encontrar las dos soluciones matemáticas y analiza su viabilidad física.",
          notaTeorica: "Una solución matemática es físicamente inválida si produce medidas negativas al sustituirla en (20 - 2x).",
          ejercicios: [
            { enunciado: "1. Resuelve la ecuación de la base de la caja x² - 25x + 66 = 0 usando la Fórmula General.", respuesta: "x = [25 ± √(625 - 264)] / 2 = [25 ± √361] / 2 = (25 ± 19) / 2 -> x₁ = 22 cm, x₂ = 3 cm." },
            { enunciado: "2. Prueba de viabilidad para x₁ = 22 cm: Si la hoja mide 20 cm de ancho, ¿puedes recortar dos esquinas de 22 cm cada una? Calcula 20 - 2(22).", respuesta: "20 - 44 = -24 cm (Imposible físicamente; se descarta x₁ = 22 cm)." },
            { enunciado: "3. Prueba de viabilidad para x₂ = 3 cm: Calcula el Largo, Ancho y Volumen de la caja cuando x = 3 cm.", respuesta: "Largo = 30 - 6 = 24 cm; Ancho = 20 - 6 = 14 cm; Altura = 3 cm. Área base = 336 cm² y Volumen = 1008 cm³." },
            { enunciado: "4. Para el caso donde el volumen es exactamente 1000 cm³ con x = 5 cm, verifica la ecuación cuadrática de las otras raíces dividiendo entre (x - 5): 2x² - 40x + 200 = 0.", respuesta: "Al resolver con fórmula general se obtiene el corte exacto complementario x ≈ 2.93 cm y x = 5 cm." }
          ],
          boletoSalida: "¿Por qué en este proyecto obtuvimos dos soluciones positivas en la ecuación, pero una de ellas no se puede recortar en la realidad?"
        }
      },
      {
        numero: 14,
        semana: 6,
        titulo: "Proyecto Caja sin Tapa (Parte 4): Preparación del Prototipo y Cartel Técnico",
        inicio: "Cada equipo confirma la medida óptima de su corte x y verifica las dimensiones finales de su caja.",
        desarrollo: "Construcción de la maqueta física/visual y preparación de la lámina de ingeniería con los 4 puntos: 1) Problema inicial, 2) Planteamiento algebraico, 3) Resolución con fórmula general, 4) Dimensiones y volumen final.",
        cierre: "Ensayo breve de las exposiciones por equipo.",
        hojaActividad: {
          tituloHoja: "Proyecto de Ingeniería (Sesión 4): Ficha Técnica del Prototipo de Empaque",
          instrucciones: "Completa el reporte ejecutivo de ingeniería que presentará tu equipo ante el grupo.",
          notaTeorica: "Un reporte de ingeniería matemática debe mostrar claramente el modelo algebraico, el procedimiento de solución y la verificación del prototipo.",
          diagramType: "open_box",
          ejercicios: [
            { enunciado: "1. Especificaciones de la Materia Prima: Dimensiones originales de la lámina de cartón y tamaño del corte elegido (x).", respuesta: "Lámina de 30 cm × 20 cm. Corte en esquinas: x = 3 cm (o x = 5 cm para 1000 cm³ exactos)." },
            { enunciado: "2. Modelo Algebraico y Ecuación Cuadrática planteada:", respuesta: "V(x) = (30 - 2x)(20 - 2x)x | Ecuación de base: x² - 25x + 66 = 0." },
            { enunciado: "3. Resumen del procedimiento con Fórmula General y justificación de la raíz seleccionada:", respuesta: "Raíces x₁ = 22 (descartada por exceder 10 cm) y x₂ = 3 cm (aceptada)." },
            { enunciado: "4. Dimensiones Finales del Empaque Armado: Largo = _____, Ancho = _____, Altura = _____, Volumen = _____", respuesta: "Para x=3: 24 cm × 14 cm × 3 cm (V = 1008 cm³). Para x=5: 20 cm × 10 cm × 5 cm (V = 1000 cm³)." }
          ],
          boletoSalida: "Autoevaluación de equipo: ¿Qué aportó cada integrante al cálculo y diseño del prototipo?"
        }
      },
      {
        numero: 15,
        semana: 6,
        titulo: "Proyecto Caja sin Tapa (Parte 5): Exposición de Ingenieros de Empaque y Evaluación",
        inicio: "Organización del aula para el foro de 'Ingenieros de Empaque'.",
        desarrollo: "Exposición de cada equipo mostrando su proceso algebraico, el uso de la fórmula general y su caja terminada. Ronda de preguntas entre pares.",
        cierre: "Reflexión final y llenado de la rúbrica de Evaluación Formativa del bloque de ecuaciones cuadráticas.",
        hojaActividad: {
          tituloHoja: "Evaluación Integradora y Foro de Ingenieros de Empaque (Sesión 5)",
          instrucciones: "Registra las observaciones de las exposiciones y resuelve los ejercicios integradores del bloque de Ecuaciones Cuadráticas.",
          notaTeorica: "Resumen del Bloque: 1) Igualar a cero Ax²+Bx+C=0. 2) Analizar el discriminante b²-4ac. 3) Resolver por factorización o fórmula general. 4) Validar la solución en el contexto.",
          ejercicios: [
            { enunciado: "1. Resuelve por factorización: x² - 11x + 28 = 0", respuesta: "(x - 7)(x - 4) = 0 -> x₁ = 7, x₂ = 4" },
            { enunciado: "2. Resuelve usando la Fórmula General: 2x² + 3x - 2 = 0", respuesta: "Δ = 9 - 4(2)(-2) = 25 -> x = (-3 ± 5)/4 -> x₁ = 1/2, x₂ = -2" },
            { enunciado: "3. Problema Integrador: Un terreno rectangular en Guaymas tiene un largo que mide 5 m más que su ancho. Si su área es de 84 m², ¿cuáles son sus medidas?", respuesta: "x(x+5) = 84 -> x² + 5x - 84 = 0 -> (x+12)(x-7)=0 -> Ancho = 7 m, Largo = 12 m." }
          ],
          boletoSalida: "Escribe qué aprendiste en estas 3 semanas sobre la utilidad real de las ecuaciones cuadráticas."
        }
      }
    ]
  }
};

// ============================================================================
// CONTINUACIÓN TRIMESTRE 1: BLOQUES B04 (FUNCIONES) Y B05 (REPARTO PROPORCIONAL)
// ============================================================================

Object.assign(window.PlaneacionesTrimestre1, {
  B04: {
    id: "B04",
    periodo: "23 de octubre al 05 de noviembre",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Reconoce que, en una situación del contexto, dos cantidades cambian de manera interdependiente.",
      "Organiza los datos de una relación en una tabla de valores de manera correcta.",
      "Traduce los datos de una tabla a puntos en el plano cartesiano y los interpreta visualmente.",
      "'Lee' la historia que cuenta una gráfica.",
      "Encuentra la expresión algebraica (la 'fórmula') que describe la relación entre las variables.",
      "Se mueve con confianza entre las tres representaciones (tabular, gráfica y algebraica)."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 7,
        titulo: "Variables Conectadas: Independiente y Dependiente",
        inicio: "Plantear la situación: 'Imagina que estás llenando una cubeta con una manguera a ritmo constante. ¿Qué dos cosas cambian que podamos medir?' Guiar a identificar Tiempo (x) y Cantidad de agua (y).",
        desarrollo: "Explicar el concepto de variable independiente (x, la que controlamos) y variable dependiente (y, la que resulta). Analizar en equipos 3 escenarios reales.",
        cierre: "Puesta en común: 'En el mundo muchas cantidades están conectadas; el primer paso es identificar cuál depende de cuál.'",
        hojaActividad: {
          tituloHoja: "Variables Conectadas: ¿Quién Depende de Quién?",
          instrucciones: "Para cada situación cotidiana, identifica las dos variables que cambian e indica cuál es la Variable Independiente (x) y cuál la Dependiente (y).",
          notaTeorica: "Variable Independiente (x): Es la cantidad que elegimos o transcurre libremente (ej. tiempo, boletos). | Variable Dependiente (y): Su valor depende de x (ej. costo total, litros).",
          ejercicios: [
            { enunciado: "1. Llenar una cubeta con una manguera a ritmo constante: Variable Independiente (x) = ________ | Variable Dependiente (y) = ________", respuesta: "x = Tiempo (minutos) | y = Cantidad de agua en la cubeta (litros)" },
            { enunciado: "2. El costo de comprar varios boletos para el cine: Variable Independiente (x) = ________ | Variable Dependiente (y) = ________", respuesta: "x = Número de boletos comprados | y = Costo total a pagar ($)" },
            { enunciado: "3. La distancia que recorre un automóvil que viaja a velocidad constante por la carretera a Hermosillo:", respuesta: "x = Tiempo de viaje (horas) | y = Distancia recorrida (km)" },
            { enunciado: "4. La temperatura de una pizza al salir del horno conforme pasan los minutos:", respuesta: "x = Tiempo fuera del horno (min) | y = Temperatura de la pizza (°C)" }
          ],
          boletoSalida: "Inventa un ejemplo del puerto de Guaymas donde una cantidad (y) dependa de otra (x)."
        }
      },
      {
        numero: 2,
        semana: 7,
        titulo: "Representación Tabular: Organizando la Variación",
        inicio: "Retomar el ejemplo de la cubeta: 'Si cada minuto la manguera vierte 3 litros de agua, ¿cómo organizamos la información para verla claramente?'",
        desarrollo: "Introducir la representación tabular construyendo juntos la tabla Tiempo vs. Litros. Luego elaborar tablas para dos escenarios: Servicio de streaming ($120 al mes) y Viaje en taxi ($15 banderazo + $10/km).",
        cierre: "Revisión de tablas en pizarrón. Conclusión: 'Una tabla nos permite organizar la relación entre dos variables de manera ordenada.'",
        hojaActividad: {
          tituloHoja: "Representación Tabular de Funciones",
          instrucciones: "Construye las tablas de valores para x = 0, 1, 2, 3, 4 y 5 en cada uno de los escenarios.",
          notaTeorica: "Una tabla de valores ordena los pares (x, y) en dos columnas, permitiendo observar de cuánto en cuánto cambia la variable dependiente.",
          ejercicios: [
            { enunciado: "1. Ejemplo de la Cubeta (3 litros por minuto): Calcula los litros (y) para t = 0, 1, 2, 3, 4, 5 minutos.", respuesta: "Para t = 0, 1, 2, 3, 4, 5 -> Litros y = 0, 3, 6, 9, 12, 15 L." },
            { enunciado: "2. Escenario 1 (Streaming): Un servicio cuesta $120 al mes. Construye la tabla que relaciona los meses (x = 0 a 5) con el costo acumulado (y).", respuesta: "Para x = 0, 1, 2, 3, 4, 5 -> Costo y = $0, $120, $240, $360, $480, $600." },
            { enunciado: "3. Escenario 2 (Taxi): Cobra $15 de banderazo y $10 por cada km. Construye la tabla para x = 0, 1, 2, 3, 4, 5 km.", respuesta: "Para x = 0, 1, 2, 3, 4, 5 -> Costo y = $15, $25, $35, $45, $55, $65." }
          ],
          boletoSalida: "Observa ambas tablas: ¿En cuál de las dos cuando x vale 0 el costo y no vale 0, y por qué?"
        }
      },
      {
        numero: 3,
        semana: 7,
        titulo: "Del Papel a la Gráfica: El Plano Cartesiano",
        inicio: "Mostrar las tablas de la sesión anterior y preguntar: '¿Habrá una forma de ver esta información en un dibujo?'",
        desarrollo: "Explicar los ejes X e Y del plano cartesiano y cómo ubicar pares ordenados (x, y). Graficar en cuadrícula las tablas del streaming y del taxi.",
        cierre: "Galería de gráficas observando cuál inicia en el origen (0,0) y cuál en (0,15).",
        hojaActividad: {
          tituloHoja: "Graficando Pares Ordenados (x, y) en el Plano Cartesiano",
          instrucciones: "Ubica los puntos de las tablas de la sesión anterior en el plano cartesiano y únelos con línea recta.",
          notaTeorica: "Cada fila de una tabla forma una coordenada (x, y): primero avanzas horizontalmente en el Eje X y luego subes verticalmente en el Eje Y.",
          diagramType: "cartesian",
          ejercicios: [
            { enunciado: "1. Escribe los 5 pares ordenados (x, y) del Taxi ($15 + $10x) para x = 0, 1, 2, 3, 4.", respuesta: "(0, 15), (1, 25), (2, 35), (3, 45), (4, 55)" },
            { enunciado: "2. Ubica esos puntos en el plano cartesiano superior y traza la recta.", respuesta: "Línea recta ascendente que cruza el eje Y en (0, 15)." },
            { enunciado: "3. En el mismo plano (usando escala de 25 en 25), ubica la recta proporcional y = 25x para x = 0, 1, 2, 3, 4 y compáralas.", respuesta: "Puntos: (0,0), (1,25), (2,50), (3,75), (4,100). Se cruzan en (1.67, 31.6)." }
          ],
          boletoSalida: "¿Qué coordenada tiene siempre cualquier punto que se encuentra exactamente en el origen del plano cartesiano?"
        }
      },
      {
        numero: 4,
        semana: 7,
        titulo: "Leyendo Historias en las Gráficas: Interpretación Cualitativa",
        inicio: "Proyectar una gráfica de temperatura a lo largo del día en Guaymas y preguntar: '¿A qué hora hizo más calor? ¿En qué tramo la temperatura bajó?'",
        desarrollo: "En equipos, analizar 4 siluetas de gráficas (recta que sube, recta que baja, curva parabólica, recta horizontal) y redactar una situación real que corresponda a cada una.",
        cierre: "Exposición de historias. Conclusión: 'La forma de una gráfica nos da pistas sobre si algo aumenta, disminuye, se acelera o permanece constante.'",
        hojaActividad: {
          tituloHoja: "Interpretación Cualitativa: La Historia Detrás de una Gráfica",
          instrucciones: "Analiza el comportamiento de cada tipo de línea gráfica y redacta una situación real que la represente.",
          notaTeorica: "Tramo ascendente (/): La variable aumenta. | Tramo horizontal (—): Permanece constante. | Tramo descendente (\\): Disminuye. | Curva ( parábola ): El cambio se acelera o frena.",
          diagramType: "cartesian_parabola",
          ejercicios: [
            { enunciado: "1. Gráfica A (Línea recta que sube desde cero): Escribe una historia real que tenga este comportamiento.", respuesta: "Ejemplo: La distancia recorrida al caminar a paso constante o el llenado de un tinaco." },
            { enunciado: "2. Gráfica B (Línea recta que baja hasta llegar a cero): Escribe una historia real que la represente.", respuesta: "Ejemplo: El porcentaje de batería de un celular al usarse o la gasolina de una lancha." },
            { enunciado: "3. Gráfica C (Curva en forma de arco/parábola como la figura superior): ¿Qué situación física describe?", respuesta: "La altura de un balón lanzado al aire o un clavado: sube hasta un punto máximo (vértice) y luego baja." },
            { enunciado: "4. Gráfica D (Línea horizontal plana): ¿Qué significa si la gráfica de Distancia vs. Tiempo es horizontal durante 10 minutos?", respuesta: "Significa que la persona o el vehículo estuvo detenido (su distancia no cambió)." }
          ],
          boletoSalida: "Si graficas la altura de un niño desde los 0 hasta los 25 años, ¿por qué al final la gráfica se vuelve horizontal?"
        }
      },
      {
        numero: 5,
        semana: 7,
        titulo: "Variación Proporcional Directa y Constante k (y = kx)",
        inicio: "Retomar las gráficas del streaming y del taxi: '¿En cuál se cumple que si pides el doble, pagas exactamente el doble?'",
        desarrollo: "Formalizar la Variación Proporcional Directa: su gráfica pasa por (0,0), su expresión es y = kx y la constante de proporcionalidad se obtiene dividiendo k = y / x.",
        cierre: "Resolver en plenaria: 'Si 3 kg de manzanas cuestan $90, ¿cuál es k, cuál es la expresión y cuánto cuestan 7 kg?'",
        hojaActividad: {
          tituloHoja: "Variación Proporcional Directa y Constante de Proporcionalidad (k)",
          instrucciones: "Calcula la constante de proporcionalidad k = y/x, escribe la regla algebraica y = kx y resuelve.",
          notaTeorica: "En toda relación de proporcionalidad directa, el cociente k = y / x es constante y la ecuación tiene la forma y = kx.",
          ejercicios: [
            { enunciado: "1. En el servicio de streaming de $120 al mes: a) ¿Cuánto vale la constante k?  b) ¿Cuál es su expresión algebraica?", respuesta: "a) k = 120 | b) y = 120x" },
            { enunciado: "2. Si 3 kg de manzanas cuestan $90: a) Calcula k = y/x  b) Escribe la ecuación y = kx  c) Calcula cuánto costarán 7 kg.", respuesta: "a) k = 90/3 = 30 ($/kg) | b) y = 30x | c) y = 30(7) = $210" },
            { enunciado: "3. Una embarcación pesquera en Guaymas consume 45 litros de diésel para recorrer 9 millas náuticas. a) Halla k  b) Escribe la fórmula  c) ¿Cuántos litros necesita para 20 millas?", respuesta: "a) k = 45/9 = 5 L/milla | b) y = 5x | c) y = 5(20) = 100 litros" }
          ],
          boletoSalida: "En una tabla se observa que para x = 4, y = 28 y para x = 6, y = 42. ¿Es proporcional directa? Si sí, ¿cuál es su ecuación?"
        }
      },
      {
        numero: 6,
        semana: 8,
        titulo: "Descubriendo la Regla Lineal: y = mx + b",
        inicio: "Presentar la tabla x: 1, 2, 3 | y: 5, 7, 9 y preguntar: '¿Cuál es el secreto o fórmula que convierte los números de X en los de Y?'",
        desarrollo: "Enseñar el método de 2 pasos para encontrar la regla lineal y = mx + b: 1) Identificar de cuánto en cuánto avanza y (la razón de cambio m), 2) Ajustar el valor inicial b cuando x = 0.",
        cierre: "Reto de encontrar la expresión algebraica a partir de una tabla dada.",
        hojaActividad: {
          tituloHoja: "Encontrando la Regla Secreta: Relaciones Lineales y = mx + b",
          instrucciones: "Analiza de cuánto en cuánto cambia la columna Y para hallar 'm', identifica el valor inicial 'b' (cuando x=0) y escribe la regla y = mx + b.",
          notaTeorica: "En y = mx + b: 'm' es el incremento por cada unidad que avanza x, y 'b' es el valor de y cuando x = 0.",
          ejercicios: [
            { enunciado: "1. Tabla A: Para x = 1, 2, 3, 4 los valores son y = 5, 7, 9, 11. a) ¿De cuánto en cuánto sube y (m)?  b) ¿Cuánto valdría y si x = 0 (b)?  c) Escribe la regla y = mx + b.", respuesta: "a) m = 2 | b) b = 3 | c) y = 2x + 3" },
            { enunciado: "2. Tabla del Taxi: Para x = 0, 1, 2, 3 km los costos son y = 15, 25, 35, 45. Escribe su expresión algebraica.", respuesta: "m = 10, b = 15 -> y = 10x + 15" },
            { enunciado: "3. Tabla C: Para x = 0, 1, 2, 3 los valores son y = 8, 11, 14, 17. Encuentra la expresión algebraica y calcula y cuando x = 20.", respuesta: "m = 3, b = 8 -> y = 3x + 8. Para x = 20: y = 3(20) + 8 = 68." }
          ],
          boletoSalida: "Encuentra la regla algebraica y = mx + b para la tabla: x = 0, 1, 2, 3 | y = 4, 9, 14, 19."
        }
      },
      {
        numero: 7,
        semana: 8,
        titulo: "De la Fórmula a la Tabla y a la Gráfica",
        inicio: "Escribir en el pizarrón y = 4x + 1 y preguntar: '¿Cómo se vería esta regla en una tabla y en una gráfica?'",
        desarrollo: "Práctica individual donde a partir de 3 expresiones algebraicas construyen su tabla para x = 0 a 4 y trazan su gráfica en el plano cartesiano.",
        cierre: "Demostrar en el pizarrón cómo la regla, la tabla y la gráfica cuentan la misma historia en tres idiomas matemáticos.",
        hojaActividad: {
          tituloHoja: "Las Tres Representaciones: Fórmula, Tabla y Gráfica",
          instrucciones: "Evalúa cada expresión algebraica para x = 0, 1, 2, 3, 4, completa su tabla y traza las tres rectas en el plano cartesiano.",
          notaTeorica: "Para tabular una función como y = 4x + 1, sustituye cada valor de x, multiplica primero por 4 y al resultado súmale 1.",
          diagramType: "cartesian",
          ejercicios: [
            { enunciado: "1. Función A: y = 4x + 1. Calcula los valores de y para x = 0, 1, 2, 3, 4.", respuesta: "y = 1, 5, 9, 13, 17" },
            { enunciado: "2. Función B: y = 2x + 5. Calcula los valores de y para x = 0, 1, 2, 3, 4.", respuesta: "y = 5, 7, 9, 11, 13" },
            { enunciado: "3. Función C: y = 3x. Calcula los valores de y para x = 0, 1, 2, 3, 4 y ubica las tres rectas en el plano.", respuesta: "y = 0, 3, 6, 9, 12. Observa que las funciones A y B se cruzan en el punto (2, 9)." }
          ],
          boletoSalida: "¿En qué punto (x, y) tienen exactamente el mismo valor las funciones y = 4x + 1 y y = 2x + 5?"
        }
      },
      {
        numero: 8,
        semana: 8,
        titulo: "Significado Real de la Pendiente (m) y la Ordenada al Origen (b)",
        inicio: "Retomar y = 10x + 15 y preguntar: '¿Qué representa el 10 en la vida real y qué representa el 15?'",
        desarrollo: "Explicar la pendiente (m) como la 'razón de cambio' (costo por unidad) y la ordenada al origen (b) como el 'valor inicial o cargo fijo'. Analizar expresiones de contextos reales.",
        cierre: "Interpretar la expresión C = 50d + 200 (renta de un salón o equipo por d días).",
        hojaActividad: {
          tituloHoja: "Interpretando la Pendiente (m) y la Ordenada al Origen (b)",
          instrucciones: "Identifica el valor de la pendiente (m) y la ordenada al origen (b) en cada modelo real y explica qué significan en palabras.",
          notaTeorica: "En el modelo lineal y = mx + b: 'm' es la razón de cambio (cuánto sube o baja por unidad) y 'b' es la condición inicial (valor cuando x = 0).",
          ejercicios: [
            { enunciado: "1. El costo de un mecánico a domicilio se modela con C = 150h + 250, donde h son las horas de trabajo. ¿Qué significan el 150 y el 250?", respuesta: "m = 150 ($150 por cada hora trabajada) y b = 250 ($250 fijos por la visita o revisión inicial)." },
            { enunciado: "2. Un tinaco tiene 800 litros y se vacía para limpieza según L = 800 - 40t, donde t son los minutos. ¿Qué significa el -40 y qué significa el 800?", respuesta: "b = 800 (litros iniciales en el minuto 0) y m = -40 (pierde 40 litros por cada minuto)." },
            { enunciado: "3. Cierre: Si rentar un equipo de sonido cuesta C = 50d + 200 por 'd' días, ¿cuánto es el depósito inicial y cuánto cuesta cada día adicional?", respuesta: "Depósito inicial b = $200; costo por día m = $50." }
          ],
          boletoSalida: "Escribe la ecuación lineal para un gimnasio que cobra $300 de inscripción única y $250 por cada mes (m)."
        }
      },
      {
        numero: 9,
        semana: 8,
        titulo: "Variación Proporcional Inversa (xy = k y su Curva)",
        inicio: "Plantear: 'Si una lancha viaja al doble de velocidad, ¿tarda el doble o la mitad de tiempo en llegar a San Carlos?' Introducir la variación inversa.",
        desarrollo: "Explicar la variación proporcional inversa: cuando una variable se multiplica, la otra se divide; su producto es constante (x · y = k), su fórmula es y = k / x y su gráfica es una curva (hipérbola). Resolver el problema de los albañiles.",
        cierre: "Cuadro comparativo entre Variación Directa (y = kx, recta por el origen) e Inversa (y = k/x, curva decreciente).",
        hojaActividad: {
          tituloHoja: "Variación Proporcional Inversa: y = k / x",
          instrucciones: "Completa la tabla de variación inversa, verifica que el producto x · y sea constante y analiza la curva en el plano cartesiano.",
          notaTeorica: "En la Variación Inversa, al aumentar x disminuye y en la misma proporción. El producto k = x · y siempre es constante y la ecuación es y = k / x.",
          diagramType: "cartesian_inversa",
          ejercicios: [
            { enunciado: "1. Para construir una barda en la escuela, 2 albañiles tardan 6 días. a) Calcula la constante k = x · y (total de días-hombre). b) Completa la tabla para 1, 2, 3, 4 y 6 albañiles.", respuesta: "a) k = 2 × 6 = 12. b) Para x = 1, 2, 3, 4, 6 albañiles -> Días y = 12, 6, 4, 3, 2 días." },
            { enunciado: "2. Escribe la expresión algebraica que relaciona el número de albañiles (x) con los días que tardan (y).", respuesta: "y = 12 / x" },
            { enunciado: "3. Un viaje de Guaymas a Ciudad Obregón es de 120 km. Completa el tiempo (t = 120 / v) si viajas a velocidades de v = 40, 60, 80 y 120 km/h.", respuesta: "Para v = 40, 60, 80, 120 km/h -> Tiempo t = 3 h, 2 h, 1.5 h, 1 h." }
          ],
          boletoSalida: "¿Cómo distingues a simple vista en una gráfica si una relación es de proporcionalidad directa o de proporcionalidad inversa?"
        }
      },
      {
        numero: 10,
        semana: 8,
        titulo: "Reto de Analistas: Comparando Planes de Telefonía",
        inicio: "Presentar el reto integrador: 'Dos compañías ofrecen un plan de datos: Plan A cobra $200 fijos al mes más $2 por cada GB extra. Plan B cobra $300 fijos al mes con GB ilimitados.'",
        desarrollo: "En equipos, realizar el estudio completo para un cliente:\n1. Escribir las ecuaciones de ambos planes.\n2. Construir una tabla comparativa para 0, 20, 40, 60, 80 y 100 GB extra.\n3. Graficar ambas líneas y hallar el punto de equilibrio.",
        cierre: "Presentación de recomendaciones al cliente y llenado de la tabla de Evaluación Formativa.",
        hojaActividad: {
          tituloHoja: "Reto Final de Analistas: ¿Qué Plan de Telefonía Conviene Más?",
          instrucciones: "Modela algebraica, tabular y gráficamente ambos planes de telefonía para emitir una recomendación fundamentada.",
          notaTeorica: "El punto de intersección (donde ambas ecuaciones valen lo mismo) nos indica a partir de qué consumo un plan supera en precio al otro.",
          diagramType: "cartesian",
          ejercicios: [
            { enunciado: "1. Escribe la expresión algebraica del costo mensual (y) según los GB extra (x) para: a) Plan A ($200 fijos + $2 por GB): ________  b) Plan B ($300 fijos ilimitados): ________", respuesta: "a) Plan A: y = 2x + 200 | b) Plan B: y = 300" },
            { enunciado: "2. Calcula el costo del Plan A para x = 0, 20, 40, 50, 60, 80 y 100 GB extra y compáralo con los $300 del Plan B.", respuesta: "Para x = 0, 20, 40, 50, 60, 80, 100 -> Plan A = $200, $240, $280, $300, $320, $360, $400." },
            { enunciado: "3. Traza ambas rectas en el plano cartesiano y señala las coordenadas del punto exacto donde empatan.", respuesta: "Se cruzan en (50, 300), es decir, a los 50 GB extra ambos cuestan $300." },
            { enunciado: "4. Conclusión para el cliente: ¿Cuándo conviene contratar el Plan A y cuándo conviene el Plan B?", respuesta: "Si consume menos de 50 GB extra conviene el Plan A; si consume más de 50 GB extra conviene el Plan B." }
          ],
          boletoSalida: "Si una persona consume en promedio 30 GB extra al mes, ¿cuánto dinero ahorra al año eligiendo el Plan A en vez del Plan B?"
        }
      }
    ]
  },

  B05: {
    id: "B05",
    periodo: "06 al 19 de noviembre",
    cicloEscolar: "2025-2026",
    tiempoRealizacion: "2 semanas (10 sesiones)",
    evaluacionFormativa: [
      "Distingue entre un reparto equitativo (partes iguales) y un reparto proporcional (partes correspondientes a una magnitud).",
      "Reconoce las variables o magnitudes que determinan cómo se debe hacer el reparto (tiempo trabajado, dinero aportado, calificaciones).",
      "Aplica un método sistemático (valor unitario o regla de tres) para calcular la distribución.",
      "Entiende la lógica de una relación inversamente proporcional (a 'más' de una cantidad, le corresponde 'menos' de la otra).",
      "Aplica el método para resolver repartos inversos, manejando correctamente los números recíprocos (inversos).",
      "Analiza un problema del contexto y decide qué tipo de reparto es el adecuado (directo, inverso o equitativo)."
    ],
    sesiones: [
      {
        numero: 1,
        semana: 9,
        titulo: "Justicia Matemática: Reparto Equitativo vs. Reparto Proporcional",
        inicio: "Preguntar: 'Si tengo 20 dulces para 4 amigos, ¿cuál es la forma más justa de repartirlos?' (Partes iguales). Luego plantear el caso de Ana, Beto y Carlos lavando un coche por $100 donde Ana trabajó el doble de tiempo.",
        desarrollo: "Debatir en equipos por qué repartir en partes iguales ($33.33) no sería justo si Ana trabajó el doble, y proponer un reparto justo.",
        cierre: "Conclusión: 'Repartir de forma justa a veces significa dar a cada quien en proporción a su esfuerzo o aportación.'",
        hojaActividad: {
          tituloHoja: "¿Partes Iguales o Proporcionales? La Noción de Justicia",
          instrucciones: "Analiza cada situación, distingue entre reparto equitativo y proporcional, y propón una distribución justa.",
          notaTeorica: "Reparto Equitativo: Todos reciben exactamente lo mismo (Total ÷ N). | Reparto Proporcional: Cada quien recibe según las partes que aportó o trabajó.",
          ejercicios: [
            { enunciado: "1. Caso Inicial: Ana, Beto y Carlos lavan un coche y les pagan $100. Ana trabajó 2 horas, Beto 1 hora y Carlos 1 hora. a) ¿Cuántas horas trabajaron en total? b) ¿Cuánto debe recibir cada uno?", respuesta: "a) 4 horas en total | b) Cada hora vale $25 -> Ana: $50, Beto: $25, Carlos: $25." },
            { enunciado: "2. Dos pescadores de Guaymas compran un boleto de rifa de $1,000. El pescador A puso $15 y el pescador B puso $5. Si ganan el premio, ¿sería justo repartirlo 500 y 500? ¿Cuánto debe tocarle a cada uno?", respuesta: "Aportaron $20 en total (A puso 3/4 y B puso 1/4). Al pescador A le corresponden $750 y al B $250." },
            { enunciado: "3. Clasifica en Equitativo (E) o Proporcional (P): a) Repartir rebanadas de pastel en un cumpleaños (___)  b) Repartir las ganancias de una cooperativa según los kilos capturados (___).", respuesta: "a) E (Equitativo) | b) P (Proporcional)" }
          ],
          boletoSalida: "Explica con un ejemplo cotidiano cuándo un reparto en partes iguales resulta injusto."
        }
      },
      {
        numero: 2,
        semana: 9,
        titulo: "Introducción Intuitiva al Reparto Proporcional Directo",
        inicio: "Retomar el problema de Ana, Beto y Carlos ($100 en 4 partes de trabajo).",
        desarrollo: "Explicar el conteo del total de 'partes' o 'acciones' para dividir la cantidad total y asignar proporcionalmente.",
        cierre: "Concluir que el primer paso en todo reparto proporcional es conocer la suma total de las partes.",
        hojaActividad: {
          tituloHoja: "Contando las Partes: Reparto Proporcional Directo",
          instrucciones: "Suma el total de partes aportadas, descubre cuánto vale 1 sola parte y reparte la cantidad total.",
          notaTeorica: "Idea clave: Si sumas todas las partes individuales, obtienes el total de partes en que debe dividirse el premio o ganancia.",
          ejercicios: [
            { enunciado: "1. Dos amigos pintan una barda por $600. Luis pintó 3 metros y Mario pintó 2 metros. a) Total de metros pintados: ____ b) Pago por cada metro: ____ c) Pago de Luis y de Mario: ________", respuesta: "a) 5 m | b) $600 ÷ 5 = $120/m | c) Luis: $360, Mario: $240." },
            { enunciado: "2. Tres hermanos compran una consola de videojuegos de $4,500 para usarla proporcionalmente al dinero que pusieron. Si jugarán 9 horas el fin de semana y aportaron 4, 3 y 2 partes respectivamente, ¿cuántas horas juega cada uno?", respuesta: "Total = 9 partes -> 4 horas, 3 horas y 2 horas respectivamente." },
            { enunciado: "3. Comprueba tus resultados: ¿Qué debes obtener siempre al sumar lo que recibió cada participante?", respuesta: "Siempre debe dar exactamente la cantidad total original que se iba a repartir." }
          ],
          boletoSalida: "Se reparten 60 cuadernos entre dos grupos pequeños de 4 y 6 alumnos respectivamente. ¿Cuántos cuadernos recibe cada grupo?"
        }
      },
      {
        numero: 3,
        semana: 9,
        titulo: "Formalización del Método del Valor Unitario (3 Pasos)",
        inicio: "Plantear: 'Se reparten 80 estampas entre Juan y Sofía en proporción a los libros que leyeron: Juan 3 y Sofía 5. ¿Cómo empezamos?'",
        desarrollo: "Formalizar el Método del Valor Unitario en 3 pasos:\n• Paso 1: Sumar los índices o partes (3 + 5 = 8).\n• Paso 2: Calcular el valor unitario (80 ÷ 8 = 10 estampas por libro).\n• Paso 3: Multiplicar por cada parte (3×10 = 30 y 5×10 = 50).",
        cierre: "Resolver ejercicio de repartir $500 proporcionalmente a las edades 10, 15 y 25 años.",
        hojaActividad: {
          tituloHoja: "El Método de los 3 Pasos: Valor Unitario en Reparto Proporcional",
          instrucciones: "Aplica ordenadamente los 3 pasos del Método del Valor Unitario en cada problema.",
          notaTeorica: "Paso 1: Suma de índices (S = a + b + c). | Paso 2: Valor Unitario (k = Total ÷ S). | Paso 3: Multiplicar k por cada índice.",
          ejercicios: [
            { enunciado: "1. Juan leyó 3 libros y Sofía 5 libros. Reparte 80 estampas aplicando los 3 pasos.", respuesta: "Paso 1: 3+5=8 | Paso 2: k = 80/8 = 10 | Paso 3: Juan = 30, Sofía = 50." },
            { enunciado: "2. Repartir $500 entre tres sobrinos en proporción a sus edades: 10, 15 y 25 años. Anota Paso 1, Paso 2 y Paso 3.", respuesta: "Paso 1: 10+15+25 = 50 años | Paso 2: k = 500/50 = $10 por año | Paso 3: 10 años -> $100; 15 años -> $150; 25 años -> $250." },
            { enunciado: "3. Tres lanchas pesqueras capturaron 4, 6 y 10 toneladas de sardina. Si reciben un bono cooperativo de $12,000, ¿cuánto recibe cada lancha?", respuesta: "Paso 1: 4+6+10 = 20 t | Paso 2: k = 12000/20 = $600/t | Paso 3: $2,400, $3,600 y $6,000." }
          ],
          boletoSalida: "Verifica que la suma de las tres cantidades del problema 3 sea igual a $12,000."
        }
      },
      {
        numero: 4,
        semana: 9,
        titulo: "Práctica de Negocios y Mezclas con Simplificación de Razones",
        inicio: "Repaso ágil de los 3 pasos del valor unitario.",
        desarrollo: "Resolver problemas de inversión de socios ($2,000, $3,000 y $5,000 para repartir $40,000 de ganancia) y proporciones en mezclas (limonada de 12 L de agua y 8 L de jugo reducida a 5 L totales).",
        cierre: "Mostrar cómo simplificar cantidades grandes (2000 : 3000 : 5000 equivale a 2 : 3 : 5) facilita enormemente los cálculos.",
        hojaActividad: {
          tituloHoja: "Reparto de Ganancias y Proporciones en Mezclas",
          instrucciones: "Simplifica los números repartidores cuando sea posible y resuelve cada problema.",
          notaTeorica: "Truco de simplificación: Repartir en proporción a 2000, 3000 y 5000 da exactamente el mismo resultado que repartir en proporción a 2, 3 y 5.",
          ejercicios: [
            { enunciado: "1. Tres socios invierten en un negocio en Guaymas: el socio A pone $2,000, el B $3,000 y el C $5,000. Al final del año obtienen una ganancia de $40,000. ¿Cuánto le toca a cada socio?", respuesta: "Simplificando índices a 2, 3 y 5 -> Suma = 10 partes. Valor unitario k = $40,000/10 = $4,000. Socio A: $8,000; Socio B: $12,000; Socio C: $20,000." },
            { enunciado: "2. Una receta de limonada lleva 12 litros de agua y 8 litros de jugo de limón (20 L en total). Si queremos preparar solo 5 litros manteniendo la misma proporción, ¿cuánta agua y cuánto jugo necesitamos?", respuesta: "Razón 12:8 simplificada es 3:2 (suma = 5 partes). Para 5 L se necesitan 3 litros de agua y 2 litros de jugo." },
            { enunciado: "3. Para preparar concreto se mezclan 1 parte de cemento, 2 de arena y 3 de grava. ¿Cuántos kg de cada material hay en 180 kg de mezcla?", respuesta: "Suma = 6 partes -> k = 180/6 = 30 kg. Cemento: 30 kg, Arena: 60 kg, Grava: 90 kg." }
          ],
          boletoSalida: "Simplifica los números repartidores 1500, 2500 y 4000 a los números enteros más pequeños posibles."
        }
      },
      {
        numero: 5,
        semana: 9,
        titulo: "Alternativa Estratégica: El Método de la Regla de Tres",
        inicio: "Retomar el problema de los tres socios y preguntar: '¿Se podrá calcular directamente con porcentajes o regla de tres?'",
        desarrollo: "Explicar el método de la Regla de Tres: Si al total aportado ($10,000) le corresponde el total de ganancia ($40,000), a la aportación A ($2,000) le corresponde X = (2000 × 40000) / 10000.",
        cierre: "Comparar el Método del Valor Unitario con la Regla de Tres.",
        hojaActividad: {
          tituloHoja: "Método de la Regla de Tres y Porcentajes en Repartos",
          instrucciones: "Plantea la proporción (Regla de Tres) para cada participante y calcula cuánto le corresponde.",
          notaTeorica: "Fórmula por Regla de Tres: Cantidad_A = (Aportación_A × Total_a_Repartir) ÷ Suma_de_Aportaciones.",
          ejercicios: [
            { enunciado: "1. Aplica la Regla de Tres al problema de los socios (Aportaciones: A=$2,000, B=$3,000, C=$5,000; Suma=$10,000; Ganancia=$40,000).", respuesta: "A = (2000×40000)/10000 = $8,000 | B = (3000×40000)/10000 = $12,000 | C = (5000×40000)/10000 = $20,000." },
            { enunciado: "2. ¿Qué porcentaje del capital total aportó cada socio (A, B y C) y qué porcentaje de la ganancia recibió?", respuesta: "A aportó 20%, B aportó 30% y C aportó 50%, recibiendo exactamente esos mismos porcentajes de la ganancia." },
            { enunciado: "3. Tres escuelas secundarias organizan un torneo y recaudan $15,000. Si vendieron 100, 150 y 250 boletos respectivamente, usa la regla de tres para repartir los fondos.", respuesta: "Total boletos = 500. Esc 1: (100×15000)/500 = $3,000; Esc 2: $4,500; Esc 3: $7,500." }
          ],
          boletoSalida: "¿Cuál de los dos métodos (Valor Unitario o Regla de Tres) te resultó más cómodo y por qué?"
        }
      },
      {
        numero: 6,
        semana: 10,
        titulo: "Aplicaciones Comunitarias del Reparto Directo",
        inicio: "Presentar el problema del recibo de luz: 'En un departamento viven 3 estudiantes y el recibo llegó de $900. Tienen 2, 3 y 4 aparatos eléctricos respectivamente. ¿Cuánto debe pagar cada uno?'",
        desarrollo: "Resolver en equipos problemas comunitarios de gastos compartidos, premios por calificaciones y escalado de recetas.",
        cierre: "Enfatizar la importancia de distinguir claramente cuál es la 'cantidad total a repartir' y cuáles son los 'índices de reparto'.",
        hojaActividad: {
          tituloHoja: "Reparto Proporcional en Gastos Familiares y Comunitarios",
          instrucciones: "Identifica la Cantidad a Repartir y los Índices de Reparto antes de realizar las operaciones.",
          notaTeorica: "En todo problema verbal, subraya primero el Total a repartir (dinero, litros, premios) y luego los índices de cada participante.",
          ejercicios: [
            { enunciado: "1. El recibo de luz llegó de $900 para 3 estudiantes que tienen 2, 3 y 4 aparatos eléctricos respectivamente. ¿Cuánto debe pagar cada uno?", respuesta: "Suma = 9 aparatos -> k = $900/9 = $100 por aparato. Pagan $200, $300 y $400." },
            { enunciado: "2. Un padre quiere repartir $1,350 entre sus tres hijos de forma proporcional a sus calificaciones finales: 8, 9 y 10. ¿Cuánto recibe cada hijo?", respuesta: "Suma = 8+9+10 = 27 puntos -> k = 1350/27 = $50 por punto. Reciben: $400, $450 y $500." },
            { enunciado: "3. Para cocinar un pastel se necesitan 3 tazas de harina por cada 2 de azúcar. Si el panadero usa 15 tazas de harina, ¿cuántas de azúcar necesita?", respuesta: "Razón 3 : 2 -> como 15 es 5 veces 3, necesita 5 × 2 = 10 tazas de azúcar." }
          ],
          boletoSalida: "Si cuatro vecinos pagan $1,200 por pavimentar el frente de sus casas que miden 5 m, 6 m, 4 m y 5 m, ¿cuánto paga cada vecino?"
        }
      },
      {
        numero: 7,
        semana: 10,
        titulo: "A Más le Toca Menos: Reparto Proporcional Inverso",
        inicio: "Plantear el dilema: 'Se dará un bono de puntualidad de $3,000 a dos empleados. El empleado A tuvo 1 falta y el B tuvo 3 faltas. ¿Le debería tocar más dinero al que tuvo más faltas?'",
        desarrollo: "Explicar el Reparto Proporcional Inverso usando números recíprocos (inversos multiplicativos) en 4 pasos:\n1) Tomar los inversos (1/1 y 1/3).\n2) Sumar los inversos (1 + 1/3 = 4/3).\n3) Dividir el total entre la suma (3000 ÷ 4/3 = 2250).\n4) Multiplicar por cada inverso (A: $2,250 y B: $750).",
        cierre: "Concluir: 'Cuando premiamos a quien tiene menos faltas, menos errores o menor tiempo en una carrera, usamos el reparto inverso.'",
        hojaActividad: {
          tituloHoja: "Reparto Proporcional Inverso: El Método de los Recíprocos",
          instrucciones: "Sigue los 4 pasos con fracciones recíprocas para resolver los repartos inversamente proporcionales.",
          notaTeorica: "Reparto Inverso a (a, b): 1° Escribe los recíprocos (1/a, 1/b). 2° Súmalos. 3° Divide el Total entre esa suma para hallar k. 4° Multiplica k por 1/a y por 1/b.",
          ejercicios: [
            { enunciado: "1. Bono de Puntualidad: Reparte $3,000 de forma inversamente proporcional a las faltas de dos empleados: A (1 falta) y B (3 faltas).", respuesta: "Inversos: 1/1 y 1/3. Suma = 4/3. k = 3000 ÷ (4/3) = 2250. Empleado A = 2250×1 = $2,250; Empleado B = 2250×(1/3) = $750." },
            { enunciado: "2. Dos hermanos se reparten 15 tareas domésticas de forma inversamente proporcional a las horas que estudian en la tarde: Ana estudia 3 h y Luis estudia 2 h. ¿Cuántas tareas hace cada uno?", respuesta: "Inversos: 1/3 y 1/2. Suma = 5/6. k = 15 ÷ (5/6) = 18. Ana hace 18×(1/3) = 6 tareas; Luis hace 18×(1/2) = 9 tareas." },
            { enunciado: "3. Reparte $4,200 de forma inversamente proporcional a 2 y 5.", respuesta: "Inversos: 1/2 + 1/5 = 7/10. k = 4200 ÷ (7/10) = 6000. Al 2 le tocan 6000/2 = $3,000 y al 5 le tocan 6000/5 = $1,200." }
          ],
          boletoSalida: "Verifica en el ejercicio 1: ¿Por qué el empleado con 1 falta recibió el triple de dinero que el empleado con 3 faltas?"
        }
      },
      {
        numero: 8,
        semana: 10,
        titulo: "Práctica de Reparto Inverso en Carreras y Competencias",
        inicio: "Repasar la suma de tres fracciones con común denominador (ej. 1/10 + 1/12 + 1/15 = 15/60 = 1/4).",
        desarrollo: "En parejas, resolver el problema de la carrera ($10,000 inversamente proporcional a los tiempos 10 min, 12 min y 15 min) y el problema del capitán y las 1,300 monedas (inverso a 2 y 4 errores).",
        cierre: "Revisión detallada del uso del mínimo común múltiplo en el reparto inverso.",
        hojaActividad: {
          tituloHoja: "Premiando la Velocidad y la Precisión: Reparto Inverso",
          instrucciones: "Utiliza el mínimo común múltiplo para sumar los recíprocos y determina cuánto recibe cada participante.",
          notaTeorica: "En una carrera, quien hace MENOR tiempo es más veloz y merece MAYOR premio; por eso el reparto es inversamente proporcional al tiempo.",
          ejercicios: [
            { enunciado: "1. Gran Carrera del Malecón: Se reparte un premio de $9,000 entre los 3 primeros lugares de forma inversamente proporcional a su tiempo: 1er lugar (10 min), 2do lugar (12 min) y 3er lugar (15 min). (Pista: usa común denominador 60).", respuesta: "Inversos: 1/10 + 1/12 + 1/15 = 6/60 + 5/60 + 4/60 = 15/60 = 1/4. k = 9000 ÷ (1/4) = 36,000. Premios: 1° = 36000/10 = $3,600; 2° = 36000/12 = $3,000; 3° = 36000/15 = $2,400." },
            { enunciado: "2. Un capitán de barco reparte un bono de 1,200 monedas entre dos marineros de forma inversamente proporcional al número de errores cometidos: Marinero A (2 errores) y Marinero B (4 errores).", respuesta: "Inversos: 1/2 + 1/4 = 3/4. k = 1200 ÷ (3/4) = 1600. Marinero A = 1600/2 = 800 monedas; Marinero B = 1600/4 = 400 monedas." }
          ],
          boletoSalida: "Si dos corredores tardan 4 min y 6 min en dar una vuelta y se reparten 50 puntos de forma inversa al tiempo, ¿cuántos puntos gana cada uno?"
        }
      },
      {
        numero: 9,
        semana: 10,
        titulo: "El Tribunal Matemático: ¿Directo, Inverso o Equitativo?",
        inicio: "Nombrar a los alumnos 'jueces matemáticos'. Su misión será dictaminar qué tipo de reparto corresponde a cada caso de la vida real.",
        desarrollo: "Analizar y debatir 3 casos controvertidos:\n• Caso 1: Repartir una herencia entre hermanos de 18, 20 y 25 años.\n• Caso 2: Dividir el gasto de gasolina de un viaje entre 4 amigos que viajaron juntos en el mismo auto.\n• Caso 3: Repartir un bono de calidad según el número de piezas defectuosas fabricadas.",
        cierre: "Exposición de veredictos argumentados y cálculo de un caso de cada tipo.",
        hojaActividad: {
          tituloHoja: "El Tribunal Matemático: Dictaminando el Tipo de Reparto",
          instrucciones: "Para cada caso, emite tu veredicto (Equitativo, Proporcional Directo o Proporcional Inverso), justifica tu decisión y resuelve el cálculo.",
          notaTeorica: "Criterio del Juez: ¿Todos merecen igual? → Equitativo. ¿Quien tiene mayor índice merece más? → Directo. ¿Quien tiene menor índice (menos fallas/tiempo) merece más? → Inverso.",
          ejercicios: [
            { enunciado: "1. Caso Gasolina: Cuatro amigos viajan juntos en un auto de Guaymas a Hermosillo y gastan $800 de gasolina. ¿Qué reparto es el más justo y cuánto paga cada uno?", respuesta: "Reparto Equitativo (todos recorrieron la misma distancia): $800 ÷ 4 = $200 cada uno." },
            { enunciado: "2. Caso Control de Calidad: En una maquiladora se reparte un bono de $1,500 entre dos operadores según las piezas defectuosas que tuvieron: Operador A (1 defecto) y Operador B (4 defectos). ¿Qué reparto aplica y cuánto recibe cada uno?", respuesta: "Reparto Inverso (menos defectos = mayor bono). Inversos: 1 + 1/4 = 5/4 -> k = 1200. Operador A: $1,200; Operador B: $300." },
            { enunciado: "3. Caso Cooperativa: Tres socios aportaron 3, 5 y 7 cajas de producto para una venta que generó $4,500. ¿Qué reparto aplica y cuánto recibe cada uno?", respuesta: "Reparto Directo (más cajas = mayor pago). Suma = 15 -> k = 300. Reciben $900, $1,500 y $2,100." }
          ],
          boletoSalida: "¿Qué ocurriría si por error aplicaras reparto directo en el Caso 2 (piezas defectuosas)?"
        }
      },
      {
        numero: 10,
        semana: 10,
        titulo: "Reto Integrador: El Huerto Escolar (Reparto Directo e Inverso)",
        inicio: "Presentar el proyecto integrador del bloque: 'Organizaremos un huerto escolar entre los tres grupos: 3°A (30 alumnos), 3°B (32 alumnos) y 3°C (38 alumnos).'",
        desarrollo: "En equipos, resolver las dos partes del reto:\n• Parte 1 (Reparto Directo): El costo inicial de semillas e insumos es de $2,500 y se pagará proporcionalmente al número de alumnos de cada grupo.\n• Parte 2 (Reparto Inverso): La cosecha dejó una ganancia de $3,100 que se repartirá de forma inversamente proporcional a las plantas que se secaron por descuido en cada parcela: 3°A (5 plantas secas), 3°B (2 plantas secas) y 3°C (3 plantas secas).",
        cierre: "Verificación de resultados en el pizarrón y cierre de la Evaluación Formativa del Primer Trimestre.",
        hojaActividad: {
          tituloHoja: "Reto Integrador del Bloque: El Huerto Escolar",
          instrucciones: "Resuelve las dos fases financieras del Huerto Escolar aplicando reparto directo en los costos y reparto inverso en el premio de cuidado.",
          notaTeorica: "Este reto combina ambos procedimientos: Costos proporcionales al tamaño del grupo (Directo) y Ganancias inversamente proporcionales a las plantas secas (Inverso).",
          ejercicios: [
            { enunciado: "1. Fase 1 (Aportación Directa): El costo del huerto es de $2,500 y se reparte proporcionalmente al número de alumnos: 3°A tiene 30, 3°B tiene 32 y 3°C tiene 38. a) Suma total de alumnos: ____ b) Costo por alumno (k): ____ c) ¿Cuánto coopera cada grupo?", respuesta: "a) 30+32+38 = 100 alumnos | b) k = $2,500/100 = $25 por alumno | c) 3°A paga $750, 3°B paga $800 y 3°C paga $950." },
            { enunciado: "2. Fase 2 (Ganancia Inversa al Descuido): La ganancia de $3,100 se reparte de forma inversamente proporcional a las plantas secas: 3°A (5 secas), 3°B (2 secas) y 3°C (3 secas). Suma los inversos 1/5 + 1/2 + 1/3 usando denominador común 30.", respuesta: "1/5 + 1/2 + 1/3 = 6/30 + 15/30 + 10/30 = 31/30." },
            { enunciado: "3. Calcula la constante inversa k = 3100 ÷ (31/30) y determina cuánto dinero de ganancia recibe cada grupo.", respuesta: "k = 3100 × 30 / 31 = 3000. Ganancias: 3°A = 3000/5 = $600; 3°B = 3000/2 = $1,500; 3°C = 3000/3 = $1,000." },
            { enunciado: "4. Balance Neto (Ganancia menos Costo): ¿Cuál grupo obtuvo el mayor beneficio neto gracias a cuidar mejor sus plantas?", respuesta: "3°B invirtió $800 y ganó $1,500 (beneficio neto de +$700), mientras que 3°C ganó +$50 y 3°A perdió -$150 por descuidar 5 plantas." }
          ],
          boletoSalida: "Reflexión Trimestral: ¿Cuál de todos los temas del 1er Trimestre (Álgebra, Ecuaciones Cuadráticas, Funciones o Reparto Proporcional) te pareció más útil para la vida real?"
        }
      }
    ]
  }
});
