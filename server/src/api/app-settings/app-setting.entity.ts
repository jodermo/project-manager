import {Entity, Column, ManyToOne} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {Language} from "../language/language.entity";

@Entity()
export class AppSetting extends ApiEntity {

    @Column({nullable: true, default: null, length: 500, unique: false})
    name: string;

    @ManyToOne(() => Language)
    defaultLanguage: Language;

}
