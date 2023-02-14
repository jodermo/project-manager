import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { OnlinePlatformService } from './online-platform.service';

@Component({
  selector: 'app-online-platform',
  templateUrl: './online-platform.component.html',
  styleUrls: ['./online-platform.component.scss']
})
export class OnlinePlatformComponent implements AfterViewInit {
  @ViewChild('hammerMainElement', {static: false}) hammerElementRef?: ElementRef;
  @Input() cordovaHttp?: any;
  hammerReady = false;

  constructor(public platform: OnlinePlatformService) {
  }


  ngAfterViewInit() {
    if (this.cordovaHttp) {
      this.platform.setCordovaHttp(this.cordovaHttp);
    }
    this.initHammerJs();
    setTimeout(() => {
      this.platform.initOnlinePlatform();
      this.initHammerJs();
      this.platform.initDeviceHandler();
    }, 250);
  }

  initHammerJs() {
    if (this.hammerElementRef && !this.hammerReady) {
      this.platform.initHammerJs(this.hammerElementRef.nativeElement, (e: HammerInput) => {
        this.platform.swipeLeft(e);
      }, (e: HammerInput) => {
        this.platform.swipeRight(e);
      });
      this.hammerReady = true;
    }
  }

}
