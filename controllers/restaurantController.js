const restaurantModel = require("../models/restaurantModel")

const createRestaurant = async(req,res)=>{
    try{
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body

        //validation
        if(!title || !coords){
            res.status(400).send({
                success:false,
                message:"please provide both, title and address",
                err
            })
        }

        const newrestaurant = new restaurantModel({
            title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords
        });

        await newrestaurant.save()
        res.status(201).send({
                success:true,
                message:"restaurant created successfully",
        })

    }catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Error in create restaurant API",
            err
        })
    }
}

const getAllRestaurants = async(req,res) => {
    try {
        
        const restaurants = await restaurantModel.find({})
        if(!restaurants){
            res.status(404).send({
            success:false,
            message:"no restaurants found",
            })
        }

        res.status(201).send({
            success:true,
            message:"all restaurant fetched successfully",
            restaurants
        })

    } catch (err) {
        res.status(500).send({
            success:false,
            message:"Error in get all restaurants API",
            err
        })
    }
}

const getRestaurantsById = async(req,res)=>{
    try {
        const restaurant = await restaurantModel.findById(req.params.id)

        if(!restaurant){
            res.status(404).send({
            success:false,
            message:"no restaurant found",
            })
        }

        res.status(201).send({
            success:true,
            message:"restaurant found successfully",
            restaurant
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in get restaurant by Id API",
            err
        })
    }
}

const deleteRestaurant = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(404).send({
            success:false,
            message:"restaurant not found",
            })
        }

        await restaurantModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:"restaurant deleted succesfully",
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in delete restaurant api",
            error:error.message
        })
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantsById,
    deleteRestaurant
}