const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var port = process.env.PORT || 6969

// mongoose.connect("", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     auto_reconnect: true
// }) 
// .catch((err) => {
//     console.log(err)
// }) 

mongoose.connect("mongodb://localhost:27017/Project-1", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auto_reconnect: true
    })
    .catch((err) => {
        console.log(err.message)
    })
console.log("Database Connection Successful")

// Home Route
app.get("/", function (req, res) {
    res.sendFile('indexB.html')
})

// Creating User Schema
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}) 

var recipeSchema = new mongoose.Schema({
    foodName: String,
    prepTime: String,
    recipe: Object
})


// Creating The Model The DB Is Going To Be Based On
var User = mongoose.model('User', userSchema)

var Recipe = mongoose.model('Recipe', recipeSchema)

// Form Action
app.post("/signUp", (req, res) => {
    // Getting Data From DOM
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    // Adding Data To Schema
    var newUser = new User({
        name: name,
        email: email,
        password: password
    })

    // Saving Data To DB
    newUser.save()
    console.log('User Added');
    res.redirect('/')
})

app.post('/getUsers', (req, res) => {
    User.find({}, (err, data) => {
        if (err) console.log(err.message)
        else {
            // res.status(200).send(data)
            res.redirect('/')
            for (const iterator of data) {
                console.log(iterator.name, iterator.email);
            }
        }
    }) 
})

app.post('/post', (req, res) => {
    const foodName = req.body.foodName
    const ingredient = req.body.ingredient
    const prepTime = req.body.prepTime
    const instructions = req.body.instructions

    let newRecipe = new Recipe({
        foodName: foodName,
        prepTime: `${prepTime} Min(s)`,
        recipe: {
            ingredients: ingredient,
            instructions: instructions
        }
    })

    newRecipe.save()
    console.log('Recipe Added');
    res.redirect('/')
})

app.post('/getRecipes', (req, res) => {
    Recipe.find({}, (err, data) => {
        if (err) console.log(err.message)
        else{
            res.redirect('/')
            // res.status(200).send(data)
            for (const iterator of data) {
                console.log(iterator);
            }
        }
    })
})

app.listen(port, () => {
    console.log("Listening On Port " + port);
})