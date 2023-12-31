import express from "express";
import color from "colors";
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/config.js";
import authRoutes from "./routes/authRoute.js"
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'


// Config dotenv
dotenv.config();

//Database config 
connectDB()

// rest api
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Ecommerce app</h1>")
})

//  routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is runninng on Port ${PORT} and mode ${process.env.DEV_MODE}`.bgWhite.black);
}) 