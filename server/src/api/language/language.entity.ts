import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

    @Column({nullable: true, default: null, length: 4, unique: true})
    iso: string;

    @Column({nullable: true, default: null, length: 20, unique: false})
    name: string;

}
