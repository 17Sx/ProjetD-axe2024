document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('character-name').innerText = urlParams.get('name');
    document.getElementById('character-image').src = urlParams.get('image');
    document.getElementById('character-image').alt = urlParams.get('name');
    document.getElementById('character-eyes').innerText = urlParams.get('eyes');
    document.getElementById('character-hairs').innerText = urlParams.get('hairs');
    document.getElementById('character-birthday').innerText = new Date(urlParams.get('birthday')).toLocaleDateString('fr-FR');
    document.getElementById('character-blood').innerText = urlParams.get('blood');
    document.getElementById('character-wand').innerText = urlParams.get('wand');
    document.getElementById('character-patronus').innerText = urlParams.get('patronus');
    document.getElementById('character-role').innerText = urlParams.get('role');
    document.getElementById('character-house').innerText = urlParams.get('house');
    document.getElementById('character-actor').innerText = urlParams.get('actor');
});