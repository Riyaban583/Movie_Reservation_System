import prisma from "../lib/prisma";

interface CreateMovieData {
  title: string;
  description: string;
  duration: number;
  genre: string;
  language: string;
  releaseDate: Date;
}

export class MovieService {
  async createMovie(data: CreateMovieData) {
    const movie = await prisma.movie.create({
      data: {
        title: data.title,
        description: data.description,
        duration: data.duration,
        genre: data.genre,
        language: data.language,
        releaseDate: data.releaseDate,
      },
    });

    return movie;
  }
}