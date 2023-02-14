import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';

export class NgUserEntity extends NgApiEntity {

    username: string = '';
    email: string = '';
    groups: number[] = [];
    password?: string;

    coins: number = 0;
    rings: number = 0;
    eggs: number = 0;

    isLocal = false;

    constructor(api: NgApiService) {
        super('user', api, true);
        this.ignoreKeys(['password']);
    }
}
