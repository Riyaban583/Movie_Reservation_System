"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: user,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async profile(req, res) {
        return res.status(200).json({
            success: true,
            message: "Protected route accessed successfully",
        });
    }
    async me(req, res) {
        return res.status(200).json({
            success: true,
            data: req.user,
        });
    }
    async adminOnly(req, res) {
        return res.status(200).json({
            success: true,
            message: "Welcome Admin",
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map