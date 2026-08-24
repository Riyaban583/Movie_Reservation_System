import prisma from "../lib/prisma";

interface CreateReservationData {
  userId: string;
  showtimeId: string;
  seatIds: string[];
}

export class ReservationService {
  async createReservation(data: CreateReservationData) {
    const reservation = await prisma.reservation.create({
      data: {
        userId: data.userId,
        showtimeId: data.showtimeId,
        seats: {
          create: data.seatIds.map((seatId) => ({
            seatId,
          })),
        },
      },
      include: {
        seats: true,
      },
    });

    return reservation;
  }

  async getUserReservations(userId: string) {
  const reservations = await prisma.reservation.findMany({
    where: {
      userId,
    },
    include: {
      seats: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reservations;
}
}