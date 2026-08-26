import prisma from "../lib/prisma";
import redis from "../lib/redis";

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

    await redis.del("showtimes:all");

    return showtime;
  }

  async getAllShowtimes() {
  const cacheKey = "showtimes:all";

  const cachedShowtimes = await redis.get(cacheKey);

  if (cachedShowtimes) {
    return JSON.parse(cachedShowtimes);
  }

  const showtimes = await prisma.showtime.findMany({
    orderBy: {
      startTime: "asc",
    },
  });

  const cacheResult = await redis.set(
  cacheKey,
  JSON.stringify(showtimes),
  "EX",
  300
);

console.log("Showtime cache set:", cacheResult);

return showtimes;
  }

async getShowtimesByDate(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

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

async updateShowtime(
  id: string,
  data: Partial<CreateShowtimeData>
) {
  const currentShowtime = await prisma.showtime.findUnique({
    where: {
      id,
    },
  });

  if (!currentShowtime) {
    throw new Error("Showtime not found");
  }

  const newScreenId = data.screenId ?? currentShowtime.screenId;
  const newStartTime = data.startTime ?? currentShowtime.startTime;
  const newEndTime = data.endTime ?? currentShowtime.endTime;

  const overlappingShowtime = await prisma.showtime.findFirst({
    where: {
      id: {
        not: id,
      },
      screenId: newScreenId,
      AND: [
        {
          startTime: {
            lt: newEndTime,
          },
        },
        {
          endTime: {
            gt: newStartTime,
          },
        },
      ],
    },
  });

  if (overlappingShowtime) {
    throw new Error("Showtime overlaps with an existing show");
  }

  const showtime = await prisma.showtime.update({
    where: {
      id,
    },
    data,
  });
  await redis.del("showtimes:all");
  return showtime;
}

async deleteShowtime(id: string) {
  const showtime = await prisma.showtime.delete({
    where: {
      id,
    },
  });
  await redis.del("showtimes:all");
  return showtime;
}
}