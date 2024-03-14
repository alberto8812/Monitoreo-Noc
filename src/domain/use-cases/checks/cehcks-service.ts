import { LogRepository } from "../../repository/log.repository";
import { LogEntity, LogSeveritylevel } from "../../entities/log.entities";
interface CheckServiceUserCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

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
      this.successCallback();

      return true;
    } catch (error) {
      const erroString = `${error}`;
      const log = new LogEntity(erroString, LogSeveritylevel.low);
      this.logRepository.saveLog(log);
      this.errorCallback(erroString);

      return false;
    }
  }
}
