import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { User } from "../database/entities/User";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Kyc } from "../database/entities/KYC";
import { loginSchema, registerSchema } from "../utils/validators";
import { Or } from "typeorm";
import { mailTransport } from "../utils/email";

export class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body;

    const { error } = registerSchema.validate({ username, email, password });

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    const repo = AppDataSource.getRepository(User);
    const kycRepo = AppDataSource.getRepository(Kyc);

    // check if user exists already
    const existingUser = await repo.findOne({
      where: { email: email, username: username },
    });

    if (existingUser) {
      return res.status(500).json({
        success: false,
        error: "User with email or username exists already",
      });
    }

    // Create and save the user
    const user = repo.create({ username, email, password });
    await repo.save(user);

    // Create and save the KYC record associated with the user
    const newKyc = kycRepo.create({ userId: user.id });
    await kycRepo.save(newKyc);

    // Assign the KYC record to the user and save the user again if necessary
    user.kyc = newKyc;
    await repo.save(user);
    const isKycCompleted = newKyc.isKycCompleted();

    await mailTransport.sendEmail(
      user.email,
      "Welcome",
      "Welcome to us",
      {},
      "welcome"
    );

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: { user, isKycCompleted },
    });
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ email });

    const { error } = loginSchema.validate({ email, password });

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    if (!user) {
      return res.status(404).json({ message: "User not Found!" });
    }
    let passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }
    let token = sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    const result = user.toResponse();

    return res.json({
      success: true,
      message: "Login Success",
      user: result,
      token,
    });
  }

  async currentUser(req: Request, res: Response) {
    const { id } = req.currentUser!;
    // find the currently logged in user by the id
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneByOrFail({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(201).json({ success: true, user: user.toResponse() });
  }
}
