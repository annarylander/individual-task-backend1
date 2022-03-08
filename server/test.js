
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/user");
const { Blog } = require("./models/blog");
const jwt = require("jsonwebtoken");
const multer = require("multer");



const updatedUser = {
    email: "asdsa",
    fullname: "sdadsdsa"
  };

  const user = User.updateOne(
    { _id: "6225eb3989c9e8bd7db3f7f6" },
    {
      $set: updatedUser,
    }
  );

  mongoose.connect("mongodb://localhost/micro-blog");

