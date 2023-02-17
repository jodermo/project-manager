import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';
import {NgUserRoleEntity} from "./ng.user-role.entity";
import {NgUserGroupEntity} from "./ng.user-group.entity";

export class NgUserEntity extends NgApiEntity {

    username: string = '';
    email: string = '';
    password?: string;

    groups: NgUserGroupEntity[] =[];
    roles: NgUserRoleEntity[] = [];
    isLocal = false;

    constructor(api: NgApiService) {
        super('user', api, true);
        this.ignoreKeys(['password']);
    }
}
