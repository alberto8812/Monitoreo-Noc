//


import { LogRepositoryImpl } from "../infrastructure/log.respository.impl";
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { CronService } from "./cron/cron.service";
import { CheckService } from "../domain/use-cases/checks/cehcks-service";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";

const LogRepository=new LogRepositoryImpl(
  //new FileSystemDatasource(),
  new MongoLogDatasource(),
);

const emialService= new EmailService();
export class Server {



    public static start(){// le colocamos static para usar el metodo 
        //directamente  y no crear un nueva instancia 
      // console.log('Server started...')
      // new SendEmailLogs(emialService,fileSystemLogRepository).execute(  ['cvelascosaavedra@gmail.com'])
      // emialService.sendEmailWithFileSystemLogs(
      //   ['cvelascosaavedra@gmail.com']
      // )

      //  job.start();
      //MANDAR EMAIL

      // CronService.createJob(
      //   '*/5 * * * * *',
      //   ()=>{
      //       const url='https://google.com';
      //       new CheckService(
      //         LogRepository,
      //         ()=>console.log(`${url} is ok`),
      //         (error)=>console.log(error)
      //       ).execute(url);

      //   }
      // );

    }
}