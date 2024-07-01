import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { Account } from "../database/entities/Account";
import { User } from "../database/entities/User";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "../database/entities/Transaction";

const transferFunds = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const senderId = req.currentUser?.id;
  const { senderAccountNumber, receiverAccountNumber, amount, description } =
    req.body;

  if (!receiverAccountNumber || !amount) {
    return res
      .status(400)
      .json({ message: "receiver, and amount are required!" });
  }

  const accountRepository = AppDataSource.getRepository(Account);
  const userRepository = AppDataSource.getRepository(User);
  const transactionRepository = AppDataSource.getRepository(Transaction);

  const sender = await userRepository.findOneBy({ id: senderId });
  if (!sender) {
    return res.status(404).json({ message: "Sender not found!" });
  }

  const senderAccount = await accountRepository.findOneBy({
    account_number: senderAccountNumber,
  });

  if (!senderAccount || senderAccount.account_balance < amount) {
    return res.status(404).json({ message: "Insufficient Funds!" });
  }

  const receiverAccount = await accountRepository.findOneBy({
    account_number: receiverAccountNumber,
  });
  if (!receiverAccount) {
    return res.status(404).json({ message: "Reciever Not found!" });
  }

  const receiver = (await userRepository.findOneBy({
    id: receiverAccount.userId,
  })) as User;
  const senderBalance = parseFloat(senderAccount.account_balance.toString());
  const receiverBalance = parseFloat(
    receiverAccount.account_balance.toString()
  );

  if (isNaN(senderBalance) || isNaN(receiverBalance)) {
    return res.status(400).json({ message: "Invalid account balance" });
  }

  senderAccount.account_balance = senderBalance - amount;
  receiverAccount.account_balance = receiverBalance + amount;

  const transaction = new Transaction();
  transaction.sender = sender;
  transaction.receiver = receiver;
  transaction.amount = amount;
  transaction.description = description;
  transaction.senderAccount = senderAccount;
  transaction.receiverAccount = receiverAccount;
  transaction.status = TransactionStatus.COMPLETED;
  transaction.transactionType = TransactionType.TRANSFER;
  transaction.user = sender;

  await AppDataSource.transaction(async (t) => {
    await t.save(senderAccount);
    await t.save(receiverAccount);
    await t.save(transaction);
  });
  return res.status(200).json({ message: "Transfer completed", transaction });
};

const transactionHistory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.currentUser?.id;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["transactions"],
  });

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  const t = await AppDataSource.getRepository(Transaction).find({
    where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
    relations: ["sender", "receiver"],
    order: { createdAt: "DESC" },
  });

  const transactions = t.map((transaction) => {
    return {
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      status: transaction.status,
      transactionType: transaction.transactionType,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      senderUsername: transaction.sender?.username || null,
      receiverUsername: transaction.receiver?.username || null,
    };
  });

  return res.status(200).json({ message: "Data retrieved!", transactions });
};

export { transferFunds, transactionHistory };
