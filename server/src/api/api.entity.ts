import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, DeleteDateColumn
} from 'typeorm';

@Entity()
export class ApiEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at'})
    deletedAt: Date;

    @Column({nullable: true, default: true})
    active: boolean = true;
}

