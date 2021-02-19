var db = new Dexie("tempDB");
db.version(1).stores({
    tempDB: 'foodName, prepTime, description, imgSrc, recipe'
})

var dbx = new Dexie('Recipes')
dbx.version(1).stores({
    Recipes: 'foodName, prepTime, description, imgSrc, recipe'
})

function approveRecipe(element) {
    let headers = element.parentElement.parentElement.children
    const fn = headers[1].textContent
    // for (const header of headers) {
    //     log(header)
    // }
    db.tempDB.where("foodName").equals(fn).each(f => {
        const newFOod = {
            foodName: f.foodName,
            prepTime: f.prepTime,
            description: f.description,
            imgDrc: f.imgSrc,
            recipe: f.recipe
        }
        log(newFOod)
        dbx.Recipes.put(newFOod).then(() => {
            log("Recipe has been approved")
        })
    })
    db.tempDB.where('foodName').equals(fn).delete().then(() => {
        log("Recipe has been deleted from tempDB")
    })
}

function disapproveRecipe(element) {
    let headers = element.parentElement.parentElement.children
    const fn = headers[1].textContent
    // for (const header of headers) {
    //     log(header)
    // }
    db.tempDB.where("foodName").equals(fn).delete().then(() => {
        log('Recipe has been disapproved')
        log(fn + ' has been deleted from the tempDB database')
    })
}