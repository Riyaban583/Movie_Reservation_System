import prisma from "../lib/prisma";

interface CreateTheaterData {
  name: string;
  location: string;
  city: string;
  screens: number;
}

export class TheaterService {
  async createTheater(data: CreateTheaterData) {
    const theater = await prisma.theater.create({
      data: {
        name: data.name,
        location: data.location,
        city: data.city,
        screens: data.screens,
      },
    });

    return theater;
  }
}