/*
  Warnings:

  - The primary key for the `SmallQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SmallQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SmallQuestion" DROP CONSTRAINT "SmallQuestion_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SmallQuestion_pkey" PRIMARY KEY ("bigQuestionId", "seqIndex");
