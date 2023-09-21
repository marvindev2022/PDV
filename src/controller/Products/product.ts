import { PrismaClient } from "@prisma/client";

export default class ProductsController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private handleGenericError(res: any, message: string, status = 500) {
    return res.status(status).json({ error: message });
  }

  async create(req: any, res: any): Promise<any> {
    try {
      const productProps = req.body;

      const existingProductByName = await this.prisma.products.findUnique({
        where: {
          name: productProps.name,
        },
      });

      if (existingProductByName) {
        return this.handleGenericError(res, "O produto já existe.", 400);
      }

      const createdProduct = await this.prisma.products.create({
        data: {
          ...productProps,
        },
      });

      return res
        .status(201)
        .json({
          message: "Produto criado com sucesso!",
        });
    } catch (error) {
      console.log(error);
      return this.handleGenericError(res, "Erro ao criar produto.");
    }
  }
  async update(req: any, res: any): Promise<any> {
    try {
        const { id } = req.params;
        const productProps = req.body;
    
        const existingProduct = await this.prisma.products.findUnique({
            where: {
            id,
            },
        });
    
        if (!existingProduct) {
            return this.handleGenericError(res, "Produto não encontrado.", 400);
        }
    
        const updatedProduct = await this.prisma.products.update({
            where: {
            id
            },
            data: {
            ...productProps,
            },
        });
    
        return res
            .status(200)
            .json({
            message: "Produto atualizado com sucesso!",
            product: updatedProduct,
            });
        }catch (error) {
    console.log(error);
    return this.handleGenericError(res, "Erro ao atualizar produto.");
}
}
}
