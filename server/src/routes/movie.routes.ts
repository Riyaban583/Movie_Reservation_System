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

// 👇 NEW ROUTE
router.get(
  "/",
  (req, res) => movieController.getAllMovies(req, res)
);

router.get(
  "/:id",
  (req, res) => movieController.getMovieById(req, res)
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  (req, res) => movieController.updateMovie(req, res)
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  (req, res) => movieController.deleteMovie(req, res)
);

export default router;