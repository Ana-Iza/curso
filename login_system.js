// Simulação de sistema de login simples
// Usando prompt para entrada do usuário (no navegador ou Node.js com prompt-sync)

// Função para validar email (deve conter @)
function validarEmail(email) {
    return email.includes('@');
}

// Função para validar senha (até 8 caracteres)
function validarSenha(senha) {
    return senha.length <= 8;
}

// Lista de usuários cadastrados (simulação)
const usuarios = [
    { email: 'usuario@example.com', senha: '12345678' },
    { email: 'admin@teste.com', senha: 'admin123' }
];

// Função principal de login
function fazerLogin() {
    try {
        // Solicitar login e senha
        const login = prompt("Digite seu email (login):");
        const senha = prompt("Digite sua senha:");

        // Verificar se campos estão preenchidos
        if (!login || !senha) {
            throw new Error("Erro: Campos de login e senha devem ser preenchidos.");
        }

        // Validar formato do email
        if (!validarEmail(login)) {
            throw new Error("Erro: O email deve conter '@'.");
        }

        // Validar tamanho da senha
        if (!validarSenha(senha)) {
            throw new Error("Erro: A senha deve ter no máximo 8 caracteres.");
        }

        // Verificar se o login existe
        const usuarioEncontrado = usuarios.find(usuario => usuario.email === login);
        if (!usuarioEncontrado) {
            throw new Error("Erro: Login não encontrado. Verifique o email digitado.");
        }

        // Verificar se a senha está correta
        if (usuarioEncontrado.senha !== senha) {
            throw new Error("Erro: Senha incorreta. Tente novamente.");
        }

        // Se tudo estiver correto
        console.log("Login realizado com sucesso! Bem-vindo, " + usuarioEncontrado.email);

    } catch (error) {
        // Capturar e exibir erros
        console.log(error.message);
    }
}

// Chamar a função de login
fazerLogin();