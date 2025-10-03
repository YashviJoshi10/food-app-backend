const { getUSerController, updateController, resetPasswordController, deleteController } = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.get("/getUser",authMiddleware,getUSerController)
router.put("/updateUser",authMiddleware,updateController)
router.put("/resetpassword",authMiddleware,resetPasswordController)
router.delete("/deleteuser/:id",authMiddleware,deleteController)

module.exports = router