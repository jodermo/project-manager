import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Translation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

    @Column({nullable: true, default: null})
    languageId: number = 0;

    @Column({nullable: true, default: null, length: 500, unique: false})
    alias: string;

    @Column({type: 'text', nullable: true, default: null})
    text: any;

}

