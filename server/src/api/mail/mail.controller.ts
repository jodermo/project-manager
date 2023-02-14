/**
 *    Nest Server
 *    © 2022
 *    Author: Moritz Petzka
 *    Website: https://petzka.com
 *    Email: info@petzka.com
 */

import {
    Controller,
    Body,
    Post,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail } from './mail.entity';
import { configService } from '../../config/config.service';

@Controller('api/email')
export class MailController {

    constructor(private readonly dataService: MailService) {
    }

    @Post()
    sendMailPost(@Body() mail: Mail) {
        if (mail) {
            return this.dataService.sendMail(
                mail.email,
                mail.subject || configService.getMailDefaults().subject,
                mail.message || mail.text || null,
                configService.getMailDefaults().sender,
                mail.html || null,
                mail.template || 'default',
                mail.context || null);
        }
    }

}
