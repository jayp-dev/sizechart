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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ShopSettings_ChartIconId_fkey" FOREIGN KEY ("ChartIconId") REFERENCES "ChartIcons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShopSettings_ShopId_fkey" FOREIGN KEY ("ShopId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ShopSettings" ("BannerEnable", "ChartIconId", "ShopId", "SizePlacement", "borderStyle", "createdAt", "customCss", "focusColor", "headerColor", "headerFontColor", "id", "sizeGuideTitle", "updatedAt", "zebraLinesColor") SELECT "BannerEnable", "ChartIconId", "ShopId", "SizePlacement", "borderStyle", "createdAt", "customCss", "focusColor", "headerColor", "headerFontColor", "id", "sizeGuideTitle", "updatedAt", "zebraLinesColor" FROM "ShopSettings";
DROP TABLE "ShopSettings";
ALTER TABLE "new_ShopSettings" RENAME TO "ShopSettings";
CREATE UNIQUE INDEX "ShopSettings_ShopId_key" ON "ShopSettings"("ShopId");
CREATE TABLE "new_WelcomeScreen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EmbedApp" BOOLEAN NOT NULL DEFAULT false,
    "GettingStart" BOOLEAN NOT NULL DEFAULT false,
    "sessionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WelcomeScreen_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WelcomeScreen" ("EmbedApp", "GettingStart", "createdAt", "id", "sessionId", "updatedAt") SELECT "EmbedApp", "GettingStart", "createdAt", "id", "sessionId", "updatedAt" FROM "WelcomeScreen";
DROP TABLE "WelcomeScreen";
ALTER TABLE "new_WelcomeScreen" RENAME TO "WelcomeScreen";
CREATE UNIQUE INDEX "WelcomeScreen_sessionId_key" ON "WelcomeScreen"("sessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
