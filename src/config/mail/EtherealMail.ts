import nodemailer from 'nodemailer'
import { text } from 'stream/consumers';

interface ISendMail{
    to:string,
    body:string
}

export default class EtherealMail{
    static async sendMail({to , body}:ISendMail):Promise<void>{
        const account = await nodemailer.createTestAccount();

        const transporter =  nodemailer.createTransport({
            host:account.smtp.host,
            port:account.smtp.port,
            secure:account.smtp.secure,
            auth:{
                user:account.user,
                pass:account.pass
            }

        })
        const message = await transporter.sendMail({
            from:'equipe@essencials.com',
            to,
            subject:'Recuperação de senha',
            text:body
        })

        console.log('Message sent: %$', message.messageId)
        console.log('Preview url: %$', nodemailer.getTestMessageUrl(message))
    }
}