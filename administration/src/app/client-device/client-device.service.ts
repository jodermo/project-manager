import {Injectable} from '@angular/core';
import {Compass} from './client-device-compass/compass';

export type ClientDeviceServiceCallbacks = 'ready' | 'rotationchange' | 'orientationchange' | 'locationchange';

export class ClientDeviceCoordinate {
  name = 'location';
  active = false;
  degree = 0;
  size = 0;

  constructor(public latitude = 0, public longitude = 0) {
  }

  setActive(active = this.active) {
    this.active = active;
    return this;
  }

  setName(name = this.name) {
    this.name = name;
    return this;
  }

  setDegree(degree = this.degree) {
    this.degree = degree;
    return this;
  }

  setSize(size = this.size) {
    this.size = size;
    return this;
  }

}

@Injectable({
  providedIn: 'root'
})
export class ClientDeviceService extends ClientDeviceCoordinate {
  active = true;

  ionicApp = false;
  latitude = 50.65916403;
  longitude = 7.20583251;
  northPole = new ClientDeviceCoordinate(90, 0).setActive(true);
  rotation = 0;
  rotateToNorthPole = 0;
  compassRotation = 0;
  gyro = {
    absolute: false,
    alpha: 0,
    beta: 0,
    gamma: 0
  };
  orientation = {degree: 0, lookAt: false};
  userAgent = navigator.userAgent;
  isIOS = (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && !navigator.userAgent.match(/AppleWebKit/)) === true;
  customLocation = {
    active: false,
    latitude: 0,
    longitude: 0
  };
  customRotation = {
    active: false,
    rotation: 0
  };
  private callbacks: any = {};
  ionicService?: any;

  ready = false;

  compassActive = false;
  compassAngle = 0;
  compassError?: any;
  compassOptions = {
    position: 'topright',	//position of control inside map
    autoActive: false,		//activate control at startup
    showDigit: false,		//show angle value bottom compass
    textErr: '',			//error message on alert notification
    callErr: null,			//function that run on compass error activating
    angleOffset: 2			//min angle deviation before rotate
    /* big angleOffset is need for device have noise in orientation sensor */
  }

  constructor() {
    super();
    this.initializeCompass();
    this.getGeoLocation((position: GeolocationPosition) => {
      this.deviceReady();
    }, (error: GeolocationPositionError) => {
      this.deviceReady();
    });
    this.update();
  }

  initializeCompass() {
    this.compassError = this.compassOptions.callErr || console.log;
    this.compassActive = false;
    this.compassAngle = 0;
    this.activateCompass();
  }

  activateCompass() {
    /*
      this.compassRequest();
     */

  }

  compassRequest() {
    if (!this.compassActive) {
      try {
        (DeviceOrientationEvent as any).requestPermission()
          .then((response: any) => {
            if (response == 'granted') {
              this.compassActive = true;
              window.addEventListener('deviceorientation', (event: DeviceOrientationEvent) => {
                this.rotateHandler(event);
              });
            }
          })
          .catch(console.error);
      } catch (e: any) {
        window.addEventListener('deviceorientation', (event: DeviceOrientationEvent) => {
          this.rotateHandler(event);
        });
        this.compassActive = true;
      }
    }


  }

  private rotateHandler(e: DeviceOrientationEvent) {
    let angle;
    if (!this.compassActive) {
      return false;
    }
    if ((e as any).webkitCompassHeading) {
      //iphone
      angle = 360 - (e as any).webkitCompassHeading;
    } else if (e.alpha)			//android
      angle = e.alpha;
    else {
      this.errorCompass({message: 'Orientation angle not found'});
    }
    angle = angle ? Math.round(angle) : angle;
    if (angle && angle % this.compassOptions.angleOffset === 0) {
      this.setCompassAngle(angle);
    }
    this.deviceOrientationChange(e);
    return true;

  }

  private setCompassAngle(angle: any, element?: HTMLElement) {
    this.compassAngle = angle;
    if (element) {
      this.rotateElement(element);
    }
  }

