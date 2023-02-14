import { Injectable, Logger } from '@nestjs/common';
import { MailService } from './api/mail/mail.service';
import { configService } from './config/config.service';

@Injectable()
export class LoggingService {

    private logger = new Logger('LoggingService');

    constructor(private mailService: MailService) {
    }

    async log(message: any) {
        message = this.parseMessage(message);
        this.logger.log(message);
        const mailTExt = new Date().toLocaleTimeString() + ' \n\n' + message;
        await this.mailService.sendMail(
            configService.logEmails(),
            'Server log',
            mailTExt,
            configService.getMailDefaults().sender,
            mailTExt
        );
    }

    async error(error: any) {
        error = this.parseMessage(error);
        this.logger.log(this.parseMessage(error));
        const mailTExt = new Date().toLocaleTimeString() + ' \n\n' + error;
        await this.mailService.sendMail(
            configService.errorEmails(),
            'Server error',
            mailTExt,
            configService.getMailDefaults().sender,
            mailTExt
        );
    }

    async adminMessage(message: any) {
        message = this.parseMessage(message);
        this.logger.log(message);
        await this.mailService.sendMail(
            configService.adminEmails(),
            'Server info',
            message,
            configService.getMailDefaults().sender,
            message
        );
    }

    private parseMessage(message: any) {
        if (message && typeof message === 'object' && !(message instanceof Object)) {
            return JSON.stringify(message, (key, value) => (value || ''), 4).replace(/"([^"]+)":/g, '$1:');
        }
        return message;
    }
}
