import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {File} from "../file/file.entity";

@Entity()
export class Attribute extends ApiEntity {


    @Column({nullable: true, length: 250, unique: false})
    route: string;

    @Column({nullable: true, length: 250, unique: false, default: 'default'})
    type: string;

    @Column({nullable: true, default: null, length: 60, unique: false})
    key: string;

    @Column({type: 'text', nullable: true, default: null})
    defaultValue: string;

    @Column({type: 'text', nullable: true, default: null})
    value: string;

    @Column({type: 'text', nullable: true, default: null})
    valueA: string;

    @Column({type: 'text', nullable: true, default: null})
    valueB: string;

    @Column({type: 'text', nullable: true, default: null})
    valueC: string;

    @Column({type: 'text', nullable: true, default: null})
    valueD: string;

    @Column({nullable: true, default: null})
    min?: number = undefined;

    @Column({nullable: true, default: null})
    max?: number = undefined;

    @Column({nullable: true, default: null})
    step?: number = undefined;

    @Column({nullable: true, default: null, length: 60, unique: false})
    icon: string;

    @ManyToOne(() => File)
    image:  File;

    @ManyToOne(() => File)
    file:  File;

    @Column({nullable: true, default: null, length: 60, unique: false})
    parentKey: string;

    @Column({nullable: true, default: null})
    parentId: number = 0;

    @Column({nullable: true, default: false})
    valueIsJson: boolean = false;


}
