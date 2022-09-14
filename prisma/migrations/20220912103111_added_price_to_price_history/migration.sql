/*
  Warnings:

  - Added the required column `price` to the `PriceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PriceHistory" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
