import express from "express"
import dotenv from "dotenv"
import Connection from "./db/Connection.js"
import ProductsRouter from "./api/v1/routes/products.route.js"
import AuthRouter from "./api/v1/routes/auth.route.js"

import authenticate from "./middleware/auth.middleware.js"
import cors from 'cors'
dotenv.config()
export default async function ExpressServer() {
    const app = express()
    app.use(cors())

    try {
        app.use(express.json())
        app.get("/", (req, res) => res.status(200).send("<h1> APP HAS STARTED </h1>"))
        app.use("/auth", AuthRouter)
        app.use("/products", authenticate, ProductsRouter)
        await Connection();
        app.listen(4000, () => {
            console.log("Server has been started\t" + process.env.URL + ":" + process.env.PORT)
        })
    } catch (error) {
        console.log(err => console.log(err.message))
    }

}