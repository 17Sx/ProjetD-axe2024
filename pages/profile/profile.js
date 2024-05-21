let token = localStorage.getItem('token');

if (!token) {
    window.location.href = './../login/index.html';
} else {
    fetch("http://192.168.1.20:3000/users", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token  
        }
    })
    .then(response => {
        if (response.ok) { 
            return response.json();
        } else {
            throw new Error('Erreur' + response.statusText);
        }
    })
    .then(data => {
        document.getElementById('email').textContent = data.email;
        document.getElementById('pseudo').textContent = data.pseudo;
        document.getElementById('maison').textContent = data.maison;
        document.getElementById('favoriteCard').textContent = data.favoriteCard;
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}

let logout = document.getElementById('decoButton');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = './../login/index.html';
});


let changepassword = document.getElementById('changePassword');

changepassword.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './../changePassword/index.html';
});