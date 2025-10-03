const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required : [true,"category title required"]
    },
    imageUrl:{
        type:String,
        default:"https://graphicsprings.com/wp-content/uploads/2024/01/Screen-Shot-2024-01-25-at-5-12-43-PM.png.webp"
    },
},{timestamps:true})

module.exports=mongoose.model("category",categorySchema)