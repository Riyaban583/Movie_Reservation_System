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

  // 👇 YE METHOD YAHAN ADD KARO
  async getAllMovies(req: Request, res: Response) {
  console.log("movieService:", movieService);

  try {
    const movies = await movieService.getAllMovies();

    return res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async getMovieById(req: Request, res: Response) {
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async updateMovie(req: Request, res: Response) {
  try {
    const movie = await movieService.updateMovie(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: movie,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async deleteMovie(req: Request, res: Response) {
  try {
    const movie = await movieService.deleteMovie(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      data: movie,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
}