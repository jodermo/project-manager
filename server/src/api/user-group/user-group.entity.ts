import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import {UserRole} from "../user-role/user-role.entity";

@Entity()
export class UserGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

    @Column({nullable: true, default: null, length: 50, unique: false})
    name: string;

    @ManyToMany(() => UserRole, (group) => group.id)
    userRoles: UserRole[];

}
