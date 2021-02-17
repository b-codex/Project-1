// Selectors

const signInEmail = document.querySelector('#signInEmail')
const signInPassword = document.querySelector('#signInPassword')

const fullName = document.querySelector('#fullName')
const registerEmail = document.querySelector('#registerEmail')
const registerPassword = document.querySelector('#registerPassword')

const signInButton = document.querySelector('#signInButton')
const registerButton = document.querySelector('#registerButton')

const log = console.log

var db = new Dexie("Users");
db.version(1).stores({
    Users: 'Email, fullName, Password'
})

signInButton.addEventListener('click', signIn)

function signIn(e) {
    e.preventDefault()
    if (signInEmail.value == 'admin' && signInPassword.value == 'admin') {
        window.location.href = 'admin.html'
    } else {
        db.Users.where('Email').equals(signInEmail.value).toArray((result) => {
            for (x of result) {
                if (signInPassword.value == x.Password) {
                    log('Sign In Successful')
                    window.location.href = 'postFood.html'
                } else {
                    signInPassword.style.transition = 'all .6s ease-in-out'
                    signInPassword.style.borderBottom = '1px solid red'
                    setTimeout(() => {
                        signInPassword.style.borderBottom = '1px solid black'
                    }, 3000)
                    log('Sign In Failed')
                }
            }
        }).catch((err) => {
            log(err.message)
        })

    }
}


registerButton.addEventListener('click', register)

function register(e) {
    e.preventDefault()

    let user = {
        fullName: fullName.value,
        Email: registerEmail.value,
        Password: registerPassword.value
    }

    db.Users.add(user)
        .then(() => {
            log('New User Added')
            window.location.href = 'postFood.html'
        })
        .catch((err) => {
            log(err.message)
            alert('User already exists')
        })

}