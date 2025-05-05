import { insertReviewtoDB, getReviewfromDB, getAllStoreReviews, } from "../repositories/review.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";
// 리뷰 리스트 불러오는 기능 구현
export const listStoreReviews = async (store_id, cursor) => {
    console.log("리뷰 리스트 불러오기");
    const reviews = await getAllStoreReviews(store_id, cursor);
    console.log("불러온 리뷰 데이터: ", reviews);
    // BigInt 타입 확인 (예시로 첫 번째 리뷰의 id 확인)
    if (reviews.length > 0) {
        console.log("id 타입:", typeof reviews[0].id);
        console.log("storeId 타입:", typeof reviews[0].storeId);
        const lastId = reviews[reviews.length - 1].id;
        console.log("lastId:", lastId);
    }
    return responseFromReviews(reviews);
}

// 리뷰 추가 기능 구현
export const addReview = async (body) => {
    const joinReviewID = await insertReviewtoDB({
        user_mission_id: body.user_mission_id,
        user_phone_number: body.user_phone_number,
        store_id: body.store_id,
        description: body.description,
        rating: body.rating,
    })

    if (joinReviewID === null) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    const review = await getReviewfromDB(joinReviewID);
    return review;
}