import { Controller, Post, HttpStatus, HttpCode, Get, Response, Body, Inject, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { MailService } from '../mail/mail.service';
import { configService } from '../../config/config.service';


@Controller('auth')
export class AuthController {

    private logger = new Logger('AuthController');

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly mailService: MailService) {
    }

    @Post('login')
    async loginUser(@Response() res: any, @Body() body: User) {
        if (!(body && (body.username || body.email) && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({message: 'no_credentials'});
        }
        let user = (body.username || body.email) ? await (body.username ? this.userService.getUserByUsername(body.username) : this.userService.getUserByEmail(body.email)) : undefined;
        if (user && user.active) {
            if (await this.userService.compareHash(body.password, user.passwordHash)) {
                const token = await this.authService.createToken(user.id, user.username);
                return res.status(HttpStatus.OK).json({user: user, token: token});
            }
        } else if (user && !user.active) {
            return res.status(HttpStatus.FORBIDDEN).json({message: 'not_activated'});
        }
        return res.status(HttpStatus.FORBIDDEN).json({message: 'wrong_credentials'});
    }

    @Post('register')
    async registerUser(@Response() res: any, @Body() body: User) {

        this.logger.log(body);

        if (!(body && (body.username || body.email) && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({message: 'no_credentials'});
        }

        let user = (body.username || body.email) ? await (body.username ? this.userService.getUserByUsername(body.username) : this.userService.getUserByEmail(body.email)) : undefined;

        if (user) {
            return res.status(HttpStatus.FORBIDDEN).json({message: 'username_exist'});
        } else {
            body.active = !configService.getAppConfig().emailVerification;
            user = await this.userService.createUser(body);
            if (user) {
                user.passwordHash = undefined;
            }
        }

        if (configService.getAppConfig().emailVerification) {
            await this.generateTokenMail(user);
        } else {

        }


        return res.status(HttpStatus.OK).json(user);
    }

    @Post('activate')
    async activateUser(@Response() res: any, @Body() body: any) {
        if (!(body && (body.username || body.email) && body.token)) {
            return res.status(HttpStatus.FORBIDDEN).json({message: 'no_credentials'});
        }

        let user = (body.username || body.email) ? await (body.username ? this.userService.getUserByUsername(body.username) : this.userService.getUserByEmail(body.email)) : undefined;


        if (user) {
            if (await this.userService.compareHash(user.username, body.token)) {
                user.active = true;
                await this.userService.updateUser(user.id, user);
                return res.status(HttpStatus.OK).json(await this.authService.createToken(user.id, user.username));
            }
        }

        return res.status(HttpStatus.FORBIDDEN).json({message: 'wrong_credentials'});
    }


    @Post('activation-request')
    async activationRequest(@Response() res: any, @Body() body: any) {
        if (!(body && (body.username || body.email))) {
            return res.status(HttpStatus.FORBIDDEN).json({message: 'no_credentials'});
        }

        let user = (body.username || body.email) ? await (body.username ? this.userService.getUserByUsername(body.username) : this.userService.getUserByEmail(body.email)) : undefined;

        if (user) {
            await this.generateTokenMail(user);
            return res.status(HttpStatus.OK).json({message: 'success', email: user.email});
        } else {
            return res.status(HttpStatus.FORBIDDEN).json({message: 'not_exist'});
        }

    }

    async generateTokenMail(user: User) {
        const token = await this.userService.getHash(user.username);
        let tokenUrl = user.username + '::' + token;
        tokenUrl = this.replaceAll(tokenUrl, '/', '~.~');
        const domain = configService.getAdminDomain();
        const authUrl = domain + '/?auth=' + tokenUrl;
        const mailText = 'Confirm Registration, click on ' + '<a href="' + authUrl + '">' + authUrl + '</a>';
        const mailHTML = '<p>' + mailText + '</p>';
        await this.mailService.sendMail(user.email, 'Registrieung bestätigen', mailText,
            configService.getMailDefaults().sender
            , mailHTML);
    }


    replaceAll(originalString, find, replace) {
        return originalString.replace(new RegExp(find, 'g'), replace);
    };
}
