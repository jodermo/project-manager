import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularAppPage } from './angular-app.page';
import { AngularAppRoutingModule } from './angular-app-routing.module';
import { OnlinePlatformModule } from '../../../../frontend/src/app/online-platform/online-platform.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AngularAppRoutingModule,
    OnlinePlatformModule
  ],
  declarations: [AngularAppPage]
})
export class AngularAppModule {}
