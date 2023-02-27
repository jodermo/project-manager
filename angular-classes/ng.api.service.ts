import {NgLanguageEntity} from './angular-entities/ng.language.entity';
import {NgTranslationEntity} from './angular-entities/ng.translation.entity';
import {environment as devEnvironment} from '../environments/environment.dev';
import {environment as prodEnvironment} from '../environments/environment.prod';
import {HttpHeaders} from '@angular/common/http';
import {NgUserEntity} from './angular-entities/ng.user.entity';
import {NgApiEntity} from './ng.api.entity';
import {NgTaskEntity} from './angular-entities/ng.task.entity';
import {NgCompanyEntity} from './angular-entities/ng.company.entity';
import {NgFileEntity} from './angular-entities/ng.file.entity';
import {DefaultTranslation} from '../translations/default.translation';
import {NgAppSettingsEntity} from "./angular-entities/ng.app-settings.entity";
import {NgAttributeEntity} from "./angular-entities/ng.attribute.entity";
import {NgLocationEntity} from "./angular-entities/ng.location.entity";


export const XMLHttpRequestMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
export type XMLHttpRequestMethod = typeof XMLHttpRequestMethods[number];


export const CalendarYears = {
    start: 1950,
    end: 2050
}

export interface CalendarMonth {
    index: number;
    name: string;
    alias: string;
}

export interface CalendarDay {
    index: number;
    name: string;
    alias: string;
}

export const CalendarMonths: CalendarMonth[] = [
    {index: 0, name: 'January', alias: 'January'},
    {index: 1, name: 'February', alias: 'February'},
    {index: 2, name: 'March', alias: 'March'},
    {index: 3, name: 'April', alias: 'April'},
    {index: 4, name: 'May', alias: 'May'},
    {index: 5, name: 'June', alias: 'June'},
    {index: 6, name: 'July', alias: 'July'},
    {index: 7, name: 'August', alias: 'July'},
    {index: 8, name: 'September', alias: 'July'},
    {index: 9, name: 'October', alias: 'July'},
    {index: 10, name: 'November', alias: 'July'},
    {index: 11, name: 'December', alias: 'July'},
];
export const CalendarDays: CalendarDay[] = [
    {index: 1, name: 'Monday', alias: 'monday'},
    {index: 2, name: 'Tuesday', alias: 'Tuesday'},
    {index: 3, name: 'Wednesday', alias: 'Wednesday'},
    {index: 4, name: 'Thursday', alias: 'Thursday'},
    {index: 5, name: 'Friday', alias: 'Friday'},
    {index: 6, name: 'Saturday', alias: 'Saturday'},
    {index: 0, name: 'Sunday', alias: 'Sunday'},
];


export class XMLHttpRequestService {


    constructor(public headers: any = {
        // 'Content-type': 'application/json'
    }, public useCache = false) {
    }


    private getHeader(xhr: XMLHttpRequest) {
        for (const attr in this.headers) {
            if (this.headers[attr]) {
                try {
                    xhr.setRequestHeader(attr, this.headers[attr]);
                } catch (error: any) {
                    console.warn('getHeader', attr, this.headers[attr], error);
                }
            }
        }
    }

    private createUrl(url: string, cached = false) {
        if (!cached) {
            const now = Date.now();
            const randomNumber = Math.floor(Math.random() * 10000);
            const uid = randomNumber + '_' + now;
            if (url.includes('?')) {
                url += '&uid=' + uid;
            } else {
                url += '?uid=' + uid;
            }
        }
        return url;
    }

    private toJson(data: any) {
        try {
            data = JSON.parse(data);
        } catch (error: any) {
            console.log('toJson error', error);
        }
        return data;
    }

    public setHeader(attribute: string, value: string) {
        this.headers[attribute] = value;
    }

    public removeHeader(attribute: string) {
        this.headers[attribute] = undefined;
    }

