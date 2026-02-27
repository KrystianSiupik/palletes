-- CreateEnum
CREATE TYPE "PalletType" AS ENUM ('EPAL_1', 'EPAL_2', 'EPAL_3', 'EPAL_6', 'GMA', 'CUSTOM');

-- CreateEnum
CREATE TYPE "PalletCertificate" AS ENUM ('EPAL', 'ISPM15', 'FSC', 'PEFC');

-- CreateTable
CREATE TABLE "Pallet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PalletType" NOT NULL,
    "length" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,

    CONSTRAINT "Pallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PalletCertificateOnPallet" (
    "palletId" TEXT NOT NULL,
    "certificate" "PalletCertificate" NOT NULL,

    CONSTRAINT "PalletCertificateOnPallet_pkey" PRIMARY KEY ("palletId","certificate")
);

-- AddForeignKey
ALTER TABLE "PalletCertificateOnPallet" ADD CONSTRAINT "PalletCertificateOnPallet_palletId_fkey" FOREIGN KEY ("palletId") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
