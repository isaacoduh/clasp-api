"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailTransport = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const pug_1 = __importDefault(require("pug"));
dotenv_1.default.config({});
class MailTransport {
    sendEmail(receiverEmail, subject, body, data, templateName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.NODE_ENV === "development" ||
                process.env.NODE_ENV === "test") {
                this.developmentEmailSender(receiverEmail, subject, body, data, templateName);
            }
            else {
                this.productionEmailSender(receiverEmail, subject, body);
            }
        });
    }
    renderEmailTemplate(template, data) {
        const templatePath = path_1.default.join(process.cwd(), "src/utils/templates", `${template}.pug`);
        return pug_1.default.renderFile(templatePath, data);
    }
    developmentEmailSender(receiverEmail, subject, body, data, templateName) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.SENDER_EMAIL,
                    pass: process.env.SENDER_EMAIL_PASSWORD,
                },
            });
            const mailOptions = {
                from: `Clasp Finance ${process.env.SENDER_EMAIL}`,
                to: receiverEmail,
                subject,
                html: this.renderEmailTemplate(templateName, data),
            };
            try {
                yield transporter.sendMail(mailOptions);
                console.log(`Development Email Sent`);
            }
            catch (error) {
                console.log(`Error sending email ${error}`);
                throw new Error("Error sending development email!");
            }
        });
    }
    productionEmailSender(receiverEmail, subject, body) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.mailTransport = new MailTransport();
//# sourceMappingURL=email.js.map