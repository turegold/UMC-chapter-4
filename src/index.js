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

const app = express();
const port = process.env.PORT;

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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});