import express from "express";
import profileController from "../controllers/profileController.js";
import { validateProfileUpdate } from "../middleware/profileMiddleware.js";

const router = express.Router();

router.get("/:userId", profileController.getProfile);
router.put("/:userId", validateProfileUpdate, profileController.updateProfile);

export default router;
