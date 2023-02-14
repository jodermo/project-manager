import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';

export class NgUserRoleEntity extends NgApiEntity {

    alias: string = '';
    name: string = '';

    constructor(api: NgApiService) {
        super('user-role', api, true);
    }
}
