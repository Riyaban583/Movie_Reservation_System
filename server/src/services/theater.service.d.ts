interface CreateTheaterData {
    name: string;
    location: string;
    city: string;
}
export declare class TheaterService {
    createTheater(data: CreateTheaterData): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
        city: string;
    }>;
    getAllTheaters(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
        city: string;
    }[]>;
    getTheaterById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
        city: string;
    } | null>;
    updateTheater(id: string, data: Partial<CreateTheaterData>): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
        city: string;
    }>;
    deleteTheater(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
        city: string;
    }>;
}
export {};
//# sourceMappingURL=theater.service.d.ts.map