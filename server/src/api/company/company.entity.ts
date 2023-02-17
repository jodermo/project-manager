import {Entity, Column, ManyToOne, OneToMany} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {File} from "../file/file.entity";
import {Address} from "../address/address.entity";
import {Location} from "../location/location.entity";
import {Project} from "../project/project.entity";

@Entity()
export class Company extends ApiEntity {

    @Column({nullable: true, default: null, length: 500, unique: false})
    name: string;

    @Column({nullable: true, default: 'company', length: 500, unique: false})
    type: string = 'company';

    @ManyToOne(() => File)
    logo:  File;

    @ManyToOne(() => File)
    image:  File;

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @ManyToOne(() => Address)
    address: Address;

    @ManyToOne(() => Address)
    contact: Address;

    @ManyToOne(() => Location)
    location: Location;

    @OneToMany(() => Project,(project) => project.company)
    projects: Project[];
}
