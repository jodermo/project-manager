import {NgApiError, NgApiLog, NgApiService} from './ng.api.service';
import {NgLocationEntity} from "./angular-entities/ng.location.entity";

export const ApiRoutes = [
    'task',
    'location',
    'quest',
    'user'
]
export type ApiRoute = typeof ApiRoutes[number];

export class NgApiEntity {
    id: number | undefined = undefined;
    active: boolean = true;

    public errors: NgApiError[] = [];
    public logs: NgApiLog[] = [];


    public parentKey?: string;
    public parentRoute?: string;
    public jsonKeys: string[] = [];
    public dataIsLoading = false;
    private callbacks: any = {};
    private ignoredKeys: string[] = [];
    private ignoreDefaultKeys = [
        'apiRoute',
        'api',
        'testData',
        'errors',
        'logs',
        'parentKey',
        'callbacks',
        'jsonKeys',
        'ignoredKeys',
        'ignoreDefaultKeys',
        'apiAttributes',
        'dataIsLoading',
        'dataLoading'
    ];
    private dataLoading: any = {};

    constructor(public apiRoute: string, public api: NgApiService, public testData = false) {
        this.appendToApiData();

    }

    public onInit() {

    }

    private appendToApiData() {
        if (this.api && this.id) {
            if (!this.api.apiData[this.apiRoute]) {
                this.api.apiData[this.apiRoute] = [];
            }
            const existingEntry = this.api.apiData[this.apiRoute].find((entry: any) => entry.id && entry.id === this.id);
            if (existingEntry) {
                existingEntry.setData(this, false);
            } else {
                this.api.apiData[this.apiRoute].push(this);
            }
        }
        this.onInit();
    }

    private removeFromApi() {
        if (this.api.apiData[this.apiRoute] && this.id) {
            for (let i = 0; i < this.api.apiData[this.apiRoute].length; i++) {
                if (this.api.apiData[this.apiRoute][i].id === this.id) {
                    this.api.apiData[this.apiRoute].splice(i, 1);
                    this.api.do('remove-entity', this);
                    return;
                }
            }
        }
    }

    ignoreKeys(keys: string[]) {
        for (const key of keys) {
            this.ignoredKeys.push(key);
        }
    }

    setId(id?: number) {
        this.id = id;
        return this;
    }

    setData(newData: any, appendToApi = false) {
        if (newData) {
            const data = (this as any);
            for (const key in data) {
                if (newData[key] || newData[key] === 0 || newData[key] === false) {
                    let ignore = false;
                    let json = false;
                    for (const jsonKey of this.jsonKeys) {
                        if (key === jsonKey) {
                            json = true;
                        }
                    }
                    for (const ignoreKey of this.ignoreDefaultKeys) {
                        if (key === ignoreKey) {
                            ignore = true;
                        }
                    }
                    for (const ignoreKey of this.ignoredKeys) {
                        if (key === ignoreKey) {
                            ignore = true;
                        }
                    }
                    if (!ignore) {
                        if (json) {
                            let data = newData[key];
                            try {
                                data = JSON.parse(data)
                            } catch (error) {
                                // do nothing
                            }
                            if (!Array.isArray(data)) {
                                let value = undefined;
                                if (typeof data === 'string' || typeof data === 'number') {
                                    value = data;
                                }
                                data = value ? [value] : [];
                            }
                            (this as any)[key] = data;
                        } else {
                            (this as any)[key] = newData[key];
                        }
                    }
                }
            }
        }
        if (appendToApi) {
            this.appendToApiData();
        }
        return this;
    }

    data(): any {
        /* parse data object */
        const result: any = {};
        for (const key in (this as any)) {
            let ignore = false;
            let json = false;
            for (const jsonKey of this.jsonKeys) {
                if (key === jsonKey) {
                    json = true;
                }
            }
            for (const ignoreKey of this.ignoreDefaultKeys) {
                if (key === ignoreKey) {
                    ignore = true;
                }
            }
            for (const ignoreKey of this.ignoredKeys) {
                if (key === ignoreKey) {
                    ignore = true;
                }
            }
            if (!ignore) {
                if (json) {
                    result[key] = JSON.stringify((this as any)[key]);
                } else {
                    result[key] = (this as any)[key];
                }
            }
        }
        return result;
    }

    getData(onSuccess?: (result?: any) => void, onError?: (error?: any) => void) {
        if (this.id) {
            this.api.get(this.apiRoute, (result?: any) => {
                if (result?.id) {
                    this.setData(result);
                }
                if (onSuccess) {
                    onSuccess(result);
                }
            }, (error: any) => {
                this.errors.push(new NgApiError(this.api, error.status, error));
                if (onError) {
                    onError(error);
                }
            }, this.id, this.testData);
        }
        this.do('update', this);
    }

    add(onSuccess?: (result?: any) => void, onError?: (error?: any) => void) {
        this.dataIsLoading = true;
        this.apiCallStart();
        if (this.id) {
            this.update(onSuccess, onError);
            return;
        }
        const data = this.data();
        this.api.post(this.apiRoute + '/', data, (result?: any) => {
            if (result?.id) {
                this.setData(result);
            }
            this.addOrUpdateToApi();
            this.dataIsLoading = false;
            if (onSuccess) {
                onSuccess(result);
            }
            this.apiCallEnd();
        }, (error: any) => {
            this.errors.push(new NgApiError(this.api, error.status, error));
            this.dataIsLoading = false;
            if (onError) {
                onError(error);
            }
            this.apiCallEnd();
        }, this.testData);
    }

