import express from "express"
import { registerUser, loginUser } from "../controllers/authController.js"
import { logoutUser } from "../controllers/authController.js"
import { registerFoodPartner } from "../controllers/authController.js"
import { loginFoodPartner } from "../controllers/authController.js"
import { logoutFoodPartner } from "../controllers/authController.js"

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/foodpartner/register', registerFoodPartner)
router.post('/foodpartner/login', loginFoodPartner)
router.post('/foodpartner/logout', logoutFoodPartner)

export default router