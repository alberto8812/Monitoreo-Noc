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
 async getLog(severityLeve: LogSeveritylevel): Promise<LogEntity[]> {
   switch(severityLeve){
    case LogSeveritylevel.low:
        return []
    case LogSeveritylevel.medium:
        return []
    case LogSeveritylevel.higg:
        return []
    default:
        throw new Error(`${severityLeve} no implement`)
   }
  }
}
