-- CreateTable
CREATE TABLE "packages" (
    "id" SERIAL NOT NULL,
    "namaPengirim" VARCHAR(100) NOT NULL,
    "alamatPengirim" VARCHAR(255) NOT NULL,
    "namaPenerima" VARCHAR(100) NOT NULL,
    "alamatPenerima" VARCHAR(255) NOT NULL,
    "ekspedisiId" TEXT NOT NULL,
    "tanggalPembuatan" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expedition" (
    "id" TEXT NOT NULL,
    "namaEkspedisi" VARCHAR(100) NOT NULL,

    CONSTRAINT "expedition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_ekspedisiId_fkey" FOREIGN KEY ("ekspedisiId") REFERENCES "expedition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
