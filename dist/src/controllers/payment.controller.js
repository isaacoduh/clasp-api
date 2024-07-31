"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = exports.createPaymentIntent = void 0;
const data_source_1 = require("./../database/data-source");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({});
const stripe_1 = require("stripe");
const Account_1 = require("../database/entities/Account");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
const createPaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { amount, account_number } = req.body;
    console.log(amount);
    const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
    if (!amount || parseFloat(amount) < 0) {
        return res.status(400).json({ message: "Invalid Amount" });
    }
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "gbp",
            description: `Fund account for user with ID:  ${userId}`,
            payment_method_types: ["card"],
            metadata: {
                account_number,
                userId,
            },
        });
        return res.status(200).json({
            message: "Intent created!",
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    }
    catch (error) {
        console.error("Error creating payment intent:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createPaymentIntent = createPaymentIntent;
const handleWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let event;
    try {
        const sig = req.headers["stripe-signature"];
        event = stripe_1.Stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            const account_number = paymentIntent.metadata.account_number;
            console.log(account_number);
            const accountRepository = data_source_1.AppDataSource.getRepository(Account_1.Account);
            const account = yield accountRepository.findOneBy({ account_number });
            if (account) {
                account.account_balance =
                    parseFloat(account.account_balance.toString()) +
                        paymentIntent.amount_received / 100;
                yield accountRepository.save(account);
            }
            break;
        default:
            //   console.warn(`Unhandled event type ${event.type}`);
            break;
    }
    res.status(200).send();
});
exports.handleWebhook = handleWebhook;
//# sourceMappingURL=payment.controller.js.map