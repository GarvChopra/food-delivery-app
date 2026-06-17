import { pool } from "../config/db.js"

const createFoodPartnerTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS food_partners (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            phone VARCHAR(255),
            address VARCHAR(255),
            role VARCHAR(255) DEFAULT 'partner',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `)
    console.log("Food partners table ready")
}

export default createFoodPartnerTable