export const bodyToMission = (body) => {
    const start_time = new Date(body.start_time);
    const end_time = new Date(body.end_time);

    return {
        store_id: body.store_id,
        name: body.name,
        description: body.description,
        reward: body.reward,
        start_time: body.start_time,
        end_time: body.end_time,
        minimum_price: body.minimum_price,
    }
}
