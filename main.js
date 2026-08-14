const barraPesquisa = document.getElementById("barraPesquisa");
const produtos = document.querySelectorAll("#listaProdutos li");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

barraPesquisa.addEventListener("input", function () {

    const pesquisa = barraPesquisa.value.toLowerCase().trim();

    // Se não digitou nada, esconde a lista
    if (pesquisa === "") {
        listaProdutos.style.display = "none";
        mensagem.textContent = "";
        return;
    }

    let encontrou = false;

    produtos.forEach(function (produto) {

        const nomeProduto = produto.textContent.toLowerCase();

        if (nomeProduto.includes(pesquisa)) {
            produto.style.display = "block";
            encontrou = true;
        } else {
            produto.style.display = "none";
        }

    });

    // Mostra a lista somente quando existe pesquisa
    listaProdutos.style.display = "block";

    if (!encontrou) {
        mensagem.textContent = "Nenhum produto encontrado.";
    } else {
        mensagem.textContent = "";
    }
});