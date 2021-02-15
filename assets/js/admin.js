let log = console.log
document.addEventListener('DOMContentLoaded', () => {

    var db = new Dexie("tempDB");
    db.version(1).stores({
        tempDB: 'foodName, prepTime, recipe, description'
    })
    db.tempDB.toArray((result) => {
        for (const iterator of result) {
            // log(iterator)

            let x = document.querySelector('.row')
            // x.innerHTML = ''

            let output = `
            <div class="col-md-6 m-auto">
                <div class="card shadow">
                    <div class="card-body cardAdmin" >

                        <img id="imgSrc" alt="" class="card-img" src="${iterator.imgSrc}">
                        <h3 id="foodName" class="card-title">${iterator.foodName}</h3>

                        <hr>

                        <h3>Description</h3>
                        <p id="description" class="card-description">${iterator.description}</p>

                        <h3>Preparation Time</h3>
                        <p id="prepTime">${iterator.prepTime}</p>

                        <h3>Ingredients</h3>
                        <div id="ingredients" class="text-center"></div>

                        <h3>Instruction</h3>
                        <div id="instruction" class="text-center"></div>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-light btncol mx-2" id='approve'>Approve 👍
                            </button>
                            <button type="button" class="btn btn-dark btndis" id='disapprove'>Disapprove  👎</button>
                        </div>
                    </div>
                </div>
            </div>
            `
            setTimeout(() => {
                const ingredients = document.querySelector('#ingredients')
                const instruction = document.querySelector('#instruction')

                for (let index = 0; index < iterator.recipe.ingredients.length; index++) {
                    const v = document.createElement("p")
                    v.innerHTML = iterator.recipe.ingredients[index]
                    ingredients.appendChild(v)
                    log(iterator.recipe.ingredients[index])
                }

                for (let index = 0; index < iterator.recipe.instruction.length; index++) {
                    const v = document.createElement("p")
                    v.innerHTML = iterator.recipe.instruction[index]
                    instruction.appendChild(v)
                    // log(iterator.recipe.instruction[index])
                }

                const approveButton = document.getElementById('approve')
                const disapproveButton = document.getElementById('disapprove')

                approveButton.addEventListener('click', approveRecipe)
                disapproveButton.addEventListener('click', disapproveRecipe)

                function approveRecipe() {
                    let ing = []
                    let ins = []

                    iterator.recipe.ingredients.forEach(element => {
                        ing.push(element)
                    })

                    iterator.recipe.instruction.forEach(element => {
                        ins.push(element)
                    })

                    let newFood = {
                        foodName: iterator.foodName,
                        prepTime: iterator.prepTime,
                        description: iterator.description,
                        imgSrc: iterator.imgSrc,
                        recipe: {
                            ingredients: ing,
                            instruction: ins
                        }
                    }


                    var dbx = new Dexie("Recipes");
                    dbx.version(1).stores({
                        Recipes: 'foodName, prepTime, imgSrc, recipe, description'
                    })

                    dbx.Recipes.put(newFood)
                        .then(() => {
                            log('Recipe Added')
                        })
                        .catch(err => {
                            log(err.message)
                        })
                    db.tempDB.where("foodName").equals(iterator.foodName).delete().then(() => {
                        log(iterator.foodName + ' has been deleted from the database')
                    })
                    window.location.reload()
                }

                function disapproveRecipe() {
                    db.tempDB.where("foodName").equals(iterator.foodName).delete().then(() => {
                        log(iterator.foodName + ' has been deleted from the database')
                    })
                    window.location.reload()
                }

            });

            x.innerHTML += output


        }
    })

})