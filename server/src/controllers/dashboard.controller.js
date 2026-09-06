"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const express_1 = require("express");
const dashboard_service_1 = require("../services/dashboard.service");
const dashboardService = new dashboard_service_1.DashboardService();
class DashboardController {
    async getDashboardSummary(req, res) {
        try {
            const summary = await dashboardService.getDashboardSummary();
            return res.status(200).json({
                success: true,
                data: summary,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getOccupancySummary(req, res) {
        try {
            const occupancy = await dashboardService.getOccupancySummary();
            return res.status(200).json({
                success: true,
                data: occupancy,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getBookingTrendSummary(req, res) {
        try {
            const trend = await dashboardService.getBookingTrendSummary();
            return res.status(200).json({
                success: true,
                data: trend,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getRevenueSummary(req, res) {
        try {
            const revenue = await dashboardService.getRevenueSummary();
            return res.status(200).json({
                success: true,
                data: revenue,
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
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map