"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheaterController = void 0;
const express_1 = require("express");
const theater_service_1 = require("../services/theater.service");
const theater_validation_1 = require("../validations/theater.validation");
const theaterService = new theater_service_1.TheaterService();
class TheaterController {
    async createTheater(req, res) {
        try {
            const data = theater_validation_1.createTheaterSchema.parse(req.body);
            const theater = await theaterService.createTheater(data);
            return res.status(201).json({
                success: true,
                message: "Theater created successfully",
                data: theater,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getAllTheaters(req, res) {
        try {
            const theaters = await theaterService.getAllTheaters();
            return res.status(200).json({
                success: true,
                count: theaters.length,
                data: theaters,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getTheaterById(req, res) {
        try {
            const theater = await theaterService.getTheaterById(req.params.id);
            if (!theater) {
                return res.status(404).json({
                    success: false,
                    message: "Theater not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: theater,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async updateTheater(req, res) {
        try {
            const theater = await theaterService.updateTheater(req.params.id, req.body);
            return res.status(200).json({
                success: true,
                message: "Theater updated successfully",
                data: theater,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async deleteTheater(req, res) {
        try {
            const theater = await theaterService.deleteTheater(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Theater deleted successfully",
                data: theater,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.TheaterController = TheaterController;
//# sourceMappingURL=theater.controller.js.map