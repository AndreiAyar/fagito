/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Groceries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Groceries_url_key" ON "Groceries"("url");
