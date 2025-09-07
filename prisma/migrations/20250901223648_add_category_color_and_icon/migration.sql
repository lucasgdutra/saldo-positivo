/*
  Warnings:

  - You are about to drop the column `monthlyIncome` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."categories" ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#3B82F6',
ADD COLUMN     "icon" TEXT NOT NULL DEFAULT 'folder';

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "monthlyIncome";
