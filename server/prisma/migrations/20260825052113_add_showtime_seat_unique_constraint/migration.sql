/*
  Safely add showtimeId to existing ReservationSeat records
  and enforce showtime + seat uniqueness.
*/

-- Drop old unique constraint
DROP INDEX "public"."ReservationSeat_reservationId_seatId_key";

-- 1. Add showtimeId as nullable first
ALTER TABLE "public"."ReservationSeat"
ADD COLUMN "showtimeId" TEXT;

-- 2. Fill showtimeId from the related Reservation
UPDATE "public"."ReservationSeat" rs
SET "showtimeId" = r."showtimeId"
FROM "public"."Reservation" r
WHERE rs."reservationId" = r."id";

-- 3. Make showtimeId required
ALTER TABLE "public"."ReservationSeat"
ALTER COLUMN "showtimeId" SET NOT NULL;

-- 4. Add unique constraint: one seat can be reserved only once per showtime
CREATE UNIQUE INDEX "ReservationSeat_showtimeId_seatId_key"
ON "public"."ReservationSeat"("showtimeId", "seatId");

-- 5. Add foreign key
ALTER TABLE "public"."ReservationSeat"
ADD CONSTRAINT "ReservationSeat_showtimeId_fkey"
FOREIGN KEY ("showtimeId")
REFERENCES "public"."Showtime"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;