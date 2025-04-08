/* filepath: d:\projects\web_dev\NSEJS-website\src\js\scripts.js */

// Function to load and render a PDF
const loadPDF = async (pdfPath, containerId) => {
    try {
        const pdf = await pdfjsLib.getDocument(pdfPath).promise;
        const pdfContainer = document.getElementById(containerId);

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });

            // Create a canvas for each page
            const canvas = document.createElement('canvas');
            canvas.classList.add('pdf-page');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Append the canvas to the container
            pdfContainer.appendChild(canvas);

            // Render the page
            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            await page.render(renderContext).promise;
        }

        console.log('PDF rendered successfully!');
    } catch (error) {
        console.error('Error rendering PDF:', error);
    }
};