/*
  Warnings:

  - You are about to drop the `drug` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `drug_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `laboratory_results` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `physical_examination` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vitals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Summary` to the `medical_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physicalExamination` to the `medical_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drugName` to the `prescription_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route` to the `prescription_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units` to the `prescription_detail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `drug` DROP FOREIGN KEY `drug_categoryID_fkey`;

-- DropForeignKey
ALTER TABLE `laboratory_results` DROP FOREIGN KEY `laboratory_results_healthProviderID_fkey`;

-- DropForeignKey
ALTER TABLE `laboratory_results` DROP FOREIGN KEY `laboratory_results_patientID_fkey`;

-- DropForeignKey
ALTER TABLE `physical_examination` DROP FOREIGN KEY `physical_examination_healthProviderID_fkey`;

-- DropForeignKey
ALTER TABLE `physical_examination` DROP FOREIGN KEY `physical_examination_patientID_fkey`;

-- DropForeignKey
ALTER TABLE `prescription_detail` DROP FOREIGN KEY `prescription_detail_drugID_fkey`;

-- DropForeignKey
ALTER TABLE `vitals` DROP FOREIGN KEY `vitals_healthProviderID_fkey`;

-- DropForeignKey
ALTER TABLE `vitals` DROP FOREIGN KEY `vitals_patientID_fkey`;

-- AlterTable
ALTER TABLE `healthcare_provider` ADD COLUMN `subscribed` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `medical_history` ADD COLUMN `Summary` VARCHAR(191) NOT NULL,
    ADD COLUMN `physicalExamination` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `subscribed` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `prescription_detail` ADD COLUMN `drugName` VARCHAR(191) NOT NULL,
    ADD COLUMN `route` VARCHAR(191) NOT NULL,
    ADD COLUMN `units` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `drug`;

-- DropTable
DROP TABLE `drug_category`;

-- DropTable
DROP TABLE `laboratory_results`;

-- DropTable
DROP TABLE `physical_examination`;

-- DropTable
DROP TABLE `vitals`;

-- CreateTable
CREATE TABLE `SuperUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SuperUser_id_key`(`id`),
    UNIQUE INDEX `SuperUser_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospital_vitals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` INTEGER NOT NULL,
    `healthProviderID` INTEGER NOT NULL,
    `medicalHistoryID` INTEGER NOT NULL,
    `breathingRate` INTEGER NOT NULL,
    `systolicBP` INTEGER NOT NULL,
    `diastolicBP` INTEGER NOT NULL,
    `pulseRate` INTEGER NOT NULL,
    `weightKg` DOUBLE NOT NULL,

    UNIQUE INDEX `hospital_vitals_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_vitals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` INTEGER NOT NULL,
    `healthProviderID` INTEGER NOT NULL,
    `breathingRate` INTEGER NOT NULL,
    `systolicBP` INTEGER NOT NULL,
    `diastolicBP` INTEGER NOT NULL,
    `pulseRate` INTEGER NOT NULL,
    `weightKg` DOUBLE NOT NULL,

    UNIQUE INDEX `home_vitals_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospital_labs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` INTEGER NOT NULL,
    `healthProviderID` INTEGER NOT NULL,
    `medicalHistoryID` INTEGER NOT NULL,
    `bloodSugar` DOUBLE NOT NULL,
    `cholesterol` DOUBLE NOT NULL,
    `LDL` DOUBLE NOT NULL,
    `HDL` DOUBLE NOT NULL,
    `triglceride` DOUBLE NOT NULL,
    `findings` VARCHAR(191) NOT NULL,
    `labName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `hospital_labs_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_labs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` INTEGER NOT NULL,
    `bloodSugar` DOUBLE NOT NULL,
    `cholesterol` DOUBLE NOT NULL,
    `LDL` DOUBLE NOT NULL,
    `HDL` DOUBLE NOT NULL,
    `triglceride` DOUBLE NOT NULL,
    `findings` VARCHAR(191) NOT NULL,
    `labName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `home_labs_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hospital_vitals` ADD CONSTRAINT `hospital_vitals_healthProviderID_fkey` FOREIGN KEY (`healthProviderID`) REFERENCES `healthcare_provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hospital_vitals` ADD CONSTRAINT `hospital_vitals_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hospital_vitals` ADD CONSTRAINT `hospital_vitals_medicalHistoryID_fkey` FOREIGN KEY (`medicalHistoryID`) REFERENCES `medical_history`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `home_vitals` ADD CONSTRAINT `home_vitals_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hospital_labs` ADD CONSTRAINT `hospital_labs_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hospital_labs` ADD CONSTRAINT `hospital_labs_healthProviderID_fkey` FOREIGN KEY (`healthProviderID`) REFERENCES `healthcare_provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hospital_labs` ADD CONSTRAINT `hospital_labs_medicalHistoryID_fkey` FOREIGN KEY (`medicalHistoryID`) REFERENCES `medical_history`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `home_labs` ADD CONSTRAINT `home_labs_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
