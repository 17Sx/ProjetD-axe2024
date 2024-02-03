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

        carteinfo.appendChild(imageinfo);

        inventaireDiv.appendChild(carteinfo);
    });
}
