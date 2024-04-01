//

import { CheckService } from "../domain/use-cases/checks/cehcks-service";
import { LogRepositoryImpl } from "../infrastructure/log.respository.impl";
import { CronService } from "./cron/cron.service";
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository=new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {




    public static start(){// le colocamos static para usar el metodo 
        //directamente  y no crear un nueva instancia 
      console.log('Server started...')
      const emialService= new EmailService();
      emialService.sendEmail({
        to:'cvelascosaavedra@gmail.com'
        ,subject:'Lgos System',
        htmlbody:`
        <h3>Logs de sistemas</h3>
        <p>mi prueba</p>
        <p>bueno lo que venga</p>
        `
      })

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