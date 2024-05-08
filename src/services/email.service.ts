import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { ApiError } from "../errors/api-error";

class EmailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: "denia876@gmail.com",
        pass: "vzduivkswbhlcjek",
      },
    });
  }
  public async sendMail(email: string) {
    try {
      return await this.transporter.sendMail({
        to: email,
        subject: "Our first email",
        html: "<div> Hello, it's our first email </div>",
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const emailService = new EmailService();
