-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PredefinedSizeChart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sizeCategoryId" INTEGER NOT NULL,
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
    CONSTRAINT "PredefinedSizeChart_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES "SizeCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PredefinedSizeChart" ("allow_converter", "content", "createdAt", "id", "image", "name", "rounding_mode", "rounding_numOfDecimals", "rounding_roundTo", "sizeCategoryId", "status", "updatedAt", "user_chart_data") SELECT "allow_converter", "content", "createdAt", "id", "image", "name", "rounding_mode", "rounding_numOfDecimals", "rounding_roundTo", "sizeCategoryId", "status", "updatedAt", "user_chart_data" FROM "PredefinedSizeChart";
DROP TABLE "PredefinedSizeChart";
ALTER TABLE "new_PredefinedSizeChart" RENAME TO "PredefinedSizeChart";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
