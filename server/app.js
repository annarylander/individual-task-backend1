const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/user")
const { Blog } = require("./models/blog")
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

  //middleware to authorize user
  app.use((req, res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        req.user = jwt.verify(token, JWT_SECRET);
    }
    next();
});

//delete this later
app.get('/', async (req, res) => {
       const users = await User.find().exec()
       res.render("index.ejs", { users })
   })


//see all users
app.get("/people", (req, res) => {
     User.find({}.sort({date: -1}), function (err, users) {
       if (err) return handleError(err);
       res.send({users
       });
     });
   });


//see all posts
app.get("/feed", (req, res) => {
  Blog.find({}, function (err, blogs) {
    if (err) return handleError(err);
    res.send({blogs
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
        {expiresIn: 1200, subject: userId}
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
app.post("/blog", async (req, res) => {
  const body = req.body.body
  const postedByID = req.user.userId
  const postedByName = req.user.username
  console.log(req.user)
  const blog = new Blog({body, postedByID, postedByName})
  await blog.save()
  console.log(postedByName)
  res.json({body, postedByID, postedByName})  
})

//routes


//connect to database
mongoose.connect("mongodb://localhost/micro-blog");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});