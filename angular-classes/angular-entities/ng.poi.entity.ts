import {NgApiService} from '../ng.api.service';
import {NgApiAttributeEntity} from '../ng.api-attribute.entity';

export class NgPoiEntity extends NgApiAttributeEntity {

    poiTypeId: number = 0;
    name: string = '';
    description: string = '';
    latitude: number = 0;
    longitude: number = 0;
    imageId: number = 0;
    markerImageId: number = 0;
    locationPreviewImageId: number = 0;
    fileId: number = 0;
    imageIds: any = [];
    fileIds: any = [];
    poiIds: any = [];


    jsonKeys = [
        'imageIds',
        'fileIds',
        'poiIds'
    ];

    constructor(api: NgApiService, testData = false) {
        super('poi', api, testData);
    }

}
