import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Kyc } from "../database/entities/KYC";

const moderateKyc = async (req: Request, res: Response): Promise<Response> => {
  const { kycId } = req.params;
  const { status } = req.body;

  const kycRepository = AppDataSource.getRepository(Kyc);
  const kyc = await kycRepository.findOneByOrFail({ id: kycId });

  if (!kyc) {
    return res.status(404).json({ message: "User not found!" });
  }

  kyc.status = status;
  await kycRepository.save(kyc);

  return res.status(200).json({ message: "KYC updated by Admin", kyc });
};

export { moderateKyc };
