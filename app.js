(async function () {
    // Gunakan worker dari CDN
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
  
    const url = "Autocad.pdf"; // Jalur file PDF Anda harus sesuai lokasi
  
    try {
      const pdfDoc = await pdfjsLib.getDocument(url).promise;
      let currentPage = 1;
      const totalPages = pdfDoc.numPages;
  
      // Render halaman pertama saat pemuatan awal
      await renderPage(pdfDoc, currentPage);
  
      // Perbarui tampilan halaman aktif
      document.getElementById("pageNumber").textContent = `Halaman ${currentPage} dari ${totalPages}`;
  
      // Tombol sebelumnya
      document.getElementById("previous").addEventListener("click", async () => {
        if (currentPage > 1) {
          currentPage--;
          await renderPage(pdfDoc, currentPage);
          document.getElementById("pageNumber").textContent = `Halaman ${currentPage} dari ${totalPages}`;
        }
      });
  
      // Tombol berikutnya
      document.getElementById("next").addEventListener("click", async () => {
        if (currentPage < totalPages) {
          currentPage++;
          await renderPage(pdfDoc, currentPage);
          document.getElementById("pageNumber").textContent = `Halaman ${currentPage} dari ${totalPages}`;
        }
      });
    } catch (error) {
      console.error("Gagal memuat PDF:", error);
    }
  })();
  
  async function renderPage(pdfDoc, pageNumber) {
    try {
      const page = await pdfDoc.getPage(pageNumber);
  
      const viewport = page.getViewport({ scale: 1.5 }); // Sesuaikan skala untuk membuat halaman terlihat
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
  
      // Atur ukuran canvas agar cocok dengan ukuran halaman PDF
      canvas.width = viewport.width;
      canvas.height = viewport.height;
  
      // Render halaman ke canvas
      await page.render({
        canvasContext: context,
        viewport,
      }).promise;
    } catch (error) {
      console.error("Gagal merender halaman PDF:", error);
    }
  }
  