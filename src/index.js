import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { kaKaoStrategy } from "./auth.config.js";
import { PrismaClient } from "@prisma/client";
import {
  handlerAddStore, handlerGetStore, handlerPatchUserInfo
} from "./controllers/user.controller.js";
import { handlerAddReview, handlerGetReviews, handlerGetUserReviews } from "./controllers/reveiw.controller.js";
import {
  handlerAddMission, handlerAdduserMission,
  handlerGetStoreMissions, handlerGetUserMissions,
  handlerPatchUserMissions,
} from "./controllers/mission.controller.js";




const port = process.env.PORT;

const prisma = new PrismaClient();




const app = express();

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용 안함
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 8th",
      description: "UMC 8th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };
  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});



// 공통 응답을 사용할 수 있는 헬퍼 함수
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unkown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});



dotenv.config();
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: true })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 공통 Oauth 설정
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(googleStrategy);
passport.use(kaKaoStrategy);
passport.serializeUser((user, done) => {
  console.log("🔥 user.email 타입:", typeof user.email, user.email);
  done(null, user)
});
passport.deserializeUser((user, done) => {
  console.log("deserializeUser:", user);
  done(null, user)
});

// passport.deserializeUser(async (email, done) => {
//   try {
//     const user = await prisma.User.findFirst({
//       where: { email }
//     });
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });



// 구글 Oauth
app.get("/oauth2/login/google", (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/"); // 이미 로그인 된 경우 홈으로 이동
  }
  next(); // 로그인이 되지 않은 경우 passport authenticate 수행
}, passport.authenticate("google", {
  prompt: "select_account"
}));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get('/oauth2/login/kakao', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/"); // 이미 로그인 된 경우 홈으로 이동
  }
  next(); // 로그인이 되지 않은 경우 passport authenticate 수행
}, passport.authenticate('kakao', {
  prompt: 'login'
}));

app.get(
  '/oauth2/callback/kakao',
  passport.authenticate('kakao', {
    failureRedirect: '/oauth2/login/kakao',
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
)


// Swagger 설정
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/", (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send("Hello World!");
});

app.get("/logout", (req, res) => {

  req.logout(err => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // express-session의 기본 쿠키
      res.redirect("/");
    });
  });
});

app.get("/logout/kakao", (req, res) => {
  // 카카오 로그아웃 리디렉션 URL
  const kakaoLogoutRedirectURL = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.KAKAO_CLIENT_ID}&logout_redirect_uri=http://localhost:3000/logout/callback`;

  // 로그아웃 및 세션 제거
  req.logout(err => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // 세션 쿠키 제거

      // 카카오 로그아웃 리디렉션
      res.redirect(kakaoLogoutRedirectURL);
    });
  });
});

app.get("/logout/callback", (req, res) => {
  // 모든 로그아웃 후 최종 리디렉션할 위치
  res.redirect("/");
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).error({
    errorCode: "UNAUTHORIZED",
    reason: "로그인이 필요합니다.",
  });
}



app.get("/api/stores/:storeID", handlerGetStore); //특정 가게의 정보를 갖고오는 API
app.post("/api/stores", handlerAddStore); //가게를 추가하는 API
app.get("/api/stores/:storeID/reviews", handlerGetReviews); //특정 가게의 리뷰목록을 불러오는 API
app.get("/api/stores/:storeID/missions", handlerGetStoreMissions); //특정 가게의 미션 목록을 불러오는 API
app.post("/api/reviews", handlerAddReview); //리뷰를 추가하는 API
app.post("/api/missions", handlerAddMission); //미션을 추가하는 API
app.post("/api/usermissions", handlerAdduserMission); //미션을 도전하기 API
app.get("/api/users/:user_phone_number/reviews", handlerGetUserReviews); //특정 유저의 리뷰들을 불러오는 API
app.get("/api/users/:user_phone_number/missions", handlerGetUserMissions); //유저가 진행중인 미션 목록을 불러오는 API
app.patch("/api/usermissions/:user_mission_id", handlerPatchUserMissions); //유저의 미션 상태를 완료로 변경하는 API
app.patch("/api/users/me", ensureAuthenticated, handlerPatchUserInfo); //로그인한 유저의 정보를 수정하는 API
// 전역 오류를 처리하기 위한 미들웨어
app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unkown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});