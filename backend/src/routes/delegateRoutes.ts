import { Router } from "express";
import { DelegateController } from "../controllers/DelegateController";
import { handleInputErrors } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  handleInputErrors,
  DelegateController.requestDelegate
);

router.get(
    "/", 
    DelegateController.getRequestDelegates
);

router.get(
    "/:id",
    handleInputErrors,
    DelegateController.addDelegate
);

router.delete(
    "/:id",
    handleInputErrors,
    DelegateController.declineDelegate
);

export default router;
