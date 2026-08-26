import prisma from "../lib/prisma";
import redis from "../lib/redis";

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

    await redis.del("movies:all");
    return movie;
  }

  async getAllMovies() {
  const cacheKey = "movies:all";

  const cachedMovies = await redis.get(cacheKey);

  if (cachedMovies) {
    return JSON.parse(cachedMovies);
  }

  const movies = await prisma.movie.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  await redis.set(
    cacheKey,
    JSON.stringify(movies),
    "EX",
    300
  );

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

  await redis.del("movies:all");

  return movie;
}

async deleteMovie(id: string) {
  const movie = await prisma.movie.delete({
    where: {
      id,
    },
  });

  await redis.del("movies:all");

  return movie;
}
}