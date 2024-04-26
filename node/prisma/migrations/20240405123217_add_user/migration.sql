/*
  Warnings:

  - A unique constraint covering the columns `[pseudo]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `maison` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `favoriteCard` VARCHAR(191) NULL,
    ADD COLUMN `listeCard` VARCHAR(191) NULL,
    ADD COLUMN `listelikedcard` VARCHAR(191) NULL,
    ADD COLUMN `maison` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_pseudo_key` ON `user`(`pseudo`);
