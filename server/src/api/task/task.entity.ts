import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

    @Column({nullable: true, default: null})
    parentId: number = 0;

    @Column({nullable: false, default: 'location', length: 20, unique: false})
    type: string = 'location';

    @Column({nullable: true, default: null, length: 500, unique: false})
    title: string;

    @Column({type: 'text', nullable: true, default: null})
    description: string;

    @Column({type: 'text', nullable: true, default: null})
    details: string;

    @Column({nullable: true, default: null})
    companyId: number = 0;

    @Column({nullable: true, default: null})
    arModelId: number = 0;

    @Column({nullable: false, default: 'static', length: 20, unique: false})
    arModelType: string = 'static';

    @Column({nullable: true, default: null})
    arModelMarkerPatternId: number = 0;

    @Column({nullable: true, default: null})
    arModelMarkerImageId: number = 0;

    @Column({type: 'numeric', nullable: false, default: 0})
    arModelDistance: number = 0;

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
    poiIds = '[]';

}

