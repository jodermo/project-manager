import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

    @Column({nullable: true, default: null, length: 60, unique: false})
    alias: string;

    @Column({nullable: true, default: null, length: 60, unique: false})
    name: string;

}
