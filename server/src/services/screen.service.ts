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

  async generateSeats(
    screenId: string,
    rows: number,
    seatsPerRow: number
  ) {
    const seats = [];

    for (let row = 0; row < rows; row++) {
      const rowName = String.fromCharCode(65 + row);

      for (let seat = 1; seat <= seatsPerRow; seat++) {
        seats.push({
          seatNumber: `${rowName}${seat}`,
          screenId,
        });
      }
    }

    return prisma.seat.createMany({
      data: seats,
    });
  }

  async getSeatsByScreen(screenId: string) {
  const seats = await prisma.seat.findMany({
    where: {
      screenId,
    },
    orderBy: {
      seatNumber: "asc",
    },
  });

  return seats;
}

async getSeatAvailabilityByShowtime(showtimeId: string) {
  const showtime = await prisma.showtime.findUnique({
    where: {
      id: showtimeId,
    },
    include: {
      screen: {
        include: {
          seats: true,
        },
      },
    },
  });

  if (!showtime) {
    throw new Error("Showtime not found");
  }

  const reservedSeats = await prisma.reservationSeat.findMany({
    where: {
      reservation: {
        showtimeId,
        status: "CONFIRMED",
      },
    },
    select: {
      seatId: true,
    },
  });

  const reservedSeatIds = new Set(
    reservedSeats.map((item) => item.seatId)
  );

  return showtime.screen.seats.map((seat) => ({
    id: seat.id,
    seatNumber: seat.seatNumber,
    available: !reservedSeatIds.has(seat.id),
  }));
}
}