"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const socket_1 = require("../lib/socket");
const queue_1 = require("../lib/queue");
const qr_1 = require("../lib/qr");
class ReservationService {
    async createReservation(data) {
        const reservation = await prisma_1.default.$transaction(async (tx) => {
            await tx.reservationSeat.deleteMany({
                where: {
                    showtimeId: data.showtimeId,
                    seatId: {
                        in: data.seatIds,
                    },
                    reservation: {
                        OR: [
                            {
                                status: "CANCELLED",
                            },
                            {
                                status: "HELD",
                                expiresAt: {
                                    lt: new Date(),
                                },
                            },
                        ],
                    },
                },
            });
            const createdReservation = await tx.reservation.create({
                data: {
                    userId: data.userId,
                    showtimeId: data.showtimeId,
                    status: "HELD",
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                    seats: {
                        create: data.seatIds.map((seatId) => ({
                            seatId,
                            showtimeId: data.showtimeId,
                        })),
                    },
                },
                include: {
                    seats: true,
                },
            });
            return createdReservation;
        });
        const qrCode = await (0, qr_1.generateQRCode)(reservation.id);
        const io = (0, socket_1.getIO)();
        io.emit("seatAvailabilityUpdated", {
            showtimeId: data.showtimeId,
        });
        await queue_1.emailQueue.add("booking-confirmation", {
            userId: data.userId,
            reservationId: reservation.id,
            showtimeId: data.showtimeId,
            seatIds: data.seatIds,
        });
        return {
            ...reservation,
            qrCode,
        };
    }
    async getUserReservations(userId) {
        const reservations = await prisma_1.default.reservation.findMany({
            where: {
                userId,
            },
            include: {
                seats: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return reservations;
    }
    async cancelReservation(reservationId, userId) {
        const reservation = await prisma_1.default.reservation.findFirst({
            where: {
                id: reservationId,
                userId,
            },
            include: {
                showtime: true,
            },
        });
        if (!reservation) {
            throw new Error("Reservation not found");
        }
        if (reservation.status === "CANCELLED") {
            throw new Error("Reservation is already cancelled");
        }
        if (reservation.showtime.startTime <= new Date()) {
            throw new Error("Only upcoming reservations can be cancelled");
        }
        const cancelledReservation = await prisma_1.default.reservation.update({
            where: {
                id: reservationId,
            },
            data: {
                status: "CANCELLED",
            },
        });
        const io = (0, socket_1.getIO)();
        io.emit("reservationStatusUpdated", {
            reservationId: cancelledReservation.id,
            status: cancelledReservation.status,
        });
        return cancelledReservation;
    }
    async getAllReservations() {
        const reservations = await prisma_1.default.reservation.findMany({
            include: {
                seats: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return reservations;
    }
    async expireHeldReservations() {
        const expiredReservations = await prisma_1.default.reservation.updateMany({
            where: {
                status: "HELD",
                expiresAt: {
                    lt: new Date(),
                },
            },
            data: {
                status: "CANCELLED",
            },
        });
        return expiredReservations;
    }
}
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map