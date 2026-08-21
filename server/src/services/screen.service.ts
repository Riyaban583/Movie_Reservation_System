import prisma from "../lib/prisma";

interface CreateScreenData {
  name: string;
  theaterId: string;
}

export class ScreenService {
  async createScreen(data: CreateScreenData) {
    const screen = await prisma.screen.create({
      data: {
        name: data.name,
        theaterId: data.theaterId,
      },
    });

    return screen;
  }
}