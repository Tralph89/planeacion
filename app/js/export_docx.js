// ============================================================================
// MOTOR DE EXPORTACIÓN A MICROSOFT WORD (.DOCX / .DOC EDITABLE) Y PDF
// Genera documentos con el formato institucional de la Nueva Escuela Mexicana
// ============================================================================

window.ExportEngine = {
  // Convierte todos los elementos <svg> dentro de un contenedor en imágenes PNG base64
  // para que Microsoft Word los muestre e imprima con nitidez total.
  async convertSVGsToImages(containerClone) {
    const svgs = containerClone.querySelectorAll("svg");
    for (const svg of svgs) {
      try {
        const serializer = new XMLSerializer();
        let svgStr = serializer.serializeToString(svg);
        if (!svgStr.includes("xmlns=")) {
          svgStr = svgStr.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        const viewBox = svg.getAttribute("viewBox") ? svg.getAttribute("viewBox").split(" ") : [0, 0, 480, 200];
        const w = parseInt(viewBox[2], 10) || 480;
        const h = parseInt(viewBox[3], 10) || 200;

        const imgData = await new Promise((resolve) => {
          const img = new Image();
          const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
          const url = URL.createObjectURL(svgBlob);
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = w * 2;
            canvas.height = h * 2;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL("image/png"));
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(null);
          };
          img.src = url;
        });

        if (imgData) {
          const imgEl = document.createElement("img");
          imgEl.src = imgData;
          imgEl.width = w;
          imgEl.height = h;
          imgEl.style.maxWidth = "100%";
          imgEl.style.height = "auto";
          imgEl.style.display = "block";
          imgEl.style.margin = "8px auto";
          svg.parentNode.replaceChild(imgEl, svg);
        }
      } catch (e) {
        console.warn("No se pudo rasterizar SVG para Word:", e);
      }
    }
  },

  // Exporta cualquier vista renderizada (Planeación o Hojas de Trabajo) a Word (.doc/.docx compatible)
  async exportToWord(elementId, filename) {
    const source = document.getElementById(elementId);
    if (!source) {
      alert("Primero selecciona un bloque para visualizar el documento.");
      return;
    }

    const clone = source.cloneNode(true);
    // Eliminar botones o controles de interfaz que no van en el documento impreso
    clone.querySelectorAll(".no-export, button").forEach(el => el.remove());

    // Convertir diagramas matemáticos SVG a imágenes PNG de alta resolución para Word
    await this.convertSVGsToImages(clone);

    const wordStyles = `
      <style>
        @page {
          size: 21.59cm 27.94cm;
          margin: 1.5cm 1.5cm 1.5cm 1.8cm;
        }
        body {
          font-family: Calibri, Arial, sans-serif;
          font-size: 10.5pt;
          color: #111827;
          line-height: 1.38;
        }
        .nem-header-banner {
          color: #8b1d41;
          font-weight: bold;
          font-size: 10pt;
          letter-spacing: 0.5px;
          border-bottom: 2px solid #8b1d41;
          padding-bottom: 3px;
          margin-bottom: 8px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 12px;
        }
        th, td {
          border: 1pt solid #4b5563;
          padding: 6px 8px;
          vertical-align: top;
          font-size: 10pt;
        }
        .nem-table-title {
          background-color: #f8d7c4;
          color: #111827;
          font-weight: bold;
          text-align: center;
          font-size: 11pt;
        }
        .nem-cell-label {
          background-color: #fae5d7;
          font-weight: bold;
          color: #111827;
        }
        .worksheet-card {
          border: 1.5pt solid #8b1d41;
          padding: 12px;
          margin-bottom: 18px;
          page-break-after: always;
        }
        .worksheet-theory-box {
          background-color: #fef3c7;
          border: 1pt solid #d97706;
          padding: 8px;
          margin: 8px 0;
        }
        .worksheet-work-area {
          border: 1pt dashed #94a3b8;
          padding: 16px;
          margin-top: 6px;
          margin-bottom: 10px;
          color: #64748b;
          font-size: 9pt;
        }
        .exit-ticket-box {
          background-color: #f8fafc;
          border: 1.5pt dashed #8b1d41;
          padding: 10px;
          margin-top: 12px;
        }
        .teacher-answer-box {
          background-color: #dcfce7;
          border: 1pt solid #15803d;
          color: #166534;
          padding: 6px 8px;
          margin-top: 4px;
          font-weight: bold;
        }
        .page-break {
          page-break-before: always;
        }
      </style>
    `;

    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>${filename}</title>
        ${wordStyles}
      </head>
      <body>
        ${clone.innerHTML}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", htmlContent], {
      type: "application/msword;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename.endsWith(".doc") ? filename : `${filename}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Impresión / Exportación directa a PDF en alta resolución
  exportToPDF() {
    window.print();
  }
};
