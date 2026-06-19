import express from "express"
import { authFoodPartnerMiddleWare, authUserMiddleWare } from "../middleware/auth.middleware.js"
import multer from "multer"
import { createFood, getAllFoods, getStoreFoods, updateFood, deleteFood } from "../controllers/food.controller.js"

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post('/', authFoodPartnerMiddleWare, upload.single('video'), createFood)

router.get('/', authUserMiddleWare, getAllFoods)
router.get('/store/:partnerId', getStoreFoods)
router.put('/:id', authFoodPartnerMiddleWare, updateFood)
router.delete('/:id', authFoodPartnerMiddleWare, deleteFood)
export default router