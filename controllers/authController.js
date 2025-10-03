const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")

const registerController = async(req,res) => {
    try {
        const {userName, email, password, address, phone} = req.body
        //validation
        if(!userName || !email || !password || !address || !phone){
            return res.status(400).send({
                success:false,
                message:"Please provide all fields"
            })
        }

        //check user
        const existing = await userModel.findOne({email})
        if(existing){
            return res.status(409).send({
                success:false,
                message:"Email already registered please Login"
            })
        }

        //hashing
        var salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hash(password, salt)

        //create user
        const user = await userModel.create({userName, email, password:hashPassword, address, phone})
        res.status(201).send({
            success:true,
            message:"successfully registered",
            user
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Error in register API",
            err
        })
    }
}

const loginController = async(req,res) => {
    try {
        const {email,password} = req.body
        //validation
        if(!email || !password){
            res.status(400).send({
                success:false,
                message:"PLease provide all details",
                err
            })
        }
        //login
        const user = await userModel.findOne({email})
        //check password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(401).send({
                success:false,
                message:"Inavalid Credentials",
            })
        }

        if(!user){
            res.status(404).send({
                success:false,
                message:"User not found",
            })
        }

        //token
        const token = JWT.sign({id : user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
         })
        user.password=undefined
        res.status(200).send({
            success:true,
            message:"successfully logged in",
            token,
            user
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Error in Login API",
            err
        })
    }
}

module.exports = { 
    registerController,
    loginController,
 }