  private rotateElement(el: HTMLElement) {
    el.style.webkitTransform = "rotate(" + this.compassAngle + "deg)";
    (el.style as any).MozTransform = "rotate(" + this.compassAngle + "deg)";
    el.style.transform = "rotate(" + this.compassAngle + "deg)";
  }

  private errorCompass(e: any) {
    this.deactivateCompass();
    this.compassError.call(this, this.compassOptions.textErr || e.message);
  }

  deactivateCompass() {
    this.setCompassAngle(0);
    this.compassActive = false;
  }

  private deviceReady() {
    this.update();
    this.do('ready');
    this.ready = true;
  }

  initIonic(ionicService: any) {
    this.ionicApp = true;
    this.ionicService = ionicService;
  }

  update() {
    this.updateRotation();
    this.updateLocation();
  }

  private updateRotation() {
    if (this.customRotation.active) {
      this.rotation = this.customRotation.rotation + this.compassAngle;
    } else {
      this.rotation = this.compassAngle;
    }
    this.do('rotationchange');
  }

  directionAngle(anchor: ClientDeviceCoordinate, point: ClientDeviceCoordinate) {
    return 2 * Math.atan2(anchor.latitude - point.longitude, anchor.latitude - point.longitude) * 180 / Math.PI + 180;
  }

  lookAt(tM: ClientDeviceCoordinate, lAt: ClientDeviceCoordinate) {
    return -Math.atan2(lAt.longitude, lAt.latitude) - Math.PI / 2;
  }

  calcDegreeToPoint(point: any, latitude = this.latitude, longitude = this.longitude) {
    const phiK = (point.latitude * Math.PI) / 180.0;
    const lambdaK = (point.latitude * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;
    const psi =
      (180.0 / Math.PI) *
      Math.atan2(
        Math.sin(lambdaK - lambda),
        Math.cos(phi) * Math.tan(phiK) -
        Math.sin(phi) * Math.cos(lambdaK - lambda)
      );
    return Math.round(psi);
  }

  private updateLocation() {
    if (this.customLocation.active) {
      this.latitude = this.customLocation.latitude;
      this.longitude = this.customLocation.longitude;
    } else {
      this.customLocation.latitude = this.latitude;
      this.customLocation.longitude = this.longitude;
    }
    this.do('locationchange');
  }

  private deviceOrientationChange(event: DeviceOrientationEvent) {
    this.gyro.absolute = event.absolute ? event.absolute : false;
    if (event.alpha) {
      this.gyro.alpha = event.alpha;
    }
    if (event.beta) {
      this.gyro.beta = event.beta;
    }
    if (event.gamma) {
      this.gyro.gamma = event.gamma;
    }
    this.deviceOrientationHandler(event);
    this.do('orientationchange');

  }

  getGeoLocation(onSuccess?: (position: GeolocationPosition) => void, onError?: (error: GeolocationPositionError) => void) {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.deviceGeolocationChange(position);
      console.log('GeolocationPosition', position);
      if (onSuccess) {
        onSuccess(position);
      }
    }, (error: GeolocationPositionError) => {
      console.log('GeolocationPositionError', error);
      if (onError) {
        onError(error);
      }
    }, {timeout: 10000})
  }

  private deviceGeolocationChange(position: GeolocationPosition) {
    if (!this.customLocation.active) {
      if (position.coords) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }
    } else {
      if (position.coords) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }
    }
    this.update();
  }


  private deviceOrientationHandler(orientation: any | DeviceOrientationEvent) {
    const compass = orientation.webkitCompassHeading || Math.abs(orientation.alpha - 180);
    this.compassRotation = compass;
    this.update();
  }


  public on(callbackName: ClientDeviceServiceCallbacks, event: (data: any) => void) {
    if (!this.callbacks[callbackName]) {
      this.callbacks[callbackName] = [];
    }
    this.callbacks[callbackName].push(event);

  }

  private do(callbackName: ClientDeviceServiceCallbacks, data: any = undefined) {
    if (this.callbacks[callbackName]) {
      for (const event of this.callbacks[callbackName]) {
        event(data);
      }
    }
  }

}
