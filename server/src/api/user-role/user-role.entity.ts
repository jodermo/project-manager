import {Entity, Column} from 'typeorm';
import {ApiEntity} from "../api.entity";

@Entity()
export class UserRole extends ApiEntity {

    @Column({nullable: true, default: null, length: 60, unique: false})
    alias: string;

    @Column({nullable: true, default: null, length: 60, unique: false})
    name: string;

}
