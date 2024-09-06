import type { Request, Response } from "express"

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        res.send("Crear tarea")
    }
    static getTask = async (req: Request, res: Response) => {
        res.send("Obtener tarea")
    }
    static getAllTasks = async (req: Request, res: Response) => {
        res.send("Obtener tareas")
    }
    static updateTask = async (req: Request, res: Response) => {
        res.send("Actualizar tarea")
    }
    static deleteTask = async (req: Request, res: Response) => {
        res.send("Eliminar tarea")
    }
}