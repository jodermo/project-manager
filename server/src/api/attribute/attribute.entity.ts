import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

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

    @Column({nullable: true, default: null})
    imageId: number = 0;

    @Column({nullable: true, default: null})
    fileId: number = 0;

    @Column({nullable: true, default: null, length: 60, unique: false})
    parentKey: string;

    @Column({nullable: true, default: null})
    parentId: number = 0;

    @Column({nullable: true, default: false})
    valueIsJson: boolean = false;


}
