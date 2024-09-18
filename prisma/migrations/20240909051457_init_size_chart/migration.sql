-- CreateTable
CREATE TABLE "PredefinedSizeChart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sizeCategoryId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "allow_converter" BOOLEAN NOT NULL DEFAULT true,
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

-- CreateTable
CREATE TABLE "StoreSizeChart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ShopId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "allow_converter" BOOLEAN NOT NULL DEFAULT true,
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

-- CreateTable
CREATE TABLE "LinkedProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeSizeChartId" TEXT,
    CONSTRAINT "LinkedProduct_storeSizeChartId_fkey" FOREIGN KEY ("storeSizeChartId") REFERENCES "StoreSizeChart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LinkedCollection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionId" TEXT NOT NULL,
    "collectionTitle" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeSizeChartId" TEXT,
    CONSTRAINT "LinkedCollection_storeSizeChartId_fkey" FOREIGN KEY ("storeSizeChartId") REFERENCES "StoreSizeChart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "StoreSizeChart_ShopId_key" ON "StoreSizeChart"("ShopId");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedProduct_storeId_productId_key" ON "LinkedProduct"("storeId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedCollection_storeId_collectionId_key" ON "LinkedCollection"("storeId", "collectionId");
