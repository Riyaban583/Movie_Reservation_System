import { Request, Response } from "express";
import { MovieService } from "../services/movie.service";
import { createMovieSchema } from "../validations/movie.validation";

const movieService = new MovieService();

export class MovieController {
  async createMovie(req: Request, res: Response) {
    try {

        createMovieSchema.parse(req.body);
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
    } catch (error: any) {
  console.error("MOVIE ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
  }
}