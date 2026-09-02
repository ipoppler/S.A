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
let nome = "";
let email = "";
let quantidades = {}

function addCarrinho(produto, botao){
    carrinho.push(produto);
    mostrarCarrinho();

    quantidades[produto] = (quantidades[produto] || 0) + 1;

    let contador = botao.nextElementSibling;

    if (!contador || !contador.classList.contains("contador")) {
        contador = document.createElement("span");
        contador.classList.add("contador");
        botao.insertAdjacentElement("afterend", contador);
    }

    contador.textContent = quantidades[produto];
}

const iconeCarrinho = document.querySelector("#iconeCarrinho");
const carrinhoConteudo = document.querySelector("#carrinhoConteudo");
const listaPedidos = document.querySelector("#listaPedidos");
const barraPesquisa = document.querySelector("#barraPesquisa");
const listaProdutos = document.querySelector("#listaProdutos");
const mensagem = document.querySelector("#mensagem");

barraPesquisa.addEventListener("input", function() {

    let pesquisa = barraPesquisa.value.trim().toLowerCase();
    let produtos = document.querySelectorAll("#listaProdutos li");
    let algumVisivel = false;

    if (pesquisa === "") {
        listaProdutos.style.display = "none";
        mensagem.textContent = "";
        return;
    }

    listaProdutos.style.display = "block";

    produtos.forEach(function(produto) {
        let texto = produto.textContent.toLowerCase();

        if (texto.includes(pesquisa)) {
            produto.style.display = "block";
            algumVisivel = true;
        } else {
            produto.style.display = "none";
        }
    });

    mensagem.textContent = algumVisivel ? "" : "Nenhum produto encontrado.";
});

document.addEventListener("click", function(e) {
    if (!e.target.closest(".search-wrapper") && !e.target.closest("#listaProdutos")) {
        listaProdutos.style.display = "none";
    }
});

function irProduto(id) {

    const produto = document.querySelector("#" + id);

    if (!produto) {
        return;
    }

    produto.scrollIntoView({ behavior: "smooth", block: "center" });

    produto.classList.add("produto-destaque");
    setTimeout(function() {
        produto.classList.remove("produto-destaque");
    }, 1400);

    listaProdutos.style.display = "none";
    barraPesquisa.value = "";
    mensagem.textContent = "";
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
    
    nome = document.querySelector("#nome").value
    email = document.querySelector("#email").value

    if (nome === "" || email === "") {
        alert("Login inexistente. Não foi possível realizar a compra.")
        return;
    }
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

        let produtosHTML = "";

        for (let j = 0; j < pedidos[i].length; j++) {

            let produto = pedidos[i][j];

            let imagem = "";

            let preco = 0;

            if (produto === "Capinha de Celular") {
                imagem = "/img/phone case.png";
                preco = 39.90;
            }

            else if (produto === "IPhone 17") {
                imagem = "/img/i17.png";
                preco = 5999.90;
            }

            else if (produto === "Fone de Ouvido") {
                imagem = "/img/person.headphones.png";
                preco = 149.90;
            }

            else if (produto === "Capinha para Computador") {
                imagem = "/img/laptopcase.png";
                preco = 89.90;
            }

            produtosHTML += `
                <div class="item-pedido">

                    <img src="${imagem}" alt="${produto}">

                    <div>
                        <h4>${produto}</h4>
                        <p>Quantidade: 1</p>
                        <strong>R$ ${preco.toFixed(2)}</strong>
                    </div>

                </div>
            `;
        }


        listaPedidos.innerHTML += `

            <div class="pedido">

                <div class="pedido-topo">

                    <div>
                        <h3>Pedido #${String(i + 1).padStart(3, "0")}</h3>

                        <p>
                            Pedido realizado com sucesso
                        </p>
                    </div>

                    <span class="status">
                        Pedido confirmado
                    </span>

                </div>


                <div class="pedido-produtos">

                    ${produtosHTML}

                </div>


                <div class="progresso-pedido">

                    <div class="etapa ativa">
                        <span>✓</span>
                        <p>Confirmado</p>
                    </div>

                    <div class="linha"></div>

                    <div class="etapa">
                        <span>2</span>
                        <p>Preparando</p>
                    </div>

                    <div class="linha"></div>

                    <div class="etapa">
                        <span>3</span>
                        <p>Enviado</p>
                    </div>

                    <div class="linha"></div>

                    <div class="etapa">
                        <span>4</span>
                        <p>Entregue</p>
                    </div>

                </div>


                <div class="pedido-final">

                    <div>
                        <p>Total do pedido</p>

                        <strong>
                            R$ ${totaisPedidos[i].toFixed(2)}
                        </strong>
                    </div>

                    <button type="button">
                        Ver detalhes
                    </button>

                </div>

            </div>

        `;
    }
}