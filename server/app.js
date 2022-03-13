const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const { User } = require("./models/user");
const { Blog } = require("./models/blog");

const app = express();
const PORT = 8000;
const JWT_SECRET = "jksjfkafld";

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use('/uploads', express.static('./uploads'));

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

//middleware
const requireLogin = (req, res, next) => {
  const authHeader = req.header("Authorization")
  
  try {
      const token = authHeader.split(" ")[1];
      req.user = jwt.verify(token, JWT_SECRET);
      console.log("inloggad")
      next()
  }
  catch {
    res.status(401)
  }
}

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
};

//create account
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.status(201).json({ username });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
});

//log-in
app.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.login(username, password);
  if (user) {
    const userId = user._id.toString();
    const token = jwt.sign({ userId, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
      subject: userId,
    });
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

// all users
app.get("/users", (req, res) => {
  User.find({}, function (err, users) {
    if (err) return handleError(err);
    res.json({users: users });
  });
});

// one user
app.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findOne({_id: userId});
  const blog = await Blog.find({postedByID: userId}).populate("postedByID").sort({published: -1})
  res.json({ 
            blog: blog, 
            user: user});  
});

// all posts
app.get("/blog", async (req, res) => {
    const authHeader = req.header("Authorization")
    try {
        const token = authHeader.split(" ")[1];
        req.user = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({_id: req.user.userId})
        const blogs = await Blog.find({postedByID: {$in: user.following}}).populate("postedByID").sort({published: -1})
        res.json({blogs: blogs})
    }
    catch {req.user = null
      const blogs = await Blog.find().populate("postedByID").sort({published: -1})
      res.json({blogs: blogs})}
    })

// one post
app.get("/blog/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const blog = await Blog.findOne({_id: blogId});
  res.json(blog);
});

// create post
app.post("/blog", requireLogin, async (req, res) => {
  const body = req.body.body;
  const postedByID = req.user.userId;
  const postedByName = req.user.username;
  const postedByImage = req.user.image
  try {
    const blog = await Blog.create({ body, postedByID, postedByName, postedByImage });
  res.status(201).json({ blog });
  } catch (err) {
    handleErrors(err);
    res.status(400);
  }
});

//user-profile
app.get("/profile", requireLogin, async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.send(user);
});


//Update profile-info and image
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
      cb(null, `${req.user.username}-profile.${file.originalname.split(".").slice(-1)[0]}`
      )}
});

const upload = multer({ storage: storage });

app.post('/profile', requireLogin, upload.single('image'), async (req, res, next) => {
   
  let updatedUser = {}

  if (req.body.fullname != "") {
        updatedUser.fullname = req.body.fullname} 
     
  
  if (req.body.email != "") {
    updatedUser.email = req.body.email} 
  
  if (req.body.image != "") {
    updatedUser.image = `http://localhost:8000/uploads/${req.file.filename}`
  }
      
  const user = await User.updateOne(
        { _id: req.user.userId },
        { 
          $set: updatedUser,
        }
      );
});

//follow a user
app.post('/users/:userId/follow', requireLogin, async (req,res)=>{
  const followedUser = req.params.userId;
  await User.updateOne(
    { _id: req.user.userId }, 
    { 
       $addToSet: { following: followedUser }   
    }
  );
  await User.updateOne(
    { _id: followedUser }, 
    { 
       $addToSet: { followers: req.user.userId } 
    }
  );
  res.status(201)
})

//unfollow user
app.post('/users/:userId/unfollow', requireLogin, async (req,res)=>{
  const followedUser = req.params.userId;
  await User.updateOne(
    { _id: req.user.userId }, 
    { 
       $pull: { following: followedUser }  
    }
  );
  await User.updateOne(
    { _id: followedUser}, 
    { 
       $pull: { followers: req.user.userId }  
    }
  );
  res.status(201)
})

//connect to database
mongoose.connect("mongodb://localhost/micro-blog");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
