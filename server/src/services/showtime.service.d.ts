interface CreateShowtimeData {
    movieId: string;
    screenId: string;
    startTime: Date;
    endTime: Date;
}
export declare class ShowtimeService {
    createShowtime(data: CreateShowtimeData): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        screenId: string;
        movieId: string;
        startTime: Date;
        endTime: Date;
        price: number;
    }>;
    getAllShowtimes(): Promise<any>;
    getShowtimesByDate(date: Date): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        screenId: string;
        movieId: string;
        startTime: Date;
        endTime: Date;
        price: number;
    }[]>;
    updateShowtime(id: string, data: Partial<CreateShowtimeData>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        screenId: string;
        movieId: string;
        startTime: Date;
        endTime: Date;
        price: number;
    }>;
    deleteShowtime(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        screenId: string;
        movieId: string;
        startTime: Date;
        endTime: Date;
        price: number;
    }>;
}
export {};
//# sourceMappingURL=showtime.service.d.ts.map