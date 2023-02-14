import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsController } from './app-settings.controller';
import { AppSetting } from './app-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppSetting])],
  controllers: [AppSettingsController],
  providers: [AppSettingsService]
})
export class AppSettingsModule {}
