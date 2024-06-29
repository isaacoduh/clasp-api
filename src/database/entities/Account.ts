import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  account_balance: number;

  @Column({ unique: true, length: 10 })
  account_number: string;

  @Column({ unique: true, length: 7 })
  account_id: string;

  @Column({ unique: true, length: 4 })
  pin_number: string;

  @Column({ unique: true, length: 10 })
  red_code: string;

  @Column({ length: 100, default: "in-active" })
  account_status: string;

  @CreateDateColumn()
  date: Date;

  @Column({ default: false })
  kyc_submitted: boolean;

  @Column({ default: false })
  kyc_confirmed: boolean;

  @Column({ length: 100, nullable: true, default: "Review" })
  review: string;
}
