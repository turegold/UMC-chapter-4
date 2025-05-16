import {
    addMission, addUserMission,
    listStoreMissions, listUserMissions,
} from "../services/mission.service.js";
import { PatchUserMisson } from "../repositories/mission.repositoy.js";
import { StatusCodes } from "http-status-codes";
export const handlerAddMission = async (req, res, next) => {
    /*
    #swagger.summary = '상점 미션 추가 API'
    #swagger.description = '상점 미션을 추가합니다.'
    #swagger.tags = ['Missions']
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["store_id", "name", "description", "reward", "start_time", "end_time", "minimum_price"],
                    properties: {
                        store_id: { type: "number" },
                        name: { type: "string" },
                        description: { type: "string" },
                        reward: { type: "number" },
                        start_time: { type: "string" },
                        end_time: { type: "string" },
                        minimum_price: { type: "number" }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: '미션 추가 성공',
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string" },
                        error: { type: "object", nullable: true },
                        success: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                storeId: { type: "string" },
                                name: { type: "string" },
                                description: { type: "string" },
                                reward: { type: "string" },
                                startTime: { type: "string" },       
                                endTime: { type: "string" },
                                createdTime: { type: "string", format: "date-time" },
                                updatedTime: { type: "string", format: "date-time" },
                                minimumPrice: { type: "string" }
                            }
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[500] = {
        description: "미션 추가 실패 (유저 또는 가게가 존재하지 않을 경우)",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "U002" },
                                reason: { type: "string", example: "존재하지 않는 가게입니다." },
                                data: { nullable: true, example: null }
                            }
                        },
                        success: { nullable: true, example: null }
                    }
                }
            }
        }
    };
*/

    console.log("미션을 추가합니다.");
    const mission = await addMission(req.body);
    res.status(StatusCodes.OK).success(mission);
}

export const handlerAdduserMission = async (req, res, next) => {
    /*
  #swagger.summary = '미션 도전 API'
  #swagger.description = '미션을 도전합니다.'
  #swagger.tags = ['Missions']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["user_phone_number", "store_id", "mission_id", "accepted_time"],
          properties: {
            user_phone_number: { type: "string" },
            store_id: { type: "number" },
            mission_id: { type: "number" },
            accepted_time: { type: "string" }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: '미션 도전 성공',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string" },
            error: { type: "object", nullable: true },
            success: {
              type: "object",
              properties: {
                id: { type: "string" },
                userPhoneNumber: { type: "string" },
                storeId: { type: "string" },
                missionId: { type: "string" },
                state: { type: "string" },
                acceptedTime: { type: "string", format: "date-time" },
                completedTime: { type: "string", nullable: true, example: null },
                reviewWritten: { type: "boolean", example: false },
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
    description: "미션 도전 실패 (가게가 존재하지 않거나 이미 도전 중인 경우)",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U002" },
                reason: { type: "string", example: "존재하지 않는 가게입니다." },
                data: { type: "object", nullable: true, example: null }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        },
        examples: {
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
          },
          alreadyAccepted: {
            summary: "이미 도전하고 있는 미션일 경우",
            value: {
              resultType: "FAIL",
              error: {
                errorCode: "U004",
                reason: "이미 도전하고 있는 미션입니다.",
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

    console.log("미션을 도전합니다.");
    const user_mission = await addUserMission(req.body);
    res.status(StatusCodes.OK).success(user_mission);
}

export const handlerGetStoreMissions = async (req, res, next) => {
    /*
      #swagger.summary = '상점 미션 목록 조회 API';
      #swagger.tags = ['Missions']
      #swagger.responses[200] = {
        description: "상점 미션 목록 조회 성공 응답",
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
                          storeId: { type: "string" },
                          name: { type: "string" },
                          description: { type: "string" },
                          reward: { type: "string"},
                          minimumPrice: {type: "string"}
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
        description: "상점 미션 목록 조회 실패 응답",
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
    console.log("특정 가게의 미션 목록을 불러옵니다.");
    const storeId = parseInt(req.params.storeID);
    const cursor = typeof req.query.cursor === "string" ? BigInt(req.query.cursor) : 0
    console.log("storeId:", storeId);
    const missions = await listStoreMissions(storeId, cursor);
    res.status(StatusCodes.OK).success(missions);
}

export const handlerGetUserMissions = async (req, res, next) => {
    /*
      #swagger.summary = '유저 리뷰 목록 조회 API';
      #swagger.tags = ['Missions']
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
                          userPhoneNumber: { type: "string" },
                          storeId: { type: "string" },
                          missionId: { type: "string"},
                          state: {type: "string"}
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
    console.log("유저가 진행중인 미션을 불러옵니다.");
    const user_phone_number = req.params.user_phone_number;
    const cursor = typeof req.query.cursor === "string" ? BigInt(req.query.cursor) : 0
    console.log("user_phone_number:", user_phone_number);
    const missions = await listUserMissions(user_phone_number, cursor);
    res.status(StatusCodes.OK).success(missions);
}

export const handlerPatchUserMissions = async (req, res, next) => {
    /*
  #swagger.summary = '유저 미션 상태 완료 처리 API'
  #swagger.description = '특정 유저 미션의 상태를 완료(completed)로 변경합니다.'
  #swagger.tags = ['Missions']
  #swagger.parameters['user_mission_id'] = {
    in: 'path',
    description: '유저 미션 ID',
    required: true,
    type: 'integer',
  }
  #swagger.responses[200] = {
    description: '미션 완료 처리 성공',
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
                id: { type: "string"},
                userPhoneNumber: { type: "string"},
                storeId: { type: "string"},
                missionId: { type: "string"},
                state: { type: "string"},
                acceptedTime: { type: "string", format: "date-time" },
                completedTime: { type: "string", nullable: true },
                reviewWritten: { type: "boolean" },
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
    description: '이미 완료한 미션일 경우',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U005" },
                reason: { type: "string", example: "이미 완료한 미션입니다." },
                data: { type: "object", nullable: true, example: null }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
*/

    console.log("유저의 미션의 상태를 완료로 변경합니다.");
    const user_mission_id = parseInt(req.params.user_mission_id);
    console.log("user_mission_id:", user_mission_id);
    const mission = await PatchUserMisson(user_mission_id);
    res.status(StatusCodes.OK).success(mission);
}