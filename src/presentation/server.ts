//


import { LogRepositoryImpl } from "../infrastructure/log.respository.impl";
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";
import { CronService } from "./cron/cron.service";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/cehcks-service-multiple";

const fsLogRepository=new LogRepositoryImpl(
  new FileSystemDatasource(),
  //new MongoLogDatasource(),
//  new PostgresDataSource()

);
const mongoLogRepository=new LogRepositoryImpl(
//  new FileSystemDatasource(),
  new MongoLogDatasource(),
//  new PostgresDataSource()

);
const PostgresLogRepository=new LogRepositoryImpl(
//  new FileSystemDatasource(),
//  new MongoLogDatasource(),
  new PostgresDataSource()

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

      CronService.createJob(
        '*/5 * * * * *',
        ()=>{
            const url='https://google.com';
            new CheckServiceMultiple(
              [mongoLogRepository,PostgresLogRepository,fsLogRepository],
              ()=>console.log(`${url} is ok`),
              (error)=>console.log(error)
            ).execute(url);

        }
      );

    }
}