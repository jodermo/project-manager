import { NgApiService } from './ng.api.service';
import { NgApiEntity } from './ng.api.entity';
import { NgAttributeEntity } from './angular-entities/ng.attribute.entity';


export class NgApiAttributeEntity extends NgApiEntity {

    public apiAttributes: any[] = []

    constructor(apiRoute: string, api: NgApiService, testData = false) {
        super(apiRoute, api, testData);
    }

    setData(newData: any): this {
        if(newData){
            super.setData(newData);
        }
        return this;
    }


    public getAttributes(onDone?: (attributes?: NgAttributeEntity[]) => void) {
        if (this.id) {
            this.api.get('attribute/' + this.apiRoute + '/' + this.id, (result: any) => {
                if (result?.length) {
                    this.apiAttributes = [];
                    for (let attribute of result) {
                        attribute = new NgAttributeEntity(this.api).setData(attribute, false);
                        this.apiAttributes.push(attribute);
                    }
                }
                if (onDone) {
                    onDone(this.apiAttributes);
                }
            }, () => {
                if (onDone) {
                    onDone(this.apiAttributes);
                }
            });
        } else {
            if (onDone) {
                onDone(undefined);
            }
        }
    }

    public deleteAttribute(id: number) {
        this.api.delete('attribute', id, () => {
            if (this.apiAttributes?.length) {
                for (let i = 0; i < this.apiAttributes.length; i++) {
                    if (this.apiAttributes[i].id === id) {
                        this.apiAttributes.splice(i, 1);
                        return;
                    }
                }
            }
        });
    }

    public addAttribute(key: string, value: any, asJsonDate = false, onDone?: (attribute?: any) => void) {
        const newAttribute = new NgAttributeEntity(this.api);
        newAttribute.route = this.apiRoute;
        newAttribute.key = key;
        newAttribute.value = key;
        newAttribute.valueIsJson = asJsonDate;
        newAttribute.add((result: any) => {
            newAttribute.setData(result);
            if (!this.apiAttributes) {
                this.apiAttributes = [];
            }
            this.apiAttributes.push(newAttribute);
            if (onDone) {
                onDone(newAttribute);
            }
        }, () => {
            if (onDone) {
                onDone(undefined);
            }
        });
    }
}
