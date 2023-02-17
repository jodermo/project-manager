import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {Language} from "../language/language.entity";

@Entity()
export class Translation extends ApiEntity {

    @ManyToOne(() => Language)
    language:  Language;

    @Column({nullable: true, default: null, length: 500, unique: false})
    alias: string;

    @Column({type: 'text', nullable: true, default: null})
    text: any;

}

