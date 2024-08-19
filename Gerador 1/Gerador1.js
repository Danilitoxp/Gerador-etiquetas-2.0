document.addEventListener('DOMContentLoaded', () => {
    const fornecedoresSelect = document.getElementById('fornecedores');
    const previewEtiqueta = document.getElementById('previewEtiqueta');
    const imagemUpload = document.getElementById('imagemUpload');
    const uploadedImage = document.getElementById('uploadedImage');
    const descricaoInput = document.getElementById('descricao');
    const descricaoEtiqueta = document.getElementById('descricaoEtiqueta');
    const adicionarEtiquetaBtn = document.querySelector('.enviar');
    const baixarPDFBtn = document.getElementById('baixarPDF');
    let numEtiquetas = 0;

    const atualizarLogoFornecedor = () => {
        const selectedFornecedor = fornecedoresSelect.value;
        previewEtiqueta.src = `/assets/images/OPÇÕES 1/${selectedFornecedor}.png`;
    };

    const exibirImagemUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    };

    const atualizarDescricaoEtiqueta = () => {
        const descricaoTexto = descricaoInput.value.trim();
        descricaoEtiqueta.textContent = descricaoTexto || '';
        descricaoEtiqueta.style.display = descricaoTexto ? 'block' : 'none';
    };

    const adicionarEtiqueta = (event) => {
        event.preventDefault();

        if (numEtiquetas >= 10) {
            alert('Você atingiu o limite de 10 etiquetas.');
            return;
        }

        html2canvas(document.getElementById('previewEtiquetaContainer')).then(canvas => {
            const imagem = canvas.toDataURL('image/png');
            const etiquetaBox = document.getElementById(`etiqueta${numEtiquetas + 1}`);
            
            if (etiquetaBox) {
                etiquetaBox.innerHTML = `<img src="${imagem}" alt="Etiqueta" style="width: 100%; height: auto;" />`;
                numEtiquetas++;
            }
        });
    };

    const baixarPDF = () => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Dimensões da etiqueta em mm
        const etiquetaWidth = 97.03; // Largura da etiqueta
        const etiquetaHeight = 51.99; // Altura da etiqueta

        // Dimensões da página A4 em mm
        const pdfWidth = 210; // Largura da página A4
        const pdfHeight = 297; // Altura da página A4

        // Margens e espaçamento
        const margin = 0; // Margem ao redor da etiqueta
        const etiquetaSpacing = 5; // Espaçamento entre etiquetas

        // Número de etiquetas por linha e coluna
        const etiquetasPorLinha = 2;
        const etiquetasPorColuna = 5;

        // Calcular o espaço disponível para centralizar horizontalmente
        const totalWidth = etiquetasPorLinha * etiquetaWidth + (etiquetasPorLinha - 1) * etiquetaSpacing;
        const totalHeight = etiquetasPorColuna * etiquetaHeight + (etiquetasPorColuna - 1) * etiquetaSpacing;

        // Calcular o offset horizontal e vertical
        const xOffset = (pdfWidth - totalWidth) / 2;
        const yOffset = (pdfHeight - totalHeight) / 2 + margin; // Ajustar o offset vertical para reduzir o espaço inferior

        let x = xOffset;
        let y = yOffset;

        for (let i = 1; i <= numEtiquetas; i++) {
            const etiquetaBox = document.getElementById(`etiqueta${i}`);
            if (etiquetaBox && etiquetaBox.querySelector('img')) {
                const imgData = etiquetaBox.querySelector('img').src;

                // Adicionar etiqueta ao PDF
                pdf.addImage(imgData, 'PNG', x, y, etiquetaWidth, etiquetaHeight);

                // Atualizar posição para a próxima etiqueta
                if (i % etiquetasPorLinha === 0) {
                    x = xOffset;
                    y += etiquetaHeight + etiquetaSpacing;
                } else {
                    x += etiquetaWidth + etiquetaSpacing;
                }

                // Adicionar nova página se necessário
                if (i % (etiquetasPorLinha * etiquetasPorColuna) === 0 && i < numEtiquetas) {
                    pdf.addPage();
                    x = xOffset;
                    y = yOffset;
                }
            }
        }

        pdf.save('etiquetas.pdf');
    };

    fornecedoresSelect.addEventListener('change', atualizarLogoFornecedor);
    imagemUpload.addEventListener('change', exibirImagemUpload);
    descricaoInput.addEventListener('input', atualizarDescricaoEtiqueta);
    adicionarEtiquetaBtn.addEventListener('click', adicionarEtiqueta);
    baixarPDFBtn.addEventListener('click', baixarPDF);
});
