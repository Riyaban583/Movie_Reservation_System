"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheaterService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
class TheaterService {
    async createTheater(data) {
        const theater = await prisma_1.default.theater.create({
            data: {
                name: data.name,
                location: data.location,
                city: data.city,
            },
        });
        return theater;
    }
    async getAllTheaters() {
        const theaters = await prisma_1.default.theater.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return theaters;
    }
    async getTheaterById(id) {
        const theater = await prisma_1.default.theater.findUnique({
            where: {
                id,
            },
        });
        return theater;
    }
    async updateTheater(id, data) {
        const theater = await prisma_1.default.theater.update({
            where: {
                id,
            },
            data,
        });
        return theater;
    }
    async deleteTheater(id) {
        const theater = await prisma_1.default.theater.delete({
            where: {
                id,
            },
        });
        return theater;
    }
}
exports.TheaterService = TheaterService;
//# sourceMappingURL=theater.service.js.map