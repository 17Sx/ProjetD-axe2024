
let form = document.querySelector('form');
console.log(form);

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let pseudo = document.getElementById('pseudo').value
    let email = document.getElementById('email').value
    let mdp = document.getElementById('password').value
    let maison = document.getElementById('maison').value

    const data = {
        pseudo:pseudo, 
        email:email, 
        password:mdp, 
        maison :maison}
    fetch('http://192.168.1.20:3000/auth/signup', {
        method: "POST", 
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
        
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
    window.location.href = './../login/index.html';
    })
    .catch(error => console.error('Error:', error))

})
