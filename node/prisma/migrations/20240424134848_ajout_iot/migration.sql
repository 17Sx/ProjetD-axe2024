/*
  Warnings:

  - You are about to drop the column `carte` on the `usercard` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `usercard` table. All the data in the column will be lost.
  - Added the required column `inventory` to the `UserCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usercard` DROP FOREIGN KEY `userCard_userId_fkey`;

-- AlterTable
ALTER TABLE `usercard` DROP COLUMN `carte`,
    DROP COLUMN `userId`,
    ADD COLUMN `inventory` VARCHAR(191) NOT NULL;
