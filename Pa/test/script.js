function ouvrirCarte() {
    const derniereOuverture = localStorage.getItem('derniereOuverture');
    if (derniereOuverture && new Date() - new Date(derniereOuverture) < 24 * 60 * 60 * 1000) {
      alert("Vous ne pouvez ouvrir qu'une carte toutes les 24 heures.");
      return;
    }
  
    const cartesContainer = document.getElementById('cartes-container');
    cartesContainer.innerHTML = '';
  
    const rarete1 = genererCarteAleatoire('rarete1');
    const rarete2 = genererCarteAleatoire('rarete2');
    const rarete3 = genererCarteAleatoire('rarete3');
  
    afficherCarte(rarete1);
    afficherCarte(rarete2);
    afficherCarte(rarete3);
  
    localStorage.setItem('derniereOuverture', new Date());
  }
  
  function genererCarteAleatoire(rarete)
  {

    const cartes = {
    rarete1: ['carte1a.jpg', 'carte1b.jpg', 'carte1c.jpg'],
    rarete2: ['carte2a.jpg', 'carte2b.jpg', 'carte2c.jpg'],
    rarete3: ['carte3a.jpg', 'carte3b.jpg', 'carte3c.jpg'],
    };
    const cartesRareté = cartes[rarete];
    const carteAleatoire = cartesRareté[Math.floor(Math.random() * cartesRareté.length)];
    
    return carteAleatoire;
    }
    
    function afficherCarte(imageSrc) {
    const cartesContainer = document.getElementById('cartes-container');
    
    const carteElement = document.createElement('div');
    carteElement.classList.add('carte');
    
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    
    carteElement.appendChild(imageElement);
    cartesContainer.appendChild(carteElement);
    }  