import {Module, MiddlewareConsumer} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ApiModule} from './api/api.module';
import {AwsModule} from './aws/aws.module';
import {configService} from './config/config.service';
import {FrontendModule} from './frontend/frontend.module';
import {LoggingService} from './logging.service';
import {MailService} from './api/mail/mail.service';
import {AppMiddleware} from './app.middleware';
import {SftpModule} from 'nest-sftp';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        SftpModule.forRoot(
            configService.getSftpConnectionInfo(),
            false,
        ),
        ApiModule,
        FrontendModule,
        AwsModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService,
        ConfigService,
        LoggingService,
        MailService
    ],
    exports: [
        MailService
    ]
})
export class AppModule {

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AppMiddleware)
            .exclude(configService.getOpenRoutes())
            .forRoutes(AppController);
    }
}
