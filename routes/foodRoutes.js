const { createFood, getAllFood, getFoodById, getFoodByRestaurant, updateFood, deleteFood, placeOrder, orderStatus } = require("../controllers/foodController")
const adminMiddleware = require("../middlewares/adminMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post("/createfood",authMiddleware,createFood)
router.get("/getallfood",getAllFood)
router.get("/getbyid/:id",getFoodById)
router.get("/getbyrestaurant/:id",getFoodByRestaurant)
router.put("/updatefood/:id",authMiddleware,updateFood)
router.delete("/deletefood/:id",authMiddleware,deleteFood)
//order
router.post("/placeorder",authMiddleware,placeOrder)
router.post("/orderstatus/:id",adminMiddleware,authMiddleware, orderStatus)
module.exports=router