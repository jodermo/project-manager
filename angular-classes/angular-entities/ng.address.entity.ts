import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';

export class NgAddressEntity extends NgApiEntity {
    type: string = '';
    addressType: string = '';
    userId: number = 0;
    companyId: number = 0;
    name: string = '';
    companyName: string = '';
    salutation: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    website: string = '';
    phone: string = '';
    street: string = '';
    streetAdditional: string = '';
    streetNumber: string = '';
    postcode: string = '';
    city: string = '';
    country: string = '';
    state: string = '';
    latitude: number = 0;
    longitude: number = 0;
    title: string = '';
    gender: string = '';

    constructor(api: NgApiService, testData = false) {
        super('address', api, testData);
    }

}
