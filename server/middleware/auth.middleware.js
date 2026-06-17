import jwt from "jsonwebtoken"
import { pool } from "../config/db.js"

export async function authUserMiddleWare(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const result = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.id])
        const user = result.rows[0]

        if (!user) {
            return res.status(401).json({ message: "Not authorized" })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

export async function authFoodPartnerMiddleWare(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const result = await pool.query("SELECT * FROM food_partners WHERE id = $1", [decoded.id])
        const foodPartner = result.rows[0]

        if (!foodPartner) {
            return res.status(401).json({ message: "Not authorized" })
        }

        req.foodPartner = foodPartner
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}