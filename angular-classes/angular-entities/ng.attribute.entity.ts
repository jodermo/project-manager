import {NgApiEntity} from '../ng.api.entity';
import {NgApiService} from '../ng.api.service';

export const NgApiRoutes = [
    undefined,
    'user',
    'company',
    'quest',
    'quiz',
    'special-event',
    'advertisement'
]

export type NgApiRoute = typeof NgApiRoutes[number];


export const NgAttributeTypes = [
    'default',
    'text',
    'hyperlink',
    'icon',
    'icon-text',
    'icon-hyperlink',
    'date',
    'date-from-to',
    'number',
    'integer',
    'price',
    'html',
    'file',
    'image'
];

export type NgAttributeType = typeof NgAttributeTypes[number];

export class NgAttributeEntity extends NgApiEntity {

    active: boolean = true;

    route: string = '';

    type = 'default';

    key: string = '';

    defaultValue: string = '';

    value: string = '';

    valueA: string = '';

    valueB: string = '';

    valueC: string = '';

    valueD: string = '';

    min?: number = undefined;

    max?: number = undefined;

    step?: number = undefined;

    icon: string = '';

    image: number = 0;

    file: number = 0;

    parentKey: string = '';

    parentId: number = 0;

    valueIsJson: boolean = false;

    private jsonChecked = false;

    constructor(api: NgApiService, valueIsJson = false, testData = false) {
        super('attribute', api, testData);
        this.valueIsJson = valueIsJson;
        this.ignoreKeys(['formData']);
    }

    data() {
        this.checkJsonKey();
        return super.data();
    }


    getData(onSuccess?: (result?: any) => void, onError?: (error?: any) => void) {
        this.checkJsonKey();
        super.getData(onSuccess, onError);
    }

    setData(newData: any, appendToApi = false): this {
        this.checkJsonKey();
        return super.setData(newData, appendToApi);
    }

    private checkJsonKey() {
        if (this.valueIsJson && this.key && !this.jsonChecked) {
            if (!this.jsonKeys) {
                this.jsonKeys = [];
            }
            this.jsonKeys.push(this.key);
            this.jsonChecked = true;
        }
    }

    formData() {
        const formData = {
            title: 'Attribute',
            iconTitle: 'Icon',
            keyTitle: this.type === 'icon' || this.type === 'icon-text' ? 'Text' : 'Name',
            valueTitle: this.type === 'icon' || this.type === 'icon-text' ? 'Description' : 'Value',
        };
        return formData;
    }

}
