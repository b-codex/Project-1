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
            imgSrc: item.imgSrc,
            recipe: item.recipe,
            desc: item.desc
        }

        db.Recipes.put(newRecipe).catch((err) => log(err.message))

    })
    db.Recipes.toArray((result) => {
        for (const iterator of result) {
            // log(iterator)
            
            let x = document.querySelector('.row')
            // log(x)
            // log(iterator.imgSrc)
            let output = `<div class="col-md-3">
                <div class="card">
                    <div class="card-body">

                        <img src="${iterator.imgSrc}" alt="" class="card-img">
                        <h3 class="card-title">${iterator.foodName}</h3>
                        <hr>

                        <p class="card-description">
                            ${iterator.desc}
                        </p>

                    </div>
                    <a href="./viewRecipe.html" class="btn card-btn"
                        onclick="saveOnSession('${iterator.foodName}')">View Recipe</a>
                </div>

            </div>`

            x.innerHTML += output
            

        }
    })
    // log(typeof(xby))





})