    public send(method: XMLHttpRequestMethod, url: string, data?: any, onSuccess?: (result: any, event: ProgressEvent, xhr: XMLHttpRequest) => void, onError?: (error: any, event: ProgressEvent, xhr: XMLHttpRequest) => void, cached = this.useCache): XMLHttpRequest {
        let xhr = new XMLHttpRequest();
        url = this.createUrl(url, cached);
        xhr.open(method, url, false);
        this.getHeader(xhr);
        xhr.onload = (event: ProgressEvent) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 304) {
                    if (onSuccess) {
                        onSuccess(this.toJson(xhr.responseText), event, xhr);
                    }
                } else {
                    if (onError) {
                        onError(xhr.responseText, event, xhr);
                    }
                }
            }
        };
        xhr.onerror = (event: ProgressEvent) => {
            if (onError) {
                onError(xhr.responseText, event, xhr);
            }
        };
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
        return xhr;
    }

    public get(url: XMLHttpRequestMethod, onSuccess?: (result: any, event: ProgressEvent) => void, onError?: (error: any, event: ProgressEvent) => void, cached = this.useCache): XMLHttpRequest {
        return this.send('GET', url, undefined, onSuccess, onError, cached);
    }

    public post(url: string, data: any, onSuccess?: (result: any, event: ProgressEvent) => void, onError?: (error: any, event: ProgressEvent) => void, cached = this.useCache): XMLHttpRequest {
        return this.send('POST', url, data, onSuccess, onError, cached);
    }

    public put(url: string, data: any, onSuccess?: (result: any, event: ProgressEvent) => void, onError?: (error: any, event: ProgressEvent) => void, cached = this.useCache): XMLHttpRequest {
        return this.send('PUT', url, data, onSuccess, onError, cached);
    }

    public patch(url: string, data: any, onSuccess?: (result: any, event: ProgressEvent) => void, onError?: (error: any, event: ProgressEvent) => void, cached = this.useCache): XMLHttpRequest {
        return this.send('PATCH', url, data, onSuccess, onError, cached);
    }

    public delete(url: string, onSuccess?: (result: any, event: ProgressEvent) => void, onError?: (error: any, event: ProgressEvent) => void, cached = this.useCache): XMLHttpRequest {
        return this.send('DELETE', url, undefined, onSuccess, onError, cached);
    }
}


export class NgApiError {
    public time: number;

    constructor(private api: NgApiService, public code?: number, public message?: any) {
        api.errors.push(this);
        this.time = Date.now();
        console.error(code, message);
    }
}

export class NgApiLog {
    public time: number;

    constructor(private api: NgApiService, public message?: any) {
        api.logs.push(this);
        this.time = Date.now();
        console.log(message);
    }
}

export class NgApiService {

    public apiURL = '';
    private testDataURL = '';
    private staticTestDataURL = '';

    private callbacks: any = {};

    public setting?: NgAppSettingsEntity;
    public language?: NgLanguageEntity;

    public settings: NgAppSettingsEntity[] = [];
    public languages: NgLanguageEntity[] = [];
    public translations: NgTranslationEntity[] = [];

    public calendarYears = this.getYears();
    public calendarMonths = CalendarMonths;
    public calendarDays = CalendarDays;

    public errors: NgApiError[] = [];
    public connectionError?: NgApiError;
    public logs: NgApiLog[] = [];

    public token?: string;

    public loading = false;
    public ready = false;


    public apiEvents = 0;

    public apiRouteLoading: any = {};

    environment: any = {
        production: false,
        testData: true,
        staticTestData: false,
        apiURL: 'http://localhost:80/',
        testDataURL: 'http://localhost:8080/',
        staticTestDataURL: 'http://localhost:8282/',
    };

    public apiRequired = false;
    public autoReload = false;
    private autoReloadTimeout?: any;
    private autoReloadTime = 15000;
    private currentTimeToAutoReload = this.autoReloadTime;

    public apiData: any = {};

    public dataConstructor: any = {
        'task': (data: any) => {
            return new NgTaskEntity(this).setData(data);
        },
        'company': (data: any) => {
            return new NgCompanyEntity(this).setData(data);
        },
        'location': (data: any) => {
            return new NgLocationEntity(this).setData(data);
        },
        'file': (data: any) => {
            return new NgFileEntity(this).setData(data);
        },
        'user': (data: any) => {
            return new NgUserEntity(this).setData(data);
        },
        'user-group': (data: any) => {
            return new NgTaskEntity(this).setData(data);
        },
        'quest': (data: any) => {
            return new NgTaskEntity(this).setData(data);
        }
    };

