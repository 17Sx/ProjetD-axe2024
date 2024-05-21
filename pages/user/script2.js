document.addEventListener('DOMContentLoaded', function () {
    const ouvrirPackButton = document.getElementById('ouvrirPackButton');
    ouvrirPackButton.addEventListener('click', ouvrirPack);

    const btnecg = document.querySelector('.btnecg');
    btnecg.addEventListener('click', openPopupi);

    const echangeForm = document.getElementById('echangecrt');
    echangeForm.addEventListener('submit', envoyerDemande);

    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closePopup);
    });

    const closeBtnis = document.querySelectorAll('.close-btni');
    closeBtnis.forEach(btni => {
        btni.addEventListener('click', closePopupi);
    });

    let token = localStorage.getItem('token');

    if (token) {
        console.log('Token utilisateur trouvé :', token);
        fetchUserInfo(token);
    } else {
        console.log('Aucun token utilisateur trouvé.');
        morescale();
    }

    updateCountdown();
});

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
        localStorage.setItem('userId', userId);
    } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
    }
}

async function changeCards() {
    try {
        let userId = localStorage.getItem('userId');
        let response = await fetch('https://hp-api.lainocs.fr/characters/', {
            headers: {
                'Origin': 'https://hp-api.lainocs.fr/characters/'
            }
        });

        if (response.ok) {
            let data = await response.json();
            const cartesContainer = document.getElementById('cartesContainer');
            cartesContainer.innerHTML = '';

            let indicesAleatoires = [];
            while (indicesAleatoires.length < 3) {
                let numAleatoire = Math.floor(Math.random() * data.length);
                if (!indicesAleatoires.includes(numAleatoire)) {
                    indicesAleatoires.push(numAleatoire);
                }
            }

            indicesAleatoires.forEach(index => {
                let randomCharacter = data[index];
                afficherCarte(randomCharacter, userId);
            });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des cartes :', error);
    }
}

function ouvrirPack(event) {
    event.preventDefault();

    const derniereOuverture = localStorage.getItem('derniereOuverture');
    const maintenant = new Date();
    const uneJournee = 0 *0 * 0 * 0; 

    if (derniereOuverture && maintenant - new Date(derniereOuverture) < uneJournee) {
        alert("Vous ne pouvez ouvrir qu'un Pack toutes les 24 heures");
        return;
    }

    localStorage.setItem('derniereOuverture', maintenant.toISOString());
    updateCountdown();
    changeCards();
}

function updateCountdown() {
    const derniereOuverture = localStorage.getItem('derniereOuverture');
    const countdownElement = document.getElementById('countdown');

    if (!derniereOuverture) {
        countdownElement.textContent = "Vous pouvez ouvrir un pack.";
        return;
    }

    const prochaineOuverture = new Date(derniereOuverture).getTime() + 24 * 60 * 60 * 1000;
    const intervalId = setInterval(() => {
        const maintenant = new Date().getTime();
        const tempsRestant = prochaineOuverture - maintenant;

        if (tempsRestant <= 0) {
            clearInterval(intervalId);
            countdownElement.textContent = "Vous pouvez ouvrir un pack.";
            return;
        }

        const heures = Math.floor((tempsRestant % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((tempsRestant % (1000 * 60 * 60)) / (1000 * 60));
        const secondes = Math.floor((tempsRestant % (1000 * 60)) / 1000);

        countdownElement.textContent = `Prochaine ouverture dans : ${heures}h ${minutes}m ${secondes}s`;
    }, 1000);
}

function afficherCarte(carte, userId) {
    const cartesContainer = document.getElementById('cartesContainer');
    const carteinfo = document.createElement('div');
    carteinfo.classList.add('carte', 'nomCartePage2');

    const imageinfo = document.createElement('img');
    imageinfo.src = carte.image;
    carteinfo.appendChild(imageinfo);

    const nomCarte = document.createElement('p');
    nomCarte.textContent = carte.name;
    carteinfo.appendChild(nomCarte);

    carteinfo.addEventListener('click', () => openPopup(carte));
    cartesContainer.appendChild(carteinfo);
 
    let token = localStorage.getItem('token');

    fetch(`http://192.168.1.20:3000/users/${userId}/inventory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({ card: carte.slug })
    }).then(response => response.json())
        .then(data => {
            console.log("Carte ajoutée à l'inventaire :", data);
        }).catch(error => console.error('Erreur lors de l\'ajout de la carte', error));

    morescale(); 
}

function openPopup(character) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');

    popupContent.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}" class="imgpopup"></img>
        <p><strong>Yeux:</strong> ${character.eyes}</p>
        <p><strong>Cheveux:</strong> ${character.hairs}</p>
        <p><strong>Date de naissance:</strong> ${new Date(character.birthday).toLocaleDateString('fr-FR')}</p>
        <p><strong>Groupe sanguin:</strong> ${character.blood}</p>
        <p><strong>Baguette:</strong> ${character.wand}</p>
        <p><strong>Patronus:</strong> ${character.patronus ? character.patronus : 'N/A'}</p>
        <p><strong>Rôle:</strong> ${character.role}</p>
        <p><strong>Maison:</strong> ${character.house ? character.house : 'N/A'}</p>
        <p><strong>Acteur:</strong> ${character.actor}</p>
    `;
    popup.style.display = 'block';
}

function envoyerDemande(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const choixCarte = document.getElementById('choixCarte').value;
    console.log('Nom:', nom);
    console.log('Email:', email);
    console.log('Choix de carte:', choixCarte);

    closePopup();
}

function morescale() {
    let cards = document.querySelectorAll('.carte');

    cards.forEach(card => {
        card.addEventListener('mouseover', function() {
            card.style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseout', function() {
            card.style.transform = 'scale(1)';
        });
    });
}

function openPopupi() {
    const myPopup = document.getElementById('myPopup');
    myPopup.style.display = 'block';
}

function closePopup() {
    const myPopup = document.getElementById('myPopup');
    myPopup.style.display = 'none';
}

function closePopupi() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}
