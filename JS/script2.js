const cartes = {
    Rare: ['img/carte1a.jpg', 'img/carte1b.jpg', 'img/carte1c.jpg'],
    Epic: ['img/carte2a.jpg', 'img/carte2b.jpg', 'img/carte2c.jpg'],
    Legendaire: ['img/carte3a.jpg', 'img/carte3b.jpg', 'img/carte3c.jpg'],
}

const show_card = document.createElement('div');
const img_create = document.createElement('img');
img_create.src = 'img/carte1a.jpg';
img_create.classList.add('show_card');
const navbar = document.querySelector('h1');
navbar.appendChild(img_create);



const cartesrare = cartes['Rare'];
const cartesepic = cartes['Epic'];
const carteslegendaire = cartes['Legendaire'];
console.log(cartesrare);
console.log(cartesepic);
console.log(carteslegendaire);


function ouvrirPack() {
    const derniereOuverture = localStorage.getItem('derniereOuverture')
    
    if (derniereOuverture && new Date() - new Date(derniereOuverture) < 0 * 0 * 0 * 0) {
        alert("Vous ne pouvez ouvrir qu'un Pack toutes les 24 heure");
        return;
    }

    const cartesinv = document.getElementById('cartesinv');
    cartesinv.innerHTML = '';

    const rarete1 = genererCarteAleatoire('Rare');
    const rarete2 = genererCarteAleatoire('Epic');
    const rarete3 = genererCarteAleatoire('Legendaire');

    afficherCarte(rarete1);
    afficherCarte(rarete2)
    afficherCarte(rarete3);

    localStorage.setItem('derniereOuverture', new Date());
}


function genererCarteAleatoire(rarete) {

    const cartes = {
        rarete1: ['../img/carte1a.jpg', '../img/carte1b.jpg', '../img/carte1c.jpg'],
        rarete2: ['../img/carte2a.jpg', '../img/carte2b.jpg', '../img/carte2c.jpg'],
        rarete3: ['../img/carte3a.jpg', '../img/carte3b.jpg', '../img/carte3c.jpg'],
    }
    const cartesrare = cartes[rarete];
    const carteAleatoire = cartesrare[Math.floor(Math.random() * cartesrare.length)]
    return carteAleatoire;
    }
    
    function afficherCarte(carte) {
    const cartesinv = document.getElementById('cartesinv');
    
    const carteinfo = document.createElement('div');
    carteinfo.classList.add('carte');
    
    const imageinfo = document.createElement('img')
    imageinfo.src = carte.carte;
    
        const rareteinfo = document.createElement('p');
        rareteinfo.textContent = `Rareté: ${carte.rarete}`;
    
        carteinfo.appendChild(imageinfo);
        carteinfo.appendChild(rareteinfo);
    
        cartesinv.appendChild(carteinfo);
    }