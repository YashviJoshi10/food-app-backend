const { createCategory, getAllCategories, updateCategory, deleteCategory } = require("../controllers/categoryController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post("/createcat",authMiddleware,createCategory)
router.get("/getall",getAllCategories)
router.put("/updatecat/:id",updateCategory)
router.delete("/deletecat/:id",deleteCategory)

module.exports=router