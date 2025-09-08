/*
  Warnings:

  - You are about to drop the `TodoTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TodoTask" DROP CONSTRAINT "TodoTask_userId_fkey";

-- DropTable
DROP TABLE "TodoTask";

-- CreateTable
CREATE TABLE "MyTask" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MyTask_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "MyTask" ADD CONSTRAINT "MyTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
