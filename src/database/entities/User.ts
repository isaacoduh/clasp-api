import { hash } from "bcrypt";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Account } from "./Account";
import { Kyc } from "./KYC";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Kyc, (kyc) => kyc.user, { cascade: true })
  kyc: Kyc;

  @OneToMany(() => Account, (account) => account.user, { cascade: true })
  accounts: Account[];
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toResponse(): Partial<User> {
    const responseUser = new User();
    responseUser.id = this.id;
    responseUser.username = this.username;
    responseUser.email = this.email;
    responseUser.createdAt = this.createdAt;
    responseUser.updatedAt = this.updatedAt;
    responseUser.kyc = this.kyc;
    return responseUser;
  }
}
