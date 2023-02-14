import { NgApiService } from '../ng.api.service';
import { NgApiAttributeEntity } from '../ng.api-attribute.entity';

export class NgMemoEntity extends NgApiAttributeEntity {

    parentId: number = 0;
    title: string = '';
    description: string = '';
    companyId: number = 0;
    arModelId: number = 0;
    poiId: number = 0;
    imageId: number = 0;
    fileId: number = 0;
    imageIds: any = [];
    fileIds: any = [];
    taskIds: any = [];
    poiIds: any = [];

    jsonKeys = [
        'imageIds',
        'fileIds',
        'poiIds',
        'taskIds'
    ];

    constructor(api: NgApiService, testData = false) {
        super('memo', api, testData);
    }

}
