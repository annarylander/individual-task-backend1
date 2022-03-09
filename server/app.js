const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/user");
const { Blog } = require("./models/blog");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs")
const path = require("path")
const app = express();
const PORT = 8000;
const JWT_SECRET = "jksjfkafld";

// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use('/uploads', express.static('./uploads'));
// app.use(express.static("/public/uploads"))

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
  console.log("middleware verify jwt token");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
    console.log("inloggad");
    console.log("verified token", req.user);
  } else {
    console.log("inte inloggad");
  }
  next();
});

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  //validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//see all users
app.get("/people", (req, res) => {
  User.find({}, function (err, users) {
    if (err) return handleError(err);
    res.send({ users });
  });
});

//see all posts
// app.get("/feed", (req, res) => {
//   Blog.find({}, null, { sort: { published: -1 } }, function (err, blogs) {
//     if (err) return handleError(err);
//     const blogsAuthor = blogs.populate("postedByID")
//     res.send({ blogs });
//     console.log({blogs})
//   });
  
// });

app.get("/feed", async (req, res) => {
   const blogs = await Blog.find().populate("postedByID").sort({published: -1})
   res.json(blogs)
  // console.log(blogs)
})


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
  console.log(username);
  if (user) {
    const userId = user._id.toString();
    const token = jwt.sign({ userId, username: user.username }, JWT_SECRET, {
      expiresIn: 12000,
      subject: userId,
    });
    console.log(token);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

// create post
app.post("/blog", async (req, res) => {
  const body = req.body.body;
  const postedByID = req.user.userId;
  const postedByName = req.user.username;
  const postedByImage = req.user.image
  //console.log(req.user)
  const blog = new Blog({ body, postedByID, postedByName, postedByImage });
  await blog.save();
  //console.log(postedByName)
  console.log(body);
  res.sendStatus(200);
});

//user-profile
app.get("/profile", async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.send(user);
  console.log("user", user);
  
});


//Update profile-info and image
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
      cb(null, `${req.user.username}-profile.${file.originalname.split(".").slice(-1)[0]}`
      )}
});

const upload = multer({ storage: storage });

app.post('/profile', upload.single('image'), async (req, res, next) => {
   
  const updatedUser = {
      fullname: req.body.fullname,
      email: req.body.email,
      image: `http://localhost:8000/uploads/${req.file.filename}`
      
  }

  console.log(req.file)
  console.log(updatedUser)

  const user = await User.updateOne(
        { _id: req.user.userId },
        {
          $set: updatedUser,
        }
      );
});

//connect to database
mongoose.connect("mongodb://localhost/micro-blog");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
