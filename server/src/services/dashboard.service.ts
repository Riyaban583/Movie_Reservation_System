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
}