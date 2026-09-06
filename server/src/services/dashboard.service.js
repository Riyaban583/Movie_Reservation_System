"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
class DashboardService {
    async getDashboardSummary() {
        const [totalMovies, totalTheaters, totalScreens, totalShowtimes, totalReservations,] = await Promise.all([
            prisma_1.default.movie.count(),
            prisma_1.default.theater.count(),
            prisma_1.default.screen.count(),
            prisma_1.default.showtime.count(),
            prisma_1.default.reservation.count(),
        ]);
        return {
            totalMovies,
            totalTheaters,
            totalScreens,
            totalShowtimes,
            totalReservations,
        };
    }
    async getOccupancySummary() {
        const screens = await prisma_1.default.screen.findMany({
            include: {
                seats: true,
                showtimes: {
                    include: {
                        reservationSeats: true,
                    },
                },
            },
        });
        let totalCapacity = 0;
        let bookedSeats = 0;
        for (const screen of screens) {
            for (const showtime of screen.showtimes) {
                totalCapacity += screen.seats.length;
                bookedSeats += showtime.reservationSeats.length;
            }
        }
        const occupancyPercentage = totalCapacity === 0
            ? 0
            : Number(((bookedSeats / totalCapacity) * 100).toFixed(2));
        return {
            totalCapacity,
            bookedSeats,
            availableSeats: totalCapacity - bookedSeats,
            occupancyPercentage,
        };
    }
    async getBookingTrendSummary() {
        const reservations = await prisma_1.default.reservation.findMany({
            select: {
                createdAt: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        const trendMap = {};
        for (const reservation of reservations) {
            const date = reservation.createdAt
                .toISOString()
                .split("T")[0];
            trendMap[date] = (trendMap[date] || 0) + 1;
        }
        return Object.entries(trendMap).map(([date, bookings]) => ({
            date,
            bookings,
        }));
    }
    async getRevenueSummary() {
        const reservations = await prisma_1.default.reservation.findMany({
            where: {
                status: "CONFIRMED",
            },
            include: {
                showtime: {
                    select: {
                        price: true,
                    },
                },
                seats: true,
            },
        });
        let totalRevenue = 0;
        for (const reservation of reservations) {
            totalRevenue += reservation.seats.length * reservation.showtime.price;
        }
        return {
            totalRevenue,
        };
    }
}
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map