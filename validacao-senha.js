// Função para validar senha
// Esta função recebe uma senha como parâmetro e retorna true se for válida, false se não for
function validarSenha(senha) {
    
    // Verificar se a senha tem pelo menos 8 caracteres
    // .length retorna o tamanho da string
    if (senha.length < 8) {
        return false; // Se tiver menos de 8 caracteres, retorna falso
    }
    
    // Criar arrays com os caracteres que precisamos verificar
    // Array com números de 0 a 9
    const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    // Array com caracteres especiais comuns
    const caracteresEspeciais = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '|', ':', ';', '<', '>', ',', '.', '?', '/'];
    
    // Array com letras maiúsculas de A a Z
    const letrasMaiusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    // Variáveis para controlar se encontramos cada tipo de caractere
    // Inicialmente todas são false (não encontramos ainda)
    let temNumero = false;
    let temCaractereEspecial = false;
    let temLetraMaiuscula = false;
    
    // Loop FOR para percorrer cada caractere da senha
    // i começa em 0 e vai até o tamanho da senha
    for (let i = 0; i < senha.length; i++) {
        
        // Pegar o caractere atual da senha usando o índice i
        const caractereAtual = senha[i];
        
        // Verificar se o caractere atual é um número
        // Loop FOR para percorrer o array de números
        for (let j = 0; j < numeros.length; j++) {
            // IF para comparar se o caractere atual é igual ao número do array
            if (caractereAtual === numeros[j]) {
                temNumero = true; // Se encontrou, marca como true
                break; // Sai do loop porque já encontrou
            }
        }
        
        // Verificar se o caractere atual é um caractere especial
        // Loop FOR para percorrer o array de caracteres especiais
        for (let k = 0; k < caracteresEspeciais.length; k++) {
            // IF para comparar se o caractere atual é igual ao caractere especial do array
            if (caractereAtual === caracteresEspeciais[k]) {
                temCaractereEspecial = true; // Se encontrou, marca como true
                break; // Sai do loop porque já encontrou
            }
        }
        
        // Verificar se o caractere atual é uma letra maiúscula
        // Loop FOR para percorrer o array de letras maiúsculas
        for (let m = 0; m < letrasMaiusculas.length; m++) {
            // IF para comparar se o caractere atual é igual à letra maiúscula do array
            if (caractereAtual === letrasMaiusculas[m]) {
                temLetraMaiuscula = true; // Se encontrou, marca como true
                break; // Sai do loop porque já encontrou
            }
        }
    }
    
    // Verificar se TODOS os requisitos foram atendidos
    // Usa o operador && (E) para verificar se todas as condições são verdadeiras
    if (temNumero && temCaractereEspecial && temLetraMaiuscula) {
        return true; // Se todos os requisitos foram atendidos, senha é válida
    } else {
        return false; // Se falta algum requisito, senha é inválida
    }
}

// Função principal que interage com o usuário
function criarSenha() {
    
    // Mostrar as regras para o usuário
    console.log("=== CRIAR SENHA ===");
    console.log("A senha deve ter:");
    console.log("- Pelo menos 8 caracteres");
    console.log("- Pelo menos 1 número");
    console.log("- Pelo menos 1 caractere especial (!@#$%&*...)");
    console.log("- Pelo menos 1 letra maiúscula");
    console.log("");
    
    // Pedir para o usuário digitar a senha
    // prompt() abre uma caixa de diálogo para o usuário digitar
    const senhaDigitada = prompt("Digite sua senha:");
    
    // Verificar se o usuário digitou algo
    // IF para verificar se a senha não é null (usuário cancelou) e não é vazia
    if (senhaDigitada !== null && senhaDigitada !== "") {
        
        // Chamar a função validarSenha e guardar o resultado
        const senhaValida = validarSenha(senhaDigitada);
        
        // IF para verificar se a senha é válida
        if (senhaValida) {
            // Se for válida, mostra mensagem de sucesso
            alert("✓ Senha válida! Sua senha foi criada com sucesso.");
            console.log("✓ Senha válida!");
        } else {
            // Se não for válida, mostra mensagem de erro
            alert("✗ Senha inválida! A senha não corresponde aos requisitos.");
            console.log("✗ Senha inválida! Verifique os requisitos.");
        }
        
    } else {
        // Se o usuário não digitou nada ou cancelou
        alert("Você não digitou nenhuma senha.");
        console.log("Nenhuma senha foi digitada.");
    }
}

// Chamar a função principal para iniciar o programa
criarSenha();
