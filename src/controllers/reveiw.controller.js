import { listStoreReviews, addReview, listUserReviews } from "../services/review.service.js";
import { StatusCodes } from "http-status-codes";

export const handlerGetReviews = async (req, res, next) => {
    const storeId = parseInt(req.params.storeID)
    const cursor = typeof req.query.cursor === "string" ? BigInt(req.query.cursor) : 0

    console.log("req.originalUrl:", req.originalUrl);
    console.log("req.params:", req.params);
    console.log("req.query:", req.query);
    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(reviews);
}

export const handlerAddReview = async (req, res, next) => {
    console.log("리뷰를 추가합니다.");
    const review = await addReview(req.body);
    res.status(StatusCodes.OK).json({ result: review });
}

export const handlerGetUserReviews = async (req, res, next) => {
    const user_phone_number = req.params.user_phone_number;
    const cursor = typeof req.query.cursor === "string" ? BigInt(req.query.cursor) : 0
    console.log("req.originalUrl:", req.originalUrl);
    console.log("req.params:", req.params);
    console.log("req.query:", req.query);
    const user_reviews = await listUserReviews(user_phone_number, cursor);
    res.status(StatusCodes.OK).json(user_reviews);
}