import type { Request, Response } from "express"
import Task from "../models/Task"
import User from "../models/User"

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.responsible = req.user.id
            task.delegate = req.user.id
            await task.save()
            res.send("Tarea creada")
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
    static delegateTask = async (req: Request, res: Response) => {
        try {
            const { responsible } = req.body
            const userExist = await User.findOne({email: responsible})
            if (!userExist) {
                const error = new Error("Usuario no encontrado.")
                return res.status(404).json({error: error.message})
            }
            if (userExist.delegates.includes(req.user.id)){
                const error = new Error("No puder realizar esta acción.")
                return res.status(403).json({error: error.message})
            }
            const task = new Task(req.body)
            task.delegate = req.user.id
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
            if(task.delegate !== req.user.id || task.responsible !== req.user.id) {
                const error = new Error("Tarea no encontrada.")
                return res.status(404).json({error: error.message})
            }
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
            const task = await Task.find({
                $or: [
                    {delegate: req.user.id},
                    {responsible: req.user.id}
                ]
            })
            res.json(task)
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
    static updateTask = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const task = await Task.findByIdAndUpdate(id, req.body)
            if(task.delegate !== req.user.id || task.responsible !== req.user.id) {
                const error = new Error("Tarea no encontrada.")
                return res.status(404).json({error: error.message})
            }
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
            if(task.delegate !== req.user.id || task.responsible !== req.user.id) {
                const error = new Error("Tarea no encontrada.")
                return res.status(404).json({error: error.message})
            }
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