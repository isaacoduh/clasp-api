import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { User } from "../database/entities/User";

export class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body;

    const repo = AppDataSource.getRepository(User);
    const user = repo.create({ username, email, password });
    await repo.save(user);

    return res
      .status(201)
      .json({ message: "User Created Successfully", data: user });
  }
}
