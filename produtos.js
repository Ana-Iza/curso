// ============================================
// ARRAY DE PRODUTOS
// ============================================

// Criando um array com vários produtos
// Cada produto é um objeto com nome, preco e quantidade
let produtos = [
    { nome: "Camisa", preco: 50, quantidade: 10 },
    { nome: "Calça", preco: 80, quantidade: 5 },
    { nome: "Tênis", preco: 120, quantidade: 3 },
    { nome: "Boné", preco: 30, quantidade: 15 },
    { nome: "Jaqueta", preco: 150, quantidade: 2 }
];

console.log("=== PRODUTOS ORIGINAIS ===");
console.log(produtos);
console.log("\n");

// ============================================
// 1. CALCULAR O PREÇO TOTAL DO ESTOQUE
// ============================================

console.log("=== 1. CALCULANDO PREÇO TOTAL DO ESTOQUE ===");

// Usando FOR tradicional
let estoqueTotal = 0; // Variável para armazenar o valor total

// Loop FOR: percorre cada produto do array
// i começa em 0, vai até o tamanho do array (produtos.length)
// a cada iteração, i aumenta em 1 (i++)
for (let i = 0; i < produtos.length; i++) {
    // Calcula o valor total do produto (preço x quantidade)
    let valorProduto = produtos[i].preco * produtos[i].quantidade;
    
    // Adiciona o valor do produto ao total do estoque
    estoqueTotal = estoqueTotal + valorProduto;
    
    // Exibe informação de cada produto
    console.log(`${produtos[i].nome}: R$ ${produtos[i].preco} x ${produtos[i].quantidade} = R$ ${valorProduto}`);
}

console.log(`\nValor total do estoque: R$ ${estoqueTotal}`);
console.log("\n");

// ============================================
// 2. APLICAR 10% DE DESCONTO
// ============================================

console.log("=== 2. APLICANDO 10% DE DESCONTO ===");

// Criando um novo array para armazenar produtos com desconto
let produtosComDesconto = [];

// Usando WHILE para percorrer o array
let contador = 0; // Variável de controle do loop

// WHILE: continua executando enquanto a condição for verdadeira
while (contador < produtos.length) {
    // Pega o produto atual
    let produtoAtual = produtos[contador];
    
    // Calcula o preço com 10% de desconto
    // 10% de desconto = multiplicar por 0.9 (ou seja, pagar 90% do valor)
    let precoComDesconto = produtoAtual.preco * 0.9;
    
    // Cria um novo objeto com os dados do produto e o preço com desconto
    let produtoDesconto = {
        nome: produtoAtual.nome,
        precoOriginal: produtoAtual.preco,
        precoComDesconto: precoComDesconto,
        quantidade: produtoAtual.quantidade,
        economiaUnidade: produtoAtual.preco - precoComDesconto
    };
    
    // Adiciona o produto no novo array
    produtosComDesconto.push(produtoDesconto);
    
    // Exibe informação do desconto
    console.log(`${produtoDesconto.nome}: R$ ${produtoDesconto.precoOriginal} → R$ ${produtoDesconto.precoComDesconto.toFixed(2)} (economia: R$ ${produtoDesconto.economiaUnidade.toFixed(2)})`);
    
    // Incrementa o contador para passar para o próximo produto
    contador++;
}

console.log("\n");

// ============================================
// 3. FILTRAR PRODUTOS COM PREÇO ACIMA DE 50
// ============================================

console.log("=== 3. FILTRANDO PRODUTOS COM PREÇO ACIMA DE R$ 50 ===");

// Array para armazenar produtos filtrados
let produtosAcimaDe50 = [];

// Usando FOR...OF (forma mais moderna e simples)
// Para cada produto no array de produtos
for (let produto of produtos) {
    // IF: verifica se o preço é maior que 50
    if (produto.preco > 50) {
        // Se for maior que 50, adiciona no array de filtrados
        produtosAcimaDe50.push(produto);
        console.log(`✓ ${produto.nome} - R$ ${produto.preco} (incluído)`);
    } else {
        // Se não for maior que 50, apenas informa
        console.log(`✗ ${produto.nome} - R$ ${produto.preco} (excluído)`);
    }
}

console.log(`\nTotal de produtos acima de R$ 50: ${produtosAcimaDe50.length}`);
console.log(produtosAcimaDe50);
console.log("\n");

// ============================================
// 4. EXEMPLO ADICIONAL: USANDO FUNÇÃO
// ============================================

console.log("=== 4. EXEMPLO COM FUNÇÃO ===");

// Criando uma função para calcular o valor total de um produto
// Função recebe um produto como parâmetro e retorna o valor total
function calcularValorTotal(produto) {
    // Multiplica preço pela quantidade
    return produto.preco * produto.quantidade;
}

// Criando uma função para aplicar desconto
// Recebe o preço e a porcentagem de desconto
function aplicarDesconto(preco, porcentagemDesconto) {
    // Calcula o valor do desconto
    let valorDesconto = preco * (porcentagemDesconto / 100);
    // Retorna o preço com desconto
    return preco - valorDesconto;
}

// Testando as funções
console.log("Testando funções:");
let produtoTeste = produtos[0]; // Pega o primeiro produto (Camisa)
console.log(`Produto: ${produtoTeste.nome}`);
console.log(`Valor total em estoque: R$ ${calcularValorTotal(produtoTeste)}`);
console.log(`Preço com 15% de desconto: R$ ${aplicarDesconto(produtoTeste.preco, 15).toFixed(2)}`);
console.log("\n");

// ============================================
// 5. RESUMO FINAL
// ============================================

console.log("=== RESUMO FINAL ===");
console.log(`Total de produtos cadastrados: ${produtos.length}`);
console.log(`Valor total do estoque: R$ ${estoqueTotal}`);
console.log(`Valor do estoque com 10% de desconto: R$ ${(estoqueTotal * 0.9).toFixed(2)}`);
console.log(`Produtos com preço acima de R$ 50: ${produtosAcimaDe50.length}`);
