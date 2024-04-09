import { LogEntity, LogSeveritylevel } from "../entities/log.entities"
import { LogDataSource } from "./log.datasource"

describe('log datasource.ts logDatasource',()=>{

            const newLog={
            origin:'log.model.test.ts',
            message:'test-message',
            level:LogSeveritylevel.low,
            creatAt:new Date()
        }

    class MockLogDataSource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
          
        }
      async  getLog(severityLeve: LogSeveritylevel): Promise<LogEntity[]> {
           return [newLog]
        }

    }

    test('should test the abstract class',async ()=>{
            const mockLogDataSource=new MockLogDataSource();
            expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
            expect(typeof mockLogDataSource.saveLog).toBe('function');
            expect(typeof mockLogDataSource.getLog).toBe('funcion');

            await mockLogDataSource.saveLog(newLog);

            const log=await mockLogDataSource.getLog(LogSeveritylevel.high);
            expect(log).toHaveLength(1);
            expect(log[0]).toBeInstanceOf(LogEntity)
    })
})