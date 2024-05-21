let token = localStorage.getItem('token');

if(!token) {
    window.location.href = './../login/index.html';
}

fetch("http://192.168.1.20:3000/users",{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
    }

})


.then(response => response.json())
.then(data => {
    console.log(data);
    const welcomeMessage = `Bienvenue a toi <span class="nameuser">${data.pseudo}</span>, je vois que tu es de la maison <span class="maison">${data.maison}</span> ! `;
    document.getElementById("welcomeMessage").innerHTML = welcomeMessage;

    
})


function toggleMenu() {
    var menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}


