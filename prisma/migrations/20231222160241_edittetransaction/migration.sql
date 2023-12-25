/*
  Warnings:

  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Transactions";

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_id" TEXT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
