
export enum LogSeveritylevel {
    low='low',
    medium='medium',
    higg='high',
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
     }

}