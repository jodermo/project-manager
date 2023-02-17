import {
    Entity,
    Column,
    ManyToOne
} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {File} from "../file/file.entity";

@Entity()
export class Address extends ApiEntity {

    @Column({nullable: false, default: 'default', length: 20, unique: false})
    type: string = 'default';

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @ManyToOne(() => File)
    image:  File;

    @Column({nullable: true, default: null, length: 500, unique: false})
    title: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    firstName: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    lastName: string;

    @Column({type: 'timestamptz'})
    birthday: Date;

    @Column({nullable: true, default: null, length: 500, unique: false})
    email: string;

    @Column({nullable: true, default: null, length: 500, unique: false})
    phone: string;

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


}

