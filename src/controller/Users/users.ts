import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  password: undefined;
  id: string;
  email: string;
  name: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class UsersController {
  private prisma: PrismaClient;
  private jwtSecret: string;

  constructor() {
    this.prisma = new PrismaClient();
    this.jwtSecret = process.env.JWT_SECRET as string;
  }

  private handleGenericError(res: any, message: string, status = 500) {
    return res.status(status).json({ error: message });
  }

  async register(req: any, res: any): Promise<any> {
    try {
      const userProps = req.body;

      const existingUserByEmail = await this.prisma.users.findUnique({
        where: {
          email: userProps.email,
        },
      });

      if (existingUserByEmail) {
        return this.handleGenericError(
          res,
          "O endereço de e-mail já está em uso.",
          400
        );
      }

      const existingUserByCpf = await this.prisma.users.findUnique({
        where: {
          cpf: userProps.cpf,
        },
      });

      if (existingUserByCpf) {
        return this.handleGenericError(res, "CPF já está em uso.", 400);
      }

      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(userProps.password, saltRounds);

      await this.prisma.users.create({
        data: {
          ...userProps,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return res.json("Cadastro realizado com sucesso!");
    } catch (error: any) {
      return this.handleGenericError(
        res,
        "Erro desconhecido no servidor.",
        500
      );
    }
  }

  async update(req: any, res: any): Promise<any> {
    try {
      const userProps = req.body;
      const { id } = req.params;
      const existingUserByEmail = await this.prisma.users.findUnique({
        where: {
          email: userProps.email,
        },
      });

      if (
        existingUserByEmail &&
        existingUserByEmail.email !== userProps.email
      ) {
        return res
          .status(400)
          .json({ error: "O endereço de e-mail já está em uso." });
      }

      const existingUserByCpf = await this.prisma.users.findUnique({
        where: {
          cpf: userProps.cpf,
        },
      });
      if (existingUserByCpf && existingUserByCpf.cpf !== userProps.cpf) {
        return res.status(400).json({ error: "CPF já está em uso." });
      }

      if (userProps.password) {
        const saltRounds = 10;
        userProps.password = bcrypt.hashSync(userProps.password, saltRounds);
      }

      await this.prisma.users.update({
        where: {
          id,
        },
        data: {
          ...userProps,
        },
      });

      return res.json({ message: "Usuário atualizado com sucesso." });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: "Erro desconhecido no servidor." });
    }
  }

  async delete(req: any, res: any): Promise<any> {
    try {
      const { id } = req.params;

      await this.prisma.users.delete({
        where: {
          id,
        },
      });

      return res.json({ message: "Usuário deletado com sucesso." });
    } catch (error: any) {
      return res.status(500).json({ error: "Erro desconhecido no servidor." });
    }
  }

  async list(req: any, res: any): Promise<User[]> {
    try {
      const users = await this.prisma.users.findMany();
      const usersArray: User[] = [];
      users.forEach((user) => {
        usersArray.push({ ...user, password: undefined });
      });
      return res.json(usersArray);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro desconhecido no servidor." });
    }
  }
  async listOne(req: any, res: any): Promise<User> {
    try {
      const { id } = req.params;

      const user = await this.prisma.users.findUnique({
        where: {
          id,
        },
      });

      return res.json(user);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro desconhecido no servidor." });
    }
  }

  async signIn(req: any, res: any): Promise<any> {
    try {
      const { email, password } = req.body;

      const { ...user } = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado." });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Senha incorreta." });
      }

      const token = jwt.sign({ userId: user.id }, this.jwtSecret);

      return res.json({ ...user, token, password: undefined });
    } catch (error: any) {
      return res.status(500).json({ error: "Erro desconhecido no servidor." });
    }
  }
}
