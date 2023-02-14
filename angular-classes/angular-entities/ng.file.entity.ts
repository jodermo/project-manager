import { NgApiService } from '../ng.api.service';
import { NgApiAttributeEntity } from '../ng.api-attribute.entity';


export class NgFileEntity extends NgApiAttributeEntity {


    location: string = '';

  
    bucket: string = '';


    key: string = '';


    userId: number = 0;


    type: string = '';

    name: string = '';

 
    filename: string = '';

  
    originalname: string = '';


    mimetype: string = '';


    destination: string = '';


    path: string = '';

   
    size: number = 0;

    created: number = Date.now();

    thumbnail: string = '';



    constructor(api: NgApiService, testData = false) {
        super('file', api, testData);
    }

}
