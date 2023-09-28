import { PrismaClient } from "@prisma/client";

export default class SalesController {
  private prisma = new PrismaClient();

  private handleCommonError(res: any, error: Error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  async create(req: any, res: any) {
    try {
      const { userId, clientId, products } = req.body;

      const order = await this.prisma.orders.create({
        data: {
          userId,
          clientId,
          products: {
            create: products,
          },
        },
      });

      return res.status(201).json(order);
    } catch (error: any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async list(req: any, res: any) {
    try {
      const orders = await this.prisma.orders.findMany({
        include: {
          client: true,
          user: true,
          products: true,
        },
      });

      return res.status(200).json(orders);
    } catch (error: any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async listOne(req: any, res: any) {
    try {
      const { id } = req.params;

      const order = await this.prisma.orders.findUnique({
        where: {
          id,
        },
        include: {
          client: true,
          user: true,
          products: true,
        },
      });

      return res.status(200).json(order);
    } catch (error: any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const { userId, clientId, products } = req.body;

      const order = await this.prisma.orders.update({
        where: {
          id,
        },
        data: {
          userId,
          clientId,
          products: {
            create: products,
          },
        },
        include: {
          client: true,
          user: true,
          products: true,
        },
      });

      return res.status(200).json(order);
    } catch (error: any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async delete(req: any, res: any) {
    try {
      const { id } = req.params;

      const order = await this.prisma.orders.delete({
        where: {
          id,
        },
      });

      return res.status(200).json(order);
    } catch (error: any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
