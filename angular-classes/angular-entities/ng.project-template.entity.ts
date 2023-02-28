import {NgApiService} from '../ng.api.service';
import {NgApiAttributeEntity} from '../ng.api-attribute.entity';

export const NgProjectTemplateTypes = [
    'default',
];
export type NgProjectTemplateType = typeof NgProjectTemplateTypes[number];

export class NgProjectTemplateEntity extends NgApiAttributeEntity {

    type: NgProjectTemplateType = 'default';

    title: string = '';

    description: string = '';

    details: string = '';

    image?:  any;

    images?:  any[];

    tasks?: any[];


    constructor(api: NgApiService, testData = false) {
        super('project-template', api, testData);
    }


}
