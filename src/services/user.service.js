import {
    insertStoretoDB,
    getStorefromDB,


} from "../repositories/user.repository.js"
import { responseFromStores } from "../dtos/user.dto.js";
import { DuplicateStoreIdError } from "../errors.js";

// 가게 추가 기능 구현
export const addStore = async (body) => {
    console.log(body.owner_id);
    const joinStoreID = await insertStoretoDB({
        name: body.name,
        owner_id: body.owner_id,
        address: body.address,
        phone_number: body.phone_number,
    });


    if (joinStoreID === null) {
        throw new DuplicateStoreIdError("이미 존재하는 가게입니다.", joinStoreID);
    }

    const store = await getStorefromDB(joinStoreID);
    return store;
}



