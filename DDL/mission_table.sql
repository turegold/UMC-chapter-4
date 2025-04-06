create table UMC.mission
(
    id            bigint auto_increment
        primary key,
    store_id      bigint                                   not null,
    name          varchar(50)                              not null,
    description   varchar(500)                             null,
    reward        bigint      default 0                    null,
    start_time    datetime(6)                              null,
    end_time      datetime(6)                              null,
    created_time  datetime(6) default CURRENT_TIMESTAMP(6) null,
    updated_time  datetime(6) default CURRENT_TIMESTAMP(6) null on update CURRENT_TIMESTAMP(6),
    minimum_price bigint                                   null,
    constraint mission_ibfk_1
        foreign key (store_id) references umc.store (id)
);

create index store_id
    on UMC.mission (store_id);

