// Selectors

// const foodName = document.querySelector('')
// const prepTime = document.querySelector('')
// const ingredients = document.querySelector('')
// const instruction = document.querySelector('')
// const description = document.querySelector('')


const log = console.log

document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.querySelector('#bbb')
    postButton.addEventListener('click', postFood)

    var db = new Dexie("tempDB");
    db.version(1).stores({
        tempDB: 'foodName, prepTime, ingredients, instruction, description'
    })

    function postFood() {
        let newFood = {
            foodName: 'Southern Broccoli Casserole',
            prepTime: '55 Min(s)',
            description: 'A cheesy, creamy broccoli casserole with a ritz cracker topping that is a favorite southern side.',
            imgSrc: 'https://spicysouthernkitchen.com/wp-content/uploads/Broccoli-Casserole-5.jpg',
            recipe: {
                ingredients: [
                    '6 cups chopped, fresh broccoli florets',
                    '1 (10 3/4-oz) can condensed cream of mushroom soup',
                    '1 cup mayonnaise',
                    '1/2 stick butter, melted',
                    '2 large eggs, lightly beaten',
                    '1/2 medium onion, finely diced',
                    '1/2 teaspoon salt',
                    '1/4 teaspoon freshly ground black pepper',
                    '1 1/2 cups grated extra-sharp cheddar cheese',
                    '1 full sleeve Ritz crackers, finely crushed',
                ],
                instruction: [
                    'Place broccoli in a steamer basket over simmering water. Cover and steam for approximately 5 minutes. Chop into bite-sized pieces.',
                    'Preheat oven to 350 degrees.',
                    'In a large bowl, combine broccoli, soup, mayonnaise, butter, eggs, onion, salt, and pepper. Mix well.',
                    'Add 1 cup of cheese and mix again.',
                    'Place mixture in a medium buttered casserole dish. Sprinkle remaining cheese and crackers on top.',
                    'Bake for 30 to 40 minutes and let stand for 15 minutes before serving.'
                ]
            }
        }

        db.tempDB.put(newFood).catch(err => {
            log(err.message)
        })
    }
})