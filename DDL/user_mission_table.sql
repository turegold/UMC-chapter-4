create table UMC.user_mission
(
    id                bigint auto_increment
        primary key,
    user_phone_number varchar(15)                                                                    not null,
    store_id          bigint                                                                         not null,
    mission_id        bigint                                                                         not null,
    state             enum ('not_accepted', 'in_progress', 'completed') default 'not_accepted'       null,
    accepted_time     datetime(6)                                                                    null,
    completed_time    datetime(6)                                                                    null,
    review_written    tinyint(1)                                        default 0                    null,
    created_time      datetime(6)                                       default CURRENT_TIMESTAMP(6) null,
    updated_time      datetime(6)                                       default CURRENT_TIMESTAMP(6) null on update CURRENT_TIMESTAMP(6),
    constraint user_mission_ibfk_1
        foreign key (user_phone_number) references umc.user (phone_number),
    constraint user_mission_ibfk_2
        foreign key (store_id) references umc.store (id),
    constraint user_mission_ibfk_3
        foreign key (mission_id) references umc.mission (id)
);

create index mission_id
    on UMC.user_mission (mission_id);

create index store_id
    on UMC.user_mission (store_id);

create index user_phone_number
    on UMC.user_mission (user_phone_number);

