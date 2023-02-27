import {NgApiService} from '../ng.api.service';
import {NgApiAttributeEntity} from '../ng.api-attribute.entity';

export class NgLocationEntity extends NgApiAttributeEntity {

    poiType: number = 0;
    name: string = '';
    description: string = '';
    latitude: number = 0;
    longitude: number = 0;
    image: number = 0;
    markerImage: number = 0;
    locationPreviewImage: number = 0;
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
        super('location', api, testData);
    }

}
