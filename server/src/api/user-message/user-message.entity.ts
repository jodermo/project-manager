import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {User} from "../user/user.entity";
import {File} from "../file/file.entity";

@Entity()
export class UserMessage extends ApiEntity {

    @Column({nullable: false, default: 'default', length: 20, unique: false})
    type: string = 'default';

    @Column({nullable: true, default: null, length: 500, unique: false})
    subject: string;

    @Column({nullable: true, default: null, length: 50, unique: false})
    subjectData: string;

    @Column({nullable: true, default: null})
    subjectDataId: number = 0;

    @Column({type: 'text', nullable: true, default: null})
    text: string;

    @ManyToMany(() => File)
    images:  File[];

    @ManyToMany(() => File)
    files:  File[];

    @ManyToOne(() => User)
    sender: User;

    @Column({nullable: true, default: null, length: 500})
    senderEmail: string;

    @ManyToOne(() => User)
    receiver: User;

    @Column({nullable: true, default: null, length: 500})
    receiverEmail: string;

    @Column({type: 'timestamptz'})
    readDate: Date;

}
