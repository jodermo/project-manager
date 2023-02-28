import { NgApiEntity } from '../ng.api.entity';
import { NgApiService } from '../ng.api.service';

export const NgUserMessageTypes = [
    'default'
];

export type NgUserMessageType = typeof NgUserMessageTypes[number];

export class NgUserMessageEntity extends NgApiEntity {

    type: NgUserMessageType = 'default';

    subject: string = '';

    subjectData: string = '';

    subjectDataId: number = 0;

    text: string = '';

    images?:  any[];

    files?:  any[];

    sender?: any;

    senderEmail: string = '';

    receiver?: any;

    receiverEmail: string = '';

    readDate?: any;

    constructor(api: NgApiService) {
        super('user-message', api, true);
    }
}
