const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

const getUSerController = async (req,res)=>{
    try {
        const user = await userModel.findById({_id:req.user.id})
        // console.log(req.user.id)
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found",
            })
        }

        user.password=undefined
        res.status(200).send({
            success:true,
            message:"user get successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in get api",
            error
        })
    }
}

const updateController = async(req,res)=>{
    try {
        const user = await userModel.findById({_id:req.user.id})

        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }

        const {userName, address, phone} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone

        await user.save()

        res.status(200).send({
            success:true,
            message:"user updated succesfully",
            user
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in get api"
        })
    }
}

const resetPasswordController = async(req,res)=>{
    try {
        const {email, password, newpassword} = req.body
        if(!email || !password || !newpassword){
            return res.status(400).send({
                success:false,
                message:"please provide all credentials"
            })
        }
        const user = await userModel.findById({_id:req.user.id})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:"Invalid password"
            })
        }

        var salt = bcrypt.genSaltSync(10)
        user.password = await bcrypt.hash(newpassword,salt)
        await user.save()
        user.password=undefined
        res.status(200).send({
            success:true,
            message:"password updated succesfully",
            user
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in reset password api",
            error:error.message
        })
    }
}

const deleteController= async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:"user deleted succesfully",
            // user
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in delete password api",
            error:error.message
        })
    }
}

module.exports = {
    getUSerController,
    updateController,
    resetPasswordController,
    deleteController
}