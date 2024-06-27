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

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum MaritalStatus {
  MARRIED = "married",
  SINGLE = "single",
  DIVORCED = "divorced",
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

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: "enum", enum: Gender })
  gender: string;

  @Column()
  image: string;

  @Column({ type: "enum", enum: MaritalStatus })
  marital_status: string;

  @Column()
  date_of_birth: string;

  @Column()
  signature: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  isKycCompleted(): boolean {
    return (
      this.status === KycStatus.APPROVED &&
      this.documentType !== undefined &&
      this.documentNumber !== undefined &&
      this.issuedDate !== undefined &&
      this.expiryDate !== undefined &&
      this.firstname !== undefined &&
      this.lastname !== undefined &&
      this.gender !== undefined &&
      this.image !== undefined &&
      this.marital_status !== undefined &&
      this.date_of_birth !== undefined &&
      this.signature !== undefined &&
      this.country !== undefined &&
      this.state !== undefined &&
      this.city !== undefined &&
      this.phone !== undefined
    );
  }
}
