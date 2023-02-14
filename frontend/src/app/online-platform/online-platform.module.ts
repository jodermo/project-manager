import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlinePlatformService } from './online-platform.service';
import { OnlinePlatformComponent } from './online-platform.component';
import { OnlinePlatformHeaderComponent } from './online-platform-header/online-platform-header.component';
import { OnlinePlatformMainComponent } from './online-platform-main/online-platform-main.component';
import { OnlinePlatformFooterComponent } from './online-platform-footer/online-platform-footer.component';
import { LogoComponent } from './online-platform-components/logo/logo.component';
import { MenuComponent } from './online-platform-components/menu/menu.component';
import { PrivacySettingsComponent } from './online-platform-components/privacy-settings/privacy-settings.component';
import { LoginComponent } from './online-platform-components/login/login.component';
import { OnlinePlatformStartPageComponent } from './online-platform-main/online-platform-start-page/online-platform-start-page.component';
import { BackButtonComponent } from './online-platform-components/back-button/back-button.component';
import { OnlinePlatformSidebarComponent } from './online-platform-sidebar/online-platform-sidebar.component';
import { AppConditionsComponent } from './online-platform-components/app-conditions/app-conditions.component';
import { SettingsComponent } from './online-platform-components/settings/settings.component';
import { AppPrivacyComponent } from './online-platform-components/app-privacy/app-privacy.component';
import { CookieBannerComponent } from './online-platform-components/cookie-banner/cookie-banner.component';
import { OnlinePlatformAppConditionsPageComponent } from './online-platform-main/online-platform-app-conditions-page/online-platform-app-conditions-page.component';
import { OnlinePlatformAppPrivacyPageComponent } from './online-platform-main/online-platform-app-privacy-page/online-platform-app-privacy-page.component';
import { ImageCarouselComponent } from './online-platform-components/image-carousel/image-carousel.component';
import { MapComponent } from './online-platform-components/map/map.component';
import { ArViewComponent } from './online-platform-components/ar-view/ar-view.component';
import { CompassComponent } from './online-platform-components/compass/compass.component';
import { TaskComponent } from './online-platform-components/task/task.component';
import { LocationComponent } from './online-platform-components/location/location.component';
import { DeviceSettingsComponent } from './online-platform-components/device-settings/device-settings.component';
import { InfoPopupComponent } from './online-platform-components/info-popup/info-popup.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ClientDeviceModule } from '../client-device/client-device.module';
import { RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@NgModule({
  declarations: [
    OnlinePlatformComponent,
    OnlinePlatformHeaderComponent,
    OnlinePlatformMainComponent,
    OnlinePlatformFooterComponent,
    LoginComponent,
    LogoComponent,
    MenuComponent,
    PrivacySettingsComponent,
    OnlinePlatformStartPageComponent,
    BackButtonComponent,
    OnlinePlatformSidebarComponent,
    AppConditionsComponent,
    SettingsComponent,
    AppPrivacyComponent,
    CookieBannerComponent,
    OnlinePlatformAppConditionsPageComponent,
    OnlinePlatformAppPrivacyPageComponent,
    ImageCarouselComponent,
    MapComponent,
    ArViewComponent,
    CompassComponent,
    TaskComponent,
    LocationComponent,
    DeviceSettingsComponent,
    InfoPopupComponent
  ],
  imports: [
    CommonModule,
    ClientDeviceModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [
    OnlinePlatformComponent,
    OnlinePlatformHeaderComponent,
    OnlinePlatformMainComponent,
    OnlinePlatformFooterComponent,
    LoginComponent,
    LogoComponent,
    MenuComponent,
    PrivacySettingsComponent,
    OnlinePlatformStartPageComponent,
    BackButtonComponent,
    OnlinePlatformSidebarComponent,
    AppConditionsComponent,
    SettingsComponent,
    AppPrivacyComponent,
    CookieBannerComponent,
    OnlinePlatformAppConditionsPageComponent,
    OnlinePlatformAppPrivacyPageComponent,
    ImageCarouselComponent,
    MapComponent,
    ArViewComponent,
    CompassComponent,
    TaskComponent,
    LocationComponent,
    DeviceSettingsComponent,
    InfoPopupComponent
  ],
  providers: [
    OnlinePlatformService,
    FormBuilder
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlinePlatformModule {
}
