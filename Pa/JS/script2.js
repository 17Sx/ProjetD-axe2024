    document.addEventListener('DOMContentLoaded', function () {
        const ouvrirPackButton = document.getElementById('ouvrirPackButton');
        ouvrirPackButton.addEventListener('click', ouvrirPack);

        const btnecg = document.querySelector('.btnecg');
        btnecg.addEventListener('click', afficherContenu);

        const echangeForm = document.getElementById('echangecrt');
        echangeForm.addEventListener('submit', envoyerDemande);

        const tag = ""
    });

//Envoie des cartes + leurs maison + Si elles sont obtenues ou non

    const cartes = {
        Rare: [
            { image: 'img/carte1a.png', obtenue: false,maison: 'Gryffondor'},
            { image: 'img/carte1b.png', obtenue: false,maison: 'Gryffondor'},
            { image: 'img/carte1c.png', obtenue: false,maison: 'Gryffondor'},
            { image: 'img/carte1d.png', obtenue: false,maison: 'Serpentard'},
            { image: 'img/carte1e.png', obtenue: false,maison: 'Gryffondor'},
            { image: 'img/carte1f.png', obtenue: false,maison: 'Gryffondor'},
            { image: 'img/carte1g.png', obtenue: false,maison: 'Serdaigle'},
            { image: 'img/carte1h.png', obtenue: false,maison: 'Serpentard'},
            { image: 'img/carte1i.png', obtenue: false,maison: 'Gryffondor'},
            { image: 'img/carte1j.png', obtenue: false,maison: 'Poufsouffle'},
            { image: 'img/carte1k.png', obtenue: false,maison: 'Poufsouffle'},
        ],
        Epic: [
            { image: 'img/carte2a.png', obtenue: false,maison: 'Gryffondor' },
            { image: 'img/carte2b.png', obtenue: false,maison: 'Gryffondor' },
            { image: 'img/carte2d.png', obtenue: false,maison: 'Gryffondor' },
            { image: 'img/carte2c.png', obtenue: false,maison: 'Serpentard' },
            { image: 'img/carte2e.png', obtenue: false,maison: 'Gryffondor' },
            { image: 'img/carte2f.png', obtenue: false,maison: 'Serpentard' },
            { image: 'img/carte2g.png', obtenue: false,maison: 'Pouffsoufle' },
            { image: 'img/carte2h.png', obtenue: false,maison: 'Serdaigle' },
        ],
        Legendaire: [
        { image: 'img/carte3a.png', obtenue: false,maison: 'Gryffondor' },
        { image: 'img/carte3b.png', obtenue: false,maison: 'Gryffondor' },
        { image: 'img/carte3c.png', obtenue: false,maison: 'Serpentard' },
        { image: 'img/carte3d.png', obtenue: false,maison: 'Serpentard' },
        { image: 'img/carte3e.png', obtenue: false,maison: 'Serdaigle' },
        ],
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

//Fonction pour ouvrir un pack

    function ouvrirPack(event) {
        event.preventDefault();

        const derniereOuverture = localStorage.getItem('derniereOuverture');
        if (derniereOuverture && new Date() - new Date(derniereOuverture) < 0 * 0 * 0 * 0) {
            alert("Vous ne pouvez ouvrir qu'un Pack toutes les 24 heures");
            return;
        }

        cartesinv.innerHTML = '';

    const rare = genererCarteAleatoire('Rare');
        const epic = genererCarteAleatoire('Epic');
        const legendaire = genererCarteAleatoire('Legendaire');

        sauvegarderCartesDansInventaire(rare);
        sauvegarderCartesDansInventaire(epic);
        sauvegarderCartesDansInventaire(legendaire);

    afficherCarte(rare);
    afficherCarte(epic);
        afficherCarte(legendaire);

        cartesGenerees.Rare.push(rare);
        cartesGenerees.Epic.push(epic);
        cartesGenerees.Legendaire.push(legendaire);

        localStorage.setItem('derniereOuverture', new Date());
    }

    //Generer les carte en aleatoires 

    function genererCarteAleatoire(rarete) {
        const cartesrare = [];
        
        for (const carte of cartes[rarete]) {
        if (!carte.obtenue) {
            cartesrare.push(carte);
        }
        }
    
        if (cartesrare.length === 0) {
        for (const rarete in cartes) {
            for (const carte of cartes[rarete]) {
            carte.obtenue = false;
            }
        }
        }
    
        const indexAleatoire = Math.floor(Math.random() * cartesrare.length);
        const carteAleatoire = cartesrare[indexAleatoire];
        carteAleatoire.obtenue = true;
    
        return { carte: carteAleatoire.image};
    }
//Pour afficher les cartes

    function afficherCarte(carte) {
        const carteinfo = document.createElement('div');
        carteinfo.classList.add('carte');
        const imageinfo = document.createElement('img'); 
        imageinfo.src = carte.carte;
        carteinfo.appendChild(imageinfo);

        const cartesContainer = document.getElementById('cartesContainer');
        cartesContainer.appendChild(carteinfo);
    }
    
    //Pour les demmandes d'echanges

    function afficherContenu() {
        var contenu = document.getElementById("btnflott");
        contenu.style.display = "block";
    }

//Envoie la demmande dans la console

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
//function filtre



//function filtre
let choixMaison = document.getElementById('choixMaison');
choixMaison.addEventListener("change", function () {
    const tag = choixMaison.value;


    cartesinv.innerHTML = '';

    
    for (const rarete in cartes) {
        for (const carte of cartes[rarete]) {
            if (tag === "" || carte.maison === tag) {
                afficherCarte({ carte: carte.image,});
            }
        }
    }
});

