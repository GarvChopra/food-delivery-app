import { pool } from "../config/db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



export const registerUser = async (req, res) => {
    try {
        const { name, email, password, address } = req.body

        if (!name || !email || !password ||  !address) {
            return res.status(400).json({ message: "Name, email and password are required" })
        }

        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await pool.query(
            "INSERT INTO users (name, email, password,  address) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, hashedPassword,  address]
        )

        const user = newUser.rows[0]

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token)
        res.status(201).json({
            message: "User created successfully",
            user: { id: user.id, email: user.email, name: user.name }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        const user = result.rows[0]

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token)
        res.status(200).json({
            message: "Login successful",
            user: { id: user.id, email: user.email, name: user.name }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: "Logout successful" })
}

export const registerFoodPartner = async (req, res) => {
    try {
        const { name, email,phone , password } = req.body

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "Name, email and password are required" })
        }

        const isAccountAlreadyExist = await pool.query("SELECT * FROM food_partners WHERE email = $1", [email])
        if (isAccountAlreadyExist.rows.length > 0) {
            return res.status(400).json({ message: "Food partner already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newPartner = await pool.query(
            "INSERT INTO food_partners (name, email, phone , password) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email,phone, hashedPassword]
        )

        const partner = newPartner.rows[0]

        const token = jwt.sign(
            { id: partner.id, name: partner.name, email: partner.email, role: partner.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token)
        res.status(201).json({
            message: "Food partner created successfully",
            partner: { id: partner.id, email: partner.email, name: partner.name }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const loginFoodPartner = async (req, res) => {
    try {
        const { email, password } = req.body

        const result = await pool.query("SELECT * FROM food_partners WHERE email = $1", [email])
        const partner = result.rows[0]

        if (!partner) {
            return res.status(400).json({ message: "Food partner not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, partner.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: partner.id, name: partner.name, email: partner.email, role: partner.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token)
        res.status(200).json({
            message: "Login successful",
            partner: { id: partner.id, email: partner.email, name: partner.name }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logoutFoodPartner = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: "Logout successful" })
}