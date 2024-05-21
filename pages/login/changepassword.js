

let changePasswordForm = document.querySelector('form');

changePasswordForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let oldPassword = document.getElementById('oldPassword').value
    let newPassword = document.getElementById('newPassword').value
    let confirmPassword = document.getElementById('confirmPassword').value
    let token = localStorage.getItem('token')
    const data = {
        oldPassword:oldPassword, 
        newPassword:newPassword, 
        confirmPassword:confirmPassword}
        fetch('http://192.168.1.20:3000/auth/changepassword', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                'x-access-token': token
            },
            body: JSON.stringify(data) 
        })
        .then(response => {
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError("Oops, we haven't got JSON!");
            }
            return response.json();
        })
        .then(json => {
            console.log(json)
            window.location.href = "./../login/index.html"
        })
        .catch(error => console.error('Error:', error));
});