    public fileUtil = {
        types: [
            {name: 'image', fileType: 'image', extensions: ['jpg', 'jpeg', 'png', 'gif']},
            {name: 'video', fileType: 'video', extensions: ['mp4', 'ogg', 'ogv', 'webm', 'avi']},
            {name: 'obj', fileType: 'obj', extensions: ['obj']},
            {name: 'fbx', fileType: 'fbx', extensions: ['fbx']},
            {name: 'collada', fileType: 'collada', extensions: ['dae']},
            {name: 'stl', fileType: 'stl', extensions: ['stl']},
        ],
        getTypeFromFilename: (filename: string) => {
            for (const type of this.fileUtil.types) {
                for (const typeExtension of type.extensions) {
                    const fileExtension = filename.substr(filename.length - typeExtension.length);
                    if (fileExtension.toLowerCase() === typeExtension.toLowerCase()) {
                        return type.fileType;
                    }
                }
            }
            return 'document';
        }
    }

    public cordovaApp = false;
    public cordovaHttp = false;
    initialized = false;
    orientation?: string;
    device = {
        orientation: (undefined as string | undefined)
    };
    private orientationChangeTimeout ?: any;

    public formDataHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    public xmlHttpRequestService = new XMLHttpRequestService({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    public useXhrFallback = true;
    public isMobile = /(mobile)/i.test(navigator.userAgent);
    public isIOS = (/iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !(window as any).MSStream;
    public isAndroid = /android/i.test(navigator.platform);

    private defaultTranslation = new DefaultTranslation();

    /*
        public formDataHeaders = new HttpHeaders()
        .set('Content-Type', 'multipart/form-data');
     */
    private entityOpeningHours: any = {};
    private entityOpeningHoursLoading: any = {};
    private entityAttributes: any = {};
    private entityAttributesLoading: any = {};
    private fallbackImage = 'assets/svg/app_logo.svg';

    constructor(private httpClient: any, private formBuilder: any, private headers: any, public staticData?: any) {
        console.log('isMobile', this.isMobile);
        console.log('isIOS', this.isIOS);
        console.log('isAndroid', this.isAndroid);
    }

    loadData() {
        for (const key in this.apiData) {
            this.load();
            this.get(key, (result: any) => {
                this.apiData[key] = [];
                if (result && result.length) {
                    for (let data of result) {
                        if (this.dataConstructor[key]) {
                            data = this.dataConstructor[key](data)
                        }
                        this.apiData[key].push(data);
                    }
                }
                this.apiData[key] = this.sortData(this.apiData[key], 'id', true);
                this.loaded();
            }, (error: any) => {
                console.log(key, error);
                this.apiData[key] = this.apiData[key] || [];
                this.loaded();
            });

        }
    }

    public  fileById(fileId: number){
        return this.apiData.file.find((file: NgFileEntity) => file.id === fileId);

    }
    public sortData(data: any, sortKey = 'id', reverse = false) {
        data = data.sort((a: any, b: any) => {
            return (a[sortKey] || 0) - (b[sortKey] || 0);
        });
        if (reverse) {
            data = data.reverse();
        }
        return data;
    }

    private setTokenHeader(header: HttpHeaders) {
        if (this.token) {
            header.set('Authorization', 'Bearer ' + this.token);
            // this.xmlHttpRequestService.setHeader('Authorization', 'Bearer ' + this.token);
        } else {
            header.set('Authorization', '');
            // this.xmlHttpRequestService.removeHeader('Authorization');

        }
    }


    initDeviceHandler() {
        if (!this.initialized) {
            this.initialized = true;
            console.log('initDeviceHandler cordovaApp', this.cordovaApp, this);
            if (!this.cordovaApp) {
                console.log('initDeviceHandler', this.cordovaApp, this.orientation);
                window.addEventListener('resize', () => {
                    this.checkDeviceOrientation();
                    console.log('resize', this.cordovaApp, this.orientation);
                }, false);
                window.addEventListener('orientationchange', () => {
                    this.checkDeviceOrientation();
                }, false);
            }
            if (screen.orientation) {
                screen.orientation.addEventListener('change', (e) => {
                    this.checkDeviceOrientation();
                });
            }
            this.checkDeviceOrientation();
        }

    }

    checkDeviceOrientation(orientation = this.orientation) {

        const viewWeight = window.innerWidth;
        const viewHeight = window.innerHeight;
        if (viewWeight < viewHeight) {
            this.device.orientation = 'portrait';
        } else {
            this.device.orientation = 'landscape';
        }
        this.orientation = this.device.orientation;
        if (this.orientationChangeTimeout) {
            clearTimeout(this.orientationChangeTimeout);
        }
        this.orientationChangeTimeout = setTimeout(() => {
            this.do('orientation-change', this.device.orientation);
        }, 0);

        console.log('checkDeviceOrientation', this.cordovaApp, this.orientation);
    }

    setCordovaHttp(cordovaHttp: any) {
        this.httpClient = cordovaHttp;
        this.cordovaHttp = true;
    }


    private initService() {
        this.load();
        this.getSettings(() => {
            if (this.settings.length) {
                this.setting = this.settings[0];
            }
            this.getLanguages(() => {
                if (this.setting?.defaultLanguageId && this.languages.length) {
                    this.language = this.languages.find(language => language.id === this.setting?.defaultLanguageId);
                } else if (this.languages?.length) {
                    this.language = this.languages[0];
                }
                this.getTranslations(() => {
                    setTimeout(() => {
                        this.setReady();
                        this.loaded();
                    }, 0);
                });
            });
        }, (errorResponse: any) => {
            console.error(errorResponse.error && errorResponse.error.message ? errorResponse.error.message : (errorResponse.message || errorResponse.statusText));
            if (this.apiRequired) {
                this.connectionError = new NgApiError(this, errorResponse.status, 'Error: no access to API');
                if (this.autoReload) {
                    this.triggerAutoReload();
                }
            }
            this.loaded();
        });
    }

    triggerAutoReload(autoReloadTime = this.autoReloadTime, countEvery = 25) {
        this.currentTimeToAutoReload = autoReloadTime;
        this.autoReload = true;
        if (this.autoReloadTimeout) {
            clearTimeout(this.autoReloadTimeout)
        }
        this.autoReloadTimeout = setTimeout(() => {
            if (this.currentTimeToAutoReload <= 0) {
                location.reload();
            } else {
                this.currentTimeToAutoReload -= countEvery;
                this.triggerAutoReload(this.currentTimeToAutoReload);
            }
        }, countEvery);
    }

    timeToAutoReload() {
        return (this.currentTimeToAutoReload / 1000).toFixed(0) + ' seconds';
    }

    percentToAutoReload() {
        return Math.floor((this.currentTimeToAutoReload / this.autoReloadTime) * 100);
    }

    setReady() {
        this.ready = true;
    }

    reload() {
        location.reload();
    }

    initEnvironment(mode: ('prod' | 'dev')) {
        mode === 'prod' ? this.environment = prodEnvironment : this.environment = devEnvironment;
        if (this.environment.production) {
            this.environment.testData = false;
            this.environment.staticTestData = false;
        }
        if (this.environment.testDataURL) {
            this.environment.testDataURL = this.environment.testDataURL;
        }
        if (this.environment.staticTestDataURL) {
            this.staticTestDataURL = this.environment.staticTestDataURL;
        }
        if (this.environment.apiURL) {
            this.apiURL = this.environment.apiURL;
        }
        this.initService();
    }

    url(testData = this.environment.testData, staticTestData = this.environment.staticTestData) {
        const url = (testData ? (staticTestData ? this.staticTestDataURL : this.environment.apiURL) : this.apiURL);
        return url;
    }

    fileUrl() {
        return 'https://project-manager-uploads.witali-ruff.de/';
    }

    filePath(file: NgFileEntity) {
        if (file.path) {
            return this.fileUrl() + file.path;
        }
        return this.fallbackImage;
    }

    setStaticData(data: any) {
        this.staticData = data;
        return this;
    }

    date(date: any){
        return new Date(date).toLocaleDateString();
    }

    dateTime(date: any){
        return new Date(date).toLocaleTimeString();
    }

    dayByIndex(index: number) {
        return CalendarDays.find(weekDay => weekDay.index === index);
    }

    textDay(day?: CalendarDay | string | number) {
        if (typeof day === 'string' || typeof day === 'number') {
            day = this.day(day);
        }
        return day ? day.name ? this.text(day.name) : day : '';
    }

    textMonth(month?: CalendarMonth | string | number) {
        if (typeof month === 'string' || typeof month === 'number') {
            month = this.month(month);
        }
        return month ? month.name ? this.text(month.name) : month : '';
    }

    day(dayIndex: string | number) {
        return this.calendarDays.find(calendarDay => calendarDay.index === parseInt(dayIndex + ''));
    }

    month(monthIndex: string | number) {
        return this.calendarMonths.find(calendarMonth => calendarMonth.index === parseInt(monthIndex + ''));
    }

    text(text: string | number, language = this.language) {
        let translationFound = false;
        if (language && this.translations.length) {
            const translation = this.translations.find(translation => (translation.textAlias === text && translation.languageId === language.id));
            if (translation) {
                text = translation.text;
                translationFound = true;
            }
        }
        if (!translationFound) {
            text = this.defaultTranslation.text(text, language);
        }
        return text + '';
    }

    load() {
        this.loading = true;
        this.apiEvents++;
        this.do('load', this.apiEvents);
    }

    loaded() {
        this.apiEvents--;
        if (this.apiEvents <= 0) {
            this.loading = false;
        }
        this.do('loaded', this.apiEvents);
    }

    get(apiRoute: string, onSuccess?: (result?: any) => void, onError?: (error: any) => void, id?: number, testData = this.environment.testData) {
        this.load();
        if (this.environment.staticTestData) {
            let result: any;
            if (this.staticData[apiRoute]) {
                if (result && id) {
                    result = this.staticData[apiRoute].find((entry: any) => entry?.id === id);
                } else {
                    result = this.staticData[apiRoute];
                }
            }
            if (onSuccess) {
                onSuccess(result);
            }
            this.loaded();
            return;
        }
        let url = this.url(testData) + apiRoute + '/';
        if (id) {
            url += id;
        }
        this.setTokenHeader(this.headers);
        if (this.isIOS && this.useXhrFallback) {
            this.xmlHttpRequestService.get(url, (result: any) => {
                if (onSuccess) {
                    onSuccess(result);
                }
                this.loaded();
            }, (error: any) => {
                if (onError) {
                    onError(error);
                }
                this.loaded();
            });
        } else {
            this.httpClient.get(url, {headers: this.headers}).subscribe(
                (result?: any) => {
                    if (onSuccess) {
                        onSuccess(result);
                    }
                    this.loaded();
                },
                (error: any) => {
                    if (onError) {
                        onError(error);
                    }
                    this.loaded();
                }
            );
        }

    }

    post(apiRoute: string, data: any, onSuccess?: (result?: any) => void, onError?: (error: any) => void, testData = this.environment.testData, formData = false) {
        this.load();
        let url = this.url(testData) + apiRoute;
        if (!formData && data.id) {
            if (url.slice(-1) === '/') {
                url += data.id;
            } else {
                url += '/' + data.id;
            }
        }
        let body = formData ? data : JSON.stringify(data);
        const headers = formData ? this.formDataHeaders : this.headers;
        this.setTokenHeader(headers);

        this.httpClient.post(url, body, {
            headers: headers,
            reportProgress: formData
        }).subscribe(
            (result?: any) => {

                if (onSuccess) {
                    onSuccess(result);
                }
                this.loaded();
            },
            (error: any) => {

                if (onError) {
                    onError(error);
                }
                this.loaded();
            }
        );

    }

    put(apiRoute: string, data: any, onSuccess?: (result?: any) => void, onError?: (error: any) => void, testData = this.environment.testData) {
        this.load();
        const body = JSON.stringify(data);
        let url = this.url(testData) + apiRoute;
        if (data.id) {
            if (url.slice(-1) === '/') {
                url += data.id;
            } else {
                url += '/' + data.id;
            }
        }
        this.setTokenHeader(this.headers);
        if (this.isIOS && this.useXhrFallback) {
            this.xmlHttpRequestService.put(url, body, (result: any) => {
                if (onSuccess) {
                    onSuccess(result);
                }
                this.loaded();
            }, (error: any) => {
                if (onError) {
                    onError(error);
                }
                this.loaded();
            });
        } else {
            this.httpClient.put(url, body, {headers: this.headers}).subscribe(
                (result?: any) => {
                    if (onSuccess) {
                        onSuccess(result);
                    }
                    this.loaded();
                },
                (error: any) => {
                    if (onError) {
                        onError(error);
                    }
                    this.loaded();
                }
            );
        }
    }

    patch(apiRoute: string, data: any, onSuccess?: (result?: any) => void, onError?: (error: any) => void, testData = this.environment.testData) {

        this.load();
        const parsedData: any = {};
        for (const attr in data) {
            if (attr !== 'id') {
                try{
                    parsedData[attr] = data[attr];
                }catch(error: any){
                    console.log('patch error attr', attr, data[attr]);
                }

            }
        }
        let body = parsedData;
        try{
            body = JSON.stringify(parsedData);
        }catch(error: any){
            console.log('patch error parse', error, parsedData, body);
        }
        let url = this.url(testData) + apiRoute;
        if (data.id) {
            url += '/' + data.id;
        }
        this.setTokenHeader(this.headers);
        if (this.isIOS && this.useXhrFallback) {
            this.xmlHttpRequestService.patch(url, body, (result: any) => {
                if (onSuccess) {
                    onSuccess(result);
                }
                this.loaded();
            }, (error: any) => {
                if (onError) {
                    onError(error);
                }
                this.loaded();
            });
        } else {
            this.httpClient.patch(url, body, {headers: this.headers}).subscribe(
                (result?: any) => {
                    if (onSuccess) {
                        onSuccess(result);
                    }
                    this.loaded();
                },
                (error: any) => {
                    if (onError) {
                        onError(error);
                    }
                    this.loaded();
                }
            );
        }
    }

    delete(apiRoute: string, idData?: any, onSuccess?: (result?: any) => void, onError?: (error: any) => void, testData = this.environment.testData) {

        this.load();
        let url = this.url(testData) + apiRoute;
        const id = idData ? idData.id || idData : undefined;
        if (id) {
            url += '/' + id;
        }
        this.setTokenHeader(this.headers);
        if (this.isIOS && !this.cordovaApp && this.useXhrFallback) {
            this.xmlHttpRequestService.delete(url, (result: any) => {
                if (onSuccess) {
                    onSuccess(result);
                }
                this.loaded();
            }, (error: any) => {
                if (onError) {
                    onError(error);
                }
                this.loaded();
            });
        } else {
            this.httpClient.delete(url, {headers: this.headers}).subscribe({
                next: (data: any) => {
                    if (onSuccess) {
                        onSuccess();
                    }
                    this.loaded();
                },
                error: (error: any) => {
                    if (onError) {
                        onError(error);
                    }
                    this.loaded();
                }
            });
        }

    }


    uploadFile(file: File, onProgress = (progress: number) => {
    }, onSuccess = (result: any) => {
    }, onError = (result: any) => {
    }, s3 = true) {
        const user = ((this as any).user as NgUserEntity) || undefined;
        const postData: any = {
            userId: user?.id,
            type: 'upload'
        };
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        for (const property in postData) {
            if (postData.hasOwnProperty(property)) {
                formData.append(property, postData[property]);
            }
        }
        const url = this.url(false) + 'file' + (s3 ? '/upload/' : '');
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = () => {
            if (xmlHttpRequest.readyState === 4) {
                if (onSuccess) {
                    onSuccess(JSON.parse(xmlHttpRequest.response));
                }
            }
        };
        xmlHttpRequest.onprogress = (evt: ProgressEvent) => {
            if (evt.lengthComputable) {
                const percentComplete = evt.loaded / evt.total * 100;
                // Do something with download progress
                onProgress(percentComplete);
            }
        };
        xmlHttpRequest.open('POST', url);
        // xmlHttpRequest.setRequestHeader('Content-Type', 'multipart/form-data');
        if (this.token) {
            //  xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + this.token);
        }
        xmlHttpRequest.send(formData);

        // this.post('file' + (s3 ? '/upload' : ''), formData, onSuccess, onError, false, true);
    }


    canvasImage(imageSrc: string, width: number, height: number, onSuccess?: (dataUrl: string) => void, options?: any) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas: any = document.createElement('canvas');
            canvas.crossOrigin = 'anonymous';
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            const w = img.naturalWidth;
            const h = img.naturalHeight;
            const scale = Math.min(canvas.width / w, canvas.height / h);
            ctx.setTransform(scale, 0, 0, scale, canvas.width / 2, canvas.height / 2);
            ctx.drawImage(img, -w / 2, -h / 2, w, h);
            if (onSuccess) {
                onSuccess(canvas.toDataURL());
            }
        };
        img.src = imageSrc;
    }

    updateEntry(entry?: NgApiEntity) {
        if (entry && !entry.dataIsLoading) {
            entry.dataIsLoading = true;
            setTimeout(() => {
                if (entry) {
                    entry.dataIsLoading = false;
                }
            }, 0);
        }
    }

    private getSettings(onSuccess = (result: any) => {
    }, onError = (result: any) => {
    }) {
        this.get('app-settings', (settings: any[]) => {
            this.settings = [];
            if (settings && settings.length) {
                for (const setting of settings) {
                    this.settings.push(new NgAppSettingsEntity(this, this.environment.testData).setData(setting));
                }
            }
            onSuccess(this.settings);
        }, onError, undefined, this.environment.testData);
    }

    private getLanguages(onSuccess = (result: any) => {
    }, onError = (result: any) => {
    }) {
        this.get('language', (languages: any[]) => {
            this.languages = [];
            if (languages && languages.length) {
                for (const language of languages) {
                    this.languages.push(new NgLanguageEntity(this, this.environment.testData).setData(language));
                }
            }
            onSuccess(this.languages);
        }, onError, undefined, this.environment.testData);
    }


    private getTranslations(onSuccess = (result: any) => {
    }, onError = (result: any) => {
    }) {
        this.get('translation', (translations: any[]) => {
            this.translations = [];
            if (translations && translations.length) {
                for (const translation of translations) {
                    this.translations.push(new NgTranslationEntity(this, this.environment.testData).setData(translation));
                }
            }
            onSuccess(this.translations);
        }, onError, undefined, this.environment.testData);
    }


    on(eventName: string, callback: (data?: any) => void) {
        if (!this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
    }

    public do(eventName: string, data?: any) {
        if (this.callbacks[eventName]) {
            for (const callback of this.callbacks[eventName]) {
                callback(data);
            }
        }
    }

    distance(pointA: { latitude: number, longitude: number }, pointB: { latitude: number, longitude: number }) {
        const p = 0.017453292519943295;    // Math.PI / 180
        const c = Math.cos;
        const a = 0.5 - c((pointB.latitude - pointA.latitude) * p) / 2 +
            c(pointA.latitude * p) * c(pointB.latitude * p) *
            (1 - c((pointB.longitude - pointA.longitude) * p)) / 2;
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }


    attributes(entity: NgApiEntity, onDone?: (attribute: NgAttributeEntity[]) => void, loadFromDatabase = false) {
        let resultArray = [] as NgAttributeEntity[];
        if (entity?.id) {
            if (!this.entityAttributes[entity.apiRoute]) {
                this.entityAttributes[entity.apiRoute] = {} as any;
            }
            if (loadFromDatabase || !this.entityAttributes[entity.apiRoute][entity.id]) {
                if (!this.entityAttributesLoading[entity.apiRoute]) {
                    this.entityAttributesLoading[entity.apiRoute] = {} as any;
                }
                if (!this.entityAttributesLoading[entity.apiRoute][entity.id]) {
                    this.entityAttributesLoading[entity.apiRoute][entity.id] = true;
                    this.get('attribute/' + entity.apiRoute + '/' + entity.id, (result?: any[]) => {
                        if (this.entityAttributes[entity.apiRoute] && entity.id) {
                            this.entityAttributes[entity.apiRoute][entity.id] = resultArray;
                        }
                        if (this.entityAttributesLoading[entity.apiRoute] && entity.id) {
                            this.entityAttributesLoading[entity.apiRoute][entity.id] = false;
                        }
                        if (onDone) {
                            onDone(resultArray);
                        }
                    }, (error: any) => {
                        if (this.entityAttributesLoading[entity.apiRoute] && entity.id) {
                            this.entityAttributesLoading[entity.apiRoute][entity.id] = false;
                        }
                        if (onDone) {
                            onDone(resultArray);
                        }
                    });
                }

            } else if (this.entityAttributes[entity.apiRoute][entity.id]) {
                resultArray = this.entityAttributes[entity.apiRoute][entity.id];
                if (onDone) {
                    onDone(resultArray);
                }
            }
        }
        return resultArray;
    }

    private getYears() {
        const years = [];
        for (let i = 0; i < (CalendarYears.end - CalendarYears.start); i++) {
            years.push(CalendarYears.start + i)
        }
        return years;
    }

}
