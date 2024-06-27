import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export enum KycStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum DocumentType {
  PASSPORT = "passport",
  DRIVER_LICENSE = "driver_license",
  ID_CARD = "id_card",
}

@Entity("kycs")
export class Kyc {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.kyc)
  @JoinColumn()
  user: User;

  @Column({ type: "enum", enum: KycStatus, default: KycStatus.PENDING })
  status: KycStatus;

  @Column({ type: "enum", enum: DocumentType })
  documentType: DocumentType;

  @Column()
  documentNumber: string;

  @Column()
  issuedDate: Date;

  @Column()
  expiryDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
