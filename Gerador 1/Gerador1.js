document.addEventListener('DOMContentLoaded', () => {
    const fornecedoresSelect = document.getElementById('fornecedores');
    const previewEtiqueta = document.getElementById('previewEtiqueta');
    const imagemUpload = document.getElementById('imagemUpload');
    const uploadedImage = document.getElementById('uploadedImage');
    const descricaoInput = document.getElementById('descricao');
    const descricaoEtiqueta = document.getElementById('descricaoEtiqueta');
    const fornecedorLogo = document.getElementById('fornecedorLogo');

    fornecedoresSelect.addEventListener('change', () => {
        const selectedFornecedor = fornecedoresSelect.value;
        previewEtiqueta.src = `/assets/images/OPÇÕES 1/${selectedFornecedor}.png`;

        // Atualiza a logo do fornecedor
        fornecedorLogo.src = `/assets/images/logos/${selectedFornecedor}.png`; // Caminho para a logo do fornecedor
        fornecedorLogo.style.display = 'block'; // Exibe a logo do fornecedor
    });

    imagemUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = 'block'; // Mostra a imagem após o upload
            };
            reader.readAsDataURL(file);
        }
    });

    descricaoInput.addEventListener('input', () => {
        const descricaoTexto = descricaoInput.value.trim();
        if (descricaoTexto) {
            descricaoEtiqueta.textContent = descricaoTexto;
            descricaoEtiqueta.style.display = 'block'; // Exibe a descrição na etiqueta
        } else {
            descricaoEtiqueta.style.display = 'none'; // Oculta a descrição se o campo estiver vazio
        }
    });
});
