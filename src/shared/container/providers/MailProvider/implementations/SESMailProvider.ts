import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { injectable, inject } from 'tsyringe';
import mailConfig from '@config/mail';
import ImailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/ImailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/IsendMailDTO';

@injectable()
export default class SesMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: ImailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({ apiVersion: '2010-12-01', region: 'sa-east-1' }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    try {
      await this.client.sendMail({
        from: {
          name: from?.name || name,
          address: from?.email || email,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });
    } catch (err) {
      console.log('the error', err);
    }
  }
}
