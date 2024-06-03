/*
  Warnings:

  - You are about to drop the column `Summary` on the `medical_history` table. All the data in the column will be lost.
  - Added the required column `summary` to the `medical_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medical_history` DROP COLUMN `Summary`,
    ADD COLUMN `summary` VARCHAR(191) NOT NULL;
