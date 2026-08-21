/*
  Warnings:

  - A unique constraint covering the columns `[screenId,seatNumber]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Seat_screenId_seatNumber_key" ON "public"."Seat"("screenId", "seatNumber");
