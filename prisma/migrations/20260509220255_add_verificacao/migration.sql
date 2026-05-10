-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "codigoExpira" TIMESTAMP(3),
ADD COLUMN     "codigoVerif" TEXT,
ADD COLUMN     "verificado" BOOLEAN NOT NULL DEFAULT false;
