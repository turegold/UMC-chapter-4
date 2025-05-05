import { pool, prisma } from "../db.config.js";

// 리뷰 추가하기
export const insertReviewtoDB = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM store WHERE name = ?) as isExistStore`,
            [data.storeId]
        );

        if (confirm[0].isExistStore) {
            return null;
        };
        const [result] = await conn.query(
            `INSERT INTO review (user_mission_id, user_phone_number, store_id, description, rating)
             VALUES (?, ?, ?, ?, ?)`,
            [data.user_mission_id, data.user_phone_number, data.store_id, data.description, data.rating]
        );


        return result.insertId;
    } catch (err) {
        throw new Error(`리뷰 추가에 오류 발생. (${err})`);
    } finally {
        conn.release();
    }
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
        take: 3,
    });

    return reviews;
};


// 특정 가게 리뷰 정보 얻기
export const getReviewfromDB = async (reviewId) => {
    const conn = await pool.getConnection();

    try {
        const [review] = await pool.query(
            `SELECT * FROM review WHERE id = ?`, [reviewId]);
        console.log(review);
        if (review.length == 0) {
            return null;
        }
        return review[0];
    } catch (err) {
        throw new Error(`리뷰 정보 얻는 중 오류 발생. (${err})`);
    } finally {
        conn.release();
    }
}