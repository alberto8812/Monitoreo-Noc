import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import {
  LogEntity,
  LogSeveritylevel,
} from "../../domain/entities/log.entities";

export class FileSystemDatasource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogSPath = "logs/logs-low.log";
  private readonly mediumLogSPath = "logs/logs-medium.log";
  private readonly highLogSPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    [this.allLogSPath, this.mediumLogSPath, this.highLogSPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      }
    );
  };

  async saveLog(log: LogEntity): Promise<void> {
    
    const logAsJson=`${JSON.stringify(log)} \n`;
    
   fs.appendFileSync(this.allLogSPath,logAsJson);
   if(log.level===LogSeveritylevel.low) return;
   if(log.level===LogSeveritylevel.medium) {
    fs.appendFileSync(this.mediumLogSPath,logAsJson);
   }else {
    fs.appendFileSync(this.highLogSPath,logAsJson);
   }
   



  }

  // funcion para sacar los logs
 private getLogsFromFile=(path:string):LogEntity[]=>{
    const content=fs.readFileSync(path,'utf-8');

    const logs=content.split('\n').map(
      log=>LogEntity.fromJson(log)
       );

       return logs;

 }

 async getLog(severityLeve: LogSeveritylevel): Promise<LogEntity[]> {
   switch(severityLeve){
    case LogSeveritylevel.low:
        return this.getLogsFromFile(this.allLogSPath)
    case LogSeveritylevel.medium:
        return this.getLogsFromFile(this.mediumLogSPath)
    case LogSeveritylevel.high:
        return this.getLogsFromFile(this.highLogSPath)
    default:
        throw new Error(`${severityLeve} no implement`)
   }
  }
}
