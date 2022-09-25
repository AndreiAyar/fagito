-- DropForeignKey
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_groceryId_fkey";

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_groceryId_fkey" FOREIGN KEY ("groceryId") REFERENCES "Groceries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
