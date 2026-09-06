"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = require("../controllers/movie.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
const movieController = new movie_controller_1.MovieController();
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => movieController.createMovie(req, res));
/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: Successfully fetched all movies
 *       500:
 *         description: Internal server error
 */
router.get("/", (req, res) => movieController.getAllMovies(req, res));
router.get("/:id", (req, res) => movieController.getMovieById(req, res));
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => movieController.updateMovie(req, res));
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => movieController.deleteMovie(req, res));
exports.default = router;
//# sourceMappingURL=movie.routes.js.map