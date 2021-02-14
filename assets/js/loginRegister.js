// Selectors

const loginName = document.querySelector('')
const loginPassword = document.querySelector('')

const fullName = document.querySelector('')
const email = document.querySelector('')
const password = document.querySelector('')

const loginButton = document.querySelector('')
const registerButton = document.querySelector('')

const log = console.log

loginButton.addEventListener('click', login)

function login() {
    if (loginName == 'admin' && loginPassword == 'admin') {
        window.location.href = 'admin.html'
    } else {

    }
}

var db = new Dexie("Users");
db.version(1).stores({
    Users: 'fullName, Email, Password'
})

registerButton.addEventListener('click', register)

function register() {
    let user = {
        fullName: fullName,
        Email: email,
        Password: password
    }

    db.Users.put(user).catch((err) => {log(err.message)})
}