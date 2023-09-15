-- CreateTable
CREATE TABLE `OrderHeader` (
    `orderHeaderId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `couponCode` VARCHAR(191) NULL,
    `discount` DECIMAL(65, 30) NOT NULL,
    `orderTotal` DECIMAL(65, 30) NOT NULL,
    `orderTime` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NULL,
    `paymentIntentId` VARCHAR(191) NULL,
    `stripeSessionId` VARCHAR(191) NULL,

    PRIMARY KEY (`orderHeaderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderDetails` (
    `orderDetailsId` VARCHAR(191) NOT NULL,
    `orderHeaderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `productPrice` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`orderDetailsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_orderHeaderId_fkey` FOREIGN KEY (`orderHeaderId`) REFERENCES `OrderHeader`(`orderHeaderId`) ON DELETE RESTRICT ON UPDATE CASCADE;
