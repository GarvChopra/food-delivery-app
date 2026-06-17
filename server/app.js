import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import foodroutes from "./routes/foodroutes.js"

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Zomato API Running")
})

app.use('/api/auth', authRoutes)
app.use('/api/food', foodroutes)

export default app