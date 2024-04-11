
export enum LogSeveritylevel {
    low='low',
    medium='medium',
    high='high',
}

export interface LogEntityOptions {
    level:LogSeveritylevel,
    message:string,
    creatAt?:Date,
    origin:string,
}

export class LogEntity {
    public level:LogSeveritylevel
    public message:string;
    public creatAt:Date;
    public origin:string;//indica cual es el archivo

    //inicializamos en el contructor
     constructor(option:LogEntityOptions){
        const {message,level,origin,creatAt= new Date()}=option
        this.message=message;
        this.level=level;
        this.origin=origin
        this.creatAt= creatAt;
     };

     //"{"level":"high","message":"hola mundo","createAt":"12457888888"}"
     static fromJson=(json:string='{}'):LogEntity=>{
        json= (json==='{}')?'{}':json;
        const {message,level,creatAt,origin}=JSON.parse(json);
        // if(!message) throw new Error('message is requiered');
        // if(!level) throw new Error('level is requiered');
        // podemos hacer validaciones

        const log=new LogEntity({
         message,
         level,
         creatAt:new Date(creatAt),
         origin
         });
        log.creatAt=new Date(creatAt);

        return log;
     }


     static fromObject =(object:{[key:string]:any}):LogEntity=>{
        const {message,level,origin,creatAt}=object;
        const log= new LogEntity({
            message,level,origin,creatAt
        });
        return log;
     }

}