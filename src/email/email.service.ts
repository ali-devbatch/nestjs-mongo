// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP server host
      port: 587, // SMTP port (typically 587 for TLS)
      secure: false, // Set to true for secure connections (TLS)
      auth: {
        user: 'ali.ahmed@devbatch.com', // Your email address...sender mail address
        pass: 'tvoixonkhsmkwtgf', // Your email password or application-specific password
      },
    });
  }

  // to, subject and text fields will be received where ever we call this function
  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'no-reply@dev-batch.com', // user will get email from this address
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
