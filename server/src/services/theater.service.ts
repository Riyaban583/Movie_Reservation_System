import prisma from "../lib/prisma";

interface CreateTheaterData {
  name: string;
  location: string;
  city: string;
}

export class TheaterService {
  async createTheater(data: CreateTheaterData) {
    const theater = await prisma.theater.create({
      data: {
        name: data.name,
        location: data.location,
        city: data.city,
      },
    });

    return theater;
  }

  async getAllTheaters() {
    const theaters = await prisma.theater.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return theaters;
  }

  async getTheaterById(id: string) {
    const theater = await prisma.theater.findUnique({
      where: {
        id,
      },
    });

    return theater;
  }

  async updateTheater(
    id: string,
    data: Partial<CreateTheaterData>
  ) {
    const theater = await prisma.theater.update({
      where: {
        id,
      },
      data,
    });

    return theater;
  }

  async deleteTheater(id: string) {
    const theater = await prisma.theater.delete({
      where: {
        id,
      },
    });

    return theater;
  }
}