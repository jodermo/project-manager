/**
 *    TATOR - Nest App
 *    © 2020
 *    Author: Moritz Petzka
 *    Website: https://petzka.com
 *    Email: info@petzka.com
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: true})
    active: boolean = true;

    @Column({nullable: true, default: null, length: 60})
    email: string;

    @Column({nullable: true, default: null, length: 255})
    subject: string;

    @Column({nullable: true, default: null})
    message: string;

    @Column({nullable: true, default: null})
    text: string;

    @Column({nullable: true, default: null})
    html: string;

    @Column({nullable: true, default: null})
    template: string;

    @Column({nullable: true, default: null})
    context: string;

}
