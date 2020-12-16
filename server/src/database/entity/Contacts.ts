import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Phones } from "./Phones";
import { Emails } from "./Emails";
import { Address } from "./Address";


@Entity()
export class Contacts {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany((type) => Phones, phone => phone.contact)
    phone: Phones[]

    @OneToMany((type) => Emails, email => email.contact)
    emails: Emails[]

    @OneToMany((type) => Address, address => address.contact)
    address: Address[]

}
