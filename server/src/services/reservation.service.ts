import prisma from "../lib/prisma";

interface CreateReservationData {
  userId: string;
  showtimeId: string;
  seatIds: string[];
}

export class ReservationService {
  async createReservation(data: CreateReservationData) {
  const reservation = await prisma.$transaction(async (tx) => {
    const createdReservation = await tx.reservation.create({
      data: {
        userId: data.userId,
        showtimeId: data.showtimeId,
        status: "HELD",
expiresAt: new Date(Date.now() + 10 * 60 * 1000),
       seats: {
  create: data.seatIds.map((seatId) => ({
    seatId,
    showtimeId: data.showtimeId,
  })),
},
      },
      include: {
        seats: true,
      },
    });

    return createdReservation;
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

async cancelReservation(
  reservationId: string,
  userId: string
) {
  const reservation = await prisma.reservation.findFirst({
    where: {
      id: reservationId,
      userId,
    },
    include: {
      showtime: true,
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  if (reservation.status === "CANCELLED") {
    throw new Error("Reservation is already cancelled");
  }

  if (reservation.showtime.startTime <= new Date()) {
    throw new Error("Only upcoming reservations can be cancelled");
  }

  const cancelledReservation = await prisma.reservation.update({
    where: {
      id: reservationId,
    },
    data: {
      status: "CANCELLED",
    },
  });

  return cancelledReservation;
}

async getAllReservations() {
  const reservations = await prisma.reservation.findMany({
    include: {
      seats: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reservations;
}

async expireHeldReservations() {
  const expiredReservations = await prisma.reservation.updateMany({
    where: {
      status: "HELD",
      expiresAt: {
        lt: new Date(),
      },
    },
    data: {
      status: "CANCELLED",
    },
  });

  return expiredReservations;
}
}