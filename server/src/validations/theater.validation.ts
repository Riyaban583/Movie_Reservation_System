import { z } from "zod";

export const createTheaterSchema = z.object({
  name: z.string().min(2),
  location: z.string().min(2),
  city: z.string().min(2),
});