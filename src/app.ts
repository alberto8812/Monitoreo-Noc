import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";
import "dotenv/config";

const main = () => {
  Server.start();
  console.log(envs.PORT);
};
(async () => {
  await main();
})();
