import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export class JwtSecret {
  public jwt() {
    return process.env.JWT_SECRET as string;
  }
}
class ValidateToken {
  private prisma: PrismaClient;
  private jwtSecret: JwtSecret;

  constructor() {
    this.prisma = new PrismaClient();
    this.jwtSecret = new JwtSecret();
  }

  public async validate(req: any, res: any, next: any) {
    const authorization = req.headers?.authorization as string;

    try {
      if (!authorization) {
        return res.status(400).json({ error: "Please log in" });
      }

      const bearer = authorization.split(" ")[1];

      const decodedToken = jwt.verify(
        bearer,
        this.jwtSecret.jwt() as string
      ) as { userId: string };

      const userId = decodedToken.userId;

      const user = await this.prisma.users.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(401).json({ error: "Unauthorized user" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

export default new ValidateToken();
