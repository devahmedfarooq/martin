import express from "express"
import { generateProductImageModel, scrapperController, userInfoProductGeneratorController, getImageGeneratorModel, getProduct, generateProdutImage, getProdutImage, getProducts } from "../controllers/products.controller.js"
const Router = express.Router()

Router.post("/url-info", scrapperController);
Router.post("/user-info", userInfoProductGeneratorController)
Router.post("/create-image-model", generateProductImageModel)
Router.post("/product-image/:id", generateProdutImage)
Router.get("/get-product-image-genrator/:id", getImageGeneratorModel)
Router.get("/get-product-image/:id", getProdutImage)
Router.get('/get-products', getProducts)
Router.get('/get-product', getProduct)

export default Router