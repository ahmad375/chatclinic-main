import { getServerSession, type Session } from 'next-auth'
import { UnexpectedErrorNotification } from '@/lib'
import type { APIResponse, SignUpResponse, User } from '@/types'
import nodemailer from 'nodemailer';

export class SendEmail {
  private static transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  public static async mailSender(to_email: string, subject: string, content: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: to_email,
        subject: subject,
        text: content,
      };
      console.log('===========here is email sender starting section============')
      console.log('========to_email address========', to_email)
      // this.transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //     return false;
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //     return true;
      //   }
      // });
      await new Promise((resolve, reject) => {
        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            console.log('Email sent: ' + info.response);
            resolve(true);
          }
        });
      });
      console.log('===========here is email sender ending section============')
    } catch (e) {
      console.log(`UserUtils.detectWidget error: ${e}`)
    }
  }
}
