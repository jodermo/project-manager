import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {File} from "../file/file.entity";
import {Address} from "../address/address.entity";

@Entity()
export class Location extends ApiEntity {

    @Column({nullable: true, default: 'default', length: 500, unique: false})
    type: string = 'default';

    @Column({nullable: true, default: null, length: 250, unique: false})
    name: string;

    @Column({type: 'text', nullable: true, default: null})
    description: any;

    @Column({type: 'numeric', nullable: true, default: 0})
    latitude: number = 0;

    @Column({type: 'numeric', nullable: true, default: 0})
    longitude: number = 0;

    @ManyToOne(() => File)
    image: File;

    @ManyToOne(() => File)
    markerImage: File;

    @ManyToOne(() => File)
    previewImage: File;

    @ManyToOne(() => File)
    file: File;

    @ManyToMany(() => File)
    images: File[];

    @ManyToMany(() => File)
    files: File[];

    @ManyToMany(() => Address)
    address: Address[];

}

