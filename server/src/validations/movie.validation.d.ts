import { z } from "zod";
export declare const createMovieSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    duration: z.ZodNumber;
    genre: z.ZodString;
    language: z.ZodString;
    releaseDate: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=movie.validation.d.ts.map