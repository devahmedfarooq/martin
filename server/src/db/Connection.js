import mongoose from "mongoose";

export default async function () {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database has been connected!")
    } catch (error) {
        console.log("Database couldn't connect!\nError Message#", error.message)
    }
}