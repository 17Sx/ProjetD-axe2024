document.addEventListener('DOMContentLoaded', function () {
    const ouvrirPackButton = document.getElementById('ouvrirPackButton');
    ouvrirPackButton.addEventListener('click', ouvrirPack);

    const btnecg = document.querySelector('.btnecg');
    btnecg.addEventListener('click', afficherContenu);

    const cartesContainer = document.getElementById('cartesContainer');

    const echangeForm = document.getElementById('echangecrt');
    echangeForm.addEventListener('submit', envoyerDemande);

    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', fermerPopup);

    let token = localStorage.getItem('token');

});

let ouvrirPackButton = document.getElementById("ouvrirPackButton");

//permet de generer les cartes en aleatoires depuis l'API

const changeCards = async () => {
    let response = await fetch('https://hp-api.lainocs.fr/characters/', {
        headers: {
            'Origin': 'https://hp-api.lainocs.fr/characters/'
        }
    });

    if (response.ok) {
        let data = await response.json();

        // vide le conteneur des cartes avant d'ajouter de nouvelles cartes
        const cartesContainer = document.getElementById('cartesContainer');
        cartesContainer.innerHTML = '';

        // genere trois indices aléatoires
        let indicesAleatoires = [];
        while (indicesAleatoires.length < 3) {
            let numAleatoire = Math.floor(Math.random() * 30);
            if (!indicesAleatoires.includes(numAleatoire)) {
                indicesAleatoires.push(numAleatoire);
            }
        }

        // affiche les cartes correspondantes
        indicesAleatoires.forEach(index => {
            let randomCharacter = data[index]; 
            afficherCarte(randomCharacter);
        });
    }
};


ouvrirPackButton.addEventListener("click", changeCards);

function ouvrirPack(event) {
    event.preventDefault();

    const derniereOuverture = localStorage.getItem('derniereOuverture');
    if (derniereOuverture && new Date() - new Date(derniereOuverture) < 0 * 0 * 0 * 0) {
        alert("Vous ne pouvez ouvrir qu'un Pack toutes les 24 heures");
        return;
    }

    localStorage.setItem('derniereOuverture', new Date());
}

function afficherCarte(carte) {
    const cartesContainer = document.getElementById('cartesContainer');

    if (!(carte.image && carte.name && carte.slug)) {
    }

    const carteinfo = document.createElement('div');
    carteinfo.classList.add('carte');

    const imageinfo = document.createElement('img');
    imageinfo.src = carte.image;
    carteinfo.appendChild(imageinfo);

    const nomCarte = document.createElement('p');
    carteinfo.classList.add('nomCartePage2');
    nomCarte.textContent = carte.name;
    carteinfo.appendChild(nomCarte);

    const cartesInventaire = JSON.parse(localStorage.getItem('cartesInventaire')) || [];

    // Vérifier si la carte est déjà dans l'inventaire
    const carteDejaPresente = cartesInventaire.some(item => item.carte === carte.image ===carte.slug);

    if (!carteDejaPresente) {
        // Ajout de la carte à l'inventaire avec le slug
        cartesInventaire.push({ carte: carte.image, favori: false, slug: carte.slug });
        localStorage.setItem('cartesInventaire', JSON.stringify(cartesInventaire));
        cartesContainer.appendChild(carteinfo);
    } else {
        console.log("La carte est déjà dans l'inventaire.");
    }
}


function afficherContenu() {
    var contenu = document.getElementById("btnflott");
    contenu.style.display = "block";
    contenu.classList.add("popup"); 
}

function fermerPopup() {
    var contenu = document.getElementById("btnflott");
    contenu.style.display = "none"; 
}



function envoyerDemande(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const choixCarte = document.getElementById('choixCarte').value;
    console.log('Nom:', nom);
    console.log('Email:', email);
    console.log('Choix de carte:', choixCarte);
    var contenu = document.getElementById("btnflott");
    contenu.style.display = "none";
}

