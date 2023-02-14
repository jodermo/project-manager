import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';

export class NgTranslationEntity extends NgApiEntity {

    languageId: number = 0;
    textAlias?: string = '';
    textId?: number = 0;
    text: string = '';

    constructor(api: NgApiService, testData = false) {
        super('translation', api, testData);
    }

}
