import { NgApiService } from '../ng.api.service';
import { NgApiAttributeEntity } from '../ng.api-attribute.entity';



export const NgTaskTypes = [
    'location',
    'company',
    'quest',
    'ar-model',
    'quiz',
    'mini-game',
    'special-event',
    'advertisement'
]

export const NgMainTaskTypes = [
    'location',
    'company',
    'quest',
    'ar-model',
]

export const NgSubTaskTypes = NgTaskTypes;

export type NgTaskType = typeof NgTaskTypes[number];
export type NgMainTaskType = typeof NgMainTaskTypes[number];
export type NgSubTaskType = typeof NgSubTaskTypes[number];

export const NgTaskArModelTypes = [
    'static',
    'location',
    'marker'
]

export type NgTaskArModelType = typeof NgTaskArModelTypes[number];

export class NgTaskEntity extends NgApiAttributeEntity {
    active: boolean = true;
    parentId: number = 0;
    type: NgTaskType = 'location';
    title: string = '';
    description: string = '';
    details: string = '';
    companyId: number = 0;
    poiId: number = 0;
    arModelId: number = 0;
    arModelType: NgTaskArModelType = 'static';
    arModelMarkerPatternId: number = 0;
    arModelMarkerImageId: number = 0;
    arModelDistance: number = 0;
    imageId: number = 0;
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
        super('task', api, testData);
    }

    hasPoi(){
        return this.type === 'location'
            || this.type === 'ar-model'
            || this.type === 'company';
    }

}
