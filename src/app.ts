import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MogoDataBase } from "./data/mongo/init";
import { Server } from "./presentation/server";
import "dotenv/config";

const main = async () => {
  MogoDataBase.connect({
    mongoUrl:envs.MONGO_URL,
    dbName:envs.MONGO_DB_NAME
  });

  // const prisma= new PrismaClient();
  // const newLog= await prisma.logModel.create({
  //   data:{
  //     level:'HIGH'
  //     ,message:'Test message',
  //     origin:'App.ts'
  //   }
  // });

  // console.log ({newLog})

  //crear una coleccion
  // const newlog=await LogModel.create({
  //   level:'low',
  //   message:'test message',
  //   origin:'app.ts'
  // });

  // await newlog.save();

  // console.log(newlog)


  Server.start();
  console.log(envs.PORT);
};
(async () => {
  await main();
})();



