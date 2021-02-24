import postRecipeToDB from "./postRecipeToDB.js"

let log = console.log
document.addEventListener('DOMContentLoaded', () => {
    var db = new Dexie("Recipes");
    db.version(1).stores({
        Recipes: 'foodName, likes, prepTime, description, imgSrc, recipe '
    })

    // postRecipeToDB()

    db.Recipes.toArray((result) => {
        let x = document.querySelector('.row')
        x.innerHTML = ''
        for (const iterator of result) {

            // Limit the description to 9 words os the card is not too long
            function truncate (text, limit, append) {
                if (typeof text !== 'string')
                return '';
                if (typeof append == 'undefined')
                append = '...';
                var parts = text.split(' ');
                if (parts.length > limit) {
                    // loop backward through the string
                    for (var i = parts.length - 1; i > -1; --i) {
                        // if i is over limit, drop this word from the array
                        if (i+1 > limit) {
                            parts.length = i;
                        }
                    }
                    // add the truncate append text
                    parts.push(append);
                }
                // join the array back into a string
                return parts.join(' ');
            }
            
            let str = iterator.description
            let description = truncate(str, 9, '...')
            // log(description)

            let loading = `
                    <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
            `

            // x.innerHTML = loading

            let output = `
            
            <div class="card-container col-md-3 col-lg-2 col-12 my-2">

                <div class="card text-center">
                    <img src="${iterator.imgSrc}" class="card-img-top imgSrcCard" alt="">
                    <div class="card-body">
                        <div class="title w-100 d-flex justify-content-center">
                            <h5 class="card-title">${iterator.foodName}</h5>
                        </div>
                        <hr>
                        <p class="card-text">${description}</p>

                        <div class="btn-group w-75 mt-2" role="group" aria-label="">
                            <button type="button" class="btn btn-recipe text-white" id=''
                                onclick="saveOnSession('${iterator.foodName}')">View Recipe</button>
                        </div>
                    </div>
                </div>

            </div>
            `

            x.innerHTML += output
        }
    })
})