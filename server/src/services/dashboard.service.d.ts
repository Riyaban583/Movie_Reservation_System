export declare class DashboardService {
    getDashboardSummary(): Promise<{
        totalMovies: number;
        totalTheaters: number;
        totalScreens: number;
        totalShowtimes: number;
        totalReservations: number;
    }>;
    getOccupancySummary(): Promise<{
        totalCapacity: number;
        bookedSeats: number;
        availableSeats: number;
        occupancyPercentage: number;
    }>;
    getBookingTrendSummary(): Promise<{
        date: string;
        bookings: number;
    }[]>;
    getRevenueSummary(): Promise<{
        totalRevenue: number;
    }>;
}
//# sourceMappingURL=dashboard.service.d.ts.map