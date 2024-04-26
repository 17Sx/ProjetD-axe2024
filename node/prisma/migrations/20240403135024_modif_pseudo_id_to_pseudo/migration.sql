/*
  Warnings:

  - You are about to drop the column `pseudo_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `pseudo` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `pseudo_id`,
    ADD COLUMN `pseudo` VARCHAR(191) NOT NULL;
