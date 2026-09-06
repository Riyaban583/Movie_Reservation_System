"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReservationSchema = void 0;
const zod_1 = require("zod");
exports.createReservationSchema = zod_1.z.object({
    showtimeId: zod_1.z.string().min(1, "Showtime ID is required"),
    seatIds: zod_1.z
        .array(zod_1.z.string().min(1, "Seat ID cannot be empty"))
        .min(1, "At least one seat is required"),
});
//# sourceMappingURL=reservation.validation.js.map