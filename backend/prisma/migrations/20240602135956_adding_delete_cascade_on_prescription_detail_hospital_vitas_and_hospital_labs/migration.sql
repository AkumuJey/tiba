-- DropForeignKey
ALTER TABLE `hospital_labs` DROP FOREIGN KEY `hospital_labs_medicalHistoryID_fkey`;

-- DropForeignKey
ALTER TABLE `hospital_vitals` DROP FOREIGN KEY `hospital_vitals_medicalHistoryID_fkey`;

-- DropForeignKey
ALTER TABLE `prescription_detail` DROP FOREIGN KEY `prescription_detail_prescriptionID_fkey`;

-- AddForeignKey
ALTER TABLE `hospital_vitals` ADD CONSTRAINT `hospital_vitals_medicalHistoryID_fkey` FOREIGN KEY (`medicalHistoryID`) REFERENCES `medical_history`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hospital_labs` ADD CONSTRAINT `hospital_labs_medicalHistoryID_fkey` FOREIGN KEY (`medicalHistoryID`) REFERENCES `medical_history`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_detail` ADD CONSTRAINT `prescription_detail_prescriptionID_fkey` FOREIGN KEY (`prescriptionID`) REFERENCES `prescription`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
