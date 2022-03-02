const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/user")
const { Message } = require("./models/message")
const jwt = require("jsonwebtoken");

const app = express()
const PORT = 8000;
const JWT_SECRET = "jksjfkafld"

// app.use(express.urlencoded());
app.use(express.json());

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
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "X-Requested-With,content-type"
    );
  
    // Pass to next layer of middleware
    next();
  });

  app.use((req, res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        req.user = jwt.verify(token, JWT_SECRET);
    }
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


//create account
app.post("/users", async (req, res) => {
  const {username, password} = req.body
  const user = new User({username, password})
  await user.save()
  res.json({username})
})

//log-in
app.post("/auth", async (req, res) => {
  const {username, password} = req.body
  const user = await User.login(username, password)
  console.log(username)
    if(user) {
      const userId = user._id.toString()
      const token = jwt.sign(
        {userId, username: user.username},
        JWT_SECRET,
        {expiresIn: 120, subject: userId}
      )
      console.log(token)
      res.json({token})
    } else {
      res.sendStatus(401)
    }
} )

//user-profile
app.get("/profile/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findOne({_id: userId});
    res.send(user.username);
});

// create post
app.post("/message", async (req, res) => {
  const {title, body} = req.body
  const message = new Message({title, body})
  await message.save()
  console.log(req.user)
  res.json({title, body})
  
})




//connect to database
mongoose.connect("mongodb://localhost/micro-blog");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});