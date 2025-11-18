// ============================================
// SISTEMA DE CARRINHO DE COMPRAS COMPLETO
// ============================================
// Tudo em um único arquivo JavaScript!
// Funciona no Node.js com interface de console

// ============================================
// PARTE 1: SIMULAÇÃO DO LOCALSTORAGE (para Node.js)
// ============================================
// Como o Node.js não tem localStorage, vamos simular com um objeto
let localStorageSimulado = {};

// Função para simular localStorage.setItem
const setItem = (chave, valor) => {
    localStorageSimulado[chave] = valor;
    console.log(`💾 Dados salvos na chave "${chave}"`);
};

// Função para simular localStorage.getItem
const getItem = (chave) => {
    return localStorageSimulado[chave] || null;
};

// Função para simular localStorage.removeItem
const removeItem = (chave) => {
    delete localStorageSimulado[chave];
    console.log(`🗑️ Dados removidos da chave "${chave}"`);
};

// ============================================
// PARTE 2: ARRAY DE PRODUTOS DISPONÍVEIS
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
// PARTE 3: FUNÇÕES PARA LOCALSTORAGE
// ============================================

// FUNÇÃO: Salvar carrinho no localStorage
// O localStorage só aceita STRING, então usamos JSON.stringify para converter
const salvarCarrinhoNoLocalStorage = (carrinho) => {
    // JSON.stringify converte o array de objetos em uma string JSON
    const carrinhoString = JSON.stringify(carrinho);

    // localStorage.setItem salva a string no navegador
    // Parâmetro 1: nome da chave ("carrinho")
    // Parâmetro 2: valor (string JSON)
    setItem("carrinho", carrinhoString);

    console.log("✅ Carrinho salvo no localStorage!");
};

// FUNÇÃO: Carregar carrinho do localStorage
// Recupera o carrinho salvo e converte de volta para array
const carregarCarrinhoDoLocalStorage = () => {
    // localStorage.getItem busca o valor pela chave
    const carrinhoString = getItem("carrinho");

    // Se não existir nada salvo, retorna um array vazio
    if (carrinhoString === null || carrinhoString === "") {
        console.log("📦 Carrinho vazio - criando novo carrinho");
        return [];
    }

    // JSON.parse converte a string JSON de volta para array
    const carrinho = JSON.parse(carrinhoString);
    console.log("✅ Carrinho carregado do localStorage!");
    return carrinho;
};

// FUNÇÃO: Limpar carrinho do localStorage
const limparCarrinhoDoLocalStorage = () => {
    // localStorage.removeItem remove o item pela chave
    removeItem("carrinho");
    console.log("🗑️ Carrinho removido do localStorage!");
};

// ============================================
// PARTE 4: FUNÇÕES DO CARRINHO
// ============================================

// FUNÇÃO: Adicionar produto ao carrinho
// Parâmetros: carrinho atual, id do produto, quantidade desejada
const adicionarProduto = (carrinho, idProduto, quantidade) => {
    try {
        console.log("\n========================================");
        console.log("🛒 ADICIONANDO PRODUTO AO CARRINHO");
        console.log("========================================");

        // VALIDAÇÃO 1: Verificar se a quantidade é válida
        if (quantidade <= 0) {
            throw new Error("Quantidade deve ser maior que zero!");
        }

        // VALIDAÇÃO 2: Buscar o produto no array de produtos disponíveis
        // .find() procura o primeiro produto que tenha o id igual ao idProduto
        const produto = produtosDisponiveis.find(p => p.id === idProduto);

        // Se não encontrar o produto, lança um erro
        if (!produto) {
            throw new Error("Produto não encontrado!");
        }

        // VALIDAÇÃO 3: Verificar se tem estoque suficiente
        if (quantidade > produto.estoque) {
            throw new Error(`Estoque insuficiente! Disponível: ${produto.estoque}`);
        }

        // VERIFICAR SE O PRODUTO JÁ ESTÁ NO CARRINHO
        // .find() busca se já existe um item com o mesmo id no carrinho
        const itemExistente = carrinho.find(item => item.id === idProduto);

        // Se o produto JÁ ESTÁ no carrinho, apenas aumenta a quantidade
        if (itemExistente) {
            // Verifica se a nova quantidade total não ultrapassa o estoque
            const novaQuantidade = itemExistente.quantidade + quantidade;

            if (novaQuantidade > produto.estoque) {
                throw new Error(`Estoque insuficiente! Você já tem ${itemExistente.quantidade} no carrinho. Disponível: ${produto.estoque}`);
            }

            // Aumenta a quantidade do item existente
            itemExistente.quantidade += quantidade;
            console.log(`✅ Quantidade atualizada: ${produto.nome} (${itemExistente.quantidade} unidades)`);
        } else {
            // Se o produto NÃO ESTÁ no carrinho, adiciona um novo item
            // Criamos um novo objeto com as informações do produto
            const novoItem = {
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                quantidade: quantidade
            };

            // .push() adiciona o novo item no final do array
            carrinho.push(novoItem);
            console.log(`✅ Produto adicionado: ${produto.nome} (${quantidade} unidades)`);
        }

        // Salva o carrinho atualizado no localStorage
        salvarCarrinhoNoLocalStorage(carrinho);

        return carrinho;

    } catch (error) {
        // Se houver qualquer erro, captura e exibe a mensagem
        console.log("========================================");
        console.log("❌ ERRO AO ADICIONAR PRODUTO!");
        console.log("========================================");
        console.log("Motivo:", error.message);
        console.log("========================================");
        return carrinho;
    }
};

