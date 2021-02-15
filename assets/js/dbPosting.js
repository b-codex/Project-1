// Selectors

const foodName = document.querySelector('#foodName')
const prepTime = document.querySelector('#prepTime')
const ingredients = document.querySelector('#ingredients')
const instruction = document.querySelector('#instruction')
const description = document.querySelector('#description')
const imgSrc = document.querySelector('#imgSrc')

const postButton = document.querySelector('#postButton')

const log = console.log

document.addEventListener('DOMContentLoaded', () => {
    postButton.addEventListener('click', postFood)

    var db = new Dexie("tempDB");
    db.version(1).stores({
        tempDB: 'foodName, prepTime, ingredients, instruction, description'
    })

    function postFood(e) {
        e.preventDefault()
        let ing = ingredients.value.split(',')
        let ins = instruction.value.split(',')



        let newFood = {
            foodName: foodName.value,
            prepTime: prepTime.value,
            description: description.value,
            imgSrc: imgSrc.value,
            recipe: {
                ingredients: ing,
                instruction: ins
            }
        }

        db.tempDB.put(newFood)
            .then(() => {
                log('Recipe Added')
                // log(typeof (Array.from(ing)))
                window.location.href = 'index.html'
            })
            .catch(err => {
                log(err.message)
            })
    }
})