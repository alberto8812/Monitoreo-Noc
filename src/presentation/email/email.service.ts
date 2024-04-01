import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogEntity, LogSeveritylevel } from "../../domain/entities/log.entities";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlbody: string;
  //todo attachment
  attachement?:Attachement[]
}

interface Attachement {
    filename: string,
    path:string// stream this file
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(
  ){

  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlbody,attachement=[] } = options;

    try {
        const sentInformation=await this.transporter.sendMail({
            to:to,
            subject:subject,
            html:htmlbody,
            attachments:attachement
        });
        const log=new LogEntity({
          level: LogSeveritylevel.low,
          message:'email was not sent',
          origin:'email.service.ts',

        });
        console.log(sentInformation)
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to:string | string[]){
    const subject= 'Logs del servidor';
    const htmlbody= `
      <h3>Logs de sistemas</h3>
      <p>mi prueba</p>
      <p>bueno lo que venga</p>
      `;
    const attachement:Attachement[]=[
        {filename:'logs-high.log',path:'./logs/logs-high.log'},
        {filename:'logs-low.log',path:'./logs/logs-low.log'},
        {filename:'logs-medium.log',path:'./logs/logs-medium.log'}
    ]

   return this.sendEmail({
      to,subject,htmlbody,attachement
    })

  }
}
