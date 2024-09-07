import type { Request, Response } from "express"
import User from "../models/User"
import Notification from "../models/Notification"

export class DelegateController {
    
    static requestDelegate  = async (req: Request, res: Response) => {
        try {
            const { user } = req.body
            const userExist = await User.findOne({email: user})
            if (!userExist) {
                const error = new Error("Usuario no encontrado.")
                return res.status(404).json({error: error.message})
            }

            if (userExist.delegates.includes(req.user.id.toString())) {
                const error = new Error("Acción innecesaria.")
                return res.status(409).json({error: error.message})
            }
            if (userExist.id.toString() === req.user.id.toString()) {
                const error = new Error("Acción innecesaria.")
                return res.status(409).json({error: error.message})
            }

            const notificationExist = await Notification.findOne({
                user: userExist.id,
                delegate: req.user.id
            })
            if (notificationExist) {
                const error = new Error("La solicitud ya fue enviada.")
                return res.status(409).json({error: error.message})
            }

            const notification = new Notification()
            notification.user = userExist.id
            notification.delegate = req.user.id

            await notification.save()
            res.send("Solicitud enviada.")
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
    static getRequestDelegates = async (req: Request, res: Response) => {
        try {
            const request = await Notification.find({ user: req.user.id })
            res.json(request)
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
    static addDelegate = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const request = await Notification.findById(id)
            if (!request) {
                const error = new Error("No se encuentra la petición.")
                return res.status(404).json({error: error.message})
            }
            if (request.user.toString() !== req.user.id.toString()) {
                const error = new Error("No puedes realizar esta acción.")
                return res.status(403).json({error: error.message})
            }
            req.user.delegates.push(request.delegate)
            await Promise.allSettled([req.user.save(), request.deleteOne()])
            res.send("Autorización aceptada.")
        } catch (error) {
            console.log(error.message)
            res.status(500).json({error: "Hubo un error."})
        }
    }
    static declineDelegate = async (req: Request, res: Response) => {
        try {
            const request = await Notification.findById(req.params.id)
            if (!request) {
                const error = new Error("No se encuentra la petición.")
                return res.status(404).json({error: error.message})
            }
            request.deleteOne()
            res.send("Autorización declinada.")
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
}