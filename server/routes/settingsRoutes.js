import express from "express";
import settingsController from "../controllers/settingsController.js";
import { validateChangePassword } from "../middleware/settingsMiddleware.js";

const router = express.Router();

router.get("/:userId", settingsController.getSettings);
router.put("/:userId", settingsController.updateSettings);
router.post("/change-password", validateChangePassword, settingsController.changePassword);

export default router;
