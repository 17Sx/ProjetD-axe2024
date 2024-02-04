document.addEventListener('DOMContentLoaded', function () {
    afficherCartesDansInventaire();
});

const inventaireDiv = document.getElementById('cartesContainer');

function afficherCartesDansInventaire() {
    const cartesInventaire = JSON.parse(localStorage.getItem('cartesInventaire')) || [];
    inventaireDiv.innerHTML = '';

    cartesInventaire.forEach((carte) => {
        const carteinfo = document.createElement('div');
        carteinfo.classList.add('carte');

        const imageinfo = document.createElement('img');
        imageinfo.src = carte.carte;


        const favoriButton = document.createElement('button');
favoriButton.textContent = 'Favori';
favoriButton.classList.add('favori-button'); 
favoriButton.addEventListener('click', () => basculerFavori(carte));


        carteinfo.appendChild(imageinfo);
        carteinfo.appendChild(favoriButton);

        inventaireDiv.appendChild(carteinfo);
    });
}

function basculerFavori(carte) {
    carte.favori = !carte.favori;


    const cartesInventaire = JSON.parse(localStorage.getItem('cartesInventaire')) || [];
    const index = cartesInventaire.findIndex((c) => c.carte === carte.carte);

    if (index !== -1) {
    cartesInventaire[index].favori = carte.favori;
    localStorage.setItem('cartesInventaire', JSON.stringify(cartesInventaire));
    }


    const carteElement = document.querySelector(`[src="${carte.carte}"]`).parentNode;
    if (carte.favori) {
    carteElement.classList.add('favori');
    } else {
    carteElement.classList.remove('favori');
    }
}

