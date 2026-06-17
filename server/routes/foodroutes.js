import express from "express"
import { createFood, getAllFoods } from "../controllers/food.controller.js"
import { authFoodPartnerMiddleWare, authUserMiddleWare } from "../middleware/auth.middleware.js"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post('/', authFoodPartnerMiddleWare, upload.single('video'), createFood)

router.get('/', authUserMiddleWare, getAllFoods)

export default router