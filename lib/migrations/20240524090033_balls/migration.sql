/*
  Warnings:

  - You are about to drop the column `domain` on the `Link` table. All the data in the column will be lost.
  - Added the required column `domainId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Link` DROP COLUMN `domain`,
    ADD COLUMN `domainId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_domainId_fkey` FOREIGN KEY (`domainId`) REFERENCES `Domain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
