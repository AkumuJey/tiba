/*
  Warnings:

  - Added the required column `healthcareProviderID` to the `prescription_detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prescription_detail` ADD COLUMN `healthcareProviderID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `prescription_detail` ADD CONSTRAINT `prescription_detail_healthcareProviderID_fkey` FOREIGN KEY (`healthcareProviderID`) REFERENCES `healthcare_provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
