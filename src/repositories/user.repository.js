import { pool, prisma } from "../db.config.js";

// 유저 데이터 삽입
export const addUser = async (data) => {
    const user = await prisma.user.findFirst({ where: { phone_number: data.phone_number } });
    if (user) {
        return null;
    }
    const created = await prisma.user.create({ data: data });
    return created.phone_number;
}

// 가게 정보 추가하기
export const insertStoretoDB = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM store WHERE name = ?) as isExistStore`,
            [data.name]
        );

        if (confirm[0].isExistStore) {
            return null;
        };
        const [result] = await conn.query(
            `INSERT INTO store (name, owner_id, address, phone_number)
             VALUES (?, ?, ?, ?)`,
            [data.name, data.owner_id, data.address, data.phone_number]
        );


        return result.insertId;
    } catch (err) {
        throw new Error(`가게 추가에 오류 발생. (${err})`);
    } finally {
        conn.release();
    }

}

// 가게 정보 얻기
export const getStorefromDB = async (storeId) => {
    const conn = await pool.getConnection();

    try {
        const [store] = await pool.query(
            `SELECT * FROM store WHERE id = ?`, [storeId]);
        console.log(store);
        if (store.length == 0) {
            return null;
        }
        return store[0];
    } catch (err) {
        throw new Error(`가게 정보 얻는 중 오류 발생. (${err})`);
    } finally {
        conn.release();
    }
}



// 미션 추가하기
export const insertMissiontoDB = async (data) => {
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
            `INSERT INTO mission (store_id, name, description, reward, start_time, end_time, minimum_price)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [data.store_id, data.name, data.description, data.reward, data.start_time, data.end_time, data.minimum_price]
        );


        return result.insertId;
    } catch (err) {
        throw new Error(`미션 추가에 오류 발생. (${err})`);
    } finally {
        conn.release();
    }
}

// 미션 정보 얻기
export const getMissionfromDB = async (missionId) => {
    const conn = await pool.getConnection();

    try {
        const [mission] = await pool.query(
            `SELECT * FROM mission WHERE id = ?`, [missionId]);
        console.log(mission);
        if (mission.length == 0) {
            return null;
        }
        return mission[0];
    } catch (err) {
        throw new Error(`미션 정보 얻는 중 오류 발생. (${err})`);
    } finally {
        conn.release();
    }
}

// 미션 도전하기
export const insertUserMissiontoDB = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM store WHERE name = ?) as isExistStore`,
            [data.storeId]
        );

        const [check] = await conn.query(
            `SELECT EXISTS (
                SELECT 1 FROM user_mission
                WHERE user_phone_number = ? AND mission_id = ?
            ) AS isAlreadyAccepted`,
            [data.user_phone_number, data.mission_id]
        );
        if (check[0].isAlreadyAccepted) {
            throw new Error("이미 도전하고 있는 미션입니다.");
        }

        if (confirm[0].isExistStore) {
            return null;
        };

        const [result] = await conn.query(
            `INSERT INTO user_mission (user_phone_number, store_id, state, mission_id, accepted_time)
             VALUES (?, ?, ?, ?, ?)`,
            [data.user_phone_number, data.store_id, data.state, data.mission_id, data.accepted_time]
        );


        return result.insertId;
    } catch (err) {
        throw new Error(`미션 도전에 오류 발생. (${err})`);
    } finally {
        conn.release();
    }
}

// 미션 도전 정보 얻기
export const getuserMissionfromDB = async (user_missionId) => {
    const conn = await pool.getConnection();

    try {
        const [user_mission] = await pool.query(
            `SELECT * FROM user_mission WHERE id = ?`, [user_missionId]);
        console.log(user_mission);
        if (user_mission.length == 0) {
            return null;
        }
        return user_mission[0];
    } catch (err) {
        throw new Error(`미션 정보 얻는 중 오류 발생. (${err})`);
    } finally {
        conn.release();
    }
}