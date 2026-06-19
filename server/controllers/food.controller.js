import { pool } from "../config/db.js"
import * as storage from "../services/storage.service.js"
import { v4 as uuidv4 } from "uuid"
import jwt from "jsonwebtoken"
export async function createFood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Video file is required" })
        }

        const id = uuidv4()
        const fileUploadResult = await storage.uploadFile(req.file.buffer, id)

        const newFood = await pool.query(
            "INSERT INTO foods (name, video, description, food_partner_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [req.body.name, fileUploadResult.url, req.body.description, req.foodPartner.id]
        )

        res.status(201).json({
            message: "Food item created successfully",
            foodItem: newFood.rows[0]
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getAllFoods(req, res) {
    try {
        const result = await pool.query("SELECT * FROM foods ORDER BY created_at DESC")
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getStoreFoods(req, res) {
    try {
        const { partnerId } = req.params
        
        const partnerResult = await pool.query(
            "SELECT id, name, email FROM food_partners WHERE id = $1",
            [partnerId]
        )
        const foodsResult = await pool.query(
            "SELECT * FROM foods WHERE food_partner_id = $1 ORDER BY created_at DESC",
            [partnerId]
        )

        let isOwner = false
        const token = req.cookies.token
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                if (decoded.role === 'partner' && decoded.id == partnerId) {
                    isOwner = true
                }
            } catch (e) {}
        }
        
        res.status(200).json({
            partner: partnerResult.rows[0],
            foods: foodsResult.rows,
            isOwner
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateFood(req, res) {
    try {
        const { id } = req.params
        const { name, description } = req.body

        const result = await pool.query(
            "UPDATE foods SET name = $1, description = $2 WHERE id = $3 AND food_partner_id = $4 RETURNING *",
            [name, description, id, req.foodPartner.id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Food not found or not authorized" })
        }

        res.status(200).json({ message: "Updated", food: result.rows[0] })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteFood(req, res) {
    try {
        const { id } = req.params

        const result = await pool.query(
            "DELETE FROM foods WHERE id = $1 AND food_partner_id = $2 RETURNING *",
            [id, req.foodPartner.id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Food not found or not authorized" })
        }

        res.status(200).json({ message: "Deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}