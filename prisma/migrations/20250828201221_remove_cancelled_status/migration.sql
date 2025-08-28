/*
  Warnings:

  - The values [CANCELLED] on the enum `Issue_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Issue` MODIFY `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED', 'ON_HOLD', 'COMPLETED') NOT NULL DEFAULT 'OPEN';
