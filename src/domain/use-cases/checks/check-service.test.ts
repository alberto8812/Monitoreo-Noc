import { LogEntity } from '../../entities/log.entities';
import { CheckService } from './cehcks-service';
describe('checkservice use case',()=>{
    const mockRepository={

        saveLog:jest.fn(),
        getLog:jest.fn(),
    }

    beforeEach(()=>{
        jest.clearAllMocks();
    })
    const SuccessCallback=jest.fn();
    const ErrorCallback=jest.fn();
    const checkService= new CheckService(
        mockRepository,
        SuccessCallback,
        ErrorCallback

    )



    test('should call succecallback when retunr fetch true',async()=>{
       const wasOk=await checkService.execute('httpd://google.com');
       expect(wasOk).toBe(true)
       expect(SuccessCallback).toHaveBeenCalled();
       expect(ErrorCallback).not.toHaveBeenCalled();
       expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
    })
})