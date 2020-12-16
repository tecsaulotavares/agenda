import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
    BeforeUpdate
} from "typeorm";
import { hashSync, genSaltSync } from "bcryptjs";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    @DeleteDateColumn()
    deletedOn: Date;

    @BeforeInsert()
    @BeforeUpdate()
    private cryptoPassword() {
        const salt = genSaltSync(10);
        if (this.password) {
            this.password = hashSync(this.password, salt);
        }
    }
}
