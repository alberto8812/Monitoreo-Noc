import { LogEntity, LogSeveritylevel } from '../domain/entities/log.entities';
import { LogRepository } from '../domain/repository/log.repository';
import { LogDataSource } from '../domain/datasources/log.datasource';



export class LogRepositoryImpl implements LogRepository {

    constructor(
        //inyectamos la dependencia de data source
        private readonly logDataSource:LogDataSource  //permite cambuar la base de datos facil mente
    ){}

        //llmado a la base de datos
    async saveLog(log: LogEntity): Promise<void> {
      this.logDataSource.saveLog(log);
    }
    async getLog(severityLeve: LogSeveritylevel): Promise<LogEntity[]> {
       return this.logDataSource.getLog(severityLeve);
    }


}