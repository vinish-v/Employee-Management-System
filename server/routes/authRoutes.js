import express from "express"
import authController from "../controllers/authController.js"
import { validateSignUp, validateLogin } from "../middleware/validationMiddleware.js"
const router = express.Router();

router.post("/signup", validateSignUp, authController.signUp);
router.post("/login", validateLogin, authController.login);

export default router;
