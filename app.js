const express = require('express')
const cors = require("cors")                //used to run on cross-platform servfer
const morgan = require("morgan")            //shows which api is hit and its status,type in console
const dotenv = require("dotenv")

//dotenv config
dotenv.config()

//db connection
const db = require("./config/db")
db()

const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/auth',require('./routes/authRoutes'))
app.use('/user',require('./routes/userRoutes'))
app.use('/restaurant',require('./routes/restaurantRoutes'))
app.use('/category',require('./routes/categoryRoutes'))
app.use('/food',require('./routes/foodRoutes'))


const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
});