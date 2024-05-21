window.addEventListener('DOMContentLoaded', async () => {
    const charactersContainer = document.getElementById('characters');

    try {
        let response = await fetch('https://hp-api.lainocs.fr/characters/', {
            headers: {
                'Origin': 'https://hp-api.lainocs.fr/characters/'
            }
        });

        if (!response.ok) {
            throw new Error;
        }

        let characters = await response.json();

        characters.forEach(character => {
            let characterElement = document.createElement('div');
            characterElement.classList.add('carte');
            characterElement.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <p>${character.name}</p>
            `;
            characterElement.addEventListener('click', () => {
                window.location.href = `character.html?name=${encodeURIComponent(character.name)}&image=${encodeURIComponent(character.image)}&eyes=${encodeURIComponent(character.eyes)}&hairs=${encodeURIComponent(character.hairs)}&birthday=${encodeURIComponent(character.birthday)}&blood=${encodeURIComponent(character.blood)}&wand=${encodeURIComponent(character.wand)}&patronus=${encodeURIComponent(character.patronus ? character.patronus : 'N/A')}&role=${encodeURIComponent(character.role)}&house=${encodeURIComponent(character.house ? character.house : 'N/A')}&actor=${encodeURIComponent(character.actor)}`;
            });
            charactersContainer.appendChild(characterElement);
        });

        morescale();

    } catch (error) {
        console.error('Erreur:', error);
    }
});

const searchinput = document.querySelector('.searchinput');
searchinput.addEventListener('input', checkInput);

function checkInput(e) {
    const allImages = document.querySelectorAll('.characters .carte img');
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
