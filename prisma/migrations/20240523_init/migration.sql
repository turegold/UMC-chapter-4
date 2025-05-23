-- CreateTable
CREATE TABLE `User` (
    `phone_number` VARCHAR(15) NOT NULL,
    `name` VARCHAR(10) NOT NULL,
    `nickname` VARCHAR(20) NULL,
    `gender` ENUM('남성', '여성', '미정') NOT NULL,
    `birthday` VARCHAR(20) NULL,
    `address` VARCHAR(80) NULL,
    `total_point` BIGINT NULL DEFAULT 0,
    `location_agreement` BOOLEAN NULL DEFAULT false,
    `alarm_agreement` BOOLEAN NULL DEFAULT false,
    `created_time` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `email` VARCHAR(100) NULL,

    UNIQUE INDEX `unique_email`(`email`),
    PRIMARY KEY (`phone_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `store_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(500) NULL,
    `reward` BIGINT NULL DEFAULT 0,
    `start_time` DATETIME(6) NULL,
    `end_time` DATETIME(6) NULL,
    `created_time` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `minimum_price` BIGINT NULL,

    INDEX `store_id`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_phone_number` VARCHAR(15) NOT NULL,
    `store_id` BIGINT NOT NULL,
    `mission_id` BIGINT NOT NULL,
    `state` ENUM('not_accepted', 'in_progress', 'completed') NULL,
    `accepted_time` DATETIME(6) NULL,
    `completed_time` DATETIME(6) NULL,
    `review_written` BOOLEAN NULL DEFAULT false,
    `created_time` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `mission_id`(`mission_id`),
    INDEX `store_id`(`store_id`),
    INDEX `user_phone_number`(`user_phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_mission_id` BIGINT NOT NULL,
    `user_phone_number` VARCHAR(15) NOT NULL,
    `store_id` BIGINT NOT NULL,
    `description` TEXT NULL,
    `rating` FLOAT NULL,
    `created_time` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `store_id`(`store_id`),
    INDEX `user_mission_id`(`user_mission_id`),
    INDEX `user_phone_number`(`user_phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` VARCHAR(512) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `owner_id` BIGINT NOT NULL,
    `address` VARCHAR(100) NULL,
    `phone_number` VARCHAR(15) NULL,
    `created_time` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_ibfk_3` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_mission_id`) REFERENCES `user_mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_ibfk_3` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

