const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true, 
        required: [true, 'Please enter a username'],
    },
    password: {
        type: String, 
        required: [true, 'Please enter a password']
    }
})

userSchema.pre(
    "save",
    async function(next) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username})
    if (user && await bcrypt.compare(password, user.password)) {
        return user
    } else {
        return null
    }
}

const User = mongoose.model("User", userSchema)


exports.User = User
