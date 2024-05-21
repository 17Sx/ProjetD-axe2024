document.addEventListener('DOMContentLoaded', function () {
    let token = localStorage.getItem('token');
    fetchUserInfo(token);
    const selectMaison = document.getElementById('choixMaison');
selectMaison.addEventListener('change', filtrerCartesParMaison);




});



let token = localStorage.getItem('token');


async function fetchUserInfo(token) {   
    try {
        const response = await fetch('http://192.168.1.20:3000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
        const data = await response.json();
        const userId = data.id;
        afficherCartesDansInventaire(userId);
    } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
    }
}

async function afficherCartesDansInventaire(userId) {
    try {
        const response = await fetch(`http://192.168.1.20:3000/users/${userId}/inventory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
            data.forEach(carte => {
                fetchCardDetails(carte);
            });
        } else {
            console.error('Erreur : la réponse n\'est pas un tableau');
        }
        mouseevent();
    } catch (error) {
        console.error('Erreur lors de la récupération des cartes :', error);
    }
    
}

async function fetchCardDetails(carte) {
    try {
        const response = await fetch(`https://hp-api.lainocs.fr/characters/${carte.card}`);
        const data = await response.json();
        afficherCarte(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de la carte :', error);
    }
    addfavcards();
}

async function afficherCarte(carte) {

    const cartesContainer = document.getElementById('cartesContainer');

    const carteDiv = document.createElement('div');
    carteDiv.classList.add('carte', 'fade-in');
    carteDiv.dataset.maison = carte.house;

    const contentCardDiv = document.createElement('div');
    contentCardDiv.classList.add('carte-content');

    const glow = document.createElement('div');
    glow.classList.add('glow');

    const imageCarte = document.createElement('img');
    imageCarte.src = carte.image;
    imageCarte.alt = carte.name;

    const nomCarte = document.createElement('p');
    nomCarte.textContent = carte.name;
    nomCarte.classList.add('nomCarte');

    const favButton = document.createElement('button');
    favButton.classList.add('favbtn');
    favButton.textContent = '♥';
    favButton.dataset.cardId = carte.id;
    favButton.style.zIndex = "20";

    favButton.addEventListener('click', async function() {
        e.stopPropagation();

        
        const cardId = this.dataset.cardId;
        const userId = localStorage.getItem('userId');
        if (this.classList.contains('fav-card')) {
            try {
                const response = await fetch(`http://192.168.1.20:3000/favcards/deletefav/${userId}`, {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cardId }),
                });
                const data = await response.json();
            } catch (error) {
                console.error('Error:', error);
            }

            this.style.color = 'black';
            this.classList.remove('fav-card');
        } else {
            
            try {
                const response = await fetch(`http://192.168.1.20:3000/favcards/addfav/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cardId }),
                });
                const data = await response.json();
            } catch (error) {
                console.error('Error:', error);
            }


            this.style.color = 'red';
            this.classList.add('fav-card');
                    }
    });


contentCardDiv.appendChild(imageCarte);
contentCardDiv.appendChild(nomCarte);
contentCardDiv.appendChild(favButton);
contentCardDiv.appendChild(glow);

carteDiv.appendChild(contentCardDiv);

cartesContainer.appendChild(carteDiv);

const userId = localStorage.getItem('userId');
const favCards = await getFavCards(userId);
if (favCards.includes(carte.id)) {
    carteDiv.classList.add('fav-card');
}
mouseevent();
}


async function getFavCards(userId) {
    try {
        const response = await fetch(`http://192.168.1.20:3000/favcards/getfav/${userId}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

function addfavcards() {
    const favbtns = document.querySelectorAll('.favbtn');
    favbtns.forEach(btn => {
        if (btn.dataset.hasClickEvent) {
            return;
        }

        btn.addEventListener('click', async function() {
            const cardId = this.dataset.cardId;
            const userId = localStorage.getItem('userId');
            try {
                const response = await fetch(`http://192.168.1.20:3000/favcards/addfav/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cardId }),
                });
                const data = await response.json();
                console.log('Success:', data);
            } catch (error) {
                console.error('Error:', error);
            }
        });
        btn.dataset.hasClickEvent = 'true';
    });
}


function filtrerCartesParMaison() {
    const maisonSelectionnee = this.value;
    const cartes = document.querySelectorAll('.carte'); 
    cartes.forEach(carte => {
        const maisonCarte = carte.dataset.maison; 
        if (maisonSelectionnee === '' || maisonSelectionnee === maisonCarte) {
            carte.style.display = 'block'; 
        } else {
            carte.style.display = 'none'; 
        }
    });
}


const searchinput = document.querySelector('.searchinput');
searchinput.addEventListener('input', checkInput);



function checkInput(e) {
    const allImages = document.querySelectorAll('.center .carte img');
    allImages.forEach(img => {
        const searchValue = e.target.value.toLowerCase();
        const imageAlt = img.getAttribute('alt').toLowerCase();

        if (imageAlt.includes(searchValue)) {
            img.parentElement.style.display = 'block';
        } else {
            img.parentElement.style.display = 'none';
        }
    });
}


async function mouseevent() {
    const cartes = document.querySelectorAll('.carte');
    const glow = document.querySelectorAll('.glow');
    
    cartes.forEach(el => {
        el.addEventListener('mousemove', e => {
            let elRect = el.getBoundingClientRect();

            let x = e.clientX - elRect.x
            let y = e.clientY - elRect.y

            let midcardwidth = elRect.width / 2;
            let midcardheight = elRect.height / 2;

            let angleY = (x - midcardwidth) /5;
            let angleX = (midcardheight - y) /5;

            let GlowX = x /elRect.width * 100;
            let GlowY = y /elRect.height * 100;

            el.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
            el.querySelector('.glow').style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
            el.querySelector('.glow').style.background = `radial-gradient(circle at ${GlowX}% ${GlowY}%, rgba(166, 219, 254, 0.3), transparent)`;
        })

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            el.querySelector('.glow').style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            el.querySelector('.glow').style.background = '';
        })
    });
}


