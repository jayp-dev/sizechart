/*
  Warnings:

  - Made the column `sessionId` on table `WelcomeScreen` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WelcomeScreen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EmbedApp" BOOLEAN NOT NULL DEFAULT false,
    "GettingStart" BOOLEAN NOT NULL DEFAULT false,
    "sessionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WelcomeScreen_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WelcomeScreen" ("EmbedApp", "GettingStart", "createdAt", "id", "sessionId", "updatedAt") SELECT "EmbedApp", "GettingStart", "createdAt", "id", "sessionId", "updatedAt" FROM "WelcomeScreen";
DROP TABLE "WelcomeScreen";
ALTER TABLE "new_WelcomeScreen" RENAME TO "WelcomeScreen";
CREATE UNIQUE INDEX "WelcomeScreen_sessionId_key" ON "WelcomeScreen"("sessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
