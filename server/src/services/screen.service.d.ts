interface CreateScreenData {
    name: string;
    theaterId: string;
}
export declare class ScreenService {
    createScreen(data: CreateScreenData): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        theaterId: string;
    }>;
    generateSeats(screenId: string, rows: number, seatsPerRow: number): Promise<import("@prisma/client").Prisma.BatchPayload>;
    getSeatsByScreen(screenId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        seatNumber: string;
        screenId: string;
    }[]>;
    getAllScreens(): Promise<({
        theater: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            location: string;
            city: string;
        };
        seats: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            seatNumber: string;
            screenId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        theaterId: string;
    })[]>;
    getSeatAvailabilityByShowtime(showtimeId: string): Promise<{
        id: string;
        seatNumber: string;
        available: boolean;
    }[]>;
}
export {};
//# sourceMappingURL=screen.service.d.ts.map