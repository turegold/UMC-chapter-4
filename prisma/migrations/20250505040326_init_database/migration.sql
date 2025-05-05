-- CreateTable
CREATE TABLE `User` (
    `phone_number` VARCHAR(15) NOT NULL,
    `name` VARCHAR(10) NOT NULL,
    `nickname` VARCHAR(20) NOT NULL,
    `gender` ENUM('남성', '여성', '미정') NOT NULL,
    `birthday` VARCHAR(20) NOT NULL,
    `address` VARCHAR(80) NOT NULL,
    `total_point` BIGINT NOT NULL DEFAULT 0,
    `location_agreement` BOOLEAN NOT NULL DEFAULT false,
    `alarm_agreement` BOOLEAN NOT NULL DEFAULT false,
    `created_time` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`phone_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
