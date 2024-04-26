document.addEventListener('DOMContentLoaded', function () {
    afficherCartesDansInventaire();
});

const inventaireDiv = document.getElementById('cartesContainer');

// Fonction pour afficher les cartes dans la page inventaire.html
function afficherCartesDansInventaire() {
    const cartesInventaire = JSON.parse(localStorage.getItem('cartesInventaire')) || [];
    const choixMaison = document.getElementById('choixMaison').value;

    inventaireDiv.innerHTML = '';

    cartesInventaire.forEach((carte) => {
        // Filtrer les cartes en fonction de la maison sélectionnée
        if (choixMaison && carte.house !== choixMaison) {
            return; // Ignorer cette carte si la maison ne correspond pas
        }

            const carteinfo = document.createElement('div');
            carteinfo.classList.add('carte');

            const imageinfo = document.createElement('img');
            imageinfo.src = carte.carte;

            const favoriButton = document.createElement('button');
            favoriButton.textContent = '♥';
            favoriButton.classList.add('favori-button', 'favori-inventaire');
            favoriButton.addEventListener('click', () => basculerFavori(carte, favoriButton));

            const infoButton = document.createElement('button');
            infoButton.textContent = 'Info';
            infoButton.classList.add('info-button', 'info-inventaire');
            infoButton.addEventListener('click', () => basculerFavori(carte, infoButton));

            carteinfo.appendChild(imageinfo);
            carteinfo.appendChild(favoriButton);

            inventaireDiv.appendChild(carteinfo);

            // Ajouter la classe "clicked" si la carte est en favori
            if (carte.favori) {
                favoriButton.classList.add('clicked');
            }
        });
    }

    // Fonction pour faire en sorte que quand on clique sur le bouton FAV ça les ajoute dans les favoris
    function basculerFavori(carte, favoriButton) {
        carte.favori = !carte.favori;

        const cartesInventaire = JSON.parse(localStorage.getItem('cartesInventaire')) || [];
        const index = cartesInventaire.findIndex((c) => c.carte === carte.carte);

        if (index !== -1) {
            cartesInventaire[index].favori = carte.favori;
            localStorage.setItem('cartesInventaire', JSON.stringify(cartesInventaire));
        }

        const carteElement = favoriButton.parentNode;
        if (carte.favori) {
            carteElement.classList.add('favori');
            alert("Carte ajoutée au Favoris ♥");
        } else {
            carteElement.classList.remove('favori');
            alert("Carte retirée des Favoris ♥ ");
        }

        // Ajouter/retirer la classe "clicked" pour changer la couleur du texte
        favoriButton.classList.toggle('clicked', carte.favori);
    }

    
