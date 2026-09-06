import { z } from "zod";
export declare const createReservationSchema: z.ZodObject<{
    showtimeId: z.ZodString;
    seatIds: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=reservation.validation.d.ts.map