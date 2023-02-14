import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgUserService} from '../../../../angular-classes/ng.user.service';
import {OnlinePlatformPage, OnlinePlatformPageType} from './online-platform-classes/online-platform-page';
import {
  OnlinePlatformCarousel,
  OnlinePlatformCarouselLayout
} from './online-platform-classes/online-platform-carousel';
import {NgUserEntity} from '../../../../angular-classes/angular-entities/ng.user.entity';
import {NgPoiEntity} from '../../../../angular-classes/angular-entities/ng.poi.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {HammerGestureConfig} from '@angular/platform-browser';
import Hammer from "hammerjs";
import {NgTaskEntity} from '../../../../angular-classes/angular-entities/ng.task.entity';
import {NgCompanyEntity} from '../../../../angular-classes/angular-entities/ng.company.entity';
import {NgFileEntity} from '../../../../angular-classes/angular-entities/ng.file.entity';

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': {direction: Hammer.DIRECTION_HORIZONTAL},
    'pinch': {enable: false},
    'rotate': {enable: false},
    'pan': {enable: false}
  };
}

@Injectable({
  providedIn: 'root'
})
export class OnlinePlatformService extends NgUserService {
  title = 'ProjectManager';
  logo = 'assets/svg/app_logo.svg';

  pages: OnlinePlatformPage[] = [
    <OnlinePlatformPage>{
      name: 'start',
      type: 'start',
      image: 'assets/images/search_woman_2.svg',
      menuPage: true,
      menuTitle: 'ProjectManager'
    },
    /*<OnlinePlatformPage>{
      name: 'app-conditions',
      type: 'app-conditions',
      menuPage: true,
      menuTitle: 'AGBs'
    },
    <OnlinePlatformPage>{
      name: 'app-privacy',
      type: 'app-privacy',
      menuPage: true,
      menuTitle: 'Datenschutz'
    },*/
  ];
  page?: OnlinePlatformPage;
  lastPage?: OnlinePlatformPage;

  useLocalUser = false;


  testData = false;

  personalData: any = {
    firstName: '',
    lastName: '',
    street: '',
    streetNumber: '',
    postcode: '',
    city: '',
    tel: '',
    email: '',
    latitude: 0,
    longitude: 0
  };

  carouselLayout = new OnlinePlatformCarouselLayout();

  carouselItemLength = 2;

  isAnimating = false;
  animationTime = 750;

  private animationTimeout?: any;
  backButtonEvent?: any;
  maxSearchQueryLength = 5;
  apply = false;
  applied = false;

  sidebar = false;

  mouse = {
    down: false,
    move: false,
    x: 0,
    y: 0,
    startTime: 0,
    startX: 0,
    startY: 0,
    movedX: 0,
    movedY: 0,
    onCarousel: false,
    moveTimeout: undefined as any
  };

  swipes = {
    minTime: 25,
    maxTime: 1750,
    minDistance: 32,
  }
  clickDelay = 150;
  showDeviceSettings = false;
  showSettings = false;


  showDetailInfos = false;


  private hammerElements: HTMLElement[] = [];
  currentCarousel: any;

  files: NgFileEntity[] = [];
  pois: NgPoiEntity[] = [];
  tasks: NgTaskEntity[] = [];
  companies: NgCompanyEntity[] = [];

  constructor(httpClient: HttpClient,
              formBuilder: FormBuilder,
              router: Router,
              route: ActivatedRoute) {
    super(
      httpClient,
      formBuilder,
      new HttpHeaders()
        .set('Content-Type', 'application/json'),
      {},
      router,
      route
    );

  }

  initOnlinePlatform() {
    this.autoReload = false;
    if (this.pages?.length) {
      this.showPage(this.pages[0]);
    }
    this.initEnvironment('prod');
    this.load();
    if (this.useLocalUser) {
      this.initLocalUser();
    }
    this.initUser();
    this.loaded();
    document.addEventListener('dblclick', (e) => {
      // this.sidebar = !this.sidebar;
    });
  }

