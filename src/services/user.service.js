import {
    insertStoretoDB,
    getStorefromDB,


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



