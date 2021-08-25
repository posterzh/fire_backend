import {
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as Mailgun from "mailgun-js";
import { StrToUnix } from "src/utils/StringManipulation";
import { randomIn } from "src/utils/helper";

const {
  MAIL_GUN_KEY,
  MAIL_GUN_DOMAIN,
  CLIENT,
  API,
} = process.env;

const mailgun = new Mailgun({ apiKey: MAIL_GUN_KEY, domain: MAIL_GUN_DOMAIN });

@Injectable()
export class MailService {
  constructor() {
  }

  async templateGenerate(data: any) {
    return await this.sendMail(data);
  }

  async sendMail(input: any) {
    // const attachment = input.attachment.map(attach => request(attach))
    try {
      await mailgun.messages().send(input);
      return "Email sent successfully";
    } catch (error) {
      return "Email failed to send, please manual send";
    }
  }
}
