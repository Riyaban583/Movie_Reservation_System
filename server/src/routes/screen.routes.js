"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const screen_controller_1 = require("../controllers/screen.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
const screenController = new screen_controller_1.ScreenController();
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => screenController.createScreen(req, res));
router.post("/:screenId/seats", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => screenController.generateSeats(req, res));
router.get("/:screenId/seats", (req, res) => screenController.getSeatsByScreen(req, res));
router.get("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => screenController.getAllScreens(req, res));
router.get("/showtime/:showtimeId/seats", (req, res) => screenController.getSeatAvailabilityByShowtime(req, res));
exports.default = router;
//# sourceMappingURL=screen.routes.js.map