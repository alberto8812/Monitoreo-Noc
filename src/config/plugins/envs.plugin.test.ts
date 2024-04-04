import { envs } from "./envs.plugin";

describe("envs.plugins.ts", () => {
  test("shoul return options", () => {
    expect(envs).toEqual({
      PORT: 3001,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "cvelascosaavedra@gmail.com",
      MAILER_SECRET_KEY: "jzdimqfoydiifvro",
      PROD: false,
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_URL: "mongodb://carlos:123456789@localhost:27017/",
      MONGO_USER: "carlos",
      MONGO_PASS: "123456789",
    });
  });

  test("shoud return eror if no found  env",async()=>{
    jest.resetModules();
    /*
     asefura que todos los modulos esten reset para lo env
    */
    process.env.PORT='ABC';

    try {
        await import('./envs.plugin')

        expect(true).toBe(false)
        
    } catch (error) {
  
        expect(`${error}`).toContain('"PORT" should be a valid integer')
    }
  })
});
