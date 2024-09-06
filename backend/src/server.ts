import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

// Importar configuracion para uso de variables de entorno
dotenv.config();

// Llamado a la funcion para conexion a base de datos
connectDB()

const app = express();

export default app;

