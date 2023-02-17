import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import {UserRole} from "../user-role/user-role.entity";
import {ApiEntity} from "../api.entity";

@Entity()
export class UserGroup extends ApiEntity {

    @Column({nullable: true, default: null, length: 50, unique: false})
    name: string;

    @ManyToMany(() => UserRole)
    userRoles: UserRole[];

}
