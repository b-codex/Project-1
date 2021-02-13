// Selectors

// const foodName = document.querySelector('')
// const prepTime = document.querySelector('')
// const ingredients = document.querySelector('')
// const instruction = document.querySelector('')
// const description = document.querySelector('')


const log = console.log

document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.querySelector('#bbb')
    postButton.addEventListener('click', postFood)
    
    var db = new Dexie("tempDB");
    db.version(1).stores({
        tempDB: 'foodName, prepTime, ingredients, instruction, description'
    })
    
    function postFood() {
        let newFood = {
            foodName: 'Nutella Brownies',
            prepTime: '40 mins',
            desc: 'These Nutella Brownies have tons of that awesome chocolate and hazelnut Nutella flavor. They are unbelievably delicious.',
            imgSrc: 'https://spicysouthernkitchen.com/wp-content/uploads/Nutella-Brownies-8.jpg',
            recipe: {
                ingredients: [
                    '6 tablespoons unsalted butter, melted',
                    '1/2 cup packed light brown sugar',
                    '2 large eggs',
                    '2 teaspoons vanilla extract',
                    '1/2 teaspoon kosher salt',
                    '1 1/4 cups Nutella, divided',
                    '2/3 cup all-purpose flour',
                    '1/2 cup semi-sweet chocolate chips',
                ],
                instruction: `
                Preheat oven to 350 degrees. Grease an 8-inch square baking dish. Line the pan with parchment paper, being sure it overhangs on the sides. Grease the parchment paper with cooking spray or butter.
                In a large bowl, whisk together melted butter and brown sugar. Whisk in the eggs and vanilla extract and salt.
                Use a wooden spoon to stir 1 cup of the Nutella until completely mixed in.
                Stir the flour in just until combined.
                Stir in the chocolate chips.
                Transfer batter to prepared pan.
                Drop the remaining Nutella by teaspoonfuls on the top. Use a knife to swirl the Nutella into the batter.
                Bake for 30 to 35 minutes. Do not overbake. It will still look a little underdone in the middle.
                Let cool and then lift the the parchment paper out of the pan. Cut into squares.
            `
            }
        }
    
        db.tempDB.put(newFood).catch(err => {
            log(err.message)
        })
    }
})