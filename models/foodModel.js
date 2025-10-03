const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required : [true,"food title required"]
    },
    description:{
        type:String,
        required: [true,"food description is required"]
    },
    imageUrl:{
        type:String,
        default:"https://graphicsprings.com/wp-content/uploads/2024/01/Screen-Shot-2024-01-25-at-5-12-43-PM.png.webp"
    },
    price: {
        type:Number,
        required: [true,"food price is required"]
    },
    foodTags: {
        type:String
    },
    category: {
        type:String
    },
    code: {
        type:String
    },
    isAvailable: {
        type:Boolean,
        default:true
    },
    restaurant: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    rating: {
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount: {
        type: String
    }
},{timestamps:true})

module.exports = mongoose.model("Foods",foodSchema)