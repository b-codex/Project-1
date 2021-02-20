import postRecipeToDB from "./postRecipeToDB.js"

let log = console.log
document.addEventListener('DOMContentLoaded', () => {
    var db = new Dexie("Recipes");
    db.version(1).stores({
        Recipes: 'foodName, likes, prepTime, description, imgSrc, recipe '
    })

    // postRecipeToDB()

    db.Recipes.toArray((result) => {
        for (const iterator of result) {

            let x = document.querySelector('.row')

            let output = `<div class="col-md-3">
                <div class="card ">
                    <div class="card-body ">

                        <img src="${iterator.imgSrc}" alt="" class="card-img">
                        <h3 class="card-title foodName">${iterator.foodName}</h3>
                        <hr>

                        <p class="card-description">
                            ${iterator.description}
                        </p>

                        <a href="./viewRecipe.html" class="btn card-btn"
                            onclick="saveOnSession('${iterator.foodName}')">View Recipe</a>
                    </div>
                   
                </div>

            </div>`

            x.innerHTML += output
        }
    })
})