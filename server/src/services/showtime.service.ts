import prisma from "../lib/prisma";

interface CreateShowtimeData {
  movieId: string;
  screenId: string;
  startTime: Date;
  endTime: Date;
}

export class ShowtimeService {
  async createShowtime(data: CreateShowtimeData) {

    // 👇 YAHAN ADD KARNA HAI
    const overlappingShowtime = await prisma.showtime.findFirst({
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

  async getAllShowtimes() {
  const showtimes = await prisma.showtime.findMany({
    orderBy: {
      startTime: "asc",
    },
  });

  return showtimes;
}

async getShowtimesByDate(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const showtimes = await prisma.showtime.findMany({
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
}