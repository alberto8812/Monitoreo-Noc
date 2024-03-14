
export enum LogSeveritylevel {
    low='low',
    medium='medium',
    high='high',
}

export class LogEntity {
    public level:LogSeveritylevel
    public message:string;
    public creatAt:Date;

    //inicializamos en el contructor
     constructor(message:string,level:LogSeveritylevel){
        this.message=message;
        this.level=level;
        this.creatAt= new Date();
     };

     //"{"level":"high","message":"hola mundo","createAt":"12457888888"}"
     static fromJson=(json:string):LogEntity=>{
        const {message,level,creatAt}=JSON.parse(json);
        // if(!message) throw new Error('message is requiered');
        // if(!level) throw new Error('level is requiered');
        // podemos hacer validaciones

        const log=new LogEntity(message,level);
        log.creatAt=new Date(creatAt);

        return log;
     }

}