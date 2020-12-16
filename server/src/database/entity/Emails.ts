import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { Contacts } from "./Contacts";

@Entity()
export class Emails {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    email: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    @ManyToOne(() => Contacts, contact => contact.emails)
    contact: Contacts;

}
