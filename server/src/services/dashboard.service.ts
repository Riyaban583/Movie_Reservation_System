import prisma from "../lib/prisma";

export class DashboardService {
  async getDashboardSummary() {
    const [
      totalMovies,
      totalTheaters,
      totalScreens,
      totalShowtimes,
      totalReservations,
    ] = await Promise.all([
      prisma.movie.count(),
      prisma.theater.count(),
      prisma.screen.count(),
      prisma.showtime.count(),
      prisma.reservation.count(),
    ]);

    return {
      totalMovies,
      totalTheaters,
      totalScreens,
      totalShowtimes,
      totalReservations,
    };
  }

  async getOccupancySummary() {
    const screens = await prisma.screen.findMany({
      include: {
        seats: true,
        showtimes: {
          include: {
            reservationSeats: true,
          },
        },
      },
    });

    let totalCapacity = 0;
    let bookedSeats = 0;

    for (const screen of screens) {
      for (const showtime of screen.showtimes) {
        totalCapacity += screen.seats.length;
        bookedSeats += showtime.reservationSeats.length;
      }
    }

    const occupancyPercentage =
      totalCapacity === 0
        ? 0
        : Number(((bookedSeats / totalCapacity) * 100).toFixed(2));

    return {
      totalCapacity,
      bookedSeats,
      availableSeats: totalCapacity - bookedSeats,
      occupancyPercentage,
    };
  }

  async getBookingTrendSummary() {
    const reservations = await prisma.reservation.findMany({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const trendMap: Record<string, number> = {};

    for (const reservation of reservations) {
      const date = reservation.createdAt
        .toISOString()
        .split("T")[0];

      trendMap[date] = (trendMap[date] || 0) + 1;
    }

    return Object.entries(trendMap).map(([date, bookings]) => ({
      date,
      bookings,
    }));
  }
}