/*
  Warnings:

  - You are about to drop the column `triglceride` on the `home_labs` table. All the data in the column will be lost.
  - You are about to drop the column `triglceride` on the `hospital_labs` table. All the data in the column will be lost.
  - Added the required column `triglyceride` to the `home_labs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triglyceride` to the `hospital_labs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `home_labs` DROP COLUMN `triglceride`,
    ADD COLUMN `triglyceride` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `hospital_labs` DROP COLUMN `triglceride`,
    ADD COLUMN `triglyceride` DOUBLE NOT NULL;
