-- CreateTable
CREATE TABLE "ShopImages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "images" TEXT NOT NULL DEFAULT '[]',
    "ShopId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ShopImages_ShopId_fkey" FOREIGN KEY ("ShopId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopImages_ShopId_key" ON "ShopImages"("ShopId");
