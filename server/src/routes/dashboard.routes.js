"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
const dashboardController = new dashboard_controller_1.DashboardController();
router.get("/summary", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => dashboardController.getDashboardSummary(req, res));
router.get("/occupancy", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => dashboardController.getOccupancySummary(req, res));
router.get("/booking-trends", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => dashboardController.getBookingTrendSummary(req, res));
router.get("/revenue", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => dashboardController.getRevenueSummary(req, res));
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map