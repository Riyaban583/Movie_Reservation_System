"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowtimeService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const redis_1 = __importDefault(require("../lib/redis"));
class ShowtimeService {
    async createShowtime(data) {
        // 👇 YAHAN ADD KARNA HAI
        const overlappingShowtime = await prisma_1.default.showtime.findFirst({
            where: {
                screenId: data.screenId,
                AND: [
                    {
                        startTime: {
                            lt: data.endTime,
                        },
                    },
                    {
                        endTime: {
                            gt: data.startTime,
                        },
                    },
                ],
            },
        });
        if (overlappingShowtime) {
            throw new Error("Showtime overlaps with an existing show");
        }
        // 👇 Ye tumhara existing code hai
        const showtime = await prisma_1.default.showtime.create({
            data: {
                movieId: data.movieId,
                screenId: data.screenId,
                startTime: data.startTime,
                endTime: data.endTime,
            },
        });
        await redis_1.default.del("showtimes:all");
        return showtime;
    }
    async getAllShowtimes() {
        const cacheKey = "showtimes:all";
        const cachedShowtimes = await redis_1.default.get(cacheKey);
        if (cachedShowtimes) {
            return JSON.parse(cachedShowtimes);
        }
        const showtimes = await prisma_1.default.showtime.findMany({
            orderBy: {
                startTime: "asc",
            },
        });
        const cacheResult = await redis_1.default.set(cacheKey, JSON.stringify(showtimes), "EX", 300);
        console.log("Showtime cache set:", cacheResult);
        return showtimes;
    }
    async getShowtimesByDate(date) {
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);
        const showtimes = await prisma_1.default.showtime.findMany({
            where: {
                startTime: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            orderBy: {
                startTime: "asc",
            },
        });
        return showtimes;
    }
    async updateShowtime(id, data) {
        const currentShowtime = await prisma_1.default.showtime.findUnique({
            where: {
                id,
            },
        });
        if (!currentShowtime) {
            throw new Error("Showtime not found");
        }
        const newScreenId = data.screenId ?? currentShowtime.screenId;
        const newStartTime = data.startTime ?? currentShowtime.startTime;
        const newEndTime = data.endTime ?? currentShowtime.endTime;
        const overlappingShowtime = await prisma_1.default.showtime.findFirst({
            where: {
                id: {
                    not: id,
                },
                screenId: newScreenId,
                AND: [
                    {
                        startTime: {
                            lt: newEndTime,
                        },
                    },
                    {
                        endTime: {
                            gt: newStartTime,
                        },
                    },
                ],
            },
        });
        if (overlappingShowtime) {
            throw new Error("Showtime overlaps with an existing show");
        }
        const showtime = await prisma_1.default.showtime.update({
            where: {
                id,
            },
            data,
        });
        await redis_1.default.del("showtimes:all");
        return showtime;
    }
    async deleteShowtime(id) {
        const showtime = await prisma_1.default.showtime.delete({
            where: {
                id,
            },
        });
        await redis_1.default.del("showtimes:all");
        return showtime;
    }
}
exports.ShowtimeService = ShowtimeService;
//# sourceMappingURL=showtime.service.js.map