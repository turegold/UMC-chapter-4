create table UMC.user
(
    phone_number       varchar(15)                              not null
        primary key,
    name               varchar(10)                              not null,
    nickname           varchar(20)                              null,
    gender             enum ('남성', '여성', '미정')                  not null,
    birthday           varchar(20)                              null,
    address            varchar(80)                              null,
    total_point        bigint      default 0                    null,
    location_agreement tinyint(1)  default 0                    null,
    alarm_agreement    tinyint(1)  default 0                    null,
    created_time       datetime(6) default CURRENT_TIMESTAMP(6) null,
    updated_time       datetime(6) default CURRENT_TIMESTAMP(6) null on update CURRENT_TIMESTAMP(6)
);

