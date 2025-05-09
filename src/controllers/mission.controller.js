import {
    addMission, addUserMission,
    listStoreMissions, listUserMissions,
} from "../services/mission.service.js";
import { PatchUserMisson } from "../repositories/mission.repositoy.js";
import { StatusCodes } from "http-status-codes";
export const handlerAddMission = async (req, res, next) => {
    console.log("미션을 추가합니다.");
    const mission = await addMission(req.body);
    res.status(StatusCodes.OK).success(mission);
}

export const handlerAdduserMission = async (req, res, next) => {
    console.log("미션을 도전합니다.");
    const user_mission = await addUserMission(req.body);
    res.status(StatusCodes.OK).success(user_mission);
}

export const handlerGetStoreMissions = async (req, res, next) => {
    console.log("특정 가게의 미션 목록을 불러옵니다.");
    const storeId = parseInt(req.params.storeID);
    const cursor = typeof req.query.cursor === "string" ? BigInt(req.query.cursor) : 0
    console.log("storeId:", storeId);
    const missions = await listStoreMissions(storeId, cursor);
    res.status(StatusCodes.OK).success(missions);
}

export const handlerGetUserMissions = async (req, res, next) => {
    console.log("유저가 진행중인 미션을 불러옵니다.");
    const user_phone_number = req.params.user_phone_number;
    const cursor = typeof req.query.cursor === "string" ? BigInt(req.query.cursor) : 0
    console.log("user_phone_number:", user_phone_number);
    const missions = await listUserMissions(user_phone_number, cursor);
    res.status(StatusCodes.OK).success(missions);
}

export const handlerPatchUserMissions = async (req, res, next) => {
    console.log("유저의 미션의 상태를 완료로 변경합니다.");
    const user_mission_id = parseInt(req.params.user_mission_id);
    console.log("user_mission_id:", user_mission_id);
    const mission = await PatchUserMisson(user_mission_id);
    res.status(StatusCodes.OK).success(mission);
}