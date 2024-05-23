/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Link_path_key` ON `Link`(`path`);
