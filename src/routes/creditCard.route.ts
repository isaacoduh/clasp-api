import { AuthMiddleware } from "./../middleware/auth.middleware";
import express from "express";
import {
  allCards,
  cardDetail,
  createCreditCard,
  deleteCard,
  fundCreditCard,
  withdrawFunds,
} from "../controllers/creditCard.controller";
const router = express.Router();

router.post("/create", AuthMiddleware.authenticate, createCreditCard);
router.get("/", AuthMiddleware.authenticate, allCards);
router.get("/:card_id", AuthMiddleware.authenticate, cardDetail);
router.post("/:card_id/fund", AuthMiddleware.authenticate, fundCreditCard);
router.post("/:card_id/withdraw", AuthMiddleware.authenticate, withdrawFunds);
router.delete("/:card_id/delete", AuthMiddleware.authenticate, deleteCard);

export default router;
