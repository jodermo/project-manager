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
export class Answer extends ApiEntity {

    @Column({nullable: false, default: 'default', length: 20, unique: false})
    type: string = 'default';

    @ManyToOne(() => Question, (question) => question.answers)
    question:  Question;

    @Column({type: 'text', nullable: true, default: null})
    text: string;

    @Column({type: 'text', nullable: true, default: null})
    note: string;

    @Column({nullable: true, default: true})
    checked: boolean = true;

    @Column({type: 'datetime'})
    date: Date;

    @ManyToMany(() => File, (file) => file.id)
    images:  File[];

    @ManyToMany(() => File, (file) => file.id)
    files:  File[];

    @ManyToMany(() => File, (file) => file.id)
    answerImages:  File[];

    @ManyToMany(() => File, (file) => file.id)
    answerFiles:  File[];

}

