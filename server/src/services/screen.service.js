"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
class ScreenService {
    async createScreen(data) {
        const screen = await prisma_1.default.screen.create({
            data: {
                name: data.name,
                theaterId: data.theaterId,
            },
        });
        return screen;
    }
    async generateSeats(screenId, rows, seatsPerRow) {
        const seats = [];
        for (let row = 0; row < rows; row++) {
            const rowName = String.fromCharCode(65 + row);
            for (let seat = 1; seat <= seatsPerRow; seat++) {
                seats.push({
                    seatNumber: `${rowName}${seat}`,
                    screenId,
                });
            }
        }
        return prisma_1.default.seat.createMany({
            data: seats,
        });
    }
    async getSeatsByScreen(screenId) {
        const seats = await prisma_1.default.seat.findMany({
            where: {
                screenId,
            },
            orderBy: {
                seatNumber: "asc",
            },
        });
        return seats;
    }
    async getAllScreens() {
        const screens = await prisma_1.default.screen.findMany({
            include: {
                theater: true,
                seats: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return screens;
    }
    async getSeatAvailabilityByShowtime(showtimeId) {
        const showtime = await prisma_1.default.showtime.findUnique({
            where: {
                id: showtimeId,
            },
            include: {
                screen: {
                    include: {
                        seats: true,
                    },
                },
            },
        });
        if (!showtime) {
            throw new Error("Showtime not found");
        }
        const reservedSeats = await prisma_1.default.reservationSeat.findMany({
            where: {
                reservation: {
                    showtimeId,
                    OR: [
                        {
                            status: "CONFIRMED",
                        },
                        {
                            status: "HELD",
                            expiresAt: {
                                gt: new Date(),
                            },
                        },
                    ],
                },
            },
            select: {
                seatId: true,
            },
        });
        const reservedSeatIds = new Set(reservedSeats.map((item) => item.seatId));
        return showtime.screen.seats.map((seat) => ({
            id: seat.id,
            seatNumber: seat.seatNumber,
            available: !reservedSeatIds.has(seat.id),
        }));
    }
}
exports.ScreenService = ScreenService;
//# sourceMappingURL=screen.service.js.map