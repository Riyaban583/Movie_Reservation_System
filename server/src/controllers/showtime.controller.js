"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowtimeController = void 0;
const express_1 = require("express");
const showtime_service_1 = require("../services/showtime.service");
const showtime_validation_1 = require("../validations/showtime.validation");
const showtimeService = new showtime_service_1.ShowtimeService();
class ShowtimeController {
    async createShowtime(req, res) {
        try {
            const data = showtime_validation_1.createShowtimeSchema.parse(req.body);
            const showtime = await showtimeService.createShowtime({
                movieId: data.movieId,
                screenId: data.screenId,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
            });
            return res.status(201).json({
                success: true,
                message: "Showtime created successfully",
                data: showtime,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getAllShowtimes(req, res) {
        try {
            const showtimes = await showtimeService.getAllShowtimes();
            return res.status(200).json({
                success: true,
                count: showtimes.length,
                data: showtimes,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getShowtimesByDate(req, res) {
        try {
            const date = new Date(req.query.date);
            if (isNaN(date.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid date",
                });
            }
            const showtimes = await showtimeService.getShowtimesByDate(date);
            return res.status(200).json({
                success: true,
                count: showtimes.length,
                data: showtimes,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async updateShowtime(req, res) {
        try {
            const showtime = await showtimeService.updateShowtime(req.params.id, {
                movieId: req.body.movieId,
                screenId: req.body.screenId,
                startTime: req.body.startTime
                    ? new Date(req.body.startTime)
                    : undefined,
                endTime: req.body.endTime
                    ? new Date(req.body.endTime)
                    : undefined,
            });
            return res.status(200).json({
                success: true,
                message: "Showtime updated successfully",
                data: showtime,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async deleteShowtime(req, res) {
        try {
            const showtime = await showtimeService.deleteShowtime(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Showtime deleted successfully",
                data: showtime,
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
exports.ShowtimeController = ShowtimeController;
//# sourceMappingURL=showtime.controller.js.map