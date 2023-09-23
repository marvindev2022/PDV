import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET as string;

export interface HttpRequest {
  body:any
  headers?: {
    authorization: string;
  };
  user?: {
    id: string;
    email: string;
    name: string;
    password: string;
    cpf: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
export interface HttpResponse {
  body:any
  status: any;
  json: any;
}

class ValidateToken {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async validate(req:any, res: any, next: any) {
    const authorization   = req.headers?.authorization as string;
    try {
      const bearer = authorization.split(" ")[1];

      if (!authorization)
        return res.status(400).json({ message: "Please log in" });

      
    const decodedToken = jwt.verify(bearer, jwtSecret as string) as { userId: string };
    const userId = decodedToken.userId;
  
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

      if (!user) return res.status(401).json({ message: "Unauthorized user" });

      req.user = user;
      next();
    } catch (error) {
      console.log(error)
      res.status(404).json("Error token");
    }
  }
}

export default new ValidateToken();
