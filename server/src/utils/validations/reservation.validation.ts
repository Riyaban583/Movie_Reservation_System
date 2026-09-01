import { z } from "zod";

export const createReservationSchema = z.object({
  showtimeId: z.string().min(1, "Showtime ID is required"),

  seatIds: z
    .array(z.string().min(1, "Seat ID cannot be empty"))
    .min(1, "At least one seat is required"),
});