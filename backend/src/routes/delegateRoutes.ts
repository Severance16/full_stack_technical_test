import { Router } from "express";
import { DelegateController } from "../controllers/DelegateController";
import { handleInputErrors } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";
import { DelegateValidator } from "../validators/delegateValidator";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  DelegateValidator.user,
  handleInputErrors,
  DelegateController.requestDelegate
);

router.get(
    "/", 
    DelegateController.getRequestDelegates
);

router.get(
    "/:id",
    DelegateValidator.Id,
    handleInputErrors,
    DelegateController.addDelegate
);

router.delete(
    "/:id",
    DelegateValidator.Id,
    handleInputErrors,
    DelegateController.declineDelegate
);

export default router;
