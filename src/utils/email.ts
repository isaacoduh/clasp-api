import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import pug from "pug";
dotenv.config({});

class MailTransport {
  public async sendEmail(
    receiverEmail: string,
    subject: string,
    body: string,
    data: { [key: string]: any },
    templateName: string
  ): Promise<void> {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      this.developmentEmailSender(
        receiverEmail,
        subject,
        body,
        data,
        templateName
      );
    } else {
      this.productionEmailSender(receiverEmail, subject, body);
    }
  }

  private renderEmailTemplate(template: string, data: { [key: string]: any }) {
    const templatePath = path.join(
      process.cwd(),
      "src/utils/templates",
      `${template}.pug`
    );
    return pug.renderFile(templatePath, data);
  }

  private async developmentEmailSender(
    receiverEmail: string,
    subject: string,
    body: string,
    data: { [key: string]: any },
    templateName: string
  ): Promise<void> {
    const transporter: Mail = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL!,
        pass: process.env.SENDER_EMAIL_PASSWORD!,
      },
    });

    const mailOptions = {
      from: `Clasp Finance ${process.env.SENDER_EMAIL!}`,
      to: receiverEmail,
      subject,
      html: this.renderEmailTemplate(templateName, data),
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Development Email Sent`);
    } catch (error) {
      console.log(`Error sending email ${error}`);
      throw new Error("Error sending development email!");
    }
  }
  private async productionEmailSender(
    receiverEmail: string,
    subject: string,
    body: string
  ): Promise<void> {}
}

export const mailTransport: MailTransport = new MailTransport();
