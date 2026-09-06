"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShowtimeSchema = void 0;
const zod_1 = require("zod");
exports.createShowtimeSchema = zod_1.z
    .object({
    movieId: zod_1.z.string().min(1),
    screenId: zod_1.z.string().min(1),
    startTime: zod_1.z.string().datetime(),
    endTime: zod_1.z.string().datetime(),
})
    .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
});
//# sourceMappingURL=showtime.validation.js.map