import {Entity, Column, ManyToOne} from 'typeorm';
import {ApiEntity} from "../api.entity";
import {User} from "../user/user.entity";

@Entity('File')
export class File extends ApiEntity {

    @Column({nullable: true, default: null, length: 500})
    location: string;

    @Column({nullable: true, default: null, length: 500})
    bucket: string;

    @Column({nullable: true, default: null, length: 500})
    key: string;

    @ManyToOne(() => User)
    user: User;

    @Column({nullable: true, default: null, length: 500})
    type: string;

    @Column({nullable: true, default: null, length: 500})
    name: string;

    @Column({nullable: true, default: null, length: 500})
    filename: string;

    @Column({nullable: true, default: null, length: 500})
    originalname: string;

    @Column({nullable: true, default: null, length: 500})
    mimetype: string;

    @Column({nullable: true, default: null, length: 500})
    destination: string;

    @Column({nullable: true, default: null})
    path: string;

    @Column({nullable: true, default: null})
    size: number;

    @Column({nullable: true, default: null})
    created: number;

    @Column({nullable: true, default: null})
    thumbnail: string;
}
