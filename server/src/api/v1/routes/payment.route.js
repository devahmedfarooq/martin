import express from "express"
import {
    handlePayment,
    webhook
} from "../controllers/payments.controller.js"
import authenticate from './../../../middleware/auth.middleware.js'
const Router = express.Router()

Router.post('/', authenticate, handlePayment)
Router.post('/webhook', express.raw({ type: 'application/json' }), webhook)

export default Router