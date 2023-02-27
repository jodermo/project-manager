import {
    Entity,
    Column,
    ManyToMany,
    ManyToOne
} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {File} from "../file/file.entity";
import { Task } from '../task/task.entity';

@Entity()
export class ProjectTemplate extends ApiEntity {

    @Column({nullable: false, default: 'default', length: 20, unique: false})
    type: string = 'default';

    @Column({nullable: true, default: null, length: 500, unique: false})
    title: string;

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @Column({type: 'text', nullable: true, default: null})
    details: string;

    @ManyToOne(() => File)
    image:  File[];

    @ManyToMany(() => Task)
    tasks: Task[];

}

