import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';

export type NgLocationType = 'gastronomy';

export class NgLocationEntity extends NgApiEntity {

    name: string = '';
    type: NgLocationType = 'gastronomy';
    icon: string = '';
    image: string = '';
    description: string = '';

    latitude: number = 0;
    longitude: number = 0;

    constructor(api: NgApiService, testData = false) {
        super('location', api, testData);
    }

}
