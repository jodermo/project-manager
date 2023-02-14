import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';

export class NgLanguageEntity extends NgApiEntity {

    iso: string = '';
    name: string = '';

    constructor(api: NgApiService, testData = false) {
        super('language', api, testData);
    }

}
