/*
  Warnings:

  - The values [FUN] on the enum `Tone` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `length` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Length" AS ENUM ('SHORT', 'MEDIUM', 'LONG');

-- AlterEnum
BEGIN;
CREATE TYPE "Tone_new" AS ENUM ('PROFESSIONAL', 'CASUAL', 'BOLD', 'HUMOROUS', 'PERSUASIVE', 'VIRAL');
ALTER TABLE "Tweet" ALTER COLUMN "tone" TYPE "Tone_new" USING ("tone"::text::"Tone_new");
ALTER TYPE "Tone" RENAME TO "Tone_old";
ALTER TYPE "Tone_new" RENAME TO "Tone";
DROP TYPE "public"."Tone_old";
COMMIT;

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "length" "Length" NOT NULL;
