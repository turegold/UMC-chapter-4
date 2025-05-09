export const responseFromMissions = (missions) => {
    const serialized = missions.map((m) => ({
        ...m,
        id: m.id.toString(),
        storeId: m.storeId.toString(),
        reward: m.reward.toString(),
        minimumPrice: m.minimumPrice.toString(),
    }));

    const lastId = serialized.length ? serialized[serialized.length - 1].id.toString() : null;
    return {
        data: serialized,
        pagination: {
            cursor: lastId,
        },
    };
};

export const responseFromUserMissions = (missions) => {
    const serialized = missions.map((m) => ({
        ...m,
        id: m.id.toString(),
        storeId: m.storeId.toString(),
        missionId: m.missionId.toString(),
    }));

    const lastId = serialized.length ? serialized[serialized.length - 1].id.toString() : null;
    return {
        data: serialized,
        pagination: {
            cursor: lastId,
        },
    };
};