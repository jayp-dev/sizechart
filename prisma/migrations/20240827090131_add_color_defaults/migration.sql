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
    "headerColor" TEXT NOT NULL DEFAULT '{"hue":200,"brightness":0.71923828125,"saturation":0.945703125}',
    "headerFontColor" TEXT NOT NULL DEFAULT '{"hue":150,"brightness":0.73173828125,"saturation":0.874609375}',
    "zebraLinesColor" TEXT NOT NULL DEFAULT '{"hue":100,"brightness":0.81923828125,"saturation":0.759765625}',
    "focusColor" TEXT NOT NULL DEFAULT '{"hue":300,"brightness":0.73798828125,"saturation":0.932421875}',
    "borderStyle" TEXT NOT NULL DEFAULT 'tunnel',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ShopSettings_ChartIconId_fkey" FOREIGN KEY ("ChartIconId") REFERENCES "ChartIcons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShopSettings_ShopId_fkey" FOREIGN KEY ("ShopId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ShopSettings" ("BannerEnable", "ChartIconId", "ShopId", "SizePlacement", "borderStyle", "createdAt", "customCss", "focusColor", "headerColor", "headerFontColor", "id", "sizeGuideTitle", "updatedAt", "zebraLinesColor") SELECT "BannerEnable", "ChartIconId", "ShopId", "SizePlacement", "borderStyle", "createdAt", "customCss", "focusColor", "headerColor", "headerFontColor", "id", "sizeGuideTitle", "updatedAt", "zebraLinesColor" FROM "ShopSettings";
DROP TABLE "ShopSettings";
ALTER TABLE "new_ShopSettings" RENAME TO "ShopSettings";
CREATE UNIQUE INDEX "ShopSettings_ShopId_key" ON "ShopSettings"("ShopId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
