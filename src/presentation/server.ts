//


import { LogRepositoryImpl } from "../infrastructure/log.respository.impl";
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";

const fileSystemLogRepository=new LogRepositoryImpl(
  new FileSystemDatasource()
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
      //         fileSystemLogRepository,
      //         ()=>console.log(`${url} is ok`),
      //         (error)=>console.log(error)
      //       ).execute(url);

      //   }
      // );

    }
}