    update(onSuccess?: (result?: any) => void, onError?: (error?: any) => void) {
        this.dataIsLoading = true;
        this.apiCallStart();
        if (!this.id) {
            this.add(onSuccess, onError);
            return;
        }
        const data = this.data();
        this.api.patch(this.apiRoute, data, (result?: any) => {
            if (result?.id) {
                this.setData(result);
            }
            this.addOrUpdateToApi();
            this.dataIsLoading = false;
            if (onSuccess) {
                onSuccess(result);
            }
            this.apiCallEnd();
        }, (error: any) => {
            this.errors.push(new NgApiError(this.api, error.status, error));
            this.dataIsLoading = false;
            if (onError) {
                onError(error);
            }
            this.apiCallEnd();
        }, this.testData);


    }

    delete(onSuccess?: (result?: any) => void, onError?: (error?: any) => void) {
        this.dataIsLoading = true;
        this.apiCallStart();
        this.api.delete(this.apiRoute, this.data(), (result?: any) => {
            this.removeFromApi();
            this.destroy();
            this.dataIsLoading = false;
            if (onSuccess) {
                onSuccess(result);
            }
            this.apiCallEnd();
        }, (error: any) => {
            this.errors.push(new NgApiError(this.api, error.status, error));
            this.dataIsLoading = false;
            if (onError) {
                onError(error);
            }
            this.apiCallEnd();
        }, this.testData);
    }

    on(eventName: string, callback: (data?: any) => void) {
        if (!this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
    }

    private addOrUpdateToApi() {
        if (this.id) {
            if (!this.api.apiData[this.apiRoute]) {
                this.api.apiData[this.apiRoute] = [];
            }
            const existing = this.api.apiData[this.apiRoute].find((existingEntry: NgApiEntity) => existingEntry.id === this.id);
            if (!existing) {
                this.api.apiData[this.apiRoute].push(this);
            } else if (existing.setData) {
                existing.setData(this);
            }
            this.api.do('updated-entity', this);
        }
    }

    public do(eventName: string, data?: any) {
        if (this.callbacks[eventName]) {
            for (const callback of this.callbacks[eventName]) {
                callback(data);
            }
        }
    }

    public log(message?: any) {
        this.logs.push(new NgApiLog(this.api, message));
    }

    public error(errorMessage?: any) {
        this.errors.push(new NgApiError(this.api, errorMessage));
    }

    private destroy() {
        this.do('destroy', this);
    }

    private apiCallStart() {
        if (!this.api.apiRouteLoading[this.apiRoute]) {
            this.api.apiRouteLoading[this.apiRoute] = 1;
        } else {
            this.api.apiRouteLoading[this.apiRoute] = this.api.apiRouteLoading[this.apiRoute] + 1;
        }
        this.api.do('load-entity', this);
    }

    private apiCallEnd() {
        if (this.api.apiRouteLoading[this.apiRoute]) {
            this.api.apiRouteLoading[this.apiRoute] = this.api.apiRouteLoading[this.apiRoute] - 1;
        }
        if (this.api.apiData[this.apiRoute]) {
            this.api.apiData[this.apiRoute] = this.api.sortData(this.api.apiData[this.apiRoute], 'id', true);
        }
        this.api.do('loaded-entity', this);
    }


    loadApiData(id: number | number[], key: string, route: string, constructor: any, multiple = false) {
        if (multiple) {
            (this as any)[key] = this.api.apiData[route] ? this.api.apiData[route].filter((entry: any) => (id as number[]).find(existingId => existingId === id)) : [];
            if (!(this as any)[key]?.length && !this.dataLoading[route] && (id as number[]).length) {
                for (let _id of (id as number[])) {
                    this.api.get(route + '/' + id, (result) => {
                        const entry = new constructor(this.api).setData(result);
                        if (!this.api.apiData[route]) {
                            this.api.apiData[route] = [];
                        }
                        if (!(this as any)[key]) {
                            (this as any)[key] = []
                        }
                        (this as any)[key].push(entry);
                        if (!this.api.apiData[route].find((location: NgLocationEntity) => location.id === entry.id)) {
                            this.api.apiData[route].push(entry)
                        }
                    });
                }
            }
        } else if (id) {
            (this as any)[key] = this.api.apiData[route] ? this.api.apiData[route].find((entry: any) => entry.id === id) : undefined;
            if (!(this as any)[key] && !this.dataLoading[route]) {
                this.dataLoading[key] = true;
                this.api.get(route + '/' + id, (result) => {
                    (this as any)[key] = new constructor(this.api).setData(result);
                    if (!this.api.apiData[route]) {
                        this.api.apiData[route] = [];
                    }
                    if (!this.api.apiData[route].find((location: NgLocationEntity) => location.id === (this as any)[key]?.id)) {
                        this.api.apiData[route].push((this as any)[key])
                    }
                    this.dataLoading[key] = false;
                });
            }
        }
    }

}



