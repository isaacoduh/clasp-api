import { CardType, CreditCard } from "./../database/entities/CreditCard";
import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";
import { v4 as uuidv4 } from "uuid";
import { Account } from "../database/entities/Account";

const createCreditCard = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstname, lastname } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const creditCardRepository = AppDataSource.getRepository(CreditCard);

  const user = await userRepository.findOneBy({ id: req.currentUser?.id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const cardId = uuidv4().slice(0, 20);
  const cardNumber = generateRandomNumber(16);
  const cvv = generateRandomNumber(3);
  const currentDate = new Date();
  const expiryMonth = currentDate.getMonth() + 1;
  const expirtyYear = currentDate.getFullYear() + 5;

  const newCreditCard = creditCardRepository.create({
    card_id: cardId,
    name: `${firstname} ${lastname}`,
    number: cardNumber,
    month: expiryMonth,
    year: expirtyYear,
    cvv: cvv,
    amount: 0.0,
    card_type: CardType.MASTER,
    card_status: true,
    user: user,
  });

  await creditCardRepository.save(newCreditCard);

  return res.status(201).json({
    message: "Credit Card Created Successfully",
    credit_card: newCreditCard,
  });
};

const allCards = async (req: Request, res: Response): Promise<Response> => {
  const creditCardRepository = AppDataSource.getRepository(CreditCard);
  const creditCards = await creditCardRepository.find({
    where: { user: { id: req.currentUser?.id } },
  });

  return res
    .status(200)
    .json({ message: "Credit Card Data", cards: creditCards });
};

const cardDetail = async (req: Request, res: Response): Promise<Response> => {
  const { card_id } = req.params;
  const creditCardRepository = AppDataSource.getRepository(CreditCard);
  const creditCard = await creditCardRepository.findOne({
    where: { card_id: card_id, user: { id: req.currentUser?.id } },
    relations: ["user"],
  });

  if (!creditCard) {
    return res.status(404).json({ message: "Credit Card Not Found" });
  }
  return res
    .status(200)
    .json({ message: "Card Information", credit_card: creditCard });
};

const fundCreditCard = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { card_id } = req.params;
  const { funding_amount, account_number } = req.body;

  const creditCardRepository = AppDataSource.getRepository(CreditCard);
  const accountRepository = AppDataSource.getRepository(Account);

  const creditCard = await creditCardRepository.findOne({
    where: { card_id, user: { id: req.currentUser?.id } },
  });

  const account = await accountRepository.findOne({
    where: { account_number, user: { id: req.currentUser?.id } },
  });

  if (!creditCard || !account) {
    return res
      .status(404)
      .json({ message: "Credit card or account not found" });
  }

  // confirm funds in card
  if (parseFloat(funding_amount) <= account.account_balance) {
    account.account_balance =
      parseFloat(account.account_balance.toString()) -
      parseFloat(funding_amount);

    creditCard.amount =
      parseFloat(creditCard.amount.toString()) + parseFloat(funding_amount);
  } else {
    return res.status(500).json({ message: "Insufficent funds!" });
  }
  await AppDataSource.transaction(async (t) => {
    await t.save(account);
    await t.save(creditCard);
  });
  return res.status(200).json({ message: "Card Funded!" });
};

const withdrawFunds = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { card_id } = req.params;
  const { amount, account_number } = req.body;
  const creditCardRepository = AppDataSource.getRepository(CreditCard);
  const accountRepository = AppDataSource.getRepository(Account);

  const creditCard = await creditCardRepository.findOne({
    where: { card_id, user: { id: req.currentUser?.id } },
  });

  const account = await accountRepository.findOne({
    where: { account_number, user: { id: req.currentUser?.id } },
  });

  if (!creditCard || !account) {
    return res
      .status(404)
      .json({ message: "Credit card or account not found" });
  }

  if (
    parseFloat(creditCard.amount.toString()) >= parseFloat(amount) &&
    creditCard.amount !== 0.0
  ) {
    account.account_balance =
      parseFloat(account.account_balance.toString()) + parseFloat(amount);
    creditCard.amount =
      parseFloat(creditCard.amount.toString()) - parseFloat(amount);
  } else {
    return res.status(404).json({ message: "Insufficient Funds!" });
  }

  await AppDataSource.transaction(async (t) => {
    await t.save(account);
    await t.save(creditCard);
  });
  return res.status(200).json({ message: "Funds Withdrawn!" });
};

const deleteCard = async (req: Request, res: Response): Promise<Response> => {
  const { card_id } = req.params;
  const { account_number } = req.body;
  const creditCardRepository = AppDataSource.getRepository(CreditCard);
  const accountRepository = AppDataSource.getRepository(Account);

  const creditCard = await creditCardRepository.findOne({
    where: { card_id, user: { id: req.currentUser?.id } },
  });

  const account = await accountRepository.findOne({
    where: { account_number, user: { id: req.currentUser?.id } },
  });

  if (!creditCard || !account) {
    return res
      .status(404)
      .json({ message: "Credit card or account not found" });
  }

  if (parseFloat(creditCard.amount.toString()) >= 0) {
    account.account_balance =
      parseFloat(account.account_balance.toString()) +
      parseFloat(creditCard.amount.toString());
    await accountRepository.save(account);
  }

  await creditCardRepository.remove(creditCard);

  return res.status(200).json({ message: "Card Deleted!" });
};

const generateRandomNumber = (length: number): number => {
  return Math.floor(Math.random() * Math.pow(10, length));
};

export {
  createCreditCard,
  allCards,
  cardDetail,
  fundCreditCard,
  withdrawFunds,
  deleteCard,
};
