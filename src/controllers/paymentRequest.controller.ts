import { AppDataSource } from "./../database/data-source";
import { Request, Response } from "express";
import { Account } from "../database/entities/Account";

const searchUser = async (req: Request, res: Response): Promise<Response> => {
  const { account_number } = req.query;
  const accountRepository = AppDataSource.getRepository(Account);
  const account = await accountRepository.findOne({
    where: { account_number: account_number?.toString() },
    relations: ["user"],
  });

  if (!account) {
    return res.status(404).json({ message: "Account not found!" });
  }

  const result = {
    account_number: account.account_number,
    username: account.user?.username,
  };

  return res.status(200).json({ message: "Account Number ", result });
};

export { searchUser };
