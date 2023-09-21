import { PrismaClient } from "@prisma/client";

export default class ClientsController {
    private prisma = new PrismaClient();
    
    async create(req:any,res:any) {
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
    }
    
    async list(req:any,res:any) {
        const clients = await this.prisma.clients.findMany({
        include: {
            vehicles: true,
            orders: true,
        },
        });
    
        return res.status(200).json(clients);
    }
    
    async listOne(req:any,res:any) {
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
    }
    
    async delete(req:any,res:any) {
        const { id } = req.params;
    
        const client = await this.prisma.clients.delete({
        where: {
            id,
        },
        });
    
        return res.status(200).json(client);
    }
    
    async update(req:any,res:any) {
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
    }
    }