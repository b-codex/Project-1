import {
    recipes
} from "./recipes.js"

let log = console.log

let db

document.addEventListener('DOMContentLoaded', () => {
    let rDB = indexedDB.open('Recipes', 1)

    rDB.onsuccess = () => {
        log('Database Ready!!!')
        db = rDB.result
        // recipes.forEach((item, index) => {
        //     log(item)
        // })
        
        addToDB()

    }

    rDB.onerror = () => {
        log('Error Creating Database')
    }

    rDB.onupgradeneeded = (e) => {
        log('Upgrade Complete!!!')

        let db = e.target.result

        let rStore = db.createObjectStore('Recipes', {
            key: 'id',
            autoIncrement: true
        })

        rStore.createIndex('Recipe', 'Recipe', {
            unique: true
        })

        log('Database Ready & Fields Created!!!')
    }

    function addToDB() {
        // let newRecipe = {
        //     foodName: 'BBQ Grilled Chicken',
        //     prepTime: '45 Min(s)',
        //     recipe: {
        //         ingredients: [
        //             '1 tablespoon butter',
        //             '2 garlic cloves, minced',
        //             '1 cup ketchup',
        //             '1/4 cup packed brown sugar',
        //             '1/4 cup chili sauce',
        //             '2 tablespoons Worcestershire sauce',
        //             '1 tablespoon yellow mustard',
        //             '1/2 teaspoon celery seed',
        //             '1/4 teaspoon salt',
        //             '1/4 teaspoon pepper',
        //             '1/4 teaspoon cayenne pepper',
        //             '1 chicken, cut up'
        //         ],
        //         instruction: `
        //             1. Melt butter in a saucepan and add garlic. Cook for 1 minute.
        //             2. Add remaining ingredients, EXCEPT chicken. Bring to a boil and simmer for 2 to 3 minutes. Remove from heat. Note: Can be made a day in advance and refrigerated.
        //             3. Heat grill to medium and lightly grease the grates. Place chicken on grill and cook for 30 to 40 minutes, turning occasionally.
        //             4. Baste chicken with sauce. Continue to grill and baste with sauce every 5 minutes for 15 more minutes. Serve with any leftover sauce.`
        //     }
        // }

        let transaction = db.transaction(['Recipes'], 'readwrite')
        let objectStore = transaction.objectStore('Recipes')

        recipes.forEach((item, index) => {

            let newRecipe = {
                foodName: item.foodName,
                prepTime: item.prepTime,
                recipe: item.recipe
            }

            // log(newRecipe)
            let request = objectStore.add(newRecipe)

            request.onsuccess = () => {
                log('req success')
            }
            transaction.oncomplete = () => {
                console.log('Recipe Added')
            }
            transaction.onerror = () => {
                console.log('Error Adding Recipe')
            }

        })

        return function(){}

    }

})