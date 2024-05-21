document.addEventListener('DOMContentLoaded', function() {

    let cursor = document.querySelector('.custom-cursor');
    let cursorBefore = document.querySelector('.custom-cursor-before');

    if (cursor && cursorBefore) {
        document.addEventListener('mousemove', e => {
            window.requestAnimationFrame(() => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                cursorBefore.style.left = e.clientX + 'px';
                cursorBefore.style.top = e.clientY + 'px';
            });
        });
    }
    
    const btnecg = document.querySelector('.btnecg');
    btnecg.addEventListener('click', openPopupi);


    const echangeForm = document.getElementById('echangecrt');
    echangeForm.addEventListener('submit', envoyerDemande);

    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closePopup);
    });

});


function toggleMenu() {
    var menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}



function openPopupi() {
    const myPopup = document.getElementById('myPopup');
    myPopup.style.display = 'block';
}

function closePopup() {
    const myPopup = document.getElementById('myPopup',);
    myPopup.style.display = 'none';
}