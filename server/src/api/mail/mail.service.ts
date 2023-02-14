/**
 *    TATOR - Nest App
 *    © 2020
 *    Author: Moritz Petzka
 *    Website: https://petzka.com
 *    Email: info@petzka.com
 */

import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

    private logger = new Logger('Email');

    constructor(private readonly mailerService: MailerService) {
    }

    async sendMail(to: string, subject: string, text = null, from = process.env.MAIL_SENDER, html = null, template = null, context:any =  null): Promise<any> {
        this.logger.log('mail to ' + to);
        this.mailerService
            .sendMail({
                to,
                from,
                subject,
                text,
                html,
                template,
                context
            })
            .then(() => {
                this.logger.log('mail was sent to ' + to);
            })
            .catch((error) => {
                this.logger.log('mail error while sending to ' + to);
            });
    }
}
