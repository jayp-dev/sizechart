-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StoreSizeChart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ShopId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "allow_converter" BOOLEAN NOT NULL DEFAULT true,
    "allow_converter_in" INTEGER NOT NULL DEFAULT 1,
    "rounding_mode" TEXT NOT NULL DEFAULT 'auto',
    "rounding_numOfDecimals" INTEGER NOT NULL DEFAULT 1,
    "rounding_roundTo" DECIMAL NOT NULL DEFAULT 0.1,
    "content" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "user_chart_data" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StoreSizeChart_ShopId_fkey" FOREIGN KEY ("ShopId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StoreSizeChart_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "PredefinedSizeChart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StoreSizeChart" ("ShopId", "allow_converter", "content", "createdAt", "id", "image", "name", "rounding_mode", "rounding_numOfDecimals", "rounding_roundTo", "status", "templateId", "updatedAt", "user_chart_data") SELECT "ShopId", "allow_converter", "content", "createdAt", "id", "image", "name", "rounding_mode", "rounding_numOfDecimals", "rounding_roundTo", "status", "templateId", "updatedAt", "user_chart_data" FROM "StoreSizeChart";
DROP TABLE "StoreSizeChart";
ALTER TABLE "new_StoreSizeChart" RENAME TO "StoreSizeChart";
CREATE UNIQUE INDEX "StoreSizeChart_ShopId_key" ON "StoreSizeChart"("ShopId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
