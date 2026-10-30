// ============================================================================
// MOTOR DE EXPORTACIÓN A MICROSOFT WORD (.DOCX / .DOC EDITABLE) Y PDF DIRECTO
// Genera documentos con el formato institucional de la Nueva Escuela Mexicana
// ============================================================================

window.ExportEngine = {
  // Convierte todos los elementos <svg> dentro de un contenedor en imágenes PNG base64
  // para que Microsoft Word y el generador PDF los muestren con nitidez total.
  async convertSVGsToImages(containerClone, isCompact = false) {
    const svgs = containerClone.querySelectorAll("svg");
    const scaleFactor = isCompact ? 0.82 : 1;
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
          imgEl.width = Math.round(w * scaleFactor);
          imgEl.height = Math.round(h * scaleFactor);
          imgEl.style.maxWidth = "100%";
          imgEl.style.height = "auto";
          imgEl.style.display = "block";
          imgEl.style.margin = isCompact ? "4px auto" : "8px auto";
          svg.parentNode.replaceChild(imgEl, svg);
        }
      } catch (e) {
        console.warn("No se pudo rasterizar SVG:", e);
      }
    }
  },

  // Exporta cualquier vista renderizada (Planeación o Hojas de Trabajo) a Word (.doc/.docx compatible)
  async exportToWord(elementId, filename) {
    const source = document.getElementById(elementId);
    if (!source) {
      if (window.AppController && window.AppController.showToast) {
        window.AppController.showToast("Primero selecciona un bloque para visualizar el documento.", "warning");
      }
      return;
    }

    const isCompact = !!(window.AppController && window.AppController.state && window.AppController.state.compactPrintMode);
    const clone = source.cloneNode(true);
    clone.querySelectorAll(".no-export, button, select").forEach((el) => el.remove());

    await this.convertSVGsToImages(clone, isCompact);

    const wordStyles = `
      <style>
        @page {
          size: 21.59cm 27.94cm;
          margin: ${isCompact ? "1.0cm 1.2cm" : "1.5cm 1.5cm 1.5cm 1.8cm"};
        }
        body {
          font-family: Calibri, Arial, sans-serif;
          font-size: ${isCompact ? "9.5pt" : "10.5pt"};
          color: #0f172a;
          line-height: ${isCompact ? "1.25" : "1.38"};
        }
        .nem-header-banner {
          color: #8b1d41;
          font-weight: bold;
          font-size: 9.5pt;
          letter-spacing: 0.5px;
          border-bottom: 1.5pt solid #8b1d41;
          padding-bottom: 3px;
          margin-bottom: 6px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: ${isCompact ? "8px" : "12px"};
        }
        th, td {
          border: 1pt solid #475569;
          padding: ${isCompact ? "4px 6px" : "6px 8px"};
          vertical-align: top;
          font-size: ${isCompact ? "9.5pt" : "10pt"};
        }
        .nem-table-title {
          background-color: #f8d7c4;
          color: #0f172a;
          font-weight: bold;
          text-align: center;
          font-size: 10.5pt;
        }
        .nem-cell-label {
          background-color: #fae5d7;
          font-weight: bold;
          color: #0f172a;
        }
        .worksheet-card {
          border: 1pt solid #8b1d41;
          padding: ${isCompact ? "8px 10px" : "12px"};
          margin-bottom: ${isCompact ? "10px" : "18px"};
          page-break-after: always;
        }
        .worksheet-theory-box {
          background-color: #fffbeb;
          border: 1pt solid #d97706;
          padding: ${isCompact ? "5px 8px" : "8px"};
          margin: ${isCompact ? "5px 0" : "8px 0"};
        }
        .worksheet-work-area {
          border: 1pt dashed #94a3b8;
          padding: ${isCompact ? "10px" : "16px"};
          margin-top: 4px;
          margin-bottom: ${isCompact ? "6px" : "10px"};
          color: #64748b;
          font-size: 8.5pt;
        }
        .exit-ticket-box {
          background-color: #f8fafc;
          border: 1pt dashed #8b1d41;
          padding: ${isCompact ? "6px 8px" : "10px"};
          margin-top: ${isCompact ? "8px" : "12px"};
        }
        .teacher-answer-box {
          background-color: #dcfce7;
          border: 1pt solid #15803d;
          color: #166534;
          padding: 5px 8px;
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

    if (window.AppController && window.AppController.showToast) {
      window.AppController.showToast(`Documento Word descargado: ${filename}.doc`, "success");
    }
  },

  // Busca una fila horizontal limpia (blanca) cerca del corte de página para no partir renglones de texto
  findSafeSliceY(ctx, width, targetY, minSliceY) {
    const searchRange = Math.min(140, Math.floor((targetY - minSliceY) * 0.25));
    if (searchRange <= 4) return targetY;

    try {
      const imgData = ctx.getImageData(0, targetY - searchRange, width, searchRange);
      const data = imgData.data;
      // Escaneamos de abajo hacia arriba buscando una línea donde casi todos los píxeles sean claros
      for (let row = searchRange - 1; row >= 0; row--) {
        let nonWhiteCount = 0;
        const rowOffset = row * width * 4;
        // Muestreamos cada 4 píxeles a lo ancho ignorando bordes laterales
        for (let x = 24; x < width - 24; x += 4) {
          const idx = rowOffset + x * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          // Si no es blanco ni el color de borde vertical de tabla (#475569)
          if (r < 240 || g < 240 || b < 240) {
            nonWhiteCount++;
          }
        }
        if (nonWhiteCount <= 3) {
          return targetY - searchRange + row;
        }
      }
    } catch (e) {}
    return targetY;
  },

  isGeneratingPDF: false,

  setPDFButtonsStatus(isBusy, labelText = "") {
    const btns = document.querySelectorAll(".js-pdf-export-btn");
    btns.forEach((btn) => {
      if (isBusy) {
        if (!btn.dataset.originalLabel) {
          btn.dataset.originalLabel = btn.textContent.trim();
        }
        btn.disabled = true;
        btn.style.opacity = "0.75";
        btn.style.cursor = "wait";
        btn.textContent = labelText || "Generando PDF...";
      } else {
        btn.disabled = false;
        btn.style.opacity = "";
        btn.style.cursor = "";
        if (btn.dataset.originalLabel) {
          btn.textContent = btn.dataset.originalLabel;
        }
      }
    });
  },

  // Genera y descarga un archivo .PDF real de alta resolución (compatible con iframes)
  async exportToPDF(elementId = "printableDocumentArea", filename = "Planeacion_Matematicas3_NEM") {
    if (this.isGeneratingPDF) return;

    const source = document.getElementById(elementId);
    if (!source) {
      if (window.AppController && window.AppController.showToast) {
        window.AppController.showToast("Selecciona un Plan de Clase u Hoja de Actividad para exportar a PDF.", "warning");
      }
      return;
    }

    if (!window.html2canvas || !window.jspdf || !window.jspdf.jsPDF) {
      window.print();
      return;
    }

    this.isGeneratingPDF = true;
    this.setPDFButtonsStatus(true, "Preparando PDF...");

    const finalFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    if (window.AppController && window.AppController.showToast) {
      window.AppController.showToast("Generando archivo PDF de alta resolución...", "warning");
    }

    const isCompact = !!(window.AppController && window.AppController.state && window.AppController.state.compactPrintMode);

    // Crear contenedor temporal fuera de pantalla con ancho fijo tamaño Carta para captura nítida
    const staging = document.createElement("div");
    staging.style.position = "fixed";
    staging.style.left = "-10000px";
    staging.style.top = "0";
    staging.style.width = "880px";
    staging.style.background = "#ffffff";
    staging.style.padding = "12px";
    staging.style.zIndex = "-1";
    if (isCompact) {
      staging.classList.add("compact-worksheet");
    }

    const clone = source.cloneNode(true);
    clone.querySelectorAll(".no-export, button, select").forEach((el) => el.remove());
    clone.querySelectorAll('[contenteditable="true"]').forEach((el) => {
      el.removeAttribute("contenteditable");
      el.classList.remove("editing-active");
    });

    staging.appendChild(clone);
    document.body.appendChild(staging);

    try {
      await this.convertSVGsToImages(staging, isCompact);

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter"
      });

      const pageW = pdf.internal.pageSize.getWidth(); // 215.9 mm
      const pageH = pdf.internal.pageSize.getHeight(); // 279.4 mm
      const margin = 10;
      const usableW = pageW - margin * 2; // 195.9 mm
      const usableH = pageH - margin * 2; // 259.4 mm

      const worksheetCards = staging.querySelectorAll(".worksheet-card");

      if (worksheetCards.length > 0) {
        // Caso 1: Hojas de Actividad -> cada .worksheet-card ocupa exactamente 1 página Carta
        const total = worksheetCards.length;
        for (let i = 0; i < total; i++) {
          this.setPDFButtonsStatus(true, `Generando PDF (${i + 1}/${total})...`);
          const card = worksheetCards[i];
          card.style.margin = "0";
          card.style.boxShadow = "none";

          const canvas = await window.html2canvas(card, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false
          });

          if (i > 0) {
            pdf.addPage("letter", "portrait");
          }

          const imgData = canvas.toDataURL("image/jpeg", 0.95);
          let renderW = usableW;
          let renderH = (canvas.height * renderW) / canvas.width;

          if (renderH > usableH) {
            renderH = usableH;
            renderW = (canvas.width * renderH) / canvas.height;
          }

          const offsetX = margin + (usableW - renderW) / 2;
          pdf.addImage(imgData, "JPEG", offsetX, margin, renderW, renderH);
        }
      } else {
        // Caso 2: Plan de Clase o Programa Analítico -> paginación inteligente sin cortar renglones
        this.setPDFButtonsStatus(true, "Renderizando páginas...");
        const sheet = staging.querySelector(".nem-document-sheet") || staging;
        sheet.style.boxShadow = "none";
        sheet.style.margin = "0";
        sheet.style.maxWidth = "100%";

        const fullCanvas = await window.html2canvas(sheet, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false
        });

        const fullCtx = fullCanvas.getContext("2d");
        const pxPerMm = fullCanvas.width / usableW;
        const maxSliceHeightPx = Math.floor(usableH * pxPerMm);

        let currentY = 0;
        let pageIndex = 0;

        while (currentY < fullCanvas.height - 4) {
          if (pageIndex > 0) {
            pdf.addPage("letter", "portrait");
          }

          let nextY = currentY + maxSliceHeightPx;
          if (nextY >= fullCanvas.height) {
            nextY = fullCanvas.height;
          } else {
            nextY = this.findSafeSliceY(fullCtx, fullCanvas.width, nextY, currentY + 100);
          }

          const sliceH = nextY - currentY;
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = fullCanvas.width;
          pageCanvas.height = sliceH;
          const pageCtx = pageCanvas.getContext("2d");
          pageCtx.fillStyle = "#ffffff";
          pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          pageCtx.drawImage(
            fullCanvas,
            0,
            currentY,
            fullCanvas.width,
            sliceH,
            0,
            0,
            fullCanvas.width,
            sliceH
          );

          const sliceImg = pageCanvas.toDataURL("image/jpeg", 0.95);
          const sliceMmH = sliceH / pxPerMm;
          pdf.addImage(sliceImg, "JPEG", margin, margin, usableW, sliceMmH);

          currentY = nextY;
          pageIndex++;
        }
      }

      pdf.save(finalFilename);

      if (window.AppController && window.AppController.showToast) {
        window.AppController.showToast(`Archivo PDF descargado: ${finalFilename}`, "success");
      }
    } catch (err) {
      console.error("Error al generar PDF:", err);
      if (window.AppController && window.AppController.showToast) {
        window.AppController.showToast("Error al generar el PDF. Abriendo vista de impresión alternativa...", "error");
      }
      window.print();
    } finally {
      this.isGeneratingPDF = false;
      this.setPDFButtonsStatus(false);
      if (staging.parentNode) {
        staging.parentNode.removeChild(staging);
      }
    }
  }
};
