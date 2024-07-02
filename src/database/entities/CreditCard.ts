import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Account } from "./Account";

export enum CardType {
  MASTER = "master",
  VISA = "visa",
  VERVE = "verve",
}

@Entity("credit_cards")
export class CreditCard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @Column({ unique: true, length: 20 })
  card_id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "bigint" })
  number: number;

  @Column({ type: "smallint" })
  month: number;

  @Column({ type: "smallint" })
  year: number;

  @Column({ type: "smallint" })
  cvv: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0.0 })
  amount: number;

  @Column({ type: "enum", enum: CardType, default: CardType.MASTER })
  card_type: CardType;

  @Column({ type: "boolean", default: true })
  card_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  account: Account;
}
