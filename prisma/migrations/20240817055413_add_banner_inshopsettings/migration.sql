-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShopSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sizeGuideTitle" TEXT NOT NULL,
    "BannerEnable" BOOLEAN NOT NULL DEFAULT true,
    "ChartIconId" INTEGER NOT NULL,
    "ShopId" TEXT NOT NULL,
    "customCss" TEXT,
    "SizePlacement" TEXT NOT NULL DEFAULT 'inline',
    "headerColor" TEXT NOT NULL DEFAULT '#d60a0a',
    "headerFontColor" TEXT NOT NULL DEFAULT '#661b1b',
    "zebraLinesColor" TEXT NOT NULL DEFAULT '#21c2c2',
    "focusColor" TEXT NOT NULL DEFAULT '#1ae4e4',
    "borderStyle" TEXT NOT NULL DEFAULT 'tunnel',
    CONSTRAINT "ShopSettings_ChartIconId_fkey" FOREIGN KEY ("ChartIconId") REFERENCES "ChartIcons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShopSettings_ShopId_fkey" FOREIGN KEY ("ShopId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShopSettings" ("ChartIconId", "ShopId", "SizePlacement", "borderStyle", "customCss", "focusColor", "headerColor", "headerFontColor", "id", "sizeGuideTitle", "zebraLinesColor") SELECT "ChartIconId", "ShopId", "SizePlacement", "borderStyle", "customCss", "focusColor", "headerColor", "headerFontColor", "id", "sizeGuideTitle", "zebraLinesColor" FROM "ShopSettings";
DROP TABLE "ShopSettings";
ALTER TABLE "new_ShopSettings" RENAME TO "ShopSettings";
CREATE UNIQUE INDEX "ShopSettings_ShopId_key" ON "ShopSettings"("ShopId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
