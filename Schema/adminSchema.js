const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    resName: {
        type: String,
        trim: true,
        required:true
    },
    resPassword: {
        type: String,
        trim:true,
        required:true

    },
    resEmail: {
        type: String,
        lowercase: true,
        trim: true,
        required:true

    },
    resType:{
        type: String,
        trim: true,
        required:true,
    }
    // resAdress:{
    //     type: String,
    //     trim: true, 
    // },
    // resPhoneNo:{
    //     type: Number,
    //     trim: true,
    // }
},{
    timestamps:true
})

const Admin = mongoose.model("Admin",AdminSchema);
module.exports = Admin;