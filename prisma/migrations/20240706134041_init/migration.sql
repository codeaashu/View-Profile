/*
  Warnings:

  - You are about to drop the column `code` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `live` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `CodingProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code_url` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CodingProfile" DROP CONSTRAINT "CodingProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_userId_fkey";

-- DropForeignKey
ALTER TABLE "SocialProfile" DROP CONSTRAINT "SocialProfile_userId_fkey";

-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "specialization" DROP NOT NULL,
ALTER COLUMN "end" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "end" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "code",
DROP COLUMN "live",
DROP COLUMN "technologies",
ADD COLUMN     "code_url" TEXT NOT NULL,
ADD COLUMN     "live_url" TEXT,
ADD COLUMN     "skills" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "skills" TEXT[];

-- DropTable
DROP TABLE "CodingProfile";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "SocialProfile";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_name_key" ON "Profile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
