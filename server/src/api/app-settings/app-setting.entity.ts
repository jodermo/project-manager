import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppSetting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

    @Column({nullable: true, default: null, length: 500, unique: false})
    name: string;

    @Column({nullable: true, default: null})
    defaultLanguageId: number = 0;

}
