import { Request, Response } from "express";
export declare class MovieController {
    createMovie(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllMovies(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getMovieById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateMovie(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteMovie(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=movie.controller.d.ts.map