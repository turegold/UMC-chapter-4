create table UMC.store
(
    id           bigint auto_increment
        primary key,
    name         varchar(50)                              not null,
    owner_id     bigint                                   not null,
    address      varchar(100)                             null,
    phone_number varchar(15)                              null,
    created_time datetime(6) default CURRENT_TIMESTAMP(6) null,
    updated_time datetime(6) default CURRENT_TIMESTAMP(6) null on update CURRENT_TIMESTAMP(6)
);

