export const responseFromStores = (stores) => {
    const serialized = stores.map((m) => ({
        ...m,
        ownerId: m.ownerId.toString(),
    }));

    const lastId = serialized.length ? serialized[serialized.length - 1].id.toString() : null;
    return {
        data: serialized,
        pagination: {
            cursor: lastId,
        },
    };
};