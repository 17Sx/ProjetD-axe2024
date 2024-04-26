
let form = document.querySelector('form');
console.log(form);

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let email = document.getElementById('email').value
    let mdp = document.getElementById('password').value
  
    const data = {
  
        email:email, 
        password:mdp}
    //console.log(data)
    fetch('http://192.168.1.66:3000/auth/', {
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
