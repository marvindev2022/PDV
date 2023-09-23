import { PrismaClient } from "@prisma/client";

export default class ClientsController {
  private prisma = new PrismaClient();

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
    } catch (error) {
      console.error("Error in create:", error);
      return res.status(500).json({ error: "Internal server error" });
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
    } catch (error) {
      console.error("Error in list:", error);
      return res.status(500).json({ error: "Internal server error" });
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
    } catch (error) {
      console.error("Error in listOne:", error);
      return res.status(500).json({ error: "Internal server error" });
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
    } catch (error) {
      console.error("Error in delete:", error);
      return res.status(500).json({ error: "Internal server error" });
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
    } catch (error) {
      console.error("Error in update:", error);
      return res.status(500).json({ error: "Internal server error" });
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
    } catch (error) {
      console.error("Error in vehicleAdd:", error);
      return res.status(500).json({ error: "Internal server error" });
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
    } catch (error) {
      console.error("Error in vehicleList:", error);
      return res.status(500).json({ error: "Internal server error" });
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
    } catch (error) {
      console.error("Error in vehicleListOne:", error);
      return res.status(500).json({ error: "Internal server error" });
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
    } catch (error) {
      console.error("Error in vehicleDelete:", error);
      return res.status(500).json({ error: "Internal server error" });
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
    } catch (error) {
      console.error("Error in vehicleEdit:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
