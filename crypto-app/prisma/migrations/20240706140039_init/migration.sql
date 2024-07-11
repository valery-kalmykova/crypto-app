/*
  Warnings:

  - You are about to drop the column `trendFlag` on the `Currency` table. All the data in the column will be lost.
  - Added the required column `lastTrendPrice` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastTrendPriceTime` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trendStep` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trendType` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "trendFlag",
ADD COLUMN     "lastTrendPrice" TEXT NOT NULL,
ADD COLUMN     "lastTrendPriceTime" TEXT NOT NULL,
ADD COLUMN     "trendStep" TEXT NOT NULL,
ADD COLUMN     "trendType" TEXT NOT NULL;
