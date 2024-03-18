const charactersDiv = document.getElementById('characters');

fetch('https://hp-api.lainocs.fr/characters')
.then(response => response.json())
.then(characters => {
    characters.forEach(character => {
    const characterDiv = document.createElement('div');
    characterDiv.classList.add('character');

    const name = document.createElement('h2');
    name.textContent = character.name;
    characterDiv.appendChild(name);

    const image = document.createElement('img');
    image.src = character.image;
    characterDiv.appendChild(image);

    const house = document.createElement('p');
    house.textContent = `Maison : ${character.house}`;
    characterDiv.appendChild(house);

    const hairs = document.createElement('p');
    hairs.textContent=`Hairs : ${character.hairs}`;
    characterDiv.appendChild(hairs);

    const actor = document.createElement('p');
    actor.textContent = `Acteur : ${character.actor}`;
    characterDiv.appendChild(actor);

    charactersDiv.appendChild(characterDiv);
    });
})
.catch(error => console.error('Error:', error));