    document.addEventListener('DOMContentLoaded', function () {
        const ouvrirPackButton = document.getElementById('ouvrirPackButton');
        ouvrirPackButton.addEventListener('click', ouvrirPack);

        const btnecg = document.querySelector('.btnecg');
        btnecg.addEventListener('click', afficherContenu);

        const echangeForm = document.getElementById('echangecrt');
        echangeForm.addEventListener('submit', envoyerDemande);

    });

    const cartes = {
        Rare: [
            { image: 'img/carte1a.png', obtenue: false },
            { image: 'img/carte1b.png', obtenue: false },
            { image: 'img/carte1c.png', obtenue: false },
            { image: 'img/carte1d.png', obtenue: false },
            { image: 'img/carte1e.png', obtenue: false },
            { image: 'img/carte1f.png', obtenue: false },
            { image: 'img/carte1g.png', obtenue: false },
            { image: 'img/carte1h.png', obtenue: false },
            { image: 'img/carte1i.png', obtenue: false },
        ],
        Epic: [
            { image: 'img/carte2a.png', obtenue: false },
            { image: 'img/carte2b.png', obtenue: false },
            { image: 'img/carte2d.png', obtenue: false },
            { image: 'img/carte2c.png', obtenue: false },
            { image: 'img/carte2e.png', obtenue: false },
            { image: 'img/carte2f.png', obtenue: false },
        ],
        Legendaire: [
        { image: 'img/carte3a.png', obtenue: false },
        { image: 'img/carte3b.png', obtenue: false },
        { image: 'img/carte3c.png', obtenue: false },
        { image: 'img/carte3d.png', obtenue: false },
        ],
    };

    const cartesGenerees = {
        Rare: [],
        Epic: [],
        Legendaire: [],
    };

    const cartesinv = document.getElementById('cartesContainer');

    function sauvegarderCartesDansInventaire(carte) {
    const cartesInventaire = JSON.parse(localStorage.getItem('cartesInventaire')) || [];
    const carteDejaPresente = cartesInventaire.some(carteInventaire => carteInventaire.carte === carte.carte);

        if (!carteDejaPresente) {
        cartesInventaire.push(carte);
            localStorage.setItem('cartesInventaire', JSON.stringify(cartesInventaire));
        }
    }

    function ouvrirPack(event) {
        event.preventDefault();

        const derniereOuverture = localStorage.getItem('derniereOuverture');
        if (derniereOuverture && new Date() - new Date(derniereOuverture) < 0 * 0 * 0 * 0) {
            alert("Vous ne pouvez ouvrir qu'un Pack toutes les 24 heures");
            return;
        }

        cartesinv.innerHTML = '';

    const Rare = genererCarteAleatoire('Rare');
        const Epic = genererCarteAleatoire('Epic');
        const Legendaire = genererCarteAleatoire('Legendaire');

        sauvegarderCartesDansInventaire(Rare);
        sauvegarderCartesDansInventaire(Epic);
        sauvegarderCartesDansInventaire(Legendaire);

    afficherCarte(Rare);
        afficherCarte(Epic);
        afficherCarte(Legendaire);

        cartesGenerees.Rare.push(Rare);
        cartesGenerees.Epic.push(Epic);
        cartesGenerees.Legendaire.push(Legendaire);

        localStorage.setItem('derniereOuverture', new Date());
    }

    function genererCarteAleatoire(rarete) {
    const cartesrare = cartes[rarete].filter(carte => !carte.obtenue);
        if (cartesrare.length === 0) {
            
            for (const rarete in cartes) {
            cartes[rarete].forEach(carte => carte.obtenue = false);
            }
        }

        const carteAleatoire = cartesrare[Math.floor(Math.random() * cartesrare.length)];
    carteAleatoire.obtenue = true;
        return { carte: carteAleatoire.image, rarete: rarete };
    }

    function afficherCarte(carte) {
        const carteinfo = document.createElement('div');
        carteinfo.classList.add('carte');
        const imageinfo = document.createElement('img');
        imageinfo.src = carte.carte;
        carteinfo.appendChild(imageinfo);

        const cartesContainer = document.getElementById('cartesContainer');
        cartesContainer.appendChild(carteinfo);
    }
    

    function afficherContenu() {
        var contenu = document.getElementById("btnflott");
        contenu.style.display = "block";
    }

    function envoyerDemande(event) {
        event.preventDefault();
    
        const nom = document.getElementById('nom').value
        const email = document.getElementById('email').value;
        const choixCarte = document.getElementById('choixCarte').value
        console.log('Nom:', nom);
        console.log('Email:', email);
        console.log('Choix de carte:', choixCarte);
        var contenu = document.getElementById("btnflott");
        contenu.style.display = "none";
    }
    
    function afficherContenu() {
        var contenu = document.getElementById("btnflott")
        contenu.style.display = "block";
    }