"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const theater_controller_1 = require("../controllers/theater.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
const theaterController = new theater_controller_1.TheaterController();
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => theaterController.createTheater(req, res));
router.get("/", (req, res) => theaterController.getAllTheaters(req, res));
router.get("/:id", (req, res) => theaterController.getTheaterById(req, res));
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => theaterController.updateTheater(req, res));
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("ADMIN"), (req, res) => theaterController.deleteTheater(req, res));
exports.default = router;
//# sourceMappingURL=theater.routes.js.map