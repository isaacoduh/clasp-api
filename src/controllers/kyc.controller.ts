import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Kyc } from "../database/entities/KYC";
import { User } from "../database/entities/User";
import { cloudinary } from "../utils/cloudinary";

const updateKyc = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.currentUser?.id;
  const {
    firstname,
    lastname,
    gender,
    marital_status,
    date_of_birth,
    country,
    state,
    city,
    phone,
    image,
    documentType,
    documentNumber,
  } = req.body;

  const issuedDate = new Date(req.body.issuedDate);
  const expiryDate = new Date(req.body.expiryDate);

  if (isNaN(issuedDate.getTime()) || isNaN(expiryDate.getTime())) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  const userRepository = AppDataSource.getRepository(User);
  const kycRepository = AppDataSource.getRepository(Kyc);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  let kyc = await kycRepository.findOneBy({ user });
  if (!kyc) {
    kyc = new Kyc();
    kyc.user = user;
  }

  if (image) {
    const result = await cloudinary.v2.uploader.upload(image, {});
    kyc.image = result.secure_url;
  }

  kyc.firstname = firstname;
  kyc.lastname = lastname;
  kyc.gender = gender;
  kyc.marital_status = marital_status;
  kyc.date_of_birth = date_of_birth;
  kyc.country = country;
  kyc.state = state;
  kyc.city = city;
  kyc.phone = phone;
  kyc.documentType = documentType;
  kyc.documentNumber = documentNumber;
  kyc.issuedDate = issuedDate;
  kyc.expiryDate = expiryDate;

  await kycRepository.save(kyc);
  return res.status(200).json({ message: "KYC updated successfully!", kyc });
};

export { updateKyc };
