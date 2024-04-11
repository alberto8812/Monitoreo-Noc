import { LogEntity, LogSeveritylevel } from "./log.entities";

describe("log entity", () => {
    const dataObj = {
      message: "hola munado",
      level: LogSeveritylevel.high,
      origin: "log.entity.test.ts",
    };
  test("should create a LogEnity instance", () => {

    const log = new LogEntity(dataObj);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.creatAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity intance from json',()=>{
     const  json=`{"message":"Service https://google.com working","level":"low","origin":"check-service.ts","creatAt":"2024-04-03T22:22:30.694Z"} `
     const log=LogEntity.fromJson(json);

     expect(log).toBeInstanceOf(LogEntity);
     expect(log.message).toBe("Service https://google.com working");
     expect(log.level).toBe(LogSeveritylevel.low);
     expect(log.origin).toBe("check-service.ts");
     expect(log.creatAt).toBeInstanceOf(Date);
  });

  test('should create log entity instance from object',()=>{
    const log =  LogEntity.fromObject(dataObj);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.creatAt).toBeInstanceOf(Date);
  })
});
