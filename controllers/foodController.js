const foodModel = require("../models/foodModel")
const orderModel = require("../models/orderModel")

const createFood = async(req,res)=>{
    try {
        const {title,description,imageUrl,price,foodTags,category,code,isAvailable,restaurant,rating,ratingCount} = req.body
    
        if(!title || !price || !description || !restaurant){
            res.status(400).send({
                success:false,
                message:"please provide required fields"
            })
        }
        const food = await foodModel.create({title,description,imageUrl,price,foodTags,category,code,isAvailable,restaurant,rating,ratingCount})
            res.status(201).send({
                success:true,
                message:"food successfully created",
                food
            })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in create food api"
        })
    }
}

const getAllFood = async(req,res) => {
    try {
        const foods = await foodModel.find({})
        if(!foods){
            res.status(404).send({
            success:false,
            message:"no food found",
            })
        }

        res.status(201).send({
            success:true,
            message:"all food items fetched successfully",
            foods
        })

    } catch (err) {
        res.status(500).send({
            success:false,
            message:"Error in get all food API",
            err
        })
    }
}

const getFoodById = async(req,res)=>{
    try {
        const foodId = req.params.id
        if(!foodId){
            res.status(404).send({
            success:false,
            message:"please provide id",
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            res.status(404).send({
            success:false,
            message:"no food found",
            })
        }
        res.status(201).send({
            success:true,
            message:"food found successfully",
            food
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in get food by Id API",
            err
        })
    }
}

const getFoodByRestaurant = async(req,res)=>{
    try {
        const restaurantId = req.params.id
        if(!restaurantId){
            res.status(404).send({
            success:false,
            message:"please provide id",
            })
        }

        const foods = await foodModel.find({restaurant:restaurantId})

        if(!foods){
            res.status(404).send({
            success:false,
            message:"no food found",
            })
        }
        res.status(201).send({
            success:true,
            message:"foods found successfully",
            foods
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in get restaurant by Id API",
            error
        })
    }
}

const updateFood=async(req,res)=>{
    try {
        const foodId = req.params.id
        if(!foodId){
            res.status(404).send({
            success:false,
            message:"please provide id",
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            res.status(404).send({
            success:false,
            message:"no food found",
            })
        }
        const {title,description,imageUrl,price,foodTags,category,code,isAvailable,restaurant,rating,ratingCount} = req.body
        
        const updateFood = await foodModel.findByIdAndUpdate(foodId,{title,description,imageUrl,price,foodTags,category,code,isAvailable,restaurant,rating,ratingCount},{new:true})

        res.status(200).send({
            success:true,
            message:"food updated succesfully",
            category
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in update food API",
            err
        })
    }
}

const deleteFood=async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(404).send({
            success:false,
            message:"id not found",
            })
        }
        await foodModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:"food deleted succesfully",
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in delete food API",
            error
        })
    }
}

//Order
const placeOrder=async(req,res)=>{
    try {
        const {cart}=req.body
        if(!cart){
            res.status(400).send({
                success:false,
                message:"please provide required fields"
            })
        }
        let total=0

        cart.map((i)=>{
            total+=i.price
        })

        const newOrder=new orderModel({foods:cart, payment:total, buyer:req.user.id})
        await newOrder.save()
        res.status(200).send({
            success:true,
            message:"order placed succesfully",
            newOrder
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in place order API",
            error
        })
    }
}

const orderStatus = async(req,res)=>{
    try {
        const orderId = req.params.id
        if(!orderId){
            res.status(400).send({
                success:false,
                message:"please provide orderId"
            })
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})

        res.status(200).send({
            success:true,
            message:"order status updated succesfully",
            order
        })
    } catch (error) {
         res.status(500).send({
            success:false,
            message:"Error in order status API",
            err
        })
    }
}

module.exports = {
    createFood,
    getAllFood,
    getFoodById,
    getFoodByRestaurant,
    updateFood,
    deleteFood,
    placeOrder,
    orderStatus
}