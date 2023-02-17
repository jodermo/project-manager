import {
    Entity,
    Column,
    ManyToMany,
    ManyToOne
} from 'typeorm';
import {UserRole} from "../user-role/user-role.entity";
import {ApiEntity} from "../api.entity";
import {File} from "../file/file.entity";
import {Company} from "../company/company.entity";
import { Task } from '../task/task.entity';
import {User} from "../user/user.entity";

@Entity()
export class Team extends ApiEntity {

    @Column({nullable: false, default: 'default', length: 20, unique: false})
    type: string = 'default';

    @Column({nullable: true, default: null, length: 500, unique: false})
    name: string;

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @Column({type: 'text', nullable: true, default: null})
    details: string;

    @ManyToOne(() => File, (file) => file.id)
    image:  File;

    @ManyToMany(() => File, (file) => file.id)
    files:  File[];

    @ManyToMany(() => User, (user) => user.id)
    users: User[];

}

