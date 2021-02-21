// Selectors

const signInEmail = document.querySelector('#signInEmail')
const signInPassword = document.querySelector('#signInPassword')

const signInButton = document.querySelector('#signInButton')

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
                    window.location.href = 'main.html'
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
