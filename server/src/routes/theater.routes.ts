import { Router } from "express";
import { TheaterController } from "../controllers/theater.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const theaterController = new TheaterController();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  (req, res) => theaterController.createTheater(req, res)
);

export default router;