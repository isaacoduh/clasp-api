import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { User } from "../database/entities/User";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

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
    
    async login(req: Request, res: Response): Promise<Response> {
        const  {email, password} = req.body;
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOneBy({email});
        if(!user){
            return res.status(404).json({message: 'User not Found!'});
        }
        let passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({message: 'Invalid Credentials!'})
        }
        let token = sign({userId: user.id}, process.env.JWT_SECRET || "x!GH#EEOE@", {expiresIn: '1d'});
        const result = user.toResponse();

        return res.json({message: 'Login Success', user: result, token});

    }
}


