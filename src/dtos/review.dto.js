export const responseFromReviews = (reviews) => {
    const serialized = reviews.map((r) => ({
        ...r,
        id: r.id.toString(),
        userMissionId: r.userMissionId.toString(),
        storeId: r.storeId.toString(),
    }));

    const lastId = serialized.length ? serialized[serialized.length - 1].id.toString() : null;
    return {
        data: serialized,
        pagination: {
            cursor: lastId,
        },
    };
};