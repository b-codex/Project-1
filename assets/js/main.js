import {
    recipes
} from "./recipes.js"

let log = console.log
document.addEventListener('DOMContentLoaded', () => {

    var db = new Dexie("Recipes");
    db.version(1).stores({
        Recipes: 'foodName, likes, prepTime, imgSrc, recipe, description'
    })
    recipes.forEach((item, index) => {

        let newRecipe = {
            foodName: item.foodName,
            prepTime: item.prepTime,
            imgSrc: item.imgSrc,
            likes: item.likes,
            recipe: item.recipe,
            description: item.description
        }

        db.Recipes.put(newRecipe).catch((err) => log(err.message))

    })
    db.Recipes.toArray((result) => {
        for (const iterator of result) {
            // log(iterator)
            
            let x = document.querySelector('.row')
            // log(x)
            // log(iterator.imgSrc)
            let output = `
            
            <div class="card-container col-lg-3 col-12 my-2">

                <div class="card text-center">
                    <img src="${iterator.imgSrc}" class="card-img-top" alt="">
                    <div class="card-body">
                        <div class="title d-flex justify-content-between">
                            <h5 class="card-title">${iterator.foodName}</h5>
                            <a href="" id+"edit_${iterator.foodName}><i class="far fa-edit"></i></a>
                        </div>
                        <hr>
                        <p class="card-text">${iterator.description}</p>
                        <div class="btn-group w-100" role="group" aria-label="">
                            <button type="button" class="btn btn-light thumbs-up" id=''
                                onclick="voteUp(this)">👍</button>
                            <p class="card-text text-center likes mx-3" id="likes">${iterator.likes}</p>
                            <button type="button" class="btn btn-light thumbs-down" id=''
                                onclick="voteDown(this)">👎</button>
                        </div>
                        <div class="btn-group w-75 mt-2" role="group" aria-label="">
                            <button type="button" class="btn btn-recipe" id=''
                                onclick="">View Recipe</button>
                        </div>
                    </div>
                </div>

            </div>
            
            `
            
            x.innerHTML += output

        }
    })




})