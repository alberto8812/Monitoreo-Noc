import { LogDataSource } from "../../domain/datasources/log.datasource";
import {
  LogEntity,
  LogSeveritylevel,
} from "../../domain/entities/log.entities";
import { Level, PrismaClient } from "@prisma/client";

const severityEnum = {
  low: Level.LOW,
  medium: Level.MEDIUM,
  high: Level.HIGH,
};

export class PostgresDataSource implements LogDataSource {
  private readonly prisma = new PrismaClient();

  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const createLogs = await this.prisma.logModel.create({
      data: {
        ...log,
        level,
      },
    });
  }
  async getLog(severityLeve: LogSeveritylevel): Promise<LogEntity[]> {

    const level=severityEnum[severityLeve];

    const logs= await this.prisma.logModel.findMany({
        where:{
            level
        }
    });
    return logs.map(LogEntity.fromObject);
  }
}
