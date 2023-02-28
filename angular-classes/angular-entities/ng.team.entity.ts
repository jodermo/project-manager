import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';

export const NgTeamTypes = [
    'default'
];

export type NgTeamType = typeof NgTeamTypes[number];

export class NgTeamEntity extends NgApiEntity {

    type: NgTeamType = 'default';

    name: string = '';

    description: string = '';

    details: string = '';

    image?:  any;

    files?:  any[];

    users?: any[];

    constructor(api: NgApiService) {
        super('team', api, true);
    }
}
