-- CreateTable
CREATE TABLE `healthcare_provider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNo` VARCHAR(191) NOT NULL,
    `age` INTEGER NULL,
    `verified` BOOLEAN NOT NULL,

    UNIQUE INDEX `healthcare_provider_id_key`(`id`),
    UNIQUE INDEX `healthcare_provider_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATE NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `emergencyContactName` VARCHAR(191) NULL,
    `emergencyContactPhone` VARCHAR(191) NULL,

    UNIQUE INDEX `patient_id_key`(`id`),
    UNIQUE INDEX `patient_email_key`(`email`),
    UNIQUE INDEX `patient_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drug_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoryName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `drug_category_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drug` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoryID` INTEGER NOT NULL,
    `brandName` VARCHAR(191) NOT NULL,
    `pharmcoName` VARCHAR(191) NOT NULL,
    `manufactureDate` DATE NOT NULL,
    `expiryDate` DATE NOT NULL,
    `batchNo` VARCHAR(191) NULL,
    `unitsAvailable` VARCHAR(191) NOT NULL,
    `pricePerUnit` DOUBLE NOT NULL,

    UNIQUE INDEX `drug_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` INTEGER NOT NULL,
    `healthProviderID` INTEGER NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `appointmentTime` DATETIME(3) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `appointments_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescription` (
    `id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` INTEGER NOT NULL,
    `healthcareProviderID` INTEGER NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `instruction` VARCHAR(191) NULL,

    UNIQUE INDEX `prescription_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientID` INTEGER NOT NULL,
    `presentation` VARCHAR(191) NOT NULL,
    `medicalHistory` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `medical_history_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescription_detail` (
    `id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `prescriptionID` INTEGER NOT NULL,
    `drugID` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `durationInDays` INTEGER NOT NULL,

    UNIQUE INDEX `prescription_detail_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `drug` ADD CONSTRAINT `drug_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `drug_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_healthProviderID_fkey` FOREIGN KEY (`healthProviderID`) REFERENCES `healthcare_provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription` ADD CONSTRAINT `prescription_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription` ADD CONSTRAINT `prescription_healthcareProviderID_fkey` FOREIGN KEY (`healthcareProviderID`) REFERENCES `healthcare_provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_history` ADD CONSTRAINT `medical_history_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_detail` ADD CONSTRAINT `prescription_detail_prescriptionID_fkey` FOREIGN KEY (`prescriptionID`) REFERENCES `prescription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_detail` ADD CONSTRAINT `prescription_detail_drugID_fkey` FOREIGN KEY (`drugID`) REFERENCES `drug`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
