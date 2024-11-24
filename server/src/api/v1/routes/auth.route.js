import express from "express";
import { registerController, loginController, authController, saveController } from "../controllers/auth.controller.js";
import authenticate from "../../../middleware/auth.middleware.js"
const Router = express.Router();

// Register Route
Router.post("/register", registerController);

// Login Route
Router.post("/login", loginController);


//Get User Route
Router.get("/", authenticate, authController)

//Post Save Settings
Router.post('/settings', authenticate, saveController)

export default Router;
