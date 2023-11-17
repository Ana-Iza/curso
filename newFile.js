document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').Value;
    const senha = document.getElementById('senha').Value;

    const senhaRegex = /^(?=.*[a-z]) (?=.*[A-Z]) (?=.*\d).{8,}$/;

    if (!senha.match(senhaRegex)) {
        alert("A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.");

    } else if (email) {

        window.location.href = 'páginainicial.html';
    }
});
