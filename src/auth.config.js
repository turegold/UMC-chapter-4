import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KaKaoStrategy } from 'passport-kakao';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
        clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/google",
        scope: ["email", "profile"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
        return googleVerify(profile)
            .then((user) => cb(null, user))
            .catch((err) => cb(err));
    }
);

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.User.findFirst({ where: { email } });
    if (user !== null) {
        return { email: user.email, name: user.name };
    }

    const created = await prisma.user.create({
        data: {
            email,
            name: profile.displayName,
            phone_number: "미정",
            nickname: "미정",
            gender: "미정",
            birthday: "미정",
            address: "미정"
        },
    });

    return { email: created.email, name: created.name };
};

export const kaKaoStrategy = new KaKaoStrategy(
    {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.KAKAO_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile._json.kakao_account.email;
            const nickname = profile.username || profile.displayName || "카카오유저";

            let user = await prisma.User.findFirst({ where: { email } });
            console.log(nickname)
            if (!user) {
                user = await prisma.user.create({
                    data: {
                        email,
                        nickname,
                        name: "미정",
                        phoneNumber: uuidv4().slice(0, 15),
                        nickname: "미정",
                        gender: "미정",
                        birthday: "미정",
                        address: "미정",
                    },
                });
            }
            // // BigInt 처리
            // const safeUser = {
            //     ...user,
            //     totalPoint: user.totalPoint?.toString() || "0"
            // };

            done(null, {
                email: user.email,
                name: user.name || "미정"
            });
        } catch (err) {
            done(err);
        }
    }
)