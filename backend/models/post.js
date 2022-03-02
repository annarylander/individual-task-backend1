const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    body: {type: String, required: true},
    
})

const Post = mongoose.model("Post", postSchema)

exports.Post = Post