import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import connectDB from './config/db.js'
import createUserTable from './models/User.js'
import createFoodPartnerTable from './models/foodpartner.model.js'
import createFoodTable from './models/food.js'

const PORT = process.env.PORT || 5000

const start = async () => {
    await connectDB()
    await createUserTable()
    await createFoodPartnerTable()
    await createFoodTable()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()