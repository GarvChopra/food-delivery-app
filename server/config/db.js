import dotenv from 'dotenv'
dotenv.config()

import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})

const connectDB = async () => {
    try {
        const res = await pool.query('SELECT NOW()')
        console.log('Connected to Neon PostgreSQL:', res.rows[0].now)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export { pool }
export default connectDB