import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany} from 'typeorm';
import {UserRole} from "../user-role/user-role.entity";
import {UserGroup} from "../user-group/user-group.entity";
import {ApiEntity} from "../api.entity";

@Entity()
export class User extends ApiEntity {

    @Column({nullable: true, default: null, length: 50, unique: true})
    username: string;

    @Column({nullable: true, default: null, length: 500})
    email: string;

    @Column({nullable: true, default: null, length: 100})
    password: string | undefined;

    @Column({nullable: true, default: null, length: 100})
    passwordHash: string | undefined;

    @ManyToMany(() => UserGroup)
    groups: UserGroup[];

    @ManyToMany(() => UserRole)
    roles: UserRole[];

}
