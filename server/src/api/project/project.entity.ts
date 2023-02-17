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
import {Team} from "../team/team.entity";
import {ProjectTemplate} from "../project-template/project-template.entity";

@Entity()
export class Project extends ApiEntity {

    @Column({nullable: false, default: 'default', length: 20, unique: false})
    type: string = 'default';

    @Column({nullable: true, default: null, length: 500, unique: false})
    title: string;

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @Column({type: 'text', nullable: true, default: null})
    details: string;

    @ManyToOne(() => Company, (company) => company.projects)
    company: Company;

    @ManyToMany(() => File)
    images:  File[];

    @ManyToMany(() => File)
    files:  File[];

    @Column({type: 'timestamptz'})
    startDate: Date;

    @Column({type: 'timestamptz'})
    endDate: Date;

    @ManyToMany(() => Team)
    teams: Team[];

    @ManyToOne(() => ProjectTemplate)
    template: ProjectTemplate;

}

