-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `shop` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `scope` VARCHAR(191) NULL,
    `expires` DATETIME(3) NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `userId` BIGINT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `accountOwner` BOOLEAN NOT NULL DEFAULT false,
    `locale` VARCHAR(191) NULL,
    `collaborator` BOOLEAN NULL DEFAULT false,
    `emailVerified` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SizeCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WelcomeScreen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `EmbedApp` BOOLEAN NOT NULL DEFAULT false,
    `GettingStart` BOOLEAN NOT NULL DEFAULT false,
    `sessionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WelcomeScreen_sessionId_key`(`sessionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChartIcons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopSettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sizeGuideTitle` VARCHAR(191) NOT NULL,
    `BannerEnable` BOOLEAN NOT NULL DEFAULT true,
    `ChartIconId` INTEGER NOT NULL,
    `ShopId` VARCHAR(191) NOT NULL,
    `customCss` VARCHAR(191) NULL,
    `SizePlacement` VARCHAR(191) NOT NULL DEFAULT 'inline',
    `headerColor` VARCHAR(191) NOT NULL DEFAULT '{"hue":200,"brightness":0.71923828125,"saturation":0.945703125}',
    `headerFontColor` VARCHAR(191) NOT NULL DEFAULT '{"hue":150,"brightness":0.73173828125,"saturation":0.874609375}',
    `zebraLinesColor` VARCHAR(191) NOT NULL DEFAULT '{"hue":100,"brightness":0.81923828125,"saturation":0.759765625}',
    `focusColor` VARCHAR(191) NOT NULL DEFAULT '{"hue":300,"brightness":0.73798828125,"saturation":0.932421875}',
    `borderStyle` VARCHAR(191) NOT NULL DEFAULT 'tunnel',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ShopSettings_ShopId_key`(`ShopId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `images` TEXT NOT NULL,
    `ShopId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ShopImages_ShopId_key`(`ShopId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PredefinedSizeChart` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sizeCategoryId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `icon` VARCHAR(191) NOT NULL DEFAULT '',
    `allow_converter` BOOLEAN NOT NULL DEFAULT true,
    `allow_converter_in` INTEGER NOT NULL DEFAULT 1,
    `rounding_mode` VARCHAR(191) NOT NULL DEFAULT 'auto',
    `rounding_numOfDecimals` INTEGER NOT NULL DEFAULT 1,
    `rounding_roundTo` DECIMAL(65, 30) NOT NULL DEFAULT 0.1,
    `content` TEXT NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '',
    `user_chart_data` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoreSizeChart` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ShopId` VARCHAR(191) NOT NULL,
    `templateId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `allow_converter` BOOLEAN NOT NULL DEFAULT true,
    `allow_converter_in` INTEGER NOT NULL DEFAULT 1,
    `rounding_mode` VARCHAR(191) NOT NULL DEFAULT 'auto',
    `rounding_numOfDecimals` INTEGER NOT NULL DEFAULT 1,
    `rounding_roundTo` DECIMAL(65, 30) NOT NULL DEFAULT 0.1,
    `content` TEXT NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '',
    `user_chart_data` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LinkedProduct` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `storeId` VARCHAR(191) NOT NULL,
    `productTitle` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `storeSizeChartId` VARCHAR(191) NULL,

    UNIQUE INDEX `LinkedProduct_storeId_productId_key`(`storeId`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LinkedCollection` (
    `id` VARCHAR(191) NOT NULL,
    `collectionId` VARCHAR(191) NOT NULL,
    `collectionTitle` VARCHAR(191) NOT NULL,
    `storeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `storeSizeChartId` VARCHAR(191) NULL,

    UNIQUE INDEX `LinkedCollection_storeId_collectionId_key`(`storeId`, `collectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WelcomeScreen` ADD CONSTRAINT `WelcomeScreen_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopSettings` ADD CONSTRAINT `ShopSettings_ChartIconId_fkey` FOREIGN KEY (`ChartIconId`) REFERENCES `ChartIcons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopSettings` ADD CONSTRAINT `ShopSettings_ShopId_fkey` FOREIGN KEY (`ShopId`) REFERENCES `Session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopImages` ADD CONSTRAINT `ShopImages_ShopId_fkey` FOREIGN KEY (`ShopId`) REFERENCES `Session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PredefinedSizeChart` ADD CONSTRAINT `PredefinedSizeChart_sizeCategoryId_fkey` FOREIGN KEY (`sizeCategoryId`) REFERENCES `SizeCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreSizeChart` ADD CONSTRAINT `StoreSizeChart_ShopId_fkey` FOREIGN KEY (`ShopId`) REFERENCES `Session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreSizeChart` ADD CONSTRAINT `StoreSizeChart_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `PredefinedSizeChart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LinkedProduct` ADD CONSTRAINT `LinkedProduct_storeSizeChartId_fkey` FOREIGN KEY (`storeSizeChartId`) REFERENCES `StoreSizeChart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LinkedCollection` ADD CONSTRAINT `LinkedCollection_storeSizeChartId_fkey` FOREIGN KEY (`storeSizeChartId`) REFERENCES `StoreSizeChart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
