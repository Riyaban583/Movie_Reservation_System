interface CreateMovieData {
    title: string;
    description: string;
    duration: number;
    genre: string;
    language: string;
    releaseDate: Date;
}
export declare class MovieService {
    createMovie(data: CreateMovieData): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        duration: number;
        genre: string;
        language: string;
        releaseDate: Date;
    }>;
    getAllMovies(): Promise<any>;
    getMovieById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        duration: number;
        genre: string;
        language: string;
        releaseDate: Date;
    } | null>;
    updateMovie(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        duration: number;
        genre: string;
        language: string;
        releaseDate: Date;
    }>;
    deleteMovie(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        duration: number;
        genre: string;
        language: string;
        releaseDate: Date;
    }>;
}
export {};
//# sourceMappingURL=movie.service.d.ts.map