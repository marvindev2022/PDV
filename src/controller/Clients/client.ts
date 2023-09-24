import { PrismaClient } from "@prisma/client";

export default class ClientsController {
  private prisma = new PrismaClient();

  private handleCommonError(res: any, error: Error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  async create(req: any, res: any) {
    try {
      const { name, email, password, cpf } = req.body;

      const client = await this.prisma.clients.create({
        data: {
          name,
          email,
          password,
          cpf,
        },
      });

      return res.status(201).json(client);
    } catch (error:any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async list(req: any, res: any) {
    try {
      const clients = await this.prisma.clients.findMany({
        include: {
          vehicles: true,
          orders: true,
        },
      });

      return res.status(200).json(clients);
    } catch (error:any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async listOne(req: any, res: any) {
    try {
      const { id } = req.params;

      const client = await this.prisma.clients.findUnique({
        where: {
          id,
        },
        include: {
          vehicles: true,
          orders: true,
        },
      });

      return res.status(200).json(client);
    } catch (error:any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async delete(req: any, res: any) {
    try {
      const { id } = req.params;

      const client = await this.prisma.clients.delete({
        where: {
          id,
        },
      });

      return res.status(200).json(client);
    } catch (error:any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const { name, email, password, cpf } = req.body;

      const client = await this.prisma.clients.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
          cpf,
        },
      });

      return res.status(200).json(client);
    } catch (error:any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async vehicleAdd(req: any, res: any) {
    try {
      const { id } = req.params;
      const { model, name, plate, brand, year, manufacturer } = req.body;
      const vehicle = await this.prisma.vehicles.create({
        data: {
          name,
          model,
          plate,
          brand,
          year,
          clientId: id,
        },
      });
      return res.status(200).json(vehicle);
    } catch (error:any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async vehicleList(req: any, res: any) {
    try {
      const { id } = req.params;
      const vehicle = await this.prisma.vehicles.findMany({
        where: {
          clientId: id,
        },
      });
      return res.status(200).json(vehicle);
    } catch (error:any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async vehicleListOne(req: any, res: any) {
    try {
      const { id } = req.params;
      const vehicle = await this.prisma.vehicles.findUnique({
        where: {
          id,
        },
      });
      console.log(vehicle);
      return res.status(200).json(vehicle);
    } catch (error:any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async vehicleDelete(req: any, res: any) {
    try {
      const { id } = req.params;
      const vehicle = await this.prisma.vehicles.delete({
        where: {
          id,
        },
      });
      return res.status(200).json(vehicle);
    } catch (error:any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async vehicleEdit(req: any, res: any) {
    try {
      const { id, clientId } = req.params;
      const { model, name, plate, brand, year, manufacturer } = req.body;

      const vehicle = await this.prisma.vehicles.update({
        where: {
          id,
          clientId,
        },
        data: {
          name,
          model,
          plate,
          brand,
          year,
        },
        include: {
          client: true,
        },
      });
      return res.status(200).json(vehicle);
    } catch (error:any) {
      return this.handleCommonError(res, error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
