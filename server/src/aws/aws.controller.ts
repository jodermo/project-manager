import { Controller, Get, Post, HttpStatus, Response, Body, Logger } from '@nestjs/common';
import { configService } from '../config/config.service';
import { User } from '../api/user/user.entity';

@Controller(configService.getAWSConfig().awsUrl)
export class AwsController {

    private logger = new Logger('AwsController');

    @Get()
    aws(@Response() res: any): Promise<User[]> {
        return res.status(HttpStatus.OK).json({server: 'available'});
    }

    @Get(configService.getAWSConfig().healthCheckRoute)
    healthCheck(@Response() res: any): Promise<User[]> {
        return res.status(HttpStatus.OK).json({healthCheck: '1'});
    }

    @Post(configService.getAWSConfig().progressRoute)
    async videoProgress(@Response() res: any, @Body() body: any) {
        this.logger.log('videoProgress', body);
        return res.status(HttpStatus.OK);
    }

    @Post(configService.getAWSConfig().completeRoute)
    async videoComplete(@Response() res: any, @Body() body: any) {
        this.logger.log('videoComplete', body);
        return res.status(HttpStatus.OK);
    }

    @Post(configService.getAWSConfig().warningRoute)
    async videoWarning(@Response() res: any, @Body() body: any) {
        this.logger.log('videoWarning', body);
        return res.status(HttpStatus.OK);
    }

    @Post(configService.getAWSConfig().errorRoute)
    async videoError(@Response() res: any, @Body() body: any) {
        this.logger.log('videoError', body);
        return res.status(HttpStatus.OK);
    }
}
