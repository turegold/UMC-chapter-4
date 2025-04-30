import {StatusCodes} from "http-status-codes";
import {addStore, addReview, addMission, addUserMission} from "../services/user.service.js";
import { getStorefromDB } from "../repositories/user.repository.js";
import {bodyToMission} from "../dtos/user.dto.js";
export const handlerAddStore = async(req,res,next)=>{
    console.log("가게를 추가합니다.");
    console.log("body:", req.body);

    const store = await addStore(req.body);
    res.status(StatusCodes.OK).json({result: store});
}

export const handlerGetStore = async(req,res,next)=>{
    console.log("가게 정보를 불러옵니다.");
    const store = await getStorefromDB(req.params.storeID);
    res.status(StatusCodes.OK).json({result: store});
}

export const handlerAddReview = async(req,res,next)=>{
    console.log("리뷰를 추가합니다.");
    const review = await addReview(req.body);
    res.status(StatusCodes.OK).json({result: review});
}

export const handlerAddMission = async(req,res,next)=>{
    console.log("미션을 추가합니다.");
    const mission = await addMission(req.body);
    res.status(StatusCodes.OK).json({result: mission});
}

export const handlerAdduserMission = async(req,res,next)=>{
    console.log("미션을 도전합니다.");
    const user_mission = await addUserMission(req.body);
    res.status(StatusCodes.OK).json({result: user_mission})
}