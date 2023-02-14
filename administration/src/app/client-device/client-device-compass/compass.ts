export class Compass {
  isActive = false;
  angle = 0;
  errorFunc?: any;

  options = {
    position: 'topright',	//position of control inside map
    autoActive: false,		//activate control at startup
    showDigit: false,		//show angle value bottom compass
    textErr: '',			//error message on alert notification
    callErr: null,			//function that run on compass error activating
    angleOffset: 2			//min angle deviation before rotate
    /* big angleOffset is need for device have noise in orientation sensor */
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.errorFunc = this.options.callErr || console.log;
    this.isActive = false;
    this.angle = 0;
    this.activate();
  }

  off() {
    if (this.isActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  rotateHandler(e: DeviceOrientationEvent) {
    let angle;
    if (!this.isActive) {
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
    if (angle && angle % this.options.angleOffset === 0) {
      this.setAngle(angle);
    }
    return true;

  }


  errorCompass(e: any) {
    this.deactivate();
    this.errorFunc.call(this, this.options.textErr || e.message);
  }


  rotateElement(el: HTMLElement) {
    el.style.webkitTransform = "rotate(" + this.angle + "deg)";
    (el.style as any).MozTransform = "rotate(" + this.angle + "deg)";
    el.style.transform = "rotate(" + this.angle + "deg)";
  }


  setAngle(angle: any, element?: HTMLElement) {
    this.angle = angle;
    if (element) {
      this.rotateElement(element);
    }
  }

  getAngle() {
    return this.angle;
  }


  activate() {
    this.isActive = true;
    window.addEventListener('deviceorientation', (event: DeviceOrientationEvent) => {
      this.rotateHandler(event);
    });
  }

  deactivate() {
    this.setAngle(0);
    this.isActive = false;
  }

}
