import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const authController = new AuthController();

router.post("/signup", (req, res) => authController.register(req, res));

router.post("/login", (req, res) => authController.login(req, res));

router.get(
  "/profile",
  authenticate,
  (req, res) => authController.profile(req, res)
);

router.get(
  "/me",
  authenticate,
  (req, res) => authController.me(req, res)
);

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => authController.adminOnly(req, res)
);

export default router;