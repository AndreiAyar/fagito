-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "repeatPassword" DROP NOT NULL,
ALTER COLUMN "username" DROP NOT NULL;
