-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WelcomeScreen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EmbedApp" BOOLEAN NOT NULL DEFAULT false,
    "GettingStart" BOOLEAN NOT NULL DEFAULT false,
    "sessionId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WelcomeScreen_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WelcomeScreen" ("EmbedApp", "GettingStart", "createdAt", "id", "updatedAt") SELECT "EmbedApp", "GettingStart", "createdAt", "id", "updatedAt" FROM "WelcomeScreen";
DROP TABLE "WelcomeScreen";
ALTER TABLE "new_WelcomeScreen" RENAME TO "WelcomeScreen";
CREATE UNIQUE INDEX "WelcomeScreen_sessionId_key" ON "WelcomeScreen"("sessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
