let token = localStorage.getItem('token');

if(!token) {
    window.location.href = './../inventaire/inventaire.html';
}

