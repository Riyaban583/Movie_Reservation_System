"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
router.post("/signup", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.get("/profile", auth_middleware_1.authenticate, (req, res) => authController.profile(req, res));
router.get("/me", auth_middleware_1.authenticate, (req, res) => authController.me(req, res));
router.get("/admin", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => authController.adminOnly(req, res));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map