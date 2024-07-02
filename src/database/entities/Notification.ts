import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

export enum NotificationType {
  NONE = "None",
  TRANSFER = "Transfer",
  CREDIT_ALERT = "Credit Alert",
  DEBIT_ALERT = "Debit Alert",
  SENT_PAYMENT_REQUEST = "Sent Payment Request",
  RECEIVED_PAYMENT_REQUEST = "Received Payment Request",
  FUNDED_CREDIT_CARD = "Funded Credit Card",
  WITHDREW_CREDIT_CARD_FUNDS = "Withdrew Credit Card Funds",
  DELETED_CREDIT_CARD = "Deleted Credit Card",
  ADDED_CREDIT_CARD = "Added Credit Card",
}

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { onDelete: "SET NULL", nullable: true })
  user: User;

  @Column({
    type: "enum",
    enum: NotificationType,
    default: NotificationType.NONE,
  })
  notification_type: NotificationType;

  @Column({ type: "decimal", default: 0.0 })
  amount: number;

  @Column({ type: "boolean", default: false })
  is_read: boolean;

  @CreateDateColumn()
  date: Date;

  @Column({ unique: true, length: 25 })
  nid: string;
}
