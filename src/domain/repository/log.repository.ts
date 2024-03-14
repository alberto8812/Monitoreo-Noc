


import { LogEntity, LogSeveritylevel } from "../entities/log.entities";


export abstract class LogRepository {
    abstract saveLog(log:LogEntity):Promise<void>;
    abstract getLog(severityLeve:LogSeveritylevel):Promise<LogEntity[]>;
}

