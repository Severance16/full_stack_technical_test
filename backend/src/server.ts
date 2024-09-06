import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import tasktRoutes from "./routes/taskRoutes"

// Importar configuracion para uso de variables de entorno
dotenv.config();

// Llamado a la funcion para conexion a base de datos
connectDB()


const app = express();

// Uso de las rutas
app.use("/api/tasks", tasktRoutes)

export default app;

