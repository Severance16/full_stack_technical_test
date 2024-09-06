import type { Request, Response } from "express"
import Task from "../models/Task"

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        const task = new Task(req.body)
        try {
            await task.save()
            res.send("Tarea creada")
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
    static getTask = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const task = await Task.findById(id)
            if (!task) {
                const error = new Error("Tarea no encontrada.")
                return res.status(404).json({error: error.message})
            }
            res.json(task)
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
    static getAllTasks = async (req: Request, res: Response) => {
        try {
            const task = await Task.find()
            res.json(task)
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
    static updateTask = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const task = await Task.findByIdAndUpdate(id, req.body)
            if (!task) {
                const error = new Error("Tarea no encontrada.")
                return res.status(404).json({error: error.message})
            }
            res.send("Tarea actualizada.")
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
    static deleteTask = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const task = await Task.findById(id)
            if (!task) {
                const error = new Error("Tarea no encontrada.")
                return res.status(404).json({error: error.message})
            }
            await task.deleteOne()
            res.send("Tarea Eliminada.")
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
}