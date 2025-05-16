import { listStoreReviews, addReview, listUserReviews } from "../services/review.service.js";
import { StatusCodes } from "http-status-codes";

export const handlerGetReviews = async (req, res, next) => {
    /*
      #swagger.summary = '상점 리뷰 목록 조회 API';
      #swagger.tags = ['Reviews']
      #swagger.responses[200] = {
        description: "상점 리뷰 목록 조회 성공 응답",
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
                          userMissionId: { type: "string" },
                          userPhoneNumber: { type: "string" },
                          storeId: { type: "string" },
                          description: { type: "string" },
                          rating: { type: "number", format: "float" },
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
        description: "상점 리뷰 목록 조회 실패 응답",
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

    const storeId = parseInt(req.params.storeID)
    const cursor = typeof req.query.cursor === "string" ? BigInt(req.query.cursor) : 0

    console.log("req.originalUrl:", req.originalUrl);
    console.log("req.params:", req.params);
    console.log("req.query:", req.query);
    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).success(reviews);
}

export const handlerAddReview = async (req, res, next) => {
    /*
    #swagger.summary = '상점 리뷰 추가 API'
    #swagger.description = '유저가 상점에 대한 리뷰를 작성합니다.'
    #swagger.tags = ['Reviews']
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["user_mission_id", "user_phone_number", "store_id", "description", "rating"],
                    properties: {
                        user_mission_id: { type: "number"},
                        user_phone_number: { type: "string"},
                        store_id: { type: "number" },
                        description: { type: "string"},
                        rating: { type: "number", format: "float"}
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
    description: "리뷰 작성 실패 (유저 또는 가게가 존재하지 않을 경우)",
    content: {
        "application/json": {
        schema: {
            type: "object",
            properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
                type: "object",
                properties: {
                errorCode: { type: "string", example: "U003" },
                reason: { type: "string", example: "존재하지 않는 유저입니다." }, 
                data: { nullable: true, example: null }
                }
            },
            success: { nullable: true, example: null }
            }
        },
        examples: {
            userNotFound: {
            summary: "유저가 존재하지 않는 경우",
            value: {
                resultType: "FAIL",
                error: {
                errorCode: "U003",
                reason: "존재하지 않는 유저입니다.",
                data: null
                },
                success: null
            }
            },
            storeNotFound: {
            summary: "가게가 존재하지 않는 경우",
            value: {
                resultType: "FAIL",
                error: {
                errorCode: "U002",
                reason: "존재하지 않는 가게입니다.",
                data: null
                },
                success: null
            }
            }
        }
        }
    }
    };

      
*/

    console.log("리뷰를 추가합니다.");
    const review = await addReview(req.body);
    res.status(StatusCodes.OK).success(review);
}

export const handlerGetUserReviews = async (req, res, next) => {
    /*
      #swagger.summary = '유저 리뷰 목록 조회 API';
      #swagger.tags = ['Reviews']
      #swagger.responses[200] = {
        description: "유저 리뷰 목록 조회 성공 응답",
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
                          userMissionId: { type: "string" },
                          userPhoneNumber: { type: "string" },
                          storeId: { type: "string" },
                          description: { type: "string" },
                          rating: { type: "number", format: "float" },
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
        description: "유저 리뷰 목록 조회 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                    type: "object",
                    properties:{
                        errorCode: {type: "string", example: "U003"},
                        reason: {type: "string", example: "존재하지 않는 유저입니다."},
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
    const user_phone_number = req.params.user_phone_number;
    const cursor = typeof req.query.cursor === "string" ? BigInt(req.query.cursor) : 0
    console.log("req.originalUrl:", req.originalUrl);
    console.log("req.params:", req.params);
    console.log("req.query:", req.query);
    const user_reviews = await listUserReviews(user_phone_number, cursor);
    res.status(StatusCodes.OK).success(user_reviews);
}