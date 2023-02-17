import {
    Entity,
    Column,
    ManyToMany,
    ManyToOne
} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {File} from "../file/file.entity";
import {Question} from "../question/question.entity";

@Entity()
export class Task extends ApiEntity {

    @Column({nullable: false, default: 'default', length: 20, unique: false})
    type: string = 'default';

    @Column({nullable: true, default: null, length: 500, unique: false})
    title: string;

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @Column({type: 'text', nullable: true, default: null})
    details: string;

    @ManyToMany(() => File)
    images:  File[];

    @ManyToMany(() => File)
    files:  File[];

    @Column({type: 'timestamptz'})
    startDate: Date;

    @Column({type: 'timestamptz'})
    endDate: Date;

    @ManyToMany(() => Question, (question) => question.task)
    questions: Question[];

    @ManyToOne(() => Task, (task) => task.id)
    nextTask: Task;
}

