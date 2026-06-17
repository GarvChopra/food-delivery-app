import { pool } from "../config/db.js"

import { v4 as uuidv4 } from "uuid"
import * as storage from "../services/storage.service.js"

export async function createFood(req, res) {
    try {
        console.log(req.foodPartner)

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
       console.log("file:", req.file)
    console.log("body:", req.body)
}


export async function getAllFoods(req, res) {
    try {
        const result = await pool.query("SELECT * FROM foods")
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}