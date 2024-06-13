-- AlterTable
ALTER TABLE `prescription` ADD COLUMN `medicalHistoryID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `prescription` ADD CONSTRAINT `prescription_medicalHistoryID_fkey` FOREIGN KEY (`medicalHistoryID`) REFERENCES `medical_history`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
