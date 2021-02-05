const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { type } = require('os');

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

mongoose.connect("mongodb://localhost:27017/Project-2", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auto_reconnect: true
    })
    .catch((err) => {
        console.log(err.message)
    })
console.log("Database Connection Successful")

app.get("/", function (req, res) {
    res.sendFile('index.html')
})

var userSchema = new mongoose.Schema({
    name: String,
    email: String
})

var User = mongoose.model('User', userSchema)

app.post("/post", (req, res) => {
    const name = req.body.name
    const email = req.body.email

    var newUser = new User({
        name: name,
        email: email
    })

    newUser.save()
    console.log('User Added');
    res.redirect('/')
})

app.post('/getUsers', (req, res) => {
    User.find({}, (err, data) => {
        if (err) console.log(err.message)
        else {
            res.status(200).send(data)
            for (const iterator of data) {
                console.log(iterator.name, iterator.email);
            }
        }
    })
})

app.listen(port, () => {
    console.log("Listening On Port " + port);
})