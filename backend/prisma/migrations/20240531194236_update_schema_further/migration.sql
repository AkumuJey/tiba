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
ALTER TABLE `prescription_detail` ADD CONSTRAINT `prescription_detail_prescriptionID_fkey` FOREIGN KEY (`prescriptionID`) REFERENCES `prescription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_detail` ADD CONSTRAINT `prescription_detail_drugID_fkey` FOREIGN KEY (`drugID`) REFERENCES `drug`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
