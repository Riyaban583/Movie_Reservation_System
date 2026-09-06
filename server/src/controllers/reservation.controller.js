"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const express_1 = require("express");
const reservation_service_1 = require("../services/reservation.service");
const reservation_validation_1 = require("../utils/validations/reservation.validation");
const reservationService = new reservation_service_1.ReservationService();
class ReservationController {
    async createReservation(req, res) {
        try {
            const validatedData = reservation_validation_1.createReservationSchema.parse(req.body);
            const reservation = await reservationService.createReservation({
                userId: req.user.userId,
                showtimeId: validatedData.showtimeId,
                seatIds: validatedData.seatIds,
            });
            return res.status(201).json({
                success: true,
                message: "Reservation created successfully",
                data: reservation,
            });
        }
        catch (error) {
            if (error?.name === "ZodError") {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.issues,
                });
            }
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getUserReservations(req, res) {
        try {
            const reservations = await reservationService.getUserReservations(req.user.userId);
            return res.status(200).json({
                success: true,
                count: reservations.length,
                data: reservations,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async cancelReservation(req, res) {
        try {
            const reservation = await reservationService.cancelReservation(req.params.id, req.user.userId);
            return res.status(200).json({
                success: true,
                message: "Reservation cancelled successfully",
                data: reservation,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getAllReservations(req, res) {
        try {
            const reservations = await reservationService.getAllReservations();
            return res.status(200).json({
                success: true,
                count: reservations.length,
                data: reservations,
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
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservation.controller.js.map