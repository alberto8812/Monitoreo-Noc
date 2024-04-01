import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeveritylevel } from "../../entities/log.entities";
import { LogRepository } from "../../repository/log.repository";

interface SenLogsEamilUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SenLogsEamilUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}
  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error("Email log not sent");
      }
      const log = new LogEntity({
        message: `log email send`,
        level: LogSeveritylevel.low,
        origin: "send-email-logs",
      });
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeveritylevel.high,
        origin: "send-email-logs",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
