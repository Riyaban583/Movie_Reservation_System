/*
  Warnings:

  - You are about to drop the column `screens` on the `Theater` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Theater" DROP COLUMN "screens";

-- CreateTable
CREATE TABLE "public"."Screen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "theaterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Screen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Screen" ADD CONSTRAINT "Screen_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "public"."Theater"("id") ON DELETE CASCADE ON UPDATE CASCADE;
