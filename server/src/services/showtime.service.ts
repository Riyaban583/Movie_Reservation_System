import prisma from "../lib/prisma";

interface CreateShowtimeData {
  movieId: string;
  screenId: string;
  startTime: Date;
  endTime: Date;
}

export class ShowtimeService {
  async createShowtime(data: CreateShowtimeData) {
    const showtime = await prisma.showtime.create({
      data: {
        movieId: data.movieId,
        screenId: data.screenId,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    });

    return showtime;
  }
}