// FUNÇÃO: Remover produto do carrinho
// Parâmetros: carrinho atual, id do produto, quantidade a remover
const removerProduto = (carrinho, idProduto, quantidade) => {
    try {
        console.log("\n========================================");
        console.log("🗑️ REMOVENDO PRODUTO DO CARRINHO");
        console.log("========================================");

        // VALIDAÇÃO 1: Verificar se a quantidade é válida
        if (quantidade <= 0) {
            throw new Error("Quantidade deve ser maior que zero!");
        }

        // BUSCAR O ITEM NO CARRINHO
        // .find() procura o item com o id especificado
        const item = carrinho.find(item => item.id === idProduto);

        // Se não encontrar o item no carrinho, lança erro
        if (!item) {
            throw new Error("Produto não está no carrinho!");
        }

        // Se a quantidade a remover é MAIOR OU IGUAL à quantidade no carrinho
        if (quantidade >= item.quantidade) {
            // Remove o item completamente do carrinho
            // .filter() cria um novo array sem o item que tem o id especificado
            const novoCarrinho = carrinho.filter(item => item.id !== idProduto);

            console.log(`✅ Produto removido completamente: ${item.nome}`);

            // Salva o carrinho atualizado
            salvarCarrinhoNoLocalStorage(novoCarrinho);

            return novoCarrinho;
        } else {
            // Se a quantidade a remover é MENOR, apenas diminui a quantidade
            item.quantidade -= quantidade;

            console.log(`✅ Quantidade reduzida: ${item.nome} (${item.quantidade} unidades restantes)`);

            // Salva o carrinho atualizado
            salvarCarrinhoNoLocalStorage(carrinho);

            return carrinho;
        }

    } catch (error) {
        // Captura e exibe qualquer erro
        console.log("========================================");
        console.log("❌ ERRO AO REMOVER PRODUTO!");
        console.log("========================================");
        console.log("Motivo:", error.message);
        console.log("========================================");
        return carrinho;
    }
};

// FUNÇÃO: Calcular o total do carrinho
// Parâmetro: carrinho atual
const calcularTotal = (carrinho) => {
    // .reduce() percorre o array e acumula um valor
    // Para cada item, multiplica preço x quantidade e soma ao acumulador
    // O segundo parâmetro (0) é o valor inicial do acumulador
    const total = carrinho.reduce((acumulador, item) => {
        return acumulador + (item.preco * item.quantidade);
    }, 0);

    return total;
};

// FUNÇÃO: Exibir o carrinho completo
// Parâmetro: carrinho atual
const exibirCarrinho = (carrinho) => {
    console.log("\n========================================");
    console.log("🛒 CARRINHO DE COMPRAS");
    console.log("========================================");

    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) {
        console.log("Carrinho vazio! 📦");
        console.log("========================================");
        return;
    }

    // .forEach() percorre cada item do carrinho e exibe as informações
    carrinho.forEach((item, index) => {
        // index + 1 porque o índice começa em 0
        console.log(`${index + 1}. ${item.nome}`);
        console.log(`   Preço unitário: R$ ${item.preco.toFixed(2)}`);
        console.log(`   Quantidade: ${item.quantidade}`);

        // Calcula o subtotal (preço x quantidade)
        const subtotal = item.preco * item.quantidade;
        console.log(`   Subtotal: R$ ${subtotal.toFixed(2)}`);
        console.log("   ---");
    });

    // Calcula e exibe o total geral
    const total = calcularTotal(carrinho);
    console.log("========================================");
    console.log(`💰 TOTAL: R$ ${total.toFixed(2)}`);
    console.log("========================================");
};

