import { LogRepository } from "../../repository/log.repository";
import { LogEntity, LogSeveritylevel } from "../../entities/log.entities";
interface CheckServiceMultipleUserCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUserCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log:LogEntity){
    this.logRepository.forEach(logRepository=>{
      logRepository.saveLog(log);
    })
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Erro on check service ${url}`);
      }
      const log = new LogEntity({message:`Service ${url} working`,level: LogSeveritylevel.low,origin:'check-service.ts'});
      this.callLogs(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const erroString = ` ${url} is no ok ${error}`;
      const log = new LogEntity({message:erroString,level:LogSeveritylevel.high,origin:'check-service.ts'});
      this.callLogs(log);
      this.errorCallback && this.errorCallback(erroString);

      return false;
    }
  }
}
