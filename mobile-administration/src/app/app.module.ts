import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { IonicNativePlugin } from '@ionic-native/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { BackendAdminModule } from '../../../administration/src/app/backend-admin/backend-admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BackendAdminModule, BrowserAnimationsModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: ScreenOrientation, useClass: IonicNativePlugin},
    {provide: HTTP, useClass: IonicNativePlugin}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
