// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.service, //service like gmail or yahoo etc
      host: process.env.host, // SMTP server host
      port: 587, // SMTP port (typically 587 for TLS)
      secure: false, // Set to true for secure connections (TLS)
      auth: {
        user: process.env.senderEmail, // Your email address...sender mail address
        pass: process.env.senderEmailPass, // Your email password or application-specific password
      },
    });
  }

  // to, subject and text fields will be received where ever we call this function
  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      to,
      subject,
      html,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Email sending failed');
    }
  }
}
