import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  duration: z.number().positive(),
  genre: z.string().min(1),
  language: z.string().min(1),
  releaseDate: z.string(),
});