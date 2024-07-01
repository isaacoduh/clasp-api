import { AppDataSource } from "./../database/data-source";
import { Request, Response } from "express";
import { Account } from "../database/entities/Account";
import { User } from "../database/entities/User";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "../database/entities/Transaction";

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

const createPaymentRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { account_number, amount, description } = req.body;
  const accountRepository = AppDataSource.getRepository(Account);
  const userRepository = AppDataSource.getRepository(User);
  const transactionRepository = AppDataSource.getRepository(Transaction);

  // make sure sender is validated
  const sender = await userRepository.findOneBy({ id: req.currentUser?.id });
  const receiverAccount = await accountRepository.findOne({
    where: { account_number: account_number?.toString() },
  });
  if (!sender || !receiverAccount) {
    return res
      .status(404)
      .json({ message: "Sender or receiver account not found!" });
  }

  // find receiver
  const receiver: User = (await userRepository.findOneBy({
    id: receiverAccount.user?.id,
  })) as User;

  // create new request (transaction)
  const newRequest = new Transaction();
  newRequest.user = sender;
  newRequest.amount = amount;
  newRequest.description = description;
  newRequest.sender = sender;
  newRequest.receiver = receiver;
  newRequest.status = TransactionStatus.REQUEST_PROCESSING;
  newRequest.transactionType = TransactionType.REQUEST;

  await transactionRepository.save(newRequest);

  return res.status(200).json({ message: "Payment Request created!" });
};

const recievedPaymentRequests = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const paymentRequests = await transactionRepository.find({
    where: {
      transactionType: TransactionType.REQUEST,
      receiver: { id: req.currentUser?.id },
    },
    relations: ["sender", "receiver"],
    order: { createdAt: "DESC" },
  });

  const results = paymentRequests.map((transaction) => {
    return {
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      status: transaction.status,
      createdAt: transaction.createdAt,
      senderUsername: transaction.sender?.username || null,
    };
  });

  return res.status(200).json({ message: "Payment Request created!", results });
};

const sentPaymentRequests = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const paymentRequests = await transactionRepository.find({
    where: {
      transactionType: TransactionType.REQUEST,
      sender: { id: req.currentUser?.id },
    },
    relations: ["sender", "receiver"],
    order: { createdAt: "DESC" },
  });

  const results = paymentRequests.map((transaction) => {
    return {
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      status: transaction.status,
      createdAt: transaction.createdAt,
      receiverUsername: transaction.receiver?.username || null,
    };
  });

  return res.status(200).json({ message: "Payment Request created!", results });
};

export {
  searchUser,
  createPaymentRequest,
  recievedPaymentRequests,
  sentPaymentRequests,
};
