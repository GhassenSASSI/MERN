const router = require("express").Router()
const { register, login, avatar, getAllUsers } = require("../controllers/userController")

router.post("/register", register)
router.post("/login", login)
router.post("/avatar/:id", avatar)
router.get("/allusers/:id", getAllUsers)

module.exports = router