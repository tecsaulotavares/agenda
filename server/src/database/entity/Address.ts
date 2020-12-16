import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import { Contacts } from "./Contacts";

@Entity()
export class Address {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    address: string;

    @Column()
    number: string;

    @Column()
    complement: string;

    @Column()
    neighborhood: string;

    @Column()
    zipCode: string;

    @Column()
    city: string;

    @Column()
    uf: string;

    @Column()
    country: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    @ManyToOne(() => Contacts, contact => contact.address)
    contact: Contacts;

}
