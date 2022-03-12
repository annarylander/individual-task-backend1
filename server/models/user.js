const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true, 
        required: [true, 'Please enter a username'],
    },
    password: {
        type: String, 
        required: [true, 'Please enter a password']
    },

    email: {
        type: String,
        required: false,
        default: " "
    },

    fullname: {
        type: String,
        required: false,
        
    },

    image: {
        type: String,
        required: false,
        default: "",
    },

    followers: [
        {
            type:ObjectId,
            ref:"User"
        }
        ],

    following:  [
        {
            type:ObjectId,
            ref:"User"
        }
        ]
    
})

userSchema.pre(
    "save",
    async function(next) {
        if (this.modifiedPaths().includes("password")) {
            const hash = await bcrypt.hash(this.password, 10);
            this.password = hash;
          }
        next();
    }
);

//metod som loggar in användare 
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username}) // kollar om det finns en användare med det namnet
    if (user && await bcrypt.compare(password, user.password)) { // kollar om lösen stämmer med det i db
        return user
    } else {
        return null
    }
}

const User = mongoose.model("User", userSchema)


exports.User = User
