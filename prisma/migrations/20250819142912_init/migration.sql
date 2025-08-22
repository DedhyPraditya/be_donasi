-- CreateTable
CREATE TABLE "Donasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "nominal" INTEGER NOT NULL,
    "waktu" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donaturTetapId" INTEGER,
    CONSTRAINT "Donasi_donaturTetapId_fkey" FOREIGN KEY ("donaturTetapId") REFERENCES "DonaturTetap" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DonaturTetap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "DonaturTetap_email_key" ON "DonaturTetap"("email");
