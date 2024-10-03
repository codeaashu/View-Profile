-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "about" TEXT,
    "pic" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodingProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "username" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CodingProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SocialProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "live" TEXT,
    "code" TEXT NOT NULL,
    "technologies" TEXT[],
    "about" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "college" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL DEFAULT 'Present',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL DEFAULT 'Present',
    "about" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CodingProfile_name_key" ON "CodingProfile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CodingProfile_icon_key" ON "CodingProfile"("icon");

-- CreateIndex
CREATE UNIQUE INDEX "CodingProfile_username_key" ON "CodingProfile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "SocialProfile_name_key" ON "SocialProfile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SocialProfile_icon_key" ON "SocialProfile"("icon");

-- CreateIndex
CREATE UNIQUE INDEX "SocialProfile_url_key" ON "SocialProfile"("url");

-- AddForeignKey
ALTER TABLE "CodingProfile" ADD CONSTRAINT "CodingProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialProfile" ADD CONSTRAINT "SocialProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
