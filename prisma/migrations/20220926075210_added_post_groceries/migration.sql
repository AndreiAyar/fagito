/*
  Warnings:

  - You are about to drop the `_GroceriesToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroceriesToPost" DROP CONSTRAINT "_GroceriesToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroceriesToPost" DROP CONSTRAINT "_GroceriesToPost_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "imageSrc" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "_GroceriesToPost";

-- CreateTable
CREATE TABLE "PostGroceries" (
    "id" SERIAL NOT NULL,
    "groceryId" INTEGER NOT NULL,
    "postId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "quantityUnit" TEXT NOT NULL,
    "neededQuantity" INTEGER NOT NULL,
    "neededQuantityUnit" TEXT NOT NULL,

    CONSTRAINT "PostGroceries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToVendor" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostToVendor_AB_unique" ON "_PostToVendor"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToVendor_B_index" ON "_PostToVendor"("B");

-- AddForeignKey
ALTER TABLE "PostGroceries" ADD CONSTRAINT "PostGroceries_groceryId_fkey" FOREIGN KEY ("groceryId") REFERENCES "Groceries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostGroceries" ADD CONSTRAINT "PostGroceries_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToVendor" ADD CONSTRAINT "_PostToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToVendor" ADD CONSTRAINT "_PostToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
