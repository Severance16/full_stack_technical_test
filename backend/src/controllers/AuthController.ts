import type { Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"

export class AuthController {
    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({email})
            if (!user) {
                const error = new Error("Usuario no encontrado.")
                return res.status(404).json({error: error.message})
            }

            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error("La contraseña no es correcta.")
                return res.status(401).json({error: error.message})
            }

            res.send(generateJWT({id: user.id}))
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
    static register = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const userExist = await User.findOne({email})
            if (userExist) {
                const error = new Error("El usuario ya está registrado.")
                return res.status(409).json({error: error.message})
            }

            const user = new User(req.body)

            user.password = await hashPassword(password)

            await user.save()
            res.status(201).send("Usuario registrado.")
        } catch (error) {
            res.status(500).json({error: "Hubo un error."})
        }
    }
}