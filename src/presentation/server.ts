//

import { CheckService } from "../domain/use-cases/checks/cehcks-service";
import { LogRepositoryImpl } from "../infrastructure/log.respository.impl";
import { CronService } from "./cron/cron.service";
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';

const fileSystemLogRepository=new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {




    public static start(){// le colocamos static para usar el metodo 
        //directamente  y no crear un nueva instancia 

      //  job.start();
      CronService.createJob(
        '*/5 * * * * *',
        ()=>{
            const url='https://google.com';
            new CheckService(
              fileSystemLogRepository,
              ()=>console.log(`${url} is ok`),
              (error)=>console.log(error)
            ).execute(url);

        }
      );

    }
}