// FUNÇÃO: Exibir produtos disponíveis
const exibirProdutosDisponiveis = () => {
    console.log("\n========================================");
    console.log("🏪 PRODUTOS DISPONÍVEIS");
    console.log("========================================");

    // .forEach() percorre cada produto e exibe as informações
    produtosDisponiveis.forEach(produto => {
        console.log(`ID: ${produto.id} | ${produto.nome}`);
        console.log(`   Preço: R$ ${produto.preco.toFixed(2)}`);
        console.log(`   Estoque: ${produto.estoque} unidades`);
        console.log("   ---");
    });

    console.log("========================================");
};

// ============================================
// PARTE 5: INTERFACE DE CONSOLE (simula a interface web)
// ============================================

// FUNÇÃO: Menu principal
const mostrarMenu = () => {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║        🛒 CARRINHO DE COMPRAS          ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║ 1. Ver produtos disponíveis            ║");
    console.log("║ 2. Ver carrinho                        ║");
    console.log("║ 3. Adicionar produto ao carrinho       ║");
    console.log("║ 4. Remover produto do carrinho         ║");
    console.log("║ 5. Limpar carrinho                     ║");
    console.log("║ 6. Executar testes automáticos         ║");
    console.log("║ 0. Sair                                ║");
    console.log("╚════════════════════════════════════════╝");
};

// FUNÇÃO: Ler entrada do usuário (simula prompt)
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const perguntar = (pergunta) => {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
};

// FUNÇÃO: Menu de adicionar produto
const menuAdicionarProduto = async (carrinho) => {
    console.log("\n📋 ADICIONAR PRODUTO AO CARRINHO");
    exibirProdutosDisponiveis();

    const idProduto = await perguntar("Digite o ID do produto: ");
    const quantidade = await perguntar("Digite a quantidade: ");

    const id = parseInt(idProduto);
    const qtd = parseInt(quantidade);

    if (isNaN(id) || isNaN(qtd)) {
        console.log("❌ IDs e quantidades devem ser números!");
        return carrinho;
    }

    return adicionarProduto(carrinho, id, qtd);
};

// FUNÇÃO: Menu de remover produto
const menuRemoverProduto = async (carrinho) => {
    console.log("\n📋 REMOVER PRODUTO DO CARRINHO");
    exibirCarrinho(carrinho);

    if (carrinho.length === 0) {
        console.log("Carrinho vazio! Nada para remover.");
        return carrinho;
    }

    const idProduto = await perguntar("Digite o ID do produto: ");
    const quantidade = await perguntar("Digite a quantidade a remover: ");

    const id = parseInt(idProduto);
    const qtd = parseInt(quantidade);

    if (isNaN(id) || isNaN(qtd)) {
        console.log("❌ IDs e quantidades devem ser números!");
        return carrinho;
    }

    return removerProduto(carrinho, id, qtd);
};

// FUNÇÃO: Menu de limpar carrinho
const menuLimparCarrinho = async (carrinho) => {
    const confirmacao = await perguntar("Tem certeza que deseja limpar todo o carrinho? (s/n): ");

    if (confirmacao.toLowerCase() === 's' || confirmacao.toLowerCase() === 'sim') {
        limparCarrinhoDoLocalStorage();
        console.log("✅ Carrinho limpo com sucesso!");
        return [];
    } else {
        console.log("Operação cancelada.");
        return carrinho;
    }
};

// ============================================
// PARTE 6: LOOP PRINCIPAL DO PROGRAMA
// ============================================

const executarPrograma = async () => {
    console.log("╔════════════════════════════════════════╗");
    console.log("║  SISTEMA DE CARRINHO DE COMPRAS        ║");
    console.log("║        (VERSÃO CONSOLE)               ║");
    console.log("╚════════════════════════════════════════╝");

    // Carregar carrinho salvo
    let meuCarrinho = carregarCarrinhoDoLocalStorage();

    let continuar = true;

    while (continuar) {
        mostrarMenu();
        const opcao = await perguntar("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                exibirProdutosDisponiveis();
                break;

            case "2":
                exibirCarrinho(meuCarrinho);
                break;

            case "3":
                meuCarrinho = await menuAdicionarProduto(meuCarrinho);
                break;

            case "4":
                meuCarrinho = await menuRemoverProduto(meuCarrinho);
                break;

            case "5":
                meuCarrinho = await menuLimparCarrinho(meuCarrinho);
                break;

            case "6":
                // Executar testes automáticos
                console.log("\n🧪 EXECUTANDO TESTES AUTOMÁTICOS...");
                executarTestes();
                break;

            case "0":
                console.log("\n👋 Até logo!");
                continuar = false;
                break;

            default:
                console.log("❌ Opção inválida! Tente novamente.");
        }

        // Pausa para o usuário ver o resultado
        if (continuar && opcao !== "6") {
            await perguntar("\nPressione ENTER para continuar...");
        }
    }

    rl.close();
};

