import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Contacts } from "./Contacts";

@Entity()
export class Phones {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    phone: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    @ManyToOne((type) => Contacts, contact => contact.phone)
    contact: Contacts;

}
