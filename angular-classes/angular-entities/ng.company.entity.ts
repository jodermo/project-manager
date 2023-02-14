import {NgApiService} from '../ng.api.service';
import {NgApiAttributeEntity} from '../ng.api-attribute.entity';
import {NgPoiEntity} from "./ng.poi.entity";
import {NgFileEntity} from "./ng.file.entity";
import {NgUserEntity} from "./ng.user.entity";


export const NgCompanyTypes = [
    'company',
    'restaurant',
    'hospitality',
    'store',
    'kiosk',
    'info-center',
    'tourism-industry'
];
export type NgCompanyType = typeof NgCompanyTypes[number];

export class NgCompanyEntity extends NgApiAttributeEntity {

    name: string = '';
    type: NgCompanyType = 'company';
    description: string = '';
    email: string = '';
    tel: string = '';
    fax: string = '';
    website: string = '';
    street: string = '';
    streetNumber: string = '';
    postcode: string = '';
    city: string = '';
    country: string = '';
    state: string = '';
    additionalInfo: string = '';
    contactFirstName: string = '';
    contactLastName: string = '';
    contactEmail: string = '';
    userId: number = 0;
    poiId: number = 0;
    imageId: number = 0;
    locationImageId: number = 0;
    imageIds: number[] = [];
    fileIds: number[] = [];

    jsonKeys = [
        'imageIds',
        'fileIds'
    ];


    poi?: NgPoiEntity;
    image?: NgFileEntity;
    locationImage?: NgFileEntity;
    images?: NgFileEntity[];
    files?: NgFileEntity[];
    user?: NgUserEntity[];


    constructor(api: NgApiService, testData = false) {
        super('company', api, testData);
        this.ignoreKeys([
            'mainCompanyAttributes',
            'secondaryCompanyAttributes',
            'poi',
            'image',
            'locationImage',
            'file',
            'files',
            'user',
            'image',
            'images',
            'dataLoading'
        ]);
    }

    setData(newData: any) {
        if (newData) {
            super.setData(newData);
        }
        this.loadData();
        return this;
    }

    loadData(fromDatabase = false) {

        if (this.poiId) {
            this.loadApiData(this.poiId, 'poi', 'poi', NgPoiEntity);
        }


        if (this.imageId) {
            this.loadApiData(this.imageId, 'image', 'file', NgFileEntity);
        }

        if (this.imageIds) {
            this.loadApiData(this.imageIds, 'images', 'file', NgFileEntity, true);
        }

        if (this.locationImageId) {
            this.loadApiData(this.locationImageId, 'locationImage', 'file', NgFileEntity);
        }

        if (this.fileIds) {
            this.loadApiData(this.fileIds, 'files', 'file', NgFileEntity, true);
        }

        if (this.userId) {
            this.loadApiData(this.userId, 'user', 'user', NgUserEntity);
        }

        console.log('loadData', this.apiRoute, this.id,  this);

    }

    update(onSuccess?: (result?: any) => void, onError?: (error?: any) => void) {
        super.update((result?: any) => {
            this.loadData(true);
            if (onSuccess) {
                onSuccess(result)
            }
        }, onError);
    }

}
