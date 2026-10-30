// ============================================================================
// MOTOR DE DIAGRAMAS MATEMÁTICOS Y GEOMÉTRICOS EN SVG (NEM - MATEMÁTICAS 3°)
// Genera figuras listas para impresión en Hojas de Trabajo y exportación Word
// ============================================================================

window.SVGDiagrams = {
  // 1. Plano Cartesiano con cuadrícula milimétrica para graficar funciones
  cartesianPlane(opts = {}) {
    const title = opts.title || "Plano Cartesiano";
    const xLabel = opts.xLabel || "Eje X (Variable Independiente)";
    const yLabel = opts.yLabel || "Eje Y (Variable Dependiente)";
    const xMax = opts.xMax || 10;
    const yMax = opts.yMax || 150;
    const yStep = opts.yStep || 25;
    const xStep = opts.xStep || 1;
    const width = 460;
    const height = 270;
    const padL = 55, padR = 25, padT = 30, padB = 42;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;

    let gridLines = "";
    const cols = Math.min(12, Math.round(xMax / xStep));
    const rows = Math.min(8, Math.round(yMax / yStep));

    for (let i = 0; i <= cols; i++) {
      const x = padL + (i / cols) * plotW;
      const val = i * xStep;
      gridLines += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${padT + plotH}" stroke="#cbd5e1" stroke-width="${i === 0 ? 2 : 1}" stroke-dasharray="${i === 0 ? '' : '3,3'}"/>`;
      gridLines += `<text x="${x}" y="${padT + plotH + 16}" font-size="10" text-anchor="middle" fill="#334155" font-family="Arial">${val}</text>`;
    }

    for (let j = 0; j <= rows; j++) {
      const y = padT + plotH - (j / rows) * plotH;
      const val = j * yStep;
      gridLines += `<line x1="${padL}" y1="${y}" x2="${padL + plotW}" y2="${y}" stroke="#cbd5e1" stroke-width="${j === 0 ? 2 : 1}" stroke-dasharray="${j === 0 ? '' : '3,3'}"/>`;
      gridLines += `<text x="${padL - 8}" y="${y + 4}" font-size="10" text-anchor="end" fill="#334155" font-family="Arial">${val}</text>`;
    }

    let extraCurve = "";
    if (opts.curveType === "parabola") {
      extraCurve = `<path d="M ${padL + 30} ${padT + plotH - 20} Q ${padL + plotW / 2} ${padT + 15} ${padL + plotW - 30} ${padT + plotH - 20}" fill="none" stroke="#8b1d41" stroke-width="2.5" stroke-dasharray="5,4"/>`;
    } else if (opts.curveType === "inversa") {
      extraCurve = `<path d="M ${padL + 35} ${padT + 20} Q ${padL + 95} ${padT + plotH - 35} ${padL + plotW - 20} ${padT + plotH - 12}" fill="none" stroke="#0f766e" stroke-width="2.5" stroke-dasharray="5,4"/>`;
    }

    return `
      <svg viewBox="0 0 ${width} ${height}" width="100%" style="max-width:460px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
        <text x="${width / 2}" y="18" font-size="12" font-weight="bold" text-anchor="middle" fill="#1e293b" font-family="Arial">${title}</text>
        ${gridLines}
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="#0f172a" stroke-width="2"/>
        <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="#0f172a" stroke-width="2"/>
        ${extraCurve}
        <text x="${padL + plotW / 2}" y="${height - 6}" font-size="11" font-weight="bold" text-anchor="middle" fill="#475569" font-family="Arial">${xLabel}</text>
        <text x="16" y="${padT + plotH / 2}" font-size="11" font-weight="bold" text-anchor="middle" fill="#475569" font-family="Arial" transform="rotate(-90, 16, ${padT + plotH / 2})">${yLabel}</text>
      </svg>`;
  },

  // 2. Figura compuesta en L y Fachada de Edificio en T invertida (Semana 1 - Sesión 5)
  compoundFiguresLT() {
    return `
      <svg viewBox="0 0 500 210" width="100%" style="max-width:500px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
        <!-- Figura 1: L de inicio -->
        <text x="115" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#8b1d41" font-family="Arial">Reto Inicial: Figura en "L"</text>
        <polygon points="40,35 100,35 100,115 175,115 175,175 40,175" fill="#fef3c7" stroke="#b45309" stroke-width="2.5"/>
        <text x="22" y="108" font-size="11" font-weight="bold" fill="#1e293b">10 m</text>
        <text x="70" y="29" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">4 m</text>
        <text x="114" y="78" font-size="11" font-weight="bold" fill="#1e293b">6 m</text>
        <text x="108" y="192" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">9 m</text>
        <text x="138" y="110" font-size="11" font-weight="bold" fill="#dc2626">? m</text>
        <text x="188" y="148" font-size="11" font-weight="bold" fill="#dc2626">? m</text>

        <line x1="235" y1="15" x2="235" y2="195" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,4"/>

        <!-- Figura 2: Fachada del Edificio (T invertida) -->
        <text x="368" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f766e" font-family="Arial">Fachada del Nuevo Edificio</text>
        <polygon points="270,175 460,175 460,100 405,100 405,50 325,50 325,100 270,100" fill="#e0f2fe" stroke="#0369a1" stroke-width="2.5"/>
        <line x1="325" y1="100" x2="405" y2="100" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="5,4"/>
        <text x="365" y="43" font-size="11" font-weight="bold" text-anchor="middle" fill="#0f172a">Ancho superior = 8 m</text>
        <text x="365" y="192" font-size="11" font-weight="bold" text-anchor="middle" fill="#0f172a">Base total = 20 m</text>
        <text x="476" y="142" font-size="11" font-weight="bold" text-anchor="middle" fill="#0f172a">10 m</text>
        <line x1="255" y1="50" x2="255" y2="175" stroke="#64748b" stroke-width="1.5"/>
        <line x1="250" y1="50" x2="260" y2="50" stroke="#64748b" stroke-width="1.5"/>
        <line x1="250" y1="175" x2="260" y2="175" stroke="#64748b" stroke-width="1.5"/>
        <text x="247" y="115" font-size="10" font-weight="bold" text-anchor="end" fill="#334155">15 m</text>
      </svg>`;
  },

  // 3. Figuras Geométricas con Dimensiones Algebraicas (Semanas 2-3)
  algebraicGeometry(opts = {}) {
    const mode = opts.mode || "rectangulos";
    if (mode === "prisma") {
      return `
        <svg viewBox="0 0 460 190" width="100%" style="max-width:460px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
          <text x="230" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#8b1d41" font-family="Arial">Modelado Algebraico de Volúmenes (Prismas y Contenedores)</text>
          <!-- Cubo arista a -->
          <polygon points="45,75 105,75 105,135 45,135" fill="#fce7f3" stroke="#9d174d" stroke-width="2"/>
          <polygon points="45,75 68,52 128,52 105,75" fill="#fbcfe8" stroke="#9d174d" stroke-width="2"/>
          <polygon points="105,75 128,52 128,112 105,135" fill="#f9a8d4" stroke="#9d174d" stroke-width="2"/>
          <text x="75" y="152" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Arista = a</text>
          <text x="75" y="170" font-size="10" text-anchor="middle" fill="#475569">V = a³</text>

          <!-- Prisma Rectangular -->
          <polygon points="180,80 280,80 280,140 180,140" fill="#e0e7ff" stroke="#3730a3" stroke-width="2"/>
          <polygon points="180,80 210,55 310,55 280,80" fill="#c7d2fe" stroke="#3730a3" stroke-width="2"/>
          <polygon points="280,80 310,55 310,115 280,140" fill="#a5b4fc" stroke="#3730a3" stroke-width="2"/>
          <text x="230" y="155" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Largo = 2w, Ancho = w</text>
          <text x="328" y="95" font-size="11" font-weight="bold" fill="#1e293b">h = 10</text>

          <!-- Contenedor Base Cuadrada -->
          <polygon points="365,65 420,65 420,145 365,145" fill="#dcfce7" stroke="#166534" stroke-width="2"/>
          <polygon points="365,65 385,45 440,45 420,65" fill="#bbf7d0" stroke="#166534" stroke-width="2"/>
          <polygon points="420,65 440,45 440,125 420,145" fill="#86efac" stroke="#166534" stroke-width="2"/>
          <text x="392" y="160" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Base: x por x</text>
          <text x="392" y="175" font-size="10" font-weight="bold" text-anchor="middle" fill="#166534">Altura: x + 5</text>
        </svg>`;
    }
    return `
      <svg viewBox="0 0 480 185" width="100%" style="max-width:480px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
        <text x="240" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#8b1d41" font-family="Arial">Expresiones Algebraicas de Perímetro y Área</text>
        <!-- Figura Compuesta Cuadrado + Rectángulo -->
        <rect x="25" y="55" width="55" height="55" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <rect x="80" y="55" width="110" height="55" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
        <text x="52" y="86" font-size="11" font-weight="bold" text-anchor="middle" fill="#78350f">A₁ = x²</text>
        <text x="135" y="86" font-size="11" font-weight="bold" text-anchor="middle" fill="#78350f">A₂ = 3x²</text>
        <text x="52" y="48" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">x</text>
        <text x="135" y="48" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">3x</text>
        <text x="15" y="86" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">x</text>
        <text x="108" y="132" font-size="10" font-weight="bold" text-anchor="middle" fill="#334155">Figura 1: Cuadrado + Rectángulo</text>

        <!-- Jardín con Caseta -->
        <rect x="255" y="45" width="185" height="90" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
        <rect x="390" y="45" width="50" height="45" fill="#fee2e2" stroke="#b91c1c" stroke-width="2"/>
        <text x="325" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#166534">Jardín (x + 5) por x</text>
        <text x="415" y="70" font-size="10" font-weight="bold" text-anchor="middle" fill="#991b1b">Caseta 2×2</text>
        <text x="348" y="152" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Largo = x + 5 | Ancho = x</text>
      </svg>`;
  },

  // 4. Diseño de Caja sin Tapa y Ecuaciones Cuadráticas (Semanas 4-6)
  openBoxQuadratic() {
    return `
      <svg viewBox="0 0 480 190" width="100%" style="max-width:480px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
        <text x="240" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#8b1d41" font-family="Arial">Modelado Cuadrático: Caja sin Tapa V = (30 - 2x)(20 - 2x)x</text>
        <!-- Lámina de cartón con recortes x -->
        <rect x="35" y="40" width="190" height="120" fill="#f1f5f9" stroke="#334155" stroke-width="2"/>
        <rect x="35" y="40" width="30" height="30" fill="#fecaca" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,2"/>
        <rect x="195" y="40" width="30" height="30" fill="#fecaca" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,2"/>
        <rect x="35" y="130" width="30" height="30" fill="#fecaca" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,2"/>
        <rect x="195" y="130" width="30" height="30" fill="#fecaca" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,2"/>
        <rect x="65" y="70" width="130" height="60" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="4,3"/>
        <text x="50" y="59" font-size="10" font-weight="bold" text-anchor="middle" fill="#991b1b">x</text>
        <text x="130" y="103" font-size="11" font-weight="bold" text-anchor="middle" fill="#0369a1">Base: (30 - 2x)(20 - 2x)</text>
        <text x="130" y="176" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Largo original = 30 cm</text>
        <text x="22" y="102" font-size="10" font-weight="bold" text-anchor="middle" fill="#1e293b" transform="rotate(-90, 22, 102)">Ancho = 20 cm</text>

        <!-- Flecha -->
        <text x="258" y="105" font-size="20" font-weight="bold" text-anchor="middle" fill="#8b1d41">➔</text>

        <!-- Caja 3D armada -->
        <polygon points="295,110 415,110 415,145 295,145" fill="#bae6fd" stroke="#0369a1" stroke-width="2"/>
        <polygon points="295,110 325,80 445,80 415,110" fill="#e0f2fe" stroke="#0369a1" stroke-width="2"/>
        <polygon points="415,110 445,80 445,115 415,145" fill="#7dd3fc" stroke="#0369a1" stroke-width="2"/>
        <text x="355" y="162" font-size="11" font-weight="bold" text-anchor="middle" fill="#0f172a">30 - 2x</text>
        <text x="458" y="102" font-size="11" font-weight="bold" fill="#dc2626">x</text>
        <text x="370" y="65" font-size="11" font-weight="bold" text-anchor="middle" fill="#0f766e">Meta: V = 1000 cm³</text>
      </svg>`;
  },

  // 5. Semejanza de Triángulos y Cálculo de Alturas Inaccesibles (Semanas 11-12)
  similarTriangles() {
    return `
      <svg viewBox="0 0 480 190" width="100%" style="max-width:480px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
        <text x="240" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#8b1d41" font-family="Arial">Semejanza de Triángulos (Teorema de Tales y Sombras)</text>
        <!-- Suelo -->
        <line x1="25" y1="160" x2="455" y2="160" stroke="#475569" stroke-width="2"/>
        <!-- Triángulo grande (Árbol / Faro de Guaymas) -->
        <polygon points="60,160 60,42 250,160" fill="#dcfce7" fill-opacity="0.55" stroke="#15803d" stroke-width="2.5"/>
        <text x="42" y="105" font-size="12" font-weight="bold" text-anchor="middle" fill="#166534">h = ?</text>
        <text x="155" y="176" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Sombra Mayor = 12 m</text>
        <text x="60" y="34" font-size="11" font-weight="bold" text-anchor="middle" fill="#15803d">Árbol / Faro</text>

        <!-- Triángulo pequeño (Alumno / Estaca) -->
        <polygon points="310,160 310,105 398,160" fill="#fef3c7" fill-opacity="0.7" stroke="#d97706" stroke-width="2.5"/>
        <text x="288" y="135" font-size="11" font-weight="bold" text-anchor="middle" fill="#b45309">1.65 m</text>
        <text x="355" y="176" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Sombra = 2.2 m</text>
        <text x="310" y="96" font-size="11" font-weight="bold" text-anchor="middle" fill="#b45309">Alumno</text>
      </svg>`;
  },

  // 6. Sólidos Geométricos, Desarrollos Planos y Arquímedes (Semanas 13-20 y 25-26)
  solids3D(opts = {}) {
    const mode = opts.mode || "cilindro_cono_esfera";
    return `
      <svg viewBox="0 0 490 190" width="100%" style="max-width:490px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
        <text x="245" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#8b1d41" font-family="Arial">Cuerpos Geométricos: Cilindro, Cono y Esfera (Relación 3 : 1 : 2)</text>
        <!-- Cilindro -->
        <ellipse cx="95" cy="55" rx="45" ry="14" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
        <path d="M50,55 L50,140 A45,14 0 0,0 140,140 L140,55" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
        <ellipse cx="95" cy="140" rx="45" ry="14" fill="none" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="4,3"/>
        <line x1="95" y1="55" x2="140" y2="55" stroke="#dc2626" stroke-width="2"/>
        <text x="118" y="50" font-size="10" font-weight="bold" fill="#dc2626">r</text>
        <text x="152" y="102" font-size="11" font-weight="bold" fill="#1e3a8a">h</text>
        <text x="95" y="174" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Cilindro: V = πr²h</text>

        <!-- Cono -->
        <polygon points="245,45 198,140 292,140" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
        <ellipse cx="245" cy="140" rx="47" ry="14" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
        <line x1="245" y1="45" x2="245" y2="140" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4,3"/>
        <line x1="245" y1="140" x2="292" y2="140" stroke="#dc2626" stroke-width="2"/>
        <text x="235" y="100" font-size="10" font-weight="bold" fill="#dc2626">h</text>
        <text x="268" y="136" font-size="10" font-weight="bold" fill="#dc2626">r</text>
        <text x="245" y="174" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Cono: V = (πr²h)/3</text>

        <!-- Esfera -->
        <circle cx="395" cy="98" r="48" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
        <ellipse cx="395" cy="98" rx="48" ry="15" fill="none" stroke="#15803d" stroke-width="1.5" stroke-dasharray="4,3"/>
        <line x1="395" y1="98" x2="443" y2="98" stroke="#dc2626" stroke-width="2"/>
        <text x="418" y="92" font-size="10" font-weight="bold" fill="#dc2626">r</text>
        <text x="395" y="174" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Esfera: V = (4/3)πr³</text>
      </svg>`;
  },

  // 7. Teorema de Pitágoras y Razones Trigonométricas (Semanas 21-24)
  pythagorasTrig(opts = {}) {
    const mode = opts.mode || "pitagoras";
    const labelA = mode === "trig" ? "Cateto Opuesto (a)" : "Cateto a = 3 m";
    const labelB = mode === "trig" ? "Cateto Adyacente (b)" : "Cateto b = 4 m";
    const labelC = mode === "trig" ? "Hipotenusa (c)" : "Hipotenusa c = √(a²+b²)";
    return `
      <svg viewBox="0 0 470 190" width="100%" style="max-width:470px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
        <text x="235" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#8b1d41" font-family="Arial">${mode === "trig" ? "Razones Trigonométricas: Sen θ, Cos θ y Tan θ" : "Teorema de Pitágoras: c² = a² + b²"}</text>
        <polygon points="85,150 85,45 275,150" fill="#e0f2fe" stroke="#0369a1" stroke-width="2.5"/>
        <rect x="85" y="134" width="16" height="16" fill="none" stroke="#0369a1" stroke-width="1.8"/>
        <path d="M 235,150 A 40,40 0 0,0 241,131" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="222" y="144" font-size="12" font-weight="bold" fill="#dc2626">θ</text>
        <text x="72" y="102" font-size="11" font-weight="bold" text-anchor="end" fill="#0f172a">${labelA}</text>
        <text x="180" y="170" font-size="11" font-weight="bold" text-anchor="middle" fill="#0f172a">${labelB}</text>
        <text x="195" y="88" font-size="11" font-weight="bold" fill="#8b1d41">${labelC}</text>

        <!-- Cuadro de Fórmulas -->
        <rect x="305" y="42" width="150" height="115" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="380" y="62" font-size="11" font-weight="bold" text-anchor="middle" fill="#8b1d41">Formulario Clave</text>
        <text x="318" y="84" font-size="11" fill="#1e293b">• c² = a² + b²</text>
        <text x="318" y="104" font-size="11" fill="#1e293b">• sen(θ) = C.O. / Hip</text>
        <text x="318" y="124" font-size="11" fill="#1e293b">• cos(θ) = C.A. / Hip</text>
        <text x="318" y="144" font-size="11" fill="#1e293b">• tan(θ) = C.O. / C.A.</text>
      </svg>`;
  },

  // 8. Estadística: Histograma y Polígono de Frecuencias (Semanas 27-32)
  statisticsChart() {
    return `
      <svg viewBox="0 0 470 195" width="100%" style="max-width:470px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
        <text x="235" y="18" font-size="12" font-weight="bold" text-anchor="middle" fill="#8b1d41" font-family="Arial">Histograma y Polígono de Frecuencia</text>
        <line x1="55" y1="30" x2="55" y2="160" stroke="#0f172a" stroke-width="2"/>
        <line x1="55" y1="160" x2="435" y2="160" stroke="#0f172a" stroke-width="2"/>
        <!-- Barras de histograma -->
        <rect x="75" y="115" width="55" height="45" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="130" y="75" width="55" height="85" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="185" y="45" width="55" height="115" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="240" y="85" width="55" height="75" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="295" y="125" width="55" height="35" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <!-- Polígono de frecuencia -->
        <polyline points="102,115 157,75 212,45 267,85 322,125" fill="none" stroke="#be123c" stroke-width="2.5"/>
        <circle cx="102" cy="115" r="4" fill="#be123c"/>
        <circle cx="157" cy="75" r="4" fill="#be123c"/>
        <circle cx="212" cy="45" r="4" fill="#be123c"/>
        <circle cx="267" cy="85" r="4" fill="#be123c"/>
        <circle cx="322" cy="125" r="4" fill="#be123c"/>
        <text x="102" y="176" font-size="10" text-anchor="middle" fill="#334155">10-20</text>
        <text x="157" y="176" font-size="10" text-anchor="middle" fill="#334155">20-30</text>
        <text x="212" y="176" font-size="10" text-anchor="middle" fill="#334155">30-40</text>
        <text x="267" y="176" font-size="10" text-anchor="middle" fill="#334155">40-50</text>
        <text x="322" y="176" font-size="10" text-anchor="middle" fill="#334155">50-60</text>
      </svg>`;
  },

  // 9. Probabilidad: Diagrama de Árbol y Eventos (Semanas 33-38)
  probabilityTree() {
    return `
      <svg viewBox="0 0 470 185" width="100%" style="max-width:470px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
        <text x="235" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#8b1d41" font-family="Arial">Diagrama de Árbol y Regla de la Suma / Producto</text>
        <circle cx="45" cy="95" r="16" fill="#8b1d41"/>
        <text x="45" y="99" font-size="10" font-weight="bold" text-anchor="middle" fill="#ffffff">Inicio</text>
        <!-- Ramas Nivel 1 -->
        <line x1="61" y1="88" x2="175" y2="55" stroke="#334155" stroke-width="2"/>
        <line x1="61" y1="102" x2="175" y2="135" stroke="#334155" stroke-width="2"/>
        <rect x="175" y="40" width="70" height="28" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
        <text x="210" y="58" font-size="11" font-weight="bold" text-anchor="middle" fill="#0369a1">Evento A</text>
        <rect x="175" y="120" width="70" height="28" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
        <text x="210" y="138" font-size="11" font-weight="bold" text-anchor="middle" fill="#b45309">Evento B</text>
        <!-- Ramas Nivel 2 -->
        <line x1="245" y1="54" x2="345" y2="35" stroke="#64748b" stroke-width="1.8"/>
        <line x1="245" y1="54" x2="345" y2="75" stroke="#64748b" stroke-width="1.8"/>
        <line x1="245" y1="134" x2="345" y2="115" stroke="#64748b" stroke-width="1.8"/>
        <line x1="245" y1="134" x2="345" y2="155" stroke="#64748b" stroke-width="1.8"/>
        <text x="355" y="39" font-size="11" font-weight="bold" fill="#1e293b">P(A ∩ C) = P(A)·P(C)</text>
        <text x="355" y="79" font-size="11" font-weight="bold" fill="#1e293b">P(A ∩ D) = ___</text>
        <text x="355" y="119" font-size="11" font-weight="bold" fill="#1e293b">P(B ∩ C) = ___</text>
        <text x="355" y="159" font-size="11" font-weight="bold" fill="#1e293b">P(B ∩ D) = ___</text>
      </svg>`;
  },

  // 10. Codiseño: Sectores Circulares y Productos Notables Geométricos
  circularSectors() {
    return `
      <svg viewBox="0 0 470 185" width="100%" style="max-width:470px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;">
        <text x="235" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#8b1d41" font-family="Arial">Representación Geométrica: Productos Notables y Sectores Circulares</text>
        <!-- Binomio al cuadrado (a+b)² -->
        <rect x="45" y="42" width="80" height="80" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
        <rect x="125" y="42" width="35" height="80" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <rect x="45" y="122" width="80" height="35" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <rect x="125" y="122" width="35" height="35" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
        <text x="85" y="86" font-size="12" font-weight="bold" text-anchor="middle" fill="#1e3a8a">a²</text>
        <text x="142" y="86" font-size="11" font-weight="bold" text-anchor="middle" fill="#92400e">ab</text>
        <text x="85" y="143" font-size="11" font-weight="bold" text-anchor="middle" fill="#92400e">ab</text>
        <text x="142" y="143" font-size="11" font-weight="bold" text-anchor="middle" fill="#166534">b²</text>
        <text x="102" y="174" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">(a + b)² = a² + 2ab + b²</text>

        <!-- Sector Circular -->
        <circle cx="345" cy="100" r="55" fill="#f8fafc" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4,3"/>
        <path d="M345,100 L400,100 A55,55 0 0,0 372.5,52.4 Z" fill="#fce7f3" stroke="#be123c" stroke-width="2.2"/>
        <text x="368" y="92" font-size="11" font-weight="bold" fill="#be123c">60°</text>
        <text x="372" y="114" font-size="11" font-weight="bold" fill="#0f172a">r</text>
        <text x="345" y="174" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e293b">Sector: A = (πr² · θ) / 360°</text>
      </svg>`;
  },

  renderByType(diagramType, opts = {}) {
    switch (diagramType) {
      case "cartesian": return this.cartesianPlane(opts);
      case "cartesian_parabola": return this.cartesianPlane({ ...opts, curveType: "parabola", title: opts.title || " Variación Cuadrática y Parábola" });
      case "cartesian_inversa": return this.cartesianPlane({ ...opts, curveType: "inversa", title: opts.title || "Variación Proporcional Inversa (y = k/x)" });
      case "compound_lt": return this.compoundFiguresLT();
      case "algebra_rect": return this.algebraicGeometry({ mode: "rectangulos" });
      case "algebra_prisma": return this.algebraicGeometry({ mode: "prisma" });
      case "open_box": return this.openBoxQuadratic();
      case "similar_triangles": return this.similarTriangles();
      case "solids_3d": return this.solids3D();
      case "pythagoras": return this.pythagorasTrig({ mode: "pitagoras" });
      case "trigonometry": return this.pythagorasTrig({ mode: "trig" });
      case "statistics": return this.statisticsChart();
      case "probability": return this.probabilityTree();
      case "codiseno_sectors": return this.circularSectors();
      default: return this.algebraicGeometry({ mode: "rectangulos" });
    }
  }
};
