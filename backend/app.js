const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/user")
const jwt = require("./models/user")

const app = express()
const PORT = 8000;
const JWT_SECRET = "jksjfkafld"


// app.use((req, res, next) => {
//   const authHeader = req.header("Authorization");
//   if (authHeader) {
//       const token = authHeader.split(" ")[1];
//       req.user = jwt.verify(token, JWT_SECRET);
//   }
//   next();
// });

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


//create account
app.post("/users", async (req, res) => {
  const {username, password} = req.body
  const user = new User({username, password})
  await user.save()
  res.json({username})
  console.log(username)
})

//Log-in
// app.post("/auth", async (req, res) => {
//   const {username, password} = req.body
//   const user = await User.login(username, password)
//     if(user) {
//       const userId = user._id.toString()
//       const token = jwt.sign(
//         {userId, username: user.username},
//         JWT_SECRET,
//         {expiresIn: 120, subject: userId}
//       )
//       res.json({token})
//       console.log(token)
//     } else {
//       res.sendStatus(401)
//     }
// } )


//user-profile
app.get("/profile/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findOne({_id: userId});
    res.send(user.username);
});


// create post
app.get("/post", (req, res) => {
   if(req.user) {
     res.json({message: `Whats on your mind %${req.user}`})
   } else {
     res.sendStatus(401)
   }
});


//connect to database
mongoose.connect("mongodb://localhost/micro-blog");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});