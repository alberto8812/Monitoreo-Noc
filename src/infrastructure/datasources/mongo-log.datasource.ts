import { LogModel } from "../../data/mongo/idex";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveritylevel } from "../../domain/entities/log.entities";

export class MongoLogDatasource implements LogDataSource {
   async saveLog(log: LogEntity): Promise<void> {
      const newLog= await LogModel.create(log);

      console.log('Mongo Log created', newLog.id)
    }
   async getLog(severityLeve: LogSeveritylevel): Promise<LogEntity[]> {
       const log= await LogModel.find({
        level:severityLeve
       })

       return log.map(LogEntity.fromObject)
    }

}