  initHammerJs(element: HTMLElement, onSwipeLeft?: (e: HammerInput) => void, onSwipeRight?: (e: HammerInput) => void) {
    let hammer: any;
    if (element && !this.hammerElements.find(existingElement => existingElement === element)) {
      element.style.touchAction = 'pan-y';
      element.setAttribute('style', 'touch-action: pan-y !important');
      const hammerConf = new HammerConfig();
      hammer = hammerConf.buildHammer(element);
      hammer.on('swipeleft', (e: HammerInput) => {
        if (onSwipeLeft) {
          onSwipeLeft(e);
        }
      });
      hammer.on('swiperight', (e: HammerInput) => {
        if (onSwipeRight) {
          onSwipeRight(e);
        }
      });
      this.hammerElements.push(element);
    }
    return hammer;
  }

  initLocalUser() {
    let localUser: any = localStorage.getItem('local-user');
    if (!localUser) {
      this.user = new NgUserEntity(this);
      this.user.id = this.localUserId();
    } else {
      this.user = new NgUserEntity(this).setData(JSON.parse(localUser));
    }
    this.user.username = 'Anonymous';
    this.user.isLocal = true;
    localStorage.setItem('local-user', JSON.stringify(this.user.data()));
  }

  localUserId() {
    return parseInt(999 + '' + Date.now() + '' + (Math.random() * 10000));
  }

  productsIcon(company: NgCompanyEntity) {
    return company?.type === 'hospitality' ? 'hotel' : 'shopping_cart';
  }

