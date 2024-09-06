import mongoose from "mongoose";
import { exit } from 'node:process';

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL)
        // console.log(`${connection.host}:${connection.port}`)
        console.log("Conexión exitosa a DB")
    } catch (error) {
        // console.log(error.message)
        console.log("Error en la conexión a DB")
        exit(1)
    }
}