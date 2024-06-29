import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Account } from "../database/entities/Account";
import { Kyc } from "../database/entities/KYC";
import { User } from "../database/entities/User";
import crypto from "crypto";
import "class-validator";
import { validate } from "class-validator";

const generateAccountNumer = (): string => {
  return Math.random().toString().slice(2, 12);
};

const generateAccountId = (): string => {
  return crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 7);
};

const generatePinNumber = (): string => {
  return Math.random().toString().slice(2, 6);
};

const generateRedCode = (): string => {
  return crypto.randomBytes(6).toString("hex").toUpperCase().slice(0, 10);
};

const createAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser!;
    const { currency } = req.body;

    const userRespository = AppDataSource.getRepository(User);
    const accountRepository = AppDataSource.getRepository(Account);
    const kycRepository = AppDataSource.getRepository(Kyc);

    const user = await userRespository.findOneBy({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const kyc = await kycRepository.findOneBy({ user });

    //   if (!kyc || !kyc.isKycCompleted()) {
    //     return res.status(400).json({ message: "KYC not completed!" });
    //   }

    const account = new Account();
    account.user = user;
    account.account_number = generateAccountNumer();
    account.account_id = generateAccountId();
    account.pin_number = generatePinNumber();
    account.red_code = generateRedCode();
    account.account_status = "active";
    account.kyc_submitted = true;

    account.kyc_confirmed = kyc?.status === "approved";

    const errors = await validate(account);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    await accountRepository.save(account);

    return res
      .status(201)
      .json({ message: "Account created successfully!", account });
    // console.log(account);
  } catch (error) {
    console.log(error);
  }
};

const getAccounts = async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser!;

    // find user then return accounts
    const userRepository = AppDataSource.getRepository(User);
    const accountRepository = AppDataSource.getRepository(Account);
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const accounts = await accountRepository.find({ where: { userId: id } });
    return res.status(200).json({ message: "Data Retrieved", accounts });
  } catch (error) {
    return res.status(500).json(`Error get_accounts: ${error}`);
  }
};

const getAccountByNumber = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const accountNumber = req.params.accountNumber;
  const accountRepository = AppDataSource.getRepository(Account);

  const account = await accountRepository.findOne({
    where: { account_number: accountNumber },
    relations: ["user"],
    select: ["id", "account_number"],
  });

  if (!account) {
    return res.status(404).json({ message: "Account not found!" });
  }

  const { account_number, user } = account;
  const data = { account_number, username: user?.username };

  return res.status(200).json({ message: "Data Retrieved!", data });
};

export { createAccount, getAccountByNumber, getAccounts };
