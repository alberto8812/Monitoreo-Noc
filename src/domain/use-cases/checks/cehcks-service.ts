import { LogRepository } from "../../repository/log.repository";
import { LogEntity, LogSeveritylevel } from "../../entities/log.entities";
interface CheckServiceUserCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckService implements CheckServiceUserCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Erro on check service ${url}`);
      }
      const log = new LogEntity(`Service ${url} working`, LogSeveritylevel.low);
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const erroString = ` ${url} is no ok ${error}`;
      const log = new LogEntity(erroString, LogSeveritylevel.high);
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(erroString);

      return false;
    }
  }
}
