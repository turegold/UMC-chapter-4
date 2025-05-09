import { prisma } from "../db.config.js";

// 리뷰 추가하기
export const insertReviewtoDB = async (data) => {
    const existing = await prisma.store.findFirst({ where: { id: data.store_id } });
    if (!existing) {
        throw new Error("존재하지 않는 가게입니다.");
    }
    const created = await prisma.review.create({
        data: {
            userMissionId: data.user_mission_id.toString(),
            userPhoneNumber: data.user_phone_number.toString(),
            storeId: data.store_id.toString(),
            description: data.description,
            rating: data.rating
        }
    });
    return created.id.toString();
}

// 모든 리뷰 정보 얻기
export const getAllStoreReviews = async (store_id, cursor) => {
    const parsedCursor = cursor ? BigInt(cursor) : BigInt(0);
    console.log("parsedCursor:", parsedCursor)
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            userMissionId: true,
            userPhoneNumber: true,
            storeId: true,
            description: true,
            rating: true,
            createdTime: true,
            updatedTime: true,
        },
        where: {
            storeId: BigInt(store_id),
            id: { gt: parsedCursor }
        },
        orderBy: { id: "asc" },
        take: 5,
    });

    return reviews;
};

// 특정 유저 리뷰 불러오기
export const getUserReviews = async (user_phone_number, cursor) => {
    const parsedCursor = cursor ? BigInt(cursor) : BigInt(0);
    console.log("parsedCursor:", parsedCursor)
    console.log("user_phone_number:", user_phone_number);
    const user_reviews = await prisma.review.findMany({
        select: {
            id: true,
            userMissionId: true,
            userPhoneNumber: true,
            storeId: true,
            description: true,
            rating: true,
            createdTime: true,
            updatedTime: true,
        },
        where: {
            userPhoneNumber: user_phone_number,
            id: { gt: parsedCursor }
        },
        orderBy: { id: "asc" },
        take: 3,
    })
    console.log("불러온 리뷰:", user_reviews);
    return user_reviews;
}


// 특정 가게 리뷰 정보 얻기
export const getReviewfromDB = async (reviewId) => {
    const review = await prisma.review.findFirst({ where: { id: reviewId } });
    if (!review) {
        return null;
    }
    return {
        ...review,
        id: review.id.toString(),
        userMissionId: review.userMissionId.toString(),
        storeId: review.storeId.toString(),

    }

}