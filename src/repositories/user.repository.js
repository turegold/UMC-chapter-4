import { prisma, pool } from "../db.config.js";
import { NonExistentStoreError, InvalidUser } from "../errors.js";
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
    console.log("data: ", data);
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
    console.log(store)
    if (!store) {
        throw new NonExistentStoreError("존재하지 않는 가게입니다.");
    }
    return {
        ...store,
        id: store.id.toString(),
        ownerId: store.ownerId.toString(),
    };
};

export const patchUserInfofromDB = async (email, updateData) => {
    console.log(email)
    console.log("업데이트할 데이터:", updateData);
    const user = await prisma.user.findFirst({
        where: { email: email },
    });
    if (!user) {
        throw new InvalidUser("유저가 존재하지 않습니다.");
    }
    const updatedUser = await prisma.user.update({
        where: { email },
        data: updateData,
    });

    return updatedUser;
}



