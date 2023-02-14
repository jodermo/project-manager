import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poi {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

    @Column({nullable: true, default: null})
    poiTypeId: number = 0;

    @Column({nullable: true, default: null, length: 250, unique: false})
    name: string;

    @Column({type: 'text', nullable: true, default: null})
    description: any;

    @Column({type: 'numeric', nullable: true, default: 0})
    latitude: number = 0;

    @Column({type: 'numeric', nullable: true, default: 0})
    longitude: number = 0;

    @Column({nullable: true, default: null})
    imageId: number = 0;

    @Column({nullable: true, default: null})
    markerImageId: number = 0;

    @Column({nullable: true, default: null})
    locationPreviewImageId: number = 0;

    @Column({nullable: true, default: null})
    fileId: number = 0;

    @Column({type: 'text', nullable: true, default: '[]'})
    imageIds = '[]';

    @Column({type: 'text', nullable: true, default: '[]'})
    fileIds = '[]';

    @Column({type: 'text', nullable: true, default: '[]'})
    poiIds = '[]';

}

