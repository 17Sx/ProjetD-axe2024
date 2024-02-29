let passwordInput = document.getElementById('password');
function validatePassword() {
    let passwordError = document.getElementById('mdpError');
    let passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&()_+{}[\]:;<>,.?~\/-]).{8,}$/;

    if (!(passwordRegex.test(passwordInput.value) && passwordInput.value.length >= 8)) {
        passwordError.textContent = 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un caractère spécial, et faire au moins 8 caractères de long.';
    } else {
        passwordError.textContent = ''; 
    }
}
passwordInput.addEventListener('input', validatePassword);



let inscriptionButton = document.getElementById('inscriptionButton');
inscriptionButton.addEventListener('click', function() {
    window.location.href = 'index2.html';
});     