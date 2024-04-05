/*
  Warnings:

  - You are about to drop the `SpamAnalitics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SpamAnalitics";

-- CreateTable
CREATE TABLE "SpamAnalytics" (
    "phoneNumber" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "SpamAnalytics_pkey" PRIMARY KEY ("phoneNumber")
);
