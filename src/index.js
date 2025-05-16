import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {
  handlerAddStore, handlerGetStore
} from "./controllers/user.controller.js";
import { handlerAddReview, handlerGetReviews, handlerGetUserReviews } from "./controllers/reveiw.controller.js";
import {
  handlerAddMission, handlerAdduserMission,
  handlerGetStoreMissions, handlerGetUserMissions,
  handlerPatchUserMissions,

} from "./controllers/mission.controller.js";
dotenv.config();

const port = process.env.PORT;

const app = express();

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

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: true })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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