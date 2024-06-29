import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Account } from "./Account";
import { User } from "./User";

export enum TransactionType {
  TRANSFER = "transfer",
  RECEIVED = "received",
  WITHDRAW = "withdraw",
  REFUND = "refund",
  REQUEST = "payment_request",
  NONE = "none",
}

export enum TransactionStatus {
  FAILED = "failed",
  COMPLETED = "completed",
  PENDING = "pending",
  PROCESSING = "processing",
  REQUEST_SENT = "request_sent",
  REQUEST_SETTLED = "request_settled",
  REQUEST_PROCESSING = "request_processing",
}

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.transactions, { nullable: true })
  user: User;

  @Column("decimal", { precision: 12, scale: 2, default: 0.0 })
  amount: number;

  @Column({ type: "varchar", length: 1000, nullable: true })
  description: string;

  @ManyToOne(() => User, { nullable: true })
  receiver: User;

  @ManyToOne(() => User, { nullable: true })
  sender: User;

  @ManyToOne(() => Account, { nullable: true })
  receiverAccount: Account;

  @ManyToOne(() => Account, { nullable: true })
  senderAccount: Account;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({
    type: "enum",
    enum: TransactionType,
    default: TransactionType.NONE,
  })
  transactionType: TransactionType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
