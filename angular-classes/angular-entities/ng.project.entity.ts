import {NgApiService} from '../ng.api.service';
import {NgApiAttributeEntity} from '../ng.api-attribute.entity';

export const NgProjectTypes = [
    'default',
];
export type NgProjectType = typeof NgProjectTypes[number];

export class NgProjectEntity extends NgApiAttributeEntity {

    type: NgProjectType = 'default';

    title: string = '';

    description: string = '';

    primaryColor: string = '#ff0000';

    secondaryColor: string = '#FAE3E3';

    secondaryTextColor: string = '#000000';

    allDay: boolean = true;

    details: string = '';

    company?: number;

    images?: any[];

    files?: any[];

    startDate: Date = new Date();

    endDate?: Date | number;

    teams?: any[];

    template?: number;


    constructor(api: NgApiService, testData = false) {
        super('project', api, testData);
    }


}
