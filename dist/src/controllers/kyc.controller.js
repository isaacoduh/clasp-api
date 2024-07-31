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
exports.updateKyc = void 0;
const data_source_1 = require("../database/data-source");
const KYC_1 = require("../database/entities/KYC");
const User_1 = require("../database/entities/User");
const cloudinary_1 = require("../utils/cloudinary");
const updateKyc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
    const { firstname, lastname, gender, marital_status, date_of_birth, country, state, city, phone, image, documentType, documentNumber, } = req.body;
    const issuedDate = new Date(req.body.issuedDate);
    const expiryDate = new Date(req.body.expiryDate);
    if (isNaN(issuedDate.getTime()) || isNaN(expiryDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
    }
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const kycRepository = data_source_1.AppDataSource.getRepository(KYC_1.Kyc);
    const user = yield userRepository.findOneBy({ id: userId });
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    let kyc = yield kycRepository.findOneBy({ user });
    if (!kyc) {
        kyc = new KYC_1.Kyc();
        kyc.user = user;
    }
    if (image) {
        const result = yield cloudinary_1.cloudinary.v2.uploader.upload(image, {});
        kyc.image = result.secure_url;
    }
    kyc.firstname = firstname;
    kyc.lastname = lastname;
    kyc.gender = gender;
    kyc.marital_status = marital_status;
    kyc.date_of_birth = date_of_birth;
    kyc.country = country;
    kyc.state = state;
    kyc.city = city;
    kyc.phone = phone;
    kyc.documentType = documentType;
    kyc.documentNumber = documentNumber;
    kyc.issuedDate = issuedDate;
    kyc.expiryDate = expiryDate;
    yield kycRepository.save(kyc);
    return res.status(200).json({ message: "KYC updated successfully!", kyc });
});
exports.updateKyc = updateKyc;
//# sourceMappingURL=kyc.controller.js.map