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
            <div class="col-4 m-auto d-flex justify-content-around text-center mt-5 pt-5">
                <div class="card shadow">
                    <div class="card-body cardAdmin">

                        <img id="imgSrcCard" alt="" class="card-img" src="${iterator.imgSrc}">
                        <h3 id="" class="card-title pt-3">${iterator.foodName}</h3>

                        <hr>

                        <h3>Description</h3>
                        <p id="" class="card-description">${iterator.description}</p>

                        <h3>Preparation Time</h3>
                        <p id="">${iterator.prepTime}</p>

                        <h3>Ingredients</h3>
                        <div id="" class="text-center">${iterator.recipe.ingredients}</div>

                        <h3>Instruction</h3>
                        <div id="" class="text-center">${iterator.recipe.instruction}</div>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-light mx-2 approveButton" id='' onclick="approveRecipe(this)">Approve 👍
                            </button>
                            <button type="button" class="btn btn-light disapproveButton" id='' onclick = "disapproveRecipe(this)">Disapprove 👎</button>
                        </div>
                    </div>
                </div>
            </div>
            `
            x.innerHTML += output


        }
    })

})