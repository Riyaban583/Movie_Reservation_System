interface CreateReservationData {
    userId: string;
    showtimeId: string;
    seatIds: string[];
}
export declare class ReservationService {
    createReservation(data: CreateReservationData): Promise<{
        qrCode: string;
        seats: {
            id: string;
            createdAt: Date;
            reservationId: string;
            showtimeId: string;
            seatId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        showtimeId: string;
        status: string;
        expiresAt: Date | null;
    }>;
    getUserReservations(userId: string): Promise<({
        seats: {
            id: string;
            createdAt: Date;
            reservationId: string;
            showtimeId: string;
            seatId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        showtimeId: string;
        status: string;
        expiresAt: Date | null;
    })[]>;
    cancelReservation(reservationId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        showtimeId: string;
        status: string;
        expiresAt: Date | null;
    }>;
    getAllReservations(): Promise<({
        seats: {
            id: string;
            createdAt: Date;
            reservationId: string;
            showtimeId: string;
            seatId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        showtimeId: string;
        status: string;
        expiresAt: Date | null;
    })[]>;
    expireHeldReservations(): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
export {};
//# sourceMappingURL=reservation.service.d.ts.map