// ============================================
// PARTE 7: TESTES AUTOMÁTICOS
// ============================================

const executarTestes = () => {
    console.log("╔════════════════════════════════════════╗");
    console.log("║        TESTES AUTOMÁTICOS              ║");
    console.log("╚════════════════════════════════════════╝");

    // Limpar localStorage antes de começar os testes
    limparCarrinhoDoLocalStorage();

    // Carregar carrinho (vai estar vazio no início)
    let meuCarrinho = carregarCarrinhoDoLocalStorage();

    // TESTE 1: Exibir produtos disponíveis
    exibirProdutosDisponiveis();

    // TESTE 2: Adicionar produtos ao carrinho
    console.log("\n📋 TESTE 1: Adicionando produtos ao carrinho");
    meuCarrinho = adicionarProduto(meuCarrinho, 1, 2);  // 2 Notebooks
    meuCarrinho = adicionarProduto(meuCarrinho, 2, 5);  // 5 Mouses
    meuCarrinho = adicionarProduto(meuCarrinho, 3, 1);  // 1 Teclado

    // TESTE 3: Exibir carrinho
    exibirCarrinho(meuCarrinho);

    // TESTE 4: Adicionar mais unidades de um produto já existente
    console.log("\n📋 TESTE 2: Adicionando mais unidades de produto existente");
    meuCarrinho = adicionarProduto(meuCarrinho, 1, 1);  // Mais 1 Notebook (total: 3)

    // TESTE 5: Exibir carrinho atualizado
    exibirCarrinho(meuCarrinho);

    // TESTE 6: Tentar adicionar quantidade maior que o estoque
    console.log("\n📋 TESTE 3: Tentando adicionar quantidade maior que estoque");
    meuCarrinho = adicionarProduto(meuCarrinho, 2, 100);  // Vai dar erro!

    // TESTE 7: Remover parcialmente um produto
    console.log("\n📋 TESTE 4: Removendo parcialmente um produto");
    meuCarrinho = removerProduto(meuCarrinho, 2, 3);  // Remove 3 mouses (restam 2)

    // TESTE 8: Exibir carrinho
    exibirCarrinho(meuCarrinho);

    // TESTE 9: Remover produto completamente
    console.log("\n📋 TESTE 5: Removendo produto completamente");
    meuCarrinho = removerProduto(meuCarrinho, 3, 10);  // Remove todo o teclado

    // TESTE 10: Exibir carrinho final
    exibirCarrinho(meuCarrinho);

    // TESTE 11: Tentar remover produto que não está no carrinho
    console.log("\n📋 TESTE 6: Tentando remover produto que não está no carrinho");
    meuCarrinho = removerProduto(meuCarrinho, 4, 1);  // Vai dar erro!

    // TESTE 12: Verificar se o carrinho foi salvo no localStorage
    console.log("\n📋 TESTE 7: Verificando localStorage");
    console.log("========================================");
    const carrinhoSalvo = getItem("carrinho");
    console.log("Dados salvos no localStorage:");
    console.log(carrinhoSalvo);
    console.log("========================================");

    // TESTE 13: Simular recarregar a página (carregar do localStorage)
    console.log("\n📋 TESTE 8: Simulando recarregar página");
    console.log("========================================");
    console.log("🔄 Recarregando carrinho do localStorage...");
    const carrinhoRecarregado = carregarCarrinhoDoLocalStorage();
    exibirCarrinho(carrinhoRecarregado);

    console.log("\n✅ TODOS OS TESTES CONCLUÍDOS!");
    console.log("========================================");
};

// ============================================
// PARTE 8: INICIAR O PROGRAMA
// ============================================

// Verificar se estamos executando testes ou o programa interativo
const args = process.argv.slice(2);

if (args.includes('--testes') || args.includes('-t')) {
    // Executar apenas os testes
    executarTestes();
} else {
    // Executar o programa interativo
    executarPrograma();
}