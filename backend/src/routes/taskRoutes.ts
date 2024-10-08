import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { TaskValidator } from "../validators/taskValidator";
import { handleInputErrors } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate)

router.post(
  "/",
  TaskValidator.body,
  handleInputErrors,
  TaskController.createTask
);

router.post(
  "/delegate",
  TaskValidator.body,
  TaskValidator.responsible,
  handleInputErrors,
  TaskController.createTask
);

router.get("/", TaskController.getAllTasks);

router.get("/:id", TaskValidator.Id, handleInputErrors, TaskController.getTask);

router.put(
  "/:id",
  TaskValidator.Id,
  TaskValidator.body,
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:id",
  TaskValidator.Id,
  handleInputErrors,
  TaskController.deleteTask
);

export default router;
