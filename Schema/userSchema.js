const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    address:{
        type: String,
        unique: true,
        trim: true, 
    },
    phoneNo:{
        type: Number,
        unique: true,
        trim: true,
    }
},{
    timestamps:true
})

const User = mongoose.model("User",UserSchema);
module.exports = User;