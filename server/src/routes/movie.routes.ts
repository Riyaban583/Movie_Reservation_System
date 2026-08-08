import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const movieController = new MovieController();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  (req, res) => movieController.createMovie(req, res)
);

export default router;