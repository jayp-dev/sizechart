-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LinkedCollection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionId" TEXT NOT NULL,
    "collectionTitle" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeSizeChartId" TEXT,
    CONSTRAINT "LinkedCollection_storeSizeChartId_fkey" FOREIGN KEY ("storeSizeChartId") REFERENCES "StoreSizeChart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LinkedCollection" ("collectionId", "collectionTitle", "createdAt", "id", "storeId", "storeSizeChartId") SELECT "collectionId", "collectionTitle", "createdAt", "id", "storeId", "storeSizeChartId" FROM "LinkedCollection";
DROP TABLE "LinkedCollection";
ALTER TABLE "new_LinkedCollection" RENAME TO "LinkedCollection";
CREATE UNIQUE INDEX "LinkedCollection_storeId_collectionId_key" ON "LinkedCollection"("storeId", "collectionId");
CREATE TABLE "new_LinkedProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeSizeChartId" TEXT,
    CONSTRAINT "LinkedProduct_storeSizeChartId_fkey" FOREIGN KEY ("storeSizeChartId") REFERENCES "StoreSizeChart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LinkedProduct" ("createdAt", "id", "productId", "productTitle", "storeId", "storeSizeChartId") SELECT "createdAt", "id", "productId", "productTitle", "storeId", "storeSizeChartId" FROM "LinkedProduct";
DROP TABLE "LinkedProduct";
ALTER TABLE "new_LinkedProduct" RENAME TO "LinkedProduct";
CREATE UNIQUE INDEX "LinkedProduct_storeId_productId_key" ON "LinkedProduct"("storeId", "productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
