const { createRestaurant, getAllRestaurants, getRestaurantsById, deleteRestaurant } = require("../controllers/restaurantController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post('/create',authMiddleware,createRestaurant)
router.get('/getall',getAllRestaurants)
router.get('/getbyid/:id',getRestaurantsById)
router.delete('/delete/:id',deleteRestaurant)

module.exports = router