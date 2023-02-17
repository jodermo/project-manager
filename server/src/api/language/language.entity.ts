import { Entity, Column } from 'typeorm';
import {ApiEntity} from "../api.entity";

@Entity()
export class Language extends ApiEntity {

    @Column({nullable: true, default: null, length: 4, unique: true})
    iso: string;

    @Column({nullable: true, default: null, length: 20, unique: false})
    name: string;

}
