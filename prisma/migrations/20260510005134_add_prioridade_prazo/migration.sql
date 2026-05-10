-- CreateEnum
CREATE TYPE "Prioridade" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- AlterTable
ALTER TABLE "Tarefa" ADD COLUMN     "dataLimite" TIMESTAMP(3),
ADD COLUMN     "prioridade" "Prioridade" NOT NULL DEFAULT 'MEDIA';