  productsTitle(company: NgCompanyEntity) {
    return company?.type === 'hospitality' ? 'Betten' : 'Produkte';
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  carousel(data: any[], length = this.carouselItemLength, carouselLayout = this.carouselLayout, autoplay = false) {
    return new OnlinePlatformCarousel(data, length, carouselLayout, autoplay);
  }

  showPage(page?: OnlinePlatformPage, onLoaded?: any) {
    this.lastPage = this.page;
    this.isAnimating = true;
    this.sidebar = false;
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
    this.animationTimeout = setTimeout(() => {
      this.page = page;
      if (onLoaded) {
        onLoaded();
      }
      setTimeout(() => {
        this.isAnimating = false;
      }, 150);
    }, this.animationTime);
    if (page?.type === 'start') {
      this.backButtonEvent = undefined;
    } else if (this.lastPage) {
      this.backButtonEvent = () => {
        this.showPage(this.lastPage);
      }
    } else {
      this.backButtonEvent = undefined;
    }
  }

  showPageByName(name?: OnlinePlatformPageType, onLoaded?: any) {
    this.showPage(this.pages.find(page => page.name === name), onLoaded);
  }

  getData(onLoaded: () => void) {
    this.getFiles(() => {
      this.getPois(() => {
        this.getTasks(() => {
          onLoaded();
        });
      });
    });
  }

  private initData() {

  }

  private getFiles(onDone?: (result: any) => void) {
    this.get('file', (files: any[]) => {
      this.files = [];
      if (files && files.length) {
        for (const file of files) {
          this.files.push(new NgFileEntity(this, this.testData).setData(file));
        }
      }
      if (onDone) {
        onDone(this.files);
      }
    }, onDone, undefined, this.testData);
  }

  private getPois(onDone?: (result: any) => void) {
    this.get('poi/active', (pois: any[]) => {
      this.pois = [];
      if (pois && pois.length) {
        for (const poi of pois) {
          this.pois.push(new NgPoiEntity(this, this.testData).setData(poi));
        }
      }
      if (onDone) {
        onDone(this.pois);
      }
    }, onDone, undefined, this.testData);
  }


  private getTasks(onDone?: (result: any) => void) {
    this.get('task/active', (tasks: any[]) => {
      this.tasks = [];
      if (tasks && tasks.length) {
        for (const task of tasks) {
          this.tasks.push(new NgTaskEntity(this, this.testData).setData(task));
        }
      }
      this.sortData(this.tasks);
      if (onDone) {
        onDone(this.tasks);
      }
    }, onDone, undefined, this.testData);
  }

  savePersonalData() {
    localStorage.setItem('personal-data', JSON.stringify(this.personalData));
  }

  loadPersonalData() {
    const personalData = localStorage.getItem('personal-data');
    if (personalData) {
      this.personalData = JSON.parse(personalData);
    }
  }

  goBack() {
    if (this.backButtonEvent) {
      this.backButtonEvent();
    }
  }


  toucheStart(e: TouchEvent | MouseEvent) {
    e.stopPropagation();
    if ((e as TouchEvent).touches && (e as TouchEvent).touches?.length) {
      this.mouse.x = (e as TouchEvent).touches[0].clientX;
      this.mouse.y = (e as TouchEvent).touches[0].clientY;
    } else if ((e as MouseEvent).clientX || (e as MouseEvent).clientX === 0) {
      this.mouse.x = (e as MouseEvent).clientX;
      this.mouse.y = (e as MouseEvent).clientX;
    } else {
      this.mouse.x = 0;
      this.mouse.y = 0;
    }
    this.mouse.startX = this.mouse.x;
    this.mouse.startY = this.mouse.y;
    this.mouse.movedX = 0;
    this.mouse.movedY = 0;
    this.mouse.startTime = Date.now();
    this.mouse.down = true;
    this.mouse.move = false;
  }

  toucheEnd(e: TouchEvent | MouseEvent) {
    if ((e as TouchEvent).touches && (e as TouchEvent).touches?.length) {
      this.mouse.x = (e as TouchEvent).touches[0].clientX;
      this.mouse.y = (e as TouchEvent).touches[0].clientY;
    } else if ((e as MouseEvent).clientX || (e as MouseEvent).clientX === 0) {
      this.mouse.x = (e as MouseEvent).clientX;
      this.mouse.y = (e as MouseEvent).clientX;
    }
    this.mouse.down = false;
    if (!this.mouse.onCarousel) {
      const time = Date.now() - (this.mouse.startTime ? this.mouse.startTime : Date.now());
      if (this.mouse.move && time < this.swipes.maxTime && time > this.swipes.minTime) {
        if (this.mouse.x > this.mouse.startX) {
          // swipe to right
        } else if (this.mouse.x < this.mouse.startX) {
          // swipe to left
        }
      }
    }
  }


  toucheMove(e: TouchEvent | MouseEvent) {
    this.mouse.move = true;
    const maxOffset = 32;
    if ((e as TouchEvent).touches && (e as TouchEvent).touches?.length) {
      this.mouse.x = (e as TouchEvent).touches[0].clientX;
      this.mouse.y = (e as TouchEvent).touches[0].clientY;
      if (this.mouse.startY - this.mouse.y < -maxOffset || this.mouse.startY - this.mouse.y > maxOffset) {
        this.mouse.startX = (e as MouseEvent).clientX;
      }
    } else if ((e as MouseEvent).clientX || (e as MouseEvent).clientX === 0) {
      this.mouse.x = (e as MouseEvent).clientX;
      this.mouse.y = (e as MouseEvent).clientX;
    }
    this.mouse.movedX = this.mouse.x - this.mouse.startX;
    this.mouse.movedY = this.mouse.y - this.mouse.startY;
  }


  toFixes(value: number, fixes: number) {
    return value.toFixed(fixes);
  }

  checkDeviceOrientation(orientation = this.orientation) {
    super.checkDeviceOrientation(orientation);
    setTimeout(() => {
      this.onOrientationChange();
    }, 0);
  }

  onOrientationChange() {

    if (this.device.orientation === 'portrait') {

    } else if (this.device.orientation === 'landscape') {

    }
  }


  swipeLeft(e: HammerInput) {
    if (this.currentCarousel) {
      this.currentCarousel.next();
    }
  }

  swipeRight(e: HammerInput) {
    if (this.currentCarousel) {
      this.currentCarousel.prev();
    }
  }

  showSettingsMenu() {
    this.showSettings = true;
    this.sidebar = false;
  }

  price(price: any) {
    price = price ? parseFloat(price + '') : 0;
    return price.toFixed(2).replace('.', ',') + ' €';
  }

  setUser(user?: NgUserEntity) {
    super.setUser(user);
  }


  filePathById(fileId: number) {
    const file = this.fileById(fileId);
    return this.apiURL + (file ? file.path : '');
  }

  fileById(fileId: number) {
    return this.files.find(file => fileId === file.id);
  }
}
