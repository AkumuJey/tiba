/*
  Warnings:

  - You are about to drop the `prescription_detail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `prescription_detail` DROP FOREIGN KEY `prescription_detail_drugID_fkey`;

-- DropForeignKey
ALTER TABLE `prescription_detail` DROP FOREIGN KEY `prescription_detail_prescriptionID_fkey`;

-- AlterTable
ALTER TABLE `prescription` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- DropTable
DROP TABLE `prescription_detail`;
