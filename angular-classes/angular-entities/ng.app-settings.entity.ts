import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';

export class NgAppSettingsEntity extends NgApiEntity {

    name: string = '';

    defaultLanguageId: number = 0;

    constructor(api: NgApiService, testData = false) {
        super('app-settings', api, testData);
    }

}
