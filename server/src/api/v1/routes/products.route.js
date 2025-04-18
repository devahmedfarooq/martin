import express from "express"
import { scrapperController, getProduct, generateProdutImage, getProdutImage, getProducts } from "../controllers/products.controller.js"
import { productMiddleware, regenerationsMiddleware } from "../../../middleware/subscription.middleware.js";
const Router = express.Router()
Router.post("/url-info", productMiddleware, scrapperController);
// Router.post("/user-info", userInfoProductGeneratorController)
Router.post("/product-image", regenerationsMiddleware, generateProdutImage)
Router.get("/get-product-image", getProdutImage)
Router.get('/get-products', getProducts)
Router.get('/get-product', getProduct)

export default Router