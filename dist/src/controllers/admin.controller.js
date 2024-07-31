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
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderateKyc = void 0;
const data_source_1 = require("../database/data-source");
const KYC_1 = require("../database/entities/KYC");
const moderateKyc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { kycId } = req.params;
    const { status } = req.body;
    const kycRepository = data_source_1.AppDataSource.getRepository(KYC_1.Kyc);
    const kyc = yield kycRepository.findOneByOrFail({ id: kycId });
    if (!kyc) {
        return res.status(404).json({ message: "User not found!" });
    }
    kyc.status = status;
    yield kycRepository.save(kyc);
    return res.status(200).json({ message: "KYC updated by Admin", kyc });
});
exports.moderateKyc = moderateKyc;
//# sourceMappingURL=admin.controller.js.map