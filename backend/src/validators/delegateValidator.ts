import { body, param } from "express-validator";

export class DelegateValidator {
    static Id = [
        param("id").isMongoId().withMessage("Id no válido.")
    ]
    static user = [
        body("user").notEmpty().withMessage("La descripción de la tarea es obligatoria.")
    ]
}