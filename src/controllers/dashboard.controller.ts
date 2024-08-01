import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Account } from "../database/entities/Account";

const overview = async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser!;
    // get information for the dashboard
    const accountRepository = AppDataSource.getRepository(Account);

    const accounts = await accountRepository.find({
      where: { userId: id },
      select: ["account_balance", "currency", "account_number"],
    });
    return res.status(200).json({ success: true, data: { accounts } });
  } catch (error) {}
};

export { overview };
