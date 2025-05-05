import {
    insertMissiontoDB,
    getMissionfromDB,
    insertUserMissiontoDB,
    getuserMissionfromDB,
    getStoreMissions,
    getUserMissions,

} from "../repositories/mission.repositoy.js";
import { responseFromMissions, responseFromUserMissions } from "../dtos/mission.dto.js";
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

export const listStoreMissions = async (store_mission_id, cursor) => {
    console.log("특정 가게 미션들 불러오기")
    const store_missions = await getStoreMissions(store_mission_id, cursor);
    console.log("불러온 가게 미션 데이터:", store_missions);
    return responseFromMissions(store_missions);
}

export const listUserMissions = async (user_phone_number, cursor) => {
    const user_missions = await getUserMissions(user_phone_number, cursor);
    console.log("불러온 데이터:", user_missions);
    return responseFromUserMissions(user_missions);
}
