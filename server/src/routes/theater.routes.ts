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

router.get(
  "/",
  (req, res) => theaterController.getAllTheaters(req, res)
);

router.get(
  "/:id",
  (req, res) => theaterController.getTheaterById(req, res)
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  (req, res) => theaterController.updateTheater(req, res)
);


router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  (req, res) => theaterController.deleteTheater(req, res)
);

export default router;