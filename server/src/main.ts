import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import { Logger } from '@nestjs/common';
import { configService } from './config/config.service';
import { urlencoded, json } from 'express';
import { config } from 'aws-sdk';

async function bootstrap() {
    const logger = new Logger('MainApp');
    config.update({
        accessKeyId: configService.getAWSConfig().accessKey,
        secretAccessKey: configService.getAWSConfig().secretKey,
        region: configService.getAWSConfig().region
    });
    const server = express();

    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));

    app.enableCors(configService.getCors());
    app.use(json({limit: '50mb'}));
    app.use(urlencoded({extended: true, limit: '50mb'}));

    /* force slashes on end of routes */
    app.use((req, res, next) => {
        if (req.path.substr(-1) === '/' || req.path.length <= 1) {
            next()
        } else {
            let safepath = req.path
            const query = req.url.slice(req.path.length);
            if (safepath.includes('/assets/')) {
                next()
            } else {
                safepath = req.path + '/';
                res.redirect(301, safepath + query);
            }
        }
    });

    await app.listen(configService.getPort());

    logger.log(
        'App Ready ' +
        '\n Port:' + configService.getPort() +
        '\n Frontend Route:' + configService.getFrontendRoute() +
        '\n Frontend Files:' + configService.getFrontendHTML()
    );
}

bootstrap();
