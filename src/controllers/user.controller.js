import { StatusCodes } from "http-status-codes";
import {
  addStore, patchUserInfo
} from "../services/user.service.js";
import { getStorefromDB } from "../repositories/user.repository.js";
export const handlerAddStore = async (req, res, next) => {
  /*
  #swagger.summary = '가게 추가 API'
  #swagger.description = '가게를 추가합니다.'
  #swagger.tags = ['Stores']
  #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  required: ["name", "owner_id", "address", "phone_number"],
                  properties: {
                      name: { type: "string"},
                      owner_id: { type: "number"},
                      address: { type: "string"},
                      phone_number: {type: "string"}
                  }
              }
          }
      }
  }
  #swagger.responses[200] = {
      description: '리뷰 작성 성공',
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      resultType: { type: "string"},
                      error: { type: "object", nullable: true},
                      success: {
                          type: "object",
                          properties: {
                              id: { type: "string" },
                              userMissionId: { type: "string"},
                              userPhoneNumber: { type: "string" },
                              storeId: { type: "string"},
                              description: { type: "string"},
                              rating: { type: "number" },
                              createdTime: { type: "string", format: "date-time" },
                              updatedTime: { type: "string", format: "date-time" }
                          }
                      }
                  }
              }
          }
      }
  };
  #swagger.responses[500] = {
  description: "리뷰 작성 실패 (이미 존재하는 가게일 경우)",
  content: {
      "application/json": {
      schema: {
          type: "object",
          properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
              type: "object",
              properties: {
              errorCode: { type: "string", example: "U001" },
              reason: { type: "string", example: "이미 존재하는 가게입니다." }, 
              data: { nullable: true, example: null }
              }
          },
          success: { nullable: true, example: null }
          }
      },
      }
      }
  }
  };

    
*/

  console.log("가게를 추가합니다.");
  console.log("body:", req.body);

  const store = await addStore(req.body);
  res.status(StatusCodes.OK).success(store);
}

export const handlerGetStore = async (req, res, next) => {
  /*
    #swagger.summary = '상점 정보 조회 API';
    #swagger.tags = ['Stores']
    #swagger.responses[200] = {
      description: "상점 정보 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        ownerId: { type: "string" },
                        address: { type: "string" },
                        phoneNumber: { type: "string" },
                        createdTime: { type: "string", format: "date-time" },
                        updatedTime: { type: "string", format: "date-time" }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "number", nullable: true }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: "상점 정보 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                  type: "object",
                  properties:{
                      errorCode: {type: "string", example: "U002"},
                      reason: {type: "string", example: "존재하지 않는 가게입니다."},
                      data: { nullable: true, example: null},
                  }
                  
              },
              success: { nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("가게 정보를 불러옵니다.");
  const store = await getStorefromDB(req.params.storeID);
  res.status(StatusCodes.OK).success(store);
}

export const handlerPatchUserInfo = async (req, res, next) => {
  console.log("유저의 정보를 수정합니다.");
  const user = await patchUserInfo(req.user, req.body);
  res.status(StatusCodes.OK).success({ message: "유저 정보 업데이트" });
}