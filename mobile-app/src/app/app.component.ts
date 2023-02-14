import { Component } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { OnlinePlatformService } from '../../../frontend/src/app/online-platform/online-platform.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(private screenOrientation: ScreenOrientation, public platform: OnlinePlatformService) {
    this.platform.cordovaApp = true;
    console.log('AngularAppPage - New Version 2!!!');
    this.initDevice();
  }

  initDevice() {
    console.log('initDevice');
    this.platform.cordovaApp = true;
    if (this.screenOrientation) {
      if (!this.screenOrientation.unlock) {
        this.screenOrientation = new ScreenOrientation();
      }
      if (this.screenOrientation.type) {
        console.log('screenOrientation', this.screenOrientation.type);
        this.screenOrientation.unlock();
        this.screenOrientation.onChange().subscribe(
          () => {
            console.log('Orientation Changed');
            console.log(this.screenOrientation.type);
            this.platform.checkDeviceOrientation(this.screenOrientation.type);
          }
        );
      }
    }
  }

}
