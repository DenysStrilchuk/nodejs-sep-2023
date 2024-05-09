import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

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

    const handlebarOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "layouts",
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "partials",
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
      extname: ".hbs",
    };
    this.transporter.use("compile", hbs(handlebarOptions));
  }
  public async sendMail(email: string) {
    try {
      const mailOptions = {
        to: email,
        subject: "Hello",
        template: "register",
      };
      return await this.transporter.sendMail(mailOptions);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const emailService = new EmailService();
