import { NgApiService } from '../ng.api.service';
import { NgApiAttributeEntity } from '../ng.api-attribute.entity';


export const NgTaskTypes = [
    'default'
]

export const NgSubTaskTypes = [
    'default'
]

export class NgTaskEntity extends NgApiAttributeEntity {
    type: string = 'default';

    title: string = '';

    description: string = '';

    details: string = '';

    image?:  number;
    file?:  number;

    images:  number[] = [];

    files:  number[] = [];

    startDate?: Date;

    endDate?: Date;

    questions: any[] = [];

    nextTask?: number;


    constructor(api: NgApiService, testData = false) {
        super('task', api, testData);
    }

}
