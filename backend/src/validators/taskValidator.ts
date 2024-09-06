import { body, param } from "express-validator";

export class TaskValidator {
    static body = [
        body("name").notEmpty().withMessage("El nombre de la tarea es obligatoria."), 
        body("description").notEmpty().withMessage("La descripción de la tarea es obligatoria."), 
    ]
    static Id = [
        param("id").isMongoId().withMessage("Id no válido.")
    ]
}