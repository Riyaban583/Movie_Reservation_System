import { z } from "zod";

export const createShowtimeSchema = z
  .object({
    movieId: z.string().min(1),
    screenId: z.string().min(1),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
  })
  .refine(
    (data) => new Date(data.endTime) > new Date(data.startTime),
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );