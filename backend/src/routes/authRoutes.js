import { Router } from "express";
import { loginUser, getProfile, registerUser } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", verifyToken, getProfile);

export default router;
