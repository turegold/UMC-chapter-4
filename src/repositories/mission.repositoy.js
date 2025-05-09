import { prisma } from "../db.config.js";
import {
    NonExistentStoreError, ExistentUserMissionError, NonExistentUserError
    , InvalidUserMissionError
} from "../errors.js";
// 미션 추가하기
export const insertMissiontoDB = async (data) => {
    const store = await prisma.store.findFirst({ where: { id: data.store_id } });
    if (!store) {
        throw new NonExistentStoreError("존재하지 않는 가게입니다.");
    }
    console.log("data:", data);
    const created = await prisma.mission.create({
        data: {
            storeId: data.store_id.toString(),
            name: data.name,
            description: data.description,
            reward: data.reward.toString(),
            startTime: new Date(data.start_time),
            endTime: new Date(data.end_time),
            minimumPrice: data.minimum_price.toString(),
        }
    });
    return created.id.toString();
}

// 미션 정보 얻기
export const getMissionfromDB = async (missionId) => {
    const mission = await prisma.mission.findUnique({ where: { id: missionId } })
    return {
        ...mission,
        id: mission.id.toString(),
        storeId: mission.storeId.toString(),
        reward: mission.reward.toString(),
        minimumPrice: mission.minimumPrice.toString(),
    }
}

// 미션 도전하기
export const insertUserMissiontoDB = async (data) => {
    const store = await prisma.store.findFirst({ where: { id: data.store_id } });
    if (!store) {
        throw new NonExistentStoreError("존재하지 않는 가게입니다.");
    }
    const existing_mission = await prisma.userMission.findFirst({
        where: {
            userPhoneNumber: data.user_phone_number,
            missionId: data.mission_id.toString(),
        },
    });
    if (existing_mission) {
        throw new ExistentUserMissionError("이미 도전하고 있는 미션입니다.");
    }
    const created = await prisma.userMission.create({
        data: {
            userPhoneNumber: data.user_phone_number,
            storeId: data.store_id.toString(),
            state: data.state,
            missionId: data.mission_id.toString(),
            acceptedTime: new Date(data.accepted_time),
        }
    })
    return created.id.toString();
}

// 미션 도전 정보 얻기
export const getuserMissionfromDB = async (user_missionId) => {
    const userMission = await prisma.userMission.findUnique({
        where: { id: user_missionId },
    });
    if (!userMission) {
        return null;
    }
    return {
        ...userMission,
        id: userMission.id.toString(),
        storeId: userMission.storeId.toString(),
        missionId: userMission.missionId.toString(),
    };
};

// 특정 가게의 미션들을 불러오기
export const getStoreMissions = async (storeId, cursor) => {
    const existing = await prisma.store.findFirst({ where: { id: storeId } });
    if (!existing) {
        throw new NonExistentStoreError("존재하지 않는 가게입니다.");
    }
    const parsedCursor = cursor ? BigInt(cursor) : BigInt(0);
    console.log("parsedCursor:", parsedCursor);
    console.log(storeId);
    const missions = await prisma.mission.findMany({
        select: {
            id: true,
            storeId: true,
            name: true,
            description: true,
            reward: true,
            minimumPrice: true,
        },
        where: {
            storeId: BigInt(storeId),
            id: { gt: parsedCursor }
        },
        orderBy: { id: "asc" },
        take: 5,
    });

    return missions;
}

// 특정 유저의 진행중인 미션을 불러오기
export const getUserMissions = async (user_phone_number, cursor) => {
    const existing = await prisma.user.findFirst({ where: { phone_number: user_phone_number } });
    if (!existing) {
        throw new NonExistentUserError("존재하지 않는 유저입니다.");
    }
    const parsedCursor = cursor ? BigInt(cursor) : BigInt(0);
    const missions = await prisma.userMission.findMany({
        select: {
            id: true,
            userPhoneNumber: true,
            storeId: true,
            missionId: true,
            state: true,
        },
        where: {
            userPhoneNumber: user_phone_number,
            id: { gt: parsedCursor },
            state: "in_progress",
        },
        orderBy: { id: "asc" },
        take: 5,
    })
    return missions;
}

export const PatchUserMisson = async (user_missionId) => {
    const user_mission = await prisma.userMission.findFirst({ where: { id: BigInt(user_missionId) } });
    if (user_mission.state === 'completed') {
        throw new InvalidUserMissionError("이미 완료한 미션입니다.");
    }

    const updated = await prisma.userMission.update({
        where: { id: BigInt(user_missionId) },
        data: { state: "completed" }
    });
    return {
        ...updated,
        id: updated.id.toString(),
        storeId: updated.storeId.toString(),
        missionId: updated.missionId.toString(),
    }
}