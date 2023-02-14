import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

    @Column({nullable: true, default: null, length: 500, unique: false})
    name: string;

    @Column({nullable: true, default: 'company', length: 500, unique: false})
    type: string = 'company';

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    email: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    tel: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    fax: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    website: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    street: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    streetNumber: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    postcode: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    city: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    country: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    state: string;

    @Column({type: 'text', nullable: true, default: null})
    additionalInfo: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    contactFirstName: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    contactLastName: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    contactEmail: string;

    @Column({nullable: true, default: null})
    userId: number = 0;

    @Column({nullable: true, default: null})
    poiId: number = 0;

    @Column({nullable: true, default: null})
    imageId: number = 0;

    @Column({nullable: true, default: null})
    locationImageId: number = 0;

    @Column({type: 'text', nullable: true, default: '[]'})
    imageIds = '[]';

    @Column({type: 'text', nullable: true, default: '[]'})
    fileIds = '[]';

}
