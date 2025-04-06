create table UMC.review
(
    id                bigint auto_increment
        primary key,
    user_mission_id   bigint                                   not null,
    user_phone_number varchar(15)                              not null,
    store_id          bigint                                   not null,
    description       text                                     null,
    rating            float(2, 1)                              null,
    created_time      datetime(6) default CURRENT_TIMESTAMP(6) null,
    updated_time      datetime(6) default CURRENT_TIMESTAMP(6) null on update CURRENT_TIMESTAMP(6),
    constraint review_ibfk_1
        foreign key (user_mission_id) references umc.user_mission (id),
    constraint review_ibfk_2
        foreign key (user_phone_number) references umc.user (phone_number),
    constraint review_ibfk_3
        foreign key (store_id) references umc.store (id),
    check ((`rating` >= 0) and (`rating` <= 5))
);

create index store_id
    on UMC.review (store_id);

create index user_mission_id
    on UMC.review (user_mission_id);

create index user_phone_number
    on UMC.review (user_phone_number);

