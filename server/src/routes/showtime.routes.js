"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const showtime_controller_1 = require("../controllers/showtime.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
const showtimeController = new showtime_controller_1.ShowtimeController();
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => showtimeController.createShowtime(req, res));
/**
 * @swagger
 * /api/showtimes:
 *   get:
 *     summary: Get all showtimes
 *     tags:
 *       - Showtimes
 *     responses:
 *       200:
 *         description: Successfully fetched all showtimes
 *       500:
 *         description: Internal server error
 */
router.get("/", (req, res) => showtimeController.getAllShowtimes(req, res));
router.get("/date", (req, res) => showtimeController.getShowtimesByDate(req, res));
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => showtimeController.updateShowtime(req, res));
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => showtimeController.deleteShowtime(req, res));
exports.default = router;
//# sourceMappingURL=showtime.routes.js.map