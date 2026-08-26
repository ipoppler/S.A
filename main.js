let slideAtual = 0;
const slides = document.querySelectorAll(".slide");
const proximo = document.querySelector(".prox");
const anterior = document.querySelector(".ant");

function mostrarSlide(indice) {
    slides.forEach((slide) => {
        slide.style.display = "none";
    });

    slides[indice].style.display = "block";
}

function proximoSlide() {
    slideAtual++;

    if (slideAtual >= slides.length) {
        slideAtual = 0;
    }

    mostrarSlide(slideAtual);
}

function anteriorSlide() {
    slideAtual--;

    if (slideAtual < 0) {
        slideAtual = slides.length - 1;
    }

    mostrarSlide(slideAtual);
}

proximo.addEventListener("click", proximoSlide);
anterior.addEventListener("click", anteriorSlide);


mostrarSlide(slideAtual);

setInterval(proximoSlide, 5000);

const itensCarrinho = document.querySelector("#itensCarrinho");
const totalCarrinho = document.querySelector("#total");
let carrinho = [];
let pedidos = [];
let totalCompra = 0;
let totaisPedidos = [];

function addCarrinho(produto){
    carrinho.push(produto);
    mostrarCarrinho();
    console.log(carrinho);
}

const iconeCarrinho = document.querySelector("#iconeCarrinho");
const carrinhoConteudo = document.querySelector("#carrinhoConteudo");
const listaPedidos = document.querySelector("#listaPedidos");
const barraPesquisa = document.querySelector("#barraPesquisa");
const listaProdutos = document.querySelector("#listaProdutos");
const mensagem = document.querySelector("#mensagem");

barraPesquisa.addEventListener("input", function() {

    let pesquisa = barraPesquisa.value;
    let produtos = document.querySelectorAll("#listaProdutos li");

    listaProdutos.style.display = "block";

    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].textContent == pesquisa) {
            produtos[i].style.display = "block";
        }

        else {
            produtos[i].style.display = "none";
        }

    }

});

function irProduto(id) {

    document.querySelector("#" + id).scrollIntoView();

}

iconeCarrinho.addEventListener("click", function() {

    if (carrinhoConteudo.style.display === "none") {
        carrinhoConteudo.style.display = "block";
    } else {
        carrinhoConteudo.style.display = "none";
    }

});

function mostrarCarrinho() {

    itensCarrinho.innerHTML = "";

    let total = 0;

    for (let i = 0; i < carrinho.length; i++) {

        let preco = 0;

        if (carrinho[i] === "Capinha de Celular") {
            preco = 39.90;
        }

        else if (carrinho[i] === "IPhone 17") {
            preco = 5999.90;
        }

        else if (carrinho[i] === "Fone de Ouvido") {
            preco = 149.90;
        }

        else if (carrinho[i] === "Capinha para Computador") {
            preco = 89.90;
        }

        total = total + preco;

        itensCarrinho.innerHTML += 
            carrinho[i] + 
            " - R$ " + 
            preco + 
            " <button onclick='removerProduto(" + i + ")'>Remover</button><br>";

    }


    let desconto = 0;

    if (total > 500) {
        desconto = total * 10 / 100;
        total = total - desconto;
    }

    totalCompra = total;

    totalCarrinho.innerHTML =
        "Desconto: R$ " + desconto.toFixed(2) +
        "<br>Total: R$ " + total.toFixed(2);


}

function removerProduto(indice) {
    carrinho.splice(indice, 1);
    mostrarCarrinho();
}

function comprar() {

    console.log("A função comprar foi chamada!");
    

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
    } else {
        pedidos.push(carrinho);
        totaisPedidos.push(totalCompra);

        mostrarPedidos();

        carrinho = [];

        mostrarCarrinho();
        alert("Compra realizada com sucesso!");
    }
}

function mostrarPedidos() {

    listaPedidos.innerHTML = "";

    for (let i = 0; i < pedidos.length; i++) {

        listaPedidos.innerHTML += 
            "<p>Pedido " + (i + 1) + "</p>";

        listaPedidos.innerHTML += 
            pedidos[i] + "<br>";

        listaPedidos.innerHTML += 
            "Total: R$ " + totaisPedidos[i].toFixed(2) + "<br>";

    }

}