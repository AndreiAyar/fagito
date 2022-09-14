-- AlterTable
ALTER TABLE "Groceries" ADD COLUMN     "url" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "vendorId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Groceries" ADD CONSTRAINT "Groceries_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
