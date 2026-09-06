"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const redis_1 = __importDefault(require("../lib/redis"));
class MovieService {
    async createMovie(data) {
        const movie = await prisma_1.default.movie.create({
            data: {
                title: data.title,
                description: data.description,
                duration: data.duration,
                genre: data.genre,
                language: data.language,
                releaseDate: data.releaseDate,
            },
        });
        await redis_1.default.del("movies:all");
        return movie;
    }
    async getAllMovies() {
        const cacheKey = "movies:all";
        const cachedMovies = await redis_1.default.get(cacheKey);
        if (cachedMovies) {
            return JSON.parse(cachedMovies);
        }
        const movies = await prisma_1.default.movie.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        await redis_1.default.set(cacheKey, JSON.stringify(movies), "EX", 300);
        return movies;
    }
    async getMovieById(id) {
        const movie = await prisma_1.default.movie.findUnique({
            where: {
                id,
            },
        });
        return movie;
    }
    async updateMovie(id, data) {
        const movie = await prisma_1.default.movie.update({
            where: {
                id,
            },
            data,
        });
        await redis_1.default.del("movies:all");
        return movie;
    }
    async deleteMovie(id) {
        const movie = await prisma_1.default.movie.delete({
            where: {
                id,
            },
        });
        await redis_1.default.del("movies:all");
        return movie;
    }
}
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map