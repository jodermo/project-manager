import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Memo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

    @Column({nullable: true, default: null})
    parentId: number = 0;

    @Column({nullable: true, default: null, length: 250, unique: false})
    title: string;

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @Column({nullable: true, default: null})
    companyId: number = 0;

    @Column({nullable: true, default: null})
    arModelId: number = 0;

    @Column({nullable: true, default: null})
    poiId: number = 0;

    @Column({nullable: true, default: null})
    imageId: number = 0;

    @Column({nullable: true, default: null})
    fileId: number = 0;

    @Column({type: 'text', nullable: true, default: '[]'})
    imageIds = '[]';

    @Column({type: 'text', nullable: true, default: '[]'})
    fileIds = '[]';

    @Column({type: 'text', nullable: true, default: '[]'})
    taskIds = '[]';

    @Column({type: 'text', nullable: true, default: '[]'})
    poiIds = '[]';

}

