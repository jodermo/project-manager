import {NgApiService} from '../ng.api.service';
import {NgApiAttributeEntity} from '../ng.api-attribute.entity';
import {NgFileEntity} from "./ng.file.entity";
import {NgLocationEntity} from "./ng.location.entity";
import {NgAddressEntity} from "./ng.address.entity";


export const NgCompanyTypes = [
    'company',
    'restaurant',
    'hospitality',
    'store',
    'kiosk',
    'info-center',
    'tourism-industry'
];
export type NgCompanyType = typeof NgCompanyTypes[number];

export class NgCompanyEntity extends NgApiAttributeEntity {

    name: string = '';

    type: NgCompanyType = 'company';

    logo?:  NgFileEntity;

    image?:  NgFileEntity;

    description: string = '';

    address?: NgAddressEntity;

    contact?: NgAddressEntity;

    location?: NgLocationEntity;

    projects?: any[];


    constructor(api: NgApiService, testData = false) {
        super('company', api, testData);
    }


}
