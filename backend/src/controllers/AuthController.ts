import type { Request, Response } from "express"
import Task from "../models/Task"

export class AuthController {
    static login = async (req: Request, res: Response) => {
        res.send("Desde Login")
    }
    static register = async (req: Request, res: Response) => {
        res.send("Desde Register")
    }
}