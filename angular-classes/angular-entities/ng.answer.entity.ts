import { NgApiService } from '../ng.api.service';
import { NgApiAttributeEntity } from '../ng.api-attribute.entity';

export const NgAnswerTypes = [
    'default'
]

export type NgAnswerType = typeof NgAnswerTypes[number];

export class NgAnswerEntity extends NgApiAttributeEntity {

    type: NgAnswerType = 'default';

    question?:  any;

    text: string = '';

    note: string = '';

    checked: boolean = true;

    date?: Date = new Date();

    images?:  any[];

    files?:  any[];

    answerImages?:  any[];

    answerFiles?:  any[];


    constructor(api: NgApiService, testData = false) {
        super('answer', api, testData);
    }

}
