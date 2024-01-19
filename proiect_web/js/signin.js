let users = [];
var email = document.getElementById('email-input').textContent;
var password = document.getElementById('password-input').textContent;

function signin() {
    users.push(email, password);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    users.forEach((user) => {
        console.log(user.email, user.password);
    });
}