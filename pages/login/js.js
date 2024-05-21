
let form = document.querySelector('form');
console.log(form);

let storedEmail = localStorage.getItem('email');
let storedPassword = localStorage.getItem('password');

if (storedEmail && storedPassword) {
    document.getElementById('email').value = storedEmail;
    document.getElementById('password').value = storedPassword;
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let email = document.getElementById('email').value
    let mdp = document.getElementById('password').value

    localStorage.setItem('email', email);
    localStorage.setItem('password', mdp);
  
    const data = {
  
        email:email, 
        password:mdp}

        
    //console.log(data)
    fetch('http://192.168.1.20:3000/auth', {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data) 
      })
    .then(response => response.json())
    .then(json => {
        console.log(json)
        token = json['token']
        console.log(token)
        localStorage.setItem('token', token)
        window.location.href = "./../user/index.html"
      })
    .catch(error => console.error('Error:', error))

})
