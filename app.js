const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/user")

const app = express()
const PORT = 8000;

app.use(express.urlencoded());


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
  
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
  
    // Pass to next layer of middleware
    next();
  });



app.get('/', async (req, res) => {
       const users = await User.find().exec()
       res.render("index.ejs", { users })
   })


app.get("/people", (req, res) => {
     User.find({}, function (err, users) {
       if (err) return handleError(err);
       res.send({users
       });
     });
   });


//skapa konto
app.post("/users", async (req, res, next) => {

    const user = new User(req.body);
    try { 
        await user.save();
        res.redirect("/");
    } catch (error) {
        next(error)
    }
    
    
    //res.render("index.ejs")
    
});

//användarprofil
app.get("/profile/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findOne({_id: userId});
    res.send(user.username);
});


// skapa inlägg
app.get("/post", (req, res) => {
    res.render("post.ejs")
});


//anslut till databas
mongoose.connect("mongodb://localhost/backend1");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});

