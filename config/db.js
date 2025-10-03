const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db connected...");
    }catch(err){
    console.log("error in db connection...");
}};

module.exports = connectDB;