/*
  Warnings:

  - Added the required column `healthProviderID` to the `medical_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medical_history` ADD COLUMN `healthProviderID` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `vitals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` INTEGER NOT NULL,
    `presentation` VARCHAR(191) NOT NULL,
    `medicalHistory` VARCHAR(191) NOT NULL,
    `healthProviderID` INTEGER NOT NULL,

    UNIQUE INDEX `vitals_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `physical_examination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` INTEGER NOT NULL,
    `presentation` VARCHAR(191) NOT NULL,
    `medicalHistory` VARCHAR(191) NOT NULL,
    `healthProviderID` INTEGER NOT NULL,

    UNIQUE INDEX `physical_examination_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laboratory_results` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` INTEGER NOT NULL,
    `presentation` VARCHAR(191) NOT NULL,
    `medicalHistory` VARCHAR(191) NOT NULL,
    `healthProviderID` INTEGER NOT NULL,

    UNIQUE INDEX `laboratory_results_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `medical_history` ADD CONSTRAINT `medical_history_healthProviderID_fkey` FOREIGN KEY (`healthProviderID`) REFERENCES `healthcare_provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vitals` ADD CONSTRAINT `vitals_healthProviderID_fkey` FOREIGN KEY (`healthProviderID`) REFERENCES `healthcare_provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vitals` ADD CONSTRAINT `vitals_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_examination` ADD CONSTRAINT `physical_examination_healthProviderID_fkey` FOREIGN KEY (`healthProviderID`) REFERENCES `healthcare_provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_examination` ADD CONSTRAINT `physical_examination_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_results` ADD CONSTRAINT `laboratory_results_healthProviderID_fkey` FOREIGN KEY (`healthProviderID`) REFERENCES `healthcare_provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_results` ADD CONSTRAINT `laboratory_results_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
