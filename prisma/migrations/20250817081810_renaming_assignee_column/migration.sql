/*
  Warnings:

  - You are about to drop the column `assigneeId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_assigneeId_fkey`;

-- DropIndex
DROP INDEX `Issue_assigneeId_fkey` ON `Issue`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `assigneeId`,
    ADD COLUMN `assignedTo` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedTo_fkey` FOREIGN KEY (`assignedTo`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
