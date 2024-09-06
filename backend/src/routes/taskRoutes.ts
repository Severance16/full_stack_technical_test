import { Router } from "express"
import { TaskController } from "../controllers/taskController"

const router = Router()

router.post("/", TaskController.createTask)

router.get("/", TaskController.getAllTasks)

router.get("/:id", TaskController.getTask)

router.put("/:id", TaskController.updateTask)

router.delete("/:id", TaskController.deleteTask)

export default router