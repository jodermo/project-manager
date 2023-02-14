import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { BackendAdminComponent } from '../../../../administration/src/app/backend-admin/backend-admin.component';
import { BackendAdminService } from '../../../../administration/src/app/backend-admin/backend-admin.service';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-angular-app',
  templateUrl: 'angular-app.page.html',
  styleUrls: ['angular-app.page.scss']
})
export class AngularAppPage implements AfterViewInit {

  @ViewChild('backendAdminComponent', {static: false}) backendAdminComponent?: BackendAdminComponent;


  constructor(private screenOrientation: ScreenOrientation, public apiService: BackendAdminService, private http: HTTP, private file: File) {
    this.apiService.cordovaApp = true;
    this.apiService.setCordovaHttp(this.http);
    console.log('AngularAppPage - New Version 2!!!');
  }

  ngAfterViewInit() {
    this.initDevice();
  }

  initDevice() {
    console.log('initDevice');
    if(this.backendAdminComponent){
      this.apiService = this.backendAdminComponent.adminService;
    }
    this.apiService.cordovaApp = true;

    if (this.http) {
      if (!this.http.post) {
        this.http = new HTTP();
      }
      this.apiService.setCordovaHttp(this.http);
    }
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
            this.apiService.checkDeviceOrientation(this.screenOrientation.type);
          }
        );
      }
    }
  }

  checkDir(){
    this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
      console.log('Directory doesn\'t exist'));
  }

}
