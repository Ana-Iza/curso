// SISTEMA DE LOGIN COM VALIDAÇÃO E TRATAMENTO DE ERROS

// ============================================
// BANCO DE DADOS SIMULADO (usuários cadastrados)
// ============================================
// Aqui criamos um array de objetos que simula um banco de dados
// Cada objeto representa um usuário com email e senha
const usuariosCadastrados = [
    { email: "ana@gmail.com", senha: "Ana12345" },
    { email: "francisco@gmail.com", senha: "Fran9876" },
    { email: "murilo@gmail.com", senha: "Muri5432" }
];

// ============================================
// FUNÇÃO 1: VALIDAR EMAIL
// ============================================
// Esta função verifica se o email contém o símbolo @
// Parâmetro: email (string) - o email digitado pelo usuário
// Retorna: true se válido, false se inválido
const validarEmail = (email) => {
    // Usa o método includes() para verificar se existe @ no email
    // Se não tiver @, lança um erro
    if (!email.includes("@")) {
        throw new Error("Email inválido! O email deve conter @");
    }
    // Se passou na validação, retorna true
    return true;
};

// ============================================
// FUNÇÃO 2: VALIDAR SENHA
// ============================================
// Esta função verifica se a senha tem pelo menos 8 caracteres
// Parâmetro: senha (string) - a senha digitada pelo usuário
// Retorna: true se válida, false se inválida
const validarSenha = (senha) => {
    // Usa a propriedade length para contar quantos caracteres tem a senha
    // Se tiver menos de 8 caracteres, lança um erro
    if (senha.length < 8) {
        throw new Error("Senha inválida! A senha deve ter pelo menos 8 caracteres");
    }
    // Se passou na validação, retorna true
    return true;
};

// ============================================
// FUNÇÃO 3: VERIFICAR SE CAMPOS ESTÃO PREENCHIDOS
// ============================================
// Esta função verifica se o usuário digitou algo nos campos
// Parâmetros: email e senha (strings)
// Retorna: true se preenchidos, lança erro se vazios
const verificarCamposPreenchidos = (email, senha) => {
    // Verifica se email está vazio ou é null/undefined
    // O operador || significa "OU" - se qualquer condição for verdadeira, executa o código
    if (!email || email === "") {
        throw new Error("Campo email está vazio! Por favor, preencha o email");
    }
    
    // Verifica se senha está vazia ou é null/undefined
    if (!senha || senha === "") {
        throw new Error("Campo senha está vazio! Por favor, preencha a senha");
    }
    
    // Se ambos os campos estão preenchidos, retorna true
    return true;
};

// ============================================
// FUNÇÃO 4: VERIFICAR SE LOGIN EXISTE
// ============================================
// Esta função procura o email no banco de dados simulado
// Parâmetro: email (string) - o email a ser procurado
// Retorna: o objeto do usuário se encontrado, ou null se não encontrado
const verificarLoginExiste = (email) => {
    // Usa o método find() para procurar no array
    // find() percorre o array e retorna o primeiro elemento que satisfaz a condição
    // A arrow function (usuario => ...) é executada para cada elemento
    const usuarioEncontrado = usuariosCadastrados.find(usuario => usuario.email === email);
    
    // Se não encontrou nenhum usuário (retornou undefined), lança erro
    if (!usuarioEncontrado) {
        throw new Error("Login não existe! Este email não está cadastrado no sistema");
    }
    
    // Se encontrou, retorna o objeto do usuário
    return usuarioEncontrado;
};

// ============================================
// FUNÇÃO 5: VERIFICAR SE SENHA ESTÁ CORRETA
// ============================================
// Esta função compara a senha digitada com a senha do usuário encontrado
// Parâmetros: senhaDigitada (string) e usuario (objeto)
// Retorna: true se senha correta, lança erro se incorreta
const verificarSenhaCorreta = (senhaDigitada, usuario) => {
    // Usa o operador === para comparar se as senhas são exatamente iguais
    // O operador !== significa "diferente de"
    if (senhaDigitada !== usuario.senha) {
        throw new Error("Senha incorreta! A senha digitada não corresponde ao email");
    }
    
    // Se a senha está correta, retorna true
    return true;
};

