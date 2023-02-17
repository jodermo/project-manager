import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import express from 'express';
import {Logger} from '@nestjs/common';
import {configService} from './config/config.service';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
    const logger = new Logger('MainApp');
    const server = express();

    const documentation = configService.getDocumentationConfig();

    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));


    app.use((req, res, next) => {
        if (req.url.includes('/' + documentation.route)) {
            let auth;
            if (req.headers.authorization) {
                auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
            }
            if (!auth || auth[0] !== documentation.username || auth[1] !== documentation.password) {
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
                res.end('Unauthorized');
            } else {
                next();
            }
        } else {
            next();
        }
    });


    const config = new DocumentBuilder()
        .setTitle('Ruffsolar API')
        .setDescription('Application programming interface for Ruffsolar')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(documentation.route, app, document, {
        customSiteTitle: 'Ruffsolar API documentation',
    });

    app.enableCors(configService.getCors());

    await app.listen(configService.getPort());

    logger.log(
        'App Ready ' +
        '\n Port:' + configService.getPort()
    );
}

bootstrap();
