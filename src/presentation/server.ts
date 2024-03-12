//

import { CheckService } from "../domain/use-cases/checks/cehcks-service";
import { CronService } from "./cron/cron.service";



export class Server {




    public static start(){// le colocamos static para usar el metodo 
        //directamente  y no crear un nueva instancia 

      //  job.start();
      CronService.createJob(
        '*/5 * * * * *',
        ()=>{
            const url='https://google.com';
            new CheckService(
              ()=>console.log(`${url} is ok`),
              (error)=>console.log(error)
            ).execute(url);

        }
      );

    }
}