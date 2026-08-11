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

  async getAllMovies() {
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return movies;
  }

  async getMovieById(id: string) {
  const movie = await prisma.movie.findUnique({
    where: {
      id,
    },
  });

  return movie;
}

async updateMovie(id: string, data: any) {
  const movie = await prisma.movie.update({
    where: {
      id,
    },
    data,
  });

  return movie;
}

async deleteMovie(id: string) {
  const movie = await prisma.movie.delete({
    where: {
      id,
    },
  });

  return movie;
}
}