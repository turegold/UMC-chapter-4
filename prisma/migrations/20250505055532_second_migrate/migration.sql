-- CreateTable
CREATE TABLE `Store` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `owner_id` BIGINT NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `created_time` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `store_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `reward` BIGINT NOT NULL DEFAULT 0,
    `start_time` TIMESTAMP(6) NOT NULL,
    `end_time` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `created_time` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `minimum_price` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_phone_number` VARCHAR(15) NOT NULL,
    `store_id` BIGINT NOT NULL,
    `mission_id` BIGINT NOT NULL,
    `state` ENUM('not_accepted', 'in_progress', 'completed') NOT NULL DEFAULT 'not_accepted',
    `accepted_time` DATETIME(3) NULL,
    `completed_time` DATETIME(3) NULL,
    `review_written` BOOLEAN NOT NULL DEFAULT false,
    `created_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_mission_id` BIGINT NOT NULL,
    `user_phone_number` VARCHAR(15) NOT NULL,
    `store_id` BIGINT NOT NULL,
    `description` TEXT NULL,
    `rating` FLOAT NOT NULL,
    `created_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_user_phone_number_fkey` FOREIGN KEY (`user_phone_number`) REFERENCES `User`(`phone_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_phone_number_fkey` FOREIGN KEY (`user_phone_number`) REFERENCES `User`(`phone_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_mission_id_fkey` FOREIGN KEY (`user_mission_id`) REFERENCES `user_mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
