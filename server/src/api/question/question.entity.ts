import {
    Entity,
    Column,
    ManyToMany,
    ManyToOne
} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {File} from "../file/file.entity";
import { Task } from '../task/task.entity';
import {Answer} from "../answer/answer.entity";

@Entity()
export class Question extends ApiEntity {

    @Column({nullable: false, default: 'default', length: 20, unique: false})
    type: string = 'default';

    @ManyToOne(() => Task, (task) => task.questions)
    task: Task;

    @Column({nullable: true, default: null, length: 500, unique: false})
    title: string;

    @Column({type: 'text', nullable: true, default: null})
    text: string;

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @Column({type: 'text', nullable: true, default: null})
    details: string;

    @Column({nullable: true, default: true})
    checked: boolean = true;

    @Column({type: 'text', nullable: true, default: null})
    answerText: string;

    @Column({type: 'text', nullable: true, default: null})
    note: string;

    @ManyToMany(() => File)
    images:  File[];

    @ManyToMany(() => File)
    files:  File[];

    @ManyToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];

    @ManyToMany(() => Question)
    hideIfQuestions: Question[];

    @Column({nullable: false, default: 'checked', length: 20, unique: false})
    hideIfQuestionsType: string = 'checked';

    @ManyToMany(() => Question)
    showIfQuestions: Question[];

    @Column({nullable: false, default: 'checked', length: 20, unique: false})
    showIfQuestionsType: string = 'checked';

}

