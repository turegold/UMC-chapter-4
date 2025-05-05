import { prisma, pool } from "../db.config.js";

// 유저 데이터 삽입
export const addUser = async (data) => {
    const user = await prisma.user.findFirst({ where: { phone_number: data.phone_number } });
    if (user) {
        return null;
    }
    const created = await prisma.user.create({ data: data });
    return created.phone_number;
}

// 가게 정보 추가하기
export const insertStoretoDB = async (data) => {
    const store = await prisma.store.findFirst({ where: { name: data.name } });
    if (store) {
        return null;
    }
    const created = await prisma.store.create({
        data: {
            name: data.name,
            ownerId: BigInt(data.owner_id),
            address: data.address,
            phoneNumber: data.phone_number,
        },
    });
    return created.id;

}

// 가게 정보 얻기
export const getStorefromDB = async (storeId) => {
    const store = await prisma.store.findFirst({ where: { id: storeId } });
    if (!store) {
        return null;
    }
    return {
        ...store,
        id: store.id.toString(),
        ownerId: store.ownerId.toString(),
    };
};



