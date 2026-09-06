"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const express_1 = require("express");
const movie_service_1 = require("../services/movie.service");
const movie_validation_1 = require("../validations/movie.validation");
const movieService = new movie_service_1.MovieService();
class MovieController {
    async createMovie(req, res) {
        try {
            movie_validation_1.createMovieSchema.parse(req.body);
            const movie = await movieService.createMovie({
                title: req.body.title,
                description: req.body.description,
                duration: Number(req.body.duration),
                genre: req.body.genre,
                language: req.body.language,
                releaseDate: new Date(req.body.releaseDate),
            });
            return res.status(201).json({
                success: true,
                message: "Movie created successfully",
                data: movie,
            });
        }
        catch (error) {
            console.error("MOVIE ERROR:", error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // 👇 YE METHOD YAHAN ADD KARO
    async getAllMovies(req, res) {
        console.log("movieService:", movieService);
        try {
            const movies = await movieService.getAllMovies();
            return res.status(200).json({
                success: true,
                count: movies.length,
                data: movies,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getMovieById(req, res) {
        try {
            const movie = await movieService.getMovieById(req.params.id);
            if (!movie) {
                return res.status(404).json({
                    success: false,
                    message: "Movie not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: movie,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async updateMovie(req, res) {
        try {
            const movie = await movieService.updateMovie(req.params.id, req.body);
            return res.status(200).json({
                success: true,
                message: "Movie updated successfully",
                data: movie,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async deleteMovie(req, res) {
        try {
            const movie = await movieService.deleteMovie(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Movie deleted successfully",
                data: movie,
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
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map