import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';

export class NgUserGroupEntity extends NgApiEntity {

    name: string = '';
    roles: number[] = [];

    constructor(api: NgApiService) {
        super('user-group', api, true);
    }
}
