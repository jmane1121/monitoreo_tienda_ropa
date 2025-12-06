import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changePassword
} from "../controllers/userController.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import { roleProtected } from "../middlewares/roleProtected.js";

const router = Router();

// Solo ADMIN puede administrar usuarios
router.get("/", verifyToken, roleProtected("ADMIN"), getUsers);
router.get("/:id", verifyToken, roleProtected("ADMIN"), getUserById);
router.post("/", verifyToken, roleProtected("ADMIN"), createUser);
router.put("/:id", verifyToken, roleProtected("ADMIN"), updateUser);
router.put("/:id/password", verifyToken, roleProtected("ADMIN"), changePassword);
router.delete("/:id", verifyToken, roleProtected("ADMIN"), deleteUser);

export default router;
