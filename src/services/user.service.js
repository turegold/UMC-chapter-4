import {
    insertStoretoDB,
    getStorefromDB,

    insertMissiontoDB,
    getMissionfromDB,
    insertUserMissiontoDB,
    getuserMissionfromDB,

} from "../repositories/user.repository.js"

// 가게 추가 기능 구현
export const addStore = async (body) => {
    const joinStoreID = await insertStoretoDB({
        name: body.name,
        owner_id: body.owner_id,
        address: body.address,
        phone_number: body.phone_number,
    });

    if (joinStoreID === null) {
        throw new Error("이미 존재하는 가게입니다.");
    }

    const store = await getStorefromDB(joinStoreID);
    return store;
}


// 미션 추가 기능 구현
export const addMission = async (body) => {
    const joinMissionID = await insertMissiontoDB({
        store_id: body.store_id,
        name: body.name,
        description: body.description,
        reward: body.reward,
        start_time: body.start_time,
        end_time: body.end_time,
        minimum_price: body.minimum_price,
    })

    if (joinMissionID === null) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    const mission = await getMissionfromDB(joinMissionID);
    return mission;
}

// 미션 도전 기능 구현
export const addUserMission = async (body) => {
    const joinUserMissionID = await insertUserMissiontoDB({
        user_phone_number: body.user_phone_number,
        store_id: body.store_id,
        mission_id: body.store_id,
        state: "in_progress",
        accepted_time: body.accepted_time,
        completed_time: null,
        review_written: 0,
    })

    if (joinUserMissionID === null) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    const mission = await getuserMissionfromDB(joinUserMissionID);
    return mission;
}
