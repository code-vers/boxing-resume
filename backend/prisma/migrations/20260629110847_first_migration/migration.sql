-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MANAGER', 'ADMIN');

-- CreateEnum
CREATE TYPE "FighterStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'RETIRED');

-- CreateEnum
CREATE TYPE "Stance" AS ENUM ('ORTHODOX', 'SOUTHPAW', 'SWITCH');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "WinMethod" AS ENUM ('KO', 'TKO', 'UD', 'MD', 'SD', 'DQ', 'NC', 'DRAW');

-- CreateEnum
CREATE TYPE "TitleTier" AS ENUM ('WORLD', 'INTERCONTINENTAL', 'REGIONAL', 'NATIONAL', 'OTHER');

-- CreateEnum
CREATE TYPE "BoxingOrg" AS ENUM ('WBC', 'WBA', 'IBF', 'WBO', 'RING', 'IBO', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "passwordResetCode" TEXT,
    "passwordResetExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fighters" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickname" TEXT,
    "image" TEXT,
    "nationality" TEXT,
    "birthDate" TIMESTAMP(3),
    "division" TEXT NOT NULL,
    "stance" "Stance",
    "height" TEXT,
    "reach" TEXT,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "draws" INTEGER NOT NULL DEFAULT 0,
    "ko_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "FighterStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fighters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "mainBout" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "location" TEXT,
    "image" TEXT,
    "bouts" INTEGER NOT NULL,
    "broadcast" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "winnerId" TEXT NOT NULL,
    "loserId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "method" "WinMethod" NOT NULL,
    "round" INTEGER NOT NULL,
    "weight" TEXT NOT NULL,
    "title" TEXT,
    "poster" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "titles" (
    "id" TEXT NOT NULL,
    "beltName" TEXT NOT NULL,
    "org" "BoxingOrg" NOT NULL,
    "tier" "TitleTier" NOT NULL,
    "division" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "title_histories" (
    "id" TEXT NOT NULL,
    "fighterId" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "wonDate" TIMESTAMP(3) NOT NULL,
    "lostDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "title_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rankings" (
    "id" TEXT NOT NULL,
    "fighterId" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "ko_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rankings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "fighters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_loserId_fkey" FOREIGN KEY ("loserId") REFERENCES "fighters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_histories" ADD CONSTRAINT "title_histories_fighterId_fkey" FOREIGN KEY ("fighterId") REFERENCES "fighters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_histories" ADD CONSTRAINT "title_histories_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "titles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_fighterId_fkey" FOREIGN KEY ("fighterId") REFERENCES "fighters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
