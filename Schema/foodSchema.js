const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        trim: true,
        required:true
    },
    foodImg: {
        type: String,
        trim:true,

    },
    foodRating: {
        type: Number,
        trim: true,
        required:true

    },
    foodCategory:{
        type: String,
        trim: true, 
        required:true
    },
    foodPrice:{
        type: Number,
        trim: true,
        required:true

    },
    prepareTiming:{
        type: String,
        trim: true,
        required:true
    },
    foodDes:{
        type: String,
        trim: true,
        required:true
    },
    foodStock:{
        type:Boolean,
        default:true,
    },
    resId:{
        type:String,
        required:true,
        trim:true
    },
    resName:{
        type:String,
        required:true,
        trim:true
    },
    resInfo:{
        type:String,
        required:true,
        trim:true
    },
    resRating:{
        type:Number,
        required:true,
        trim:true
    },
    resImg:{
        type:String,
        required:true,
        trim:true
    }
    
},{
    timestamps:true
})

const foodSchema = mongoose.model("Foods",FoodSchema);
module.exports = foodSchema;