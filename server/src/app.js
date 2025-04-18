import express from "express"
import dotenv from "dotenv"
import Connection from "./db/Connection.js"
import ProductsRouter from "./api/v1/routes/products.route.js"
import AuthRouter from "./api/v1/routes/auth.route.js"
import PaymentRouter from './api/v1/routes/payment.route.js'
import morgan from 'morgan'
import authenticate from "./middleware/auth.middleware.js"
import cors from 'cors'
import fs from 'fs'
import path from 'path'

const accessLogStream = fs.createWriteStream(
    path.join('./', 'access.log'),
    { flags: 'a' }
);

dotenv.config()
export default async function ExpressServer() {
    const app = express()
    app.use(cors())


    app.use(express.json({ limit: "100mb" })); // Adjust size as needed
    app.use(express.urlencoded({ limit: "100mb", extended: true })); // For URL-encoded data
    app.use(morgan('combined', { stream: accessLogStream }));
    app.use(morgan('dev'));

    try {





        app.use(express.json())
        app.get("/", (req, res) => res.status(200).send("<h1> APP HAS STARTED </h1>"))
        app.use("/auth", AuthRouter)
        app.use("/products", authenticate, ProductsRouter)
        app.use("/payment", PaymentRouter)
        await Connection();
        app.listen(4000, () => {
            console.log("Server has been started\t" + process.env.URL + ":" + process.env.PORT)
        })
    } catch (error) {
        console.log(err => console.log(err.message))
    }

}