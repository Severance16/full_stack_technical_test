import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import tasktRoutes from "./routes/taskRoutes"
import authRoutes from "./routes/authRoutes"
import delegateRoutes from "./routes/delegateRoutes"
import { corsConfig } from "./config/cors";
import cors from "cors"

// Importar configuracion para uso de variables de entorno
dotenv.config();

// Llamado a la funcion para conexion a base de datos
connectDB()


const app = express();
app.use(cors(corsConfig))

// Habilitar lectura de datos en formato JSON
app.use(express.json())

// Uso de las rutas
app.use("/api/auth", authRoutes)
app.use("/api/tasks", tasktRoutes)
app.use("/api/delegate", delegateRoutes)

export default app;

