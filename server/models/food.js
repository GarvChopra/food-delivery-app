import { pool } from "../config/db.js"

const createFoodTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS foods (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            video VARCHAR(255) NOT NULL,
            description TEXT,
            food_partner_id INT REFERENCES food_partners(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `)
    console.log("Foods table ready")
}

export default createFoodTable