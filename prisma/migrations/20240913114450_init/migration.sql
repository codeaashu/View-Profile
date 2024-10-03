/*
  Warnings:

  - A unique constraint covering the columns `[userId,degree]` on the table `Education` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,company,position]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Education_userId_degree_key" ON "Education"("userId", "degree");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_userId_company_position_key" ON "Experience"("userId", "company", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Project_userId_name_key" ON "Project"("userId", "name");
