import { StatusCodes } from "http-status-codes";
import {
    addStore,
} from "../services/user.service.js";
import { getStorefromDB } from "../repositories/user.repository.js";
export const handlerAddStore = async (req, res, next) => {
    console.log("가게를 추가합니다.");
    console.log("body:", req.body);

    const store = await addStore(req.body);
    res.status(StatusCodes.OK).json({ result: store });
}

export const handlerGetStore = async (req, res, next) => {
    console.log("가게 정보를 불러옵니다.");
    const store = await getStorefromDB(req.params.storeID);
    res.status(StatusCodes.OK).json({ result: store });
}
