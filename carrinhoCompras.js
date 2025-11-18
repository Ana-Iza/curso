// ============================================
// SISTEMA DE CARRINHO DE COMPRAS - JAVASCRIPT PARA NAVEGADOR
// ============================================

// ============================================
// ARRAY DE PRODUTOS DISPONÍVEIS
// ============================================
// Aqui criamos um array de objetos com os produtos da loja
// Cada produto tem: id (identificador único), nome, preço e estoque
const produtosDisponiveis = [
    { id: 1, nome: "Notebook", preco: 2500.00, estoque: 10 },
    { id: 2, nome: "Mouse", preco: 50.00, estoque: 50 },
    { id: 3, nome: "Teclado", preco: 150.00, estoque: 30 },
    { id: 4, nome: "Monitor", preco: 800.00, estoque: 15 },
    { id: 5, nome: "Webcam", preco: 200.00, estoque: 25 },
    { id: 6, nome: "Headset", preco: 120.00, estoque: 40 }
];

// ============================================
// FUNÇÕES LOCALSTORAGE
// ============================================
const salvarCarrinhoNoLocalStorage = (carrinho) => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
};

const carregarCarrinhoDoLocalStorage = () => {
    const carrinhoString = localStorage.getItem("carrinho");
    if (carrinhoString === null || carrinhoString === "") {
        return [];
    }
    return JSON.parse(carrinhoString);
};

const limparCarrinhoDoLocalStorage = () => {
    localStorage.removeItem("carrinho");
};

// ============================================
// FUNÇÕES DO CARRINHO
// ============================================
const adicionarProduto = (carrinho, idProduto, quantidade) => {
    try {
        if (quantidade <= 0) {
            alert("Quantidade deve ser maior que zero!");
            return carrinho;
        }

        const produto = produtosDisponiveis.find(p => p.id === idProduto);

        if (!produto) {
            alert("Produto não encontrado!");
            return carrinho;
        }

        if (quantidade > produto.estoque) {
            alert(`Estoque insuficiente! Disponível: ${produto.estoque}`);
            return carrinho;
        }

        const itemExistente = carrinho.find(item => item.id === idProduto);

        if (itemExistente) {
            const novaQuantidade = itemExistente.quantidade + quantidade;

            if (novaQuantidade > produto.estoque) {
                alert(`Estoque insuficiente! Você já tem ${itemExistente.quantidade} no carrinho. Disponível: ${produto.estoque}`);
                return carrinho;
            }

            itemExistente.quantidade += quantidade;
        } else {
            const novoItem = {
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                quantidade: quantidade
            };
            carrinho.push(novoItem);
        }

        salvarCarrinhoNoLocalStorage(carrinho);
        return carrinho;

    } catch (error) {
        alert("Erro ao adicionar produto: " + error.message);
        return carrinho;
    }
};

const removerProduto = (carrinho, idProduto, quantidade) => {
    try {
        if (quantidade <= 0) {
            alert("Quantidade deve ser maior que zero!");
            return carrinho;
        }

        const item = carrinho.find(item => item.id === idProduto);

        if (!item) {
            alert("Produto não está no carrinho!");
            return carrinho;
        }

        if (quantidade >= item.quantidade) {
            const novoCarrinho = carrinho.filter(item => item.id !== idProduto);
            salvarCarrinhoNoLocalStorage(novoCarrinho);
            return novoCarrinho;
        } else {
            item.quantidade -= quantidade;
            salvarCarrinhoNoLocalStorage(carrinho);
            return carrinho;
        }

    } catch (error) {
        alert("Erro ao remover produto: " + error.message);
        return carrinho;
    }
};

const calcularTotal = (carrinho) => {
    return carrinho.reduce((acumulador, item) => {
        return acumulador + (item.preco * item.quantidade);
    }, 0);
};

// ============================================
// FUNÇÕES DE INTERFACE
// ============================================
const renderizarProdutos = () => {
    const listaProdutos = document.getElementById("lista-produtos");
    listaProdutos.innerHTML = "";

    produtosDisponiveis.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.className = "produto-item";
        produtoDiv.innerHTML = `
            <h3>${produto.nome}</h3>
            <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
            <p><strong>Estoque:</strong> ${produto.estoque} unidades</p>
            <input type="number" id="qtd-${produto.id}" value="1" min="1" max="${produto.estoque}">
            <button onclick="adicionarAoCarrinho(${produto.id})">➕ Adicionar</button>
        `;
        listaProdutos.appendChild(produtoDiv);
    });
};

const renderizarCarrinho = () => {
    const carrinho = carregarCarrinhoDoLocalStorage();
    const itensCarrinho = document.getElementById("itens-carrinho");
    const totalCarrinho = document.getElementById("total-carrinho");

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = '<div class="carrinho-vazio">📦 Carrinho vazio</div>';
        totalCarrinho.innerHTML = "";
        return;
    }

    itensCarrinho.innerHTML = "";

    carrinho.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "carrinho-item";
        const subtotal = item.preco * item.quantidade;
        itemDiv.innerHTML = `
            <h4>${item.nome}</h4>
            <p>Preço unitário: R$ ${item.preco.toFixed(2)}</p>
            <p>Quantidade: ${item.quantidade}</p>
            <p><strong>Subtotal: R$ ${subtotal.toFixed(2)}</strong></p>
            <button onclick="removerDoCarrinho(${item.id}, 1)">➖ Remover 1</button>
            <button onclick="removerDoCarrinho(${item.id}, ${item.quantidade})">🗑️ Remover Tudo</button>
        `;
        itensCarrinho.appendChild(itemDiv);
    });

    const total = calcularTotal(carrinho);
    totalCarrinho.innerHTML = `<div class="total">💰 TOTAL: R$ ${total.toFixed(2)}</div>`;
};

// ============================================
// FUNÇÕES CHAMADAS PELOS BOTÕES
// ============================================
const adicionarAoCarrinho = (idProduto) => {
    const inputQtd = document.getElementById(`qtd-${idProduto}`);
    const quantidade = parseInt(inputQtd.value);

    let carrinho = carregarCarrinhoDoLocalStorage();
    carrinho = adicionarProduto(carrinho, idProduto, quantidade);
    renderizarCarrinho();
};

const removerDoCarrinho = (idProduto, quantidade) => {
    let carrinho = carregarCarrinhoDoLocalStorage();
    carrinho = removerProduto(carrinho, idProduto, quantidade);
    renderizarCarrinho();
};

const limparTodoCarrinho = () => {
    if (confirm("Tem certeza que deseja limpar todo o carrinho?")) {
        limparCarrinhoDoLocalStorage();
        renderizarCarrinho();
    }
};

// ============================================
// INICIALIZAR A PÁGINA
// ============================================
renderizarProdutos();
renderizarCarrinho();