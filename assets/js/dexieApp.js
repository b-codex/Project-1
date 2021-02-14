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
                <div class="card ">
                    <div class="card-body ">

                        <img src="${iterator.imgSrc}" alt="" class="card-img">
                        <h3 class="card-title">${iterator.foodName}</h3>
                        <hr>

                        <p class="card-description">
                            ${iterator.desc}
                        </p>

                    </div>
                    <button class="thumbs_up">
                        <span id="thumbs_up_icon"><i class="fa fa-thumbs-up"></i></span>
                        <span id="countLike">0</span> like
                    </button>
                    <button class="thumbs_down">
                        <span id="thumbs_down_icon"><i class="fa fa-thumbs-up"></i></span>
                        <span id="countDislike">0</span> dislike
                    </button>
                    <a href="./viewRecipe.html" class="btn card-btn"
                        onclick="saveOnSession('${iterator.foodName}')">View Recipe</a>
                </div>

            </div>`
            
            x.innerHTML += output
            const thumbs_up = document.querySelector(".thumbs_up") 
            const thumbs_down = document.querySelector(".thumbs_down")

            let countLike = document.querySelector("#countLike")
            let countDislike = document.querySelector("#countDislike")
            let clicked = false;

            
            thumbs_up.addEventListener("click", () =>{
                if(!clicked){
                    clicked = true
                    countLike.textContent++;
                }

                else{
                    clicked = false;
                    // thumbs_up.innerHTML = `<i class="fa fa-thumbs-down icon"></i>`
                    countLike.textContent--;
                }
            });

            thumbs_down.addEventListener("click", () =>{
                if(!clicked){
                    clicked = true
                    // thumbs_up.innerHTML = `<i class="fa fa-thumbs-down icon"></i>`
                    countDislike.textContent++;
                    // console.log("hi");
                }else{
                    clicked = false;
                    // thumbs_down.innerHTML = `<i class="fa fa-thumbs-up icon"></i>`
                    countDislike.textContent--;
                }
            });

        }
    })
    // log(typeof(xby))





})