// ============================================
// FUNÇÃO PRINCIPAL: REALIZAR LOGIN
// ============================================
// Esta é a função principal que coordena todo o processo de login
// Parâmetros: email e senha (strings) digitados pelo usuário
// Retorna: mensagem de sucesso ou erro
const realizarLogin = (email, senha) => {
    // TRY: Bloco onde tentamos executar o código que pode gerar erros
    try {
        console.log("\n========================================");
        console.log("INICIANDO PROCESSO DE LOGIN...");
        console.log("========================================\n");
        
        // PASSO 1: Verificar se os campos estão preenchidos
        console.log("✓ Verificando se os campos estão preenchidos...");
        verificarCamposPreenchidos(email, senha);
        console.log("✓ Campos preenchidos com sucesso!\n");
        
        // PASSO 2: Validar formato do email (deve conter @)
        console.log("✓ Validando formato do email...");
        validarEmail(email);
        console.log("✓ Email válido!\n");
        
        // PASSO 3: Validar tamanho da senha (mínimo 8 caracteres)
        console.log("✓ Validando tamanho da senha...");
        validarSenha(senha);
        console.log("✓ Senha válida!\n");
        
        // PASSO 4: Verificar se o login existe no banco de dados
        console.log("✓ Verificando se o login existe...");
        const usuario = verificarLoginExiste(email);
        console.log("✓ Login encontrado!\n");
        
        // PASSO 5: Verificar se a senha está correta
        console.log("✓ Verificando se a senha está correta...");
        verificarSenhaCorreta(senha, usuario);
        console.log("✓ Senha correta!\n");
        
        // Se chegou até aqui, todas as validações passaram!
        console.log("========================================");
        console.log("🎉 LOGIN REALIZADO COM SUCESSO! 🎉");
        console.log(`Bem-vindo(a), ${usuario.email}!`);
        console.log("========================================\n");
        
        // Retorna mensagem de sucesso
        return "Login realizado com sucesso!";
        
    // CATCH: Bloco que captura qualquer erro que acontecer no try
    } catch (error) {
        // Imprime uma mensagem de erro formatada
        console.log("========================================");
        console.log("❌ ERRO NO LOGIN! ❌");
        console.log("========================================");
        // error.message contém a mensagem do erro que foi lançada
        console.log("Motivo:", error.message);
        console.log("========================================\n");
        
        // Retorna a mensagem de erro
        return `Erro: ${error.message}`;
        
    // FINALLY: Bloco que sempre é executado, independente de erro ou sucesso
    } finally {
        console.log(">>> Processo de login finalizado <<<\n");
    }
};

// ============================================
// TESTANDO O SISTEMA DE LOGIN
// ============================================

console.log("\n");
console.log("╔════════════════════════════════════════╗");
console.log("║   SISTEMA DE LOGIN - TESTES            ║");
console.log("╔════════════════════════════════════════╗");
console.log("\n");

// TESTE 1: Login com sucesso (email e senha corretos)
console.log("📋 TESTE 1: Login com dados corretos");
realizarLogin("ana@gmail.com", "Ana12345");

// TESTE 2: Erro - Campo email vazio
console.log("\n📋 TESTE 2: Campo email vazio");
realizarLogin("", "Ana12345");

// TESTE 3: Erro - Campo senha vazio
console.log("\n📋 TESTE 3: Campo senha vazio");
realizarLogin("ana@gmail.com", "");

// TESTE 4: Erro - Email sem @
console.log("\n📋 TESTE 4: Email sem @");
realizarLogin("anagmail.com", "Ana12345");

// TESTE 5: Erro - Senha com menos de 8 caracteres
console.log("\n📋 TESTE 5: Senha com menos de 8 caracteres");
realizarLogin("ana@gmail.com", "Ana123");

// TESTE 6: Erro - Login não existe
console.log("\n📋 TESTE 6: Login não cadastrado");
realizarLogin("joao@gmail.com", "Joao12345");

// TESTE 7: Erro - Senha incorreta
console.log("\n📋 TESTE 7: Senha incorreta");
realizarLogin("ana@gmail.com", "SenhaErrada123");

// TESTE 8: Login com sucesso (outro usuário)
console.log("\n📋 TESTE 8: Login com outro usuário válido");
realizarLogin("francisco@gmail.com", "Fran9876");
