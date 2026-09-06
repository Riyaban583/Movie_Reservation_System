"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservation_controller_1 = require("../controllers/reservation.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
const reservationController = new reservation_controller_1.ReservationController();
/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a reservation
 *     tags:
 *       - Reservations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - showtimeId
 *               - seatIds
 *             properties:
 *               showtimeId:
 *                 type: string
 *                 example: cmtbujk6z0001cdb0az1nztyk
 *               seatIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - cmt2lqafq0002cd8chfs29mjx
 *                   - cmt2lqafq0003cd8ckvfllj2r
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Internal server error
 */
router.post("/", auth_middleware_1.authenticate, (req, res) => reservationController.createReservation(req, res));
router.get("/my", auth_middleware_1.authenticate, (req, res) => reservationController.getUserReservations(req, res));
router.patch("/:id/cancel", auth_middleware_1.authenticate, (req, res) => reservationController.cancelReservation(req, res));
router.get("/admin", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => reservationController.getAllReservations(req, res));
exports.default = router;
//# sourceMappingURL=reservation.routes.js.map