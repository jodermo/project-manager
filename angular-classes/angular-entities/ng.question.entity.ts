import { NgApiService } from '../ng.api.service';
import { NgApiAttributeEntity } from '../ng.api-attribute.entity';

export const NgQuestionTypes = [
    'default'
];

export type NgQuestionType = typeof NgQuestionTypes[number];

export class NgQuestionEntity extends NgApiAttributeEntity {

    type: NgQuestionType = 'default';

    task?: any;

    title: string = '';

    text: string = '';

    description: string = '';

    details: string = '';

    checked: boolean = true;

    answerText: string = '';

    note: string = '';

    images?:  any[];

    files?:  any[];

    answers?:  any[];

    hideIfQuestions?:  any[];

    hideIfQuestionsType: string = 'checked';

    showIfQuestions?:  any[];

    showIfQuestionsType: string = 'checked';


    constructor(api: NgApiService, testData = false) {
        super('question', api, testData);
    }

}
