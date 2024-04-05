/*
  Warnings:

  - Added the required column `updatedAt` to the `Spam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spam" ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL;
