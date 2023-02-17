import {Logger} from '@nestjs/common';
import {RouteInfo} from '@nestjs/common/interfaces';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {MailerOptions} from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {environment} from '../environment.server';

require('dotenv').config();

class ConfigService {

    private logger = new Logger('ConfigService');

    constructor(private env: { [k: string]: string | undefined }) {
    }

    private getValue(key: string, throwOnMissing = true, fallbackValue = undefined): string | undefined {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            this.logger.error(`config error - missing env.${key}`);
            return fallbackValue;
        }
        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));

        return this;
    }

    public getCors() {
        const origin = this.getValue('SERVER_CORS_ORIGIN', false);
        const domains = environment.allowDomains;
        const ports = environment.ports;
        const protocols = environment.protocols;
        const whitelist = [];
        const allowNone = true;
        for (const domain of domains) {
            for (const protocol of protocols) {
                const url = protocol + '://' + domain;
                whitelist.push(url);
                for (const port of ports) {
                    whitelist.push(url + ':' + port);
                }
            }
        }
        return {
            origin: (origin, callback) => {
                if (!origin && allowNone) {
                    this.logger.log("Allowed CORS for:" + origin);
                    callback(null, true);
                } else if (whitelist.indexOf(origin) !== -1) {
                    this.logger.log("Allowed CORS for:" + origin);
                    callback(null, true);
                } else {
                    this.logger.log("Blocked CORS for:" + origin);
                    callback(new Error('Not allowed by CORS'));
                }
            },
            methods: "GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS",
            allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
            exposedHeaders: ['Authorization'],
            credentials: false,
        }
    }

    public getAppConfig(): any {
        return {
            emailVerification: false
        }
    }

    public getSecret() {
        return this.getValue('SERVER_SECRET', true);
    }

    public getPort() {
        return this.getValue('SERVER_PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('SERVER_MODE', false);
        return mode !== 'dev';
    }

    public getAdminDomain(): string {
        return this.getValue('ADMIN_DOMAIN', true);
    }

    public getFrontendRoute(): string {
        return this.getValue('PUBLIC_URL_FRONTEND', true);
    }

    public getFrontendHTML(): string {
        const fallback = 'public_html/frontend';
        return this.getValue('PUBLIC_HTML_FRONTEND', true) || fallback;
    }

    public getAWSConfig() {
        return {
            accessKey: this.getValue('AWS_ACCESS_KEY_ID', true),
            secretKey: this.getValue('AWS_SECRET_ACCESS_KEY', true),
            region: this.getValue('AWS_REGION', true),
            awsUrl: this.getValue('AWS_URL', true),
            healthCheckRoute: this.getValue('AWS_HANDLER_HEALTH_CHECK', true),
            progressRoute: this.getValue('AWS_HANDLER_PROGRESS', true),
            warningRoute: this.getValue('AWS_HANDLER_WARNING', true),
            completeRoute: this.getValue('AWS_HANDLER_COMPLETE', true),
            errorRoute: this.getValue('AWS_HANDLER_ERROR', true),
            uploadBucket: this.getValue('AWS_S3_UPLOAD_BUCKET', true),
            uploadRegion: this.getValue('AWS_S3_UPLOAD_REGION', true),
            uploadEndpoint: this.getValue('AWS_S3_UPLOAD_ENDPOINT', true),
            sourceBucket: this.getValue('AWS_S3_SOURCE_BUCKET', true),
            thumbnailBucket: this.getValue('AWS_S3_THUMBNAIL_BUCKET', true),
        }
    }

    public getOpenRoutes(): RouteInfo {
        return environment.openRoutes;
    }

    public getSftpConnectionInfo() {
        return {
            host: 'www200.your-server.de',
            port: 22,
            username: 'petzka_17',
            password: 'gEe19L4uuYi9v8js',
            //  debug: console.log,
        };
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.getValue('POSTGRES_HOST', true),
            port: parseInt(this.getValue('POSTGRES_PORT', true)),
            username: this.getValue('POSTGRES_USER', true),
            password: this.getValue('POSTGRES_PASSWORD', true),
            database: this.getValue('POSTGRES_DB', true),
            entities: ['dist/**/*.entity{.ts,.js}'],
            migrationsTableName: 'migration',
            migrations: ['src/migration/*.ts'],
            cli: {
                migrationsDir: 'src/migration',
            },
            ssl: this.isProduction(),
            synchronize: true,
        };
    }

    public adminEmails(): string {
        return environment.adminEmails;
    }

    public logEmails(): string {
        return environment.logEmails;
    }

    public errorEmails(): string {
        return environment.errorEmails;
    }


    public getMailConfig(): MailerOptions {
        const smtpConfig = {
            transport: 'smtp://' + this.getValue('MAIL_SMTP_LOGIN', true) + ':' + this.getValue('MAIL_SMTP_PASSWORD', true) + '@' + this.getValue('MAIL_SMTP_SERVER', true) + ':pass',
            defaults: {
                from: '"' + this.getMailDefaults().sender + '" <' + this.getMailDefaults().sender + '>',
            },
            template: {
                dir: './templates/email/',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            }
        };
        return smtpConfig;
    }

    public getMailDefaults() {
        return {
            subject: this.getValue('MAIL_SUBJECT', true),
            sender: this.getValue('MAIL_SENDER', true),
        };
    }

    public getDocumentationConfig() {
        return {
            username: this.getValue('API_DOCUMENTATION_LOGIN', false) || 'Documentation',
            password: this.getValue('API_DOCUMENTATION_PASSWORD', false) || 'Test1234',
            route: this.getValue('API_DOCUMENTATION_ROUTE', false) || 'documentation'
        };
    }
}

const configService = new ConfigService(process.env)
    .ensureValues([
        'SERVER_SECRET',
        'SERVER_MODE',
        'SERVER_PORT',
        'SERVER_CORS_ORIGIN',
        'PUBLIC_URL_FRONTEND',
        'PUBLIC_HTML_FRONTEND',
        'ADMIN_DOMAIN',
        'POSTGRES_HOST',
        'POSTGRES_PORT',
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
        'POSTGRES_DB',
        'MAIL_SMTP_LOGIN',
        'MAIL_SMTP_PASSWORD',
        'MAIL_SMTP_SERVER',
        'MAIL_SMTP_PORT',
        'MAIL_SENDER',
        'MAIL_SUBJECT',
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_REGION',
        'AWS_URL',
        'AWS_HANDLER_HEALTH_CHECK',
        'AWS_HANDLER_PROGRESS',
        'AWS_HANDLER_WARNING',
        'AWS_HANDLER_COMPLETE',
        'AWS_HANDLER_ERROR',
        'AWS_S3_UPLOAD_BUCKET',
        'AWS_S3_UPLOAD_REGION',
        'AWS_S3_UPLOAD_ENDPOINT',
        'AWS_S3_SOURCE_BUCKET',
        'AWS_S3_THUMBNAIL_BUCKET',
    ]);

export {configService};

