/*
  Warnings:

  - You are about to drop the column `authProviderId` on the `User` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_authProviderId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authProviderId",
ALTER COLUMN "password" SET NOT NULL;
