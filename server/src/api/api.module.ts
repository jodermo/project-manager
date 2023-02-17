import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { File } from './file/file.entity';
import { configService } from '../config/config.service';
import { MailController } from './mail/mail.controller';
import { LanguageModule } from './language/language.module';
import { TranslationModule } from './translation/translation.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { FrontendModule } from '../frontend/frontend.module';
import { LocationModule } from './location/poi.module';
import { MemoModule } from './memo/memo.module';
import { TaskModule } from './task/task.module';
import { UserGroupModule } from './user-group/user-group.module';
import { UserRoleModule } from './user-role/user-role.module';
import { CompanyModule } from './company/company.module';
import { AttributeModule } from './attribute/attribute.module';
import { ProjectModule } from './project/project.module';
import { TeamModule } from './team/team.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { AddressModule } from './address/address.module';
import { UserMessageModule } from './user-message/user-message.module';
import { ProjectTemplateModule } from './project-template/project-template.module';



@Module({
    imports: [
        TypeOrmModule.forFeature([File]),
        MailerModule.forRoot(configService.getMailConfig()),
        AuthModule,
        FileModule,
        UploadModule,
        UserModule,
        UserGroupModule,
        UserRoleModule,
        CompanyModule,
        LanguageModule,
        TranslationModule,
        AppSettingsModule,
        FrontendModule,
        LocationModule,
        MemoModule,
        TaskModule,
        AttributeModule,
        ProjectModule,
        TeamModule,
        QuestionModule,
        AnswerModule,
        AddressModule,
        UserMessageModule,
        ProjectTemplateModule
    ],
    controllers: [
        MailController,
    ],
    providers: []
})
export class ApiModule {
}
