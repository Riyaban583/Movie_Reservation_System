import { Request, Response } from "express";
export declare class TheaterController {
    createTheater(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllTheaters(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getTheaterById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateTheater(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteTheater(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=theater.controller.d.ts.map