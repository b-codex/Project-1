import {
    recipes
} from "./recipes.js"

let log = console.log
document.addEventListener('DOMContentLoaded', () => {

    var db = new Dexie("Recipes");
    db.version(1).stores({
        Recipes: 'foodName, prepTime, imgSrc, recipe'
    })

    recipes.forEach((item, index) => {

        let newRecipe = {
            foodName: item.foodName,
            prepTime: item.prepTime,
            img: item.img,
            recipe: item.recipe
        }

        db.Recipes.put(newRecipe).catch((err) => log(err.message))

    })

    const xby = db.Recipes.where({
        key: '0'
    })
    log(xby)


})