// user.dto.ts
export class UserDTO {
    id: string = "";
    email: string = "";
    name: string = "";
    password: string = "";
    cpf: string = "";
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    orders: OrderDTO[] = [];
  }
  
  // client.dto.ts
  export class ClientDTO {
    id: string = "";
    email: string = "";
    name: string = "";
    password: string = "";
    cpf: string = "";
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    vehicles: VehicleDTO[] = [];
    orders: OrderDTO[] = [];
  }
  
  // vehicle.dto.ts
  export class VehicleDTO {
    id: string = "";
    name: string = "";
    model: string = "";
    plate: string = "";
    clientId: string = "";
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    client: ClientDTO = new ClientDTO();
  }
  
  // category.dto.ts
  export class CategoryDTO {
    id: string = "";
    name: string = "";
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    products: ProductDTO[] = [];
  }
  
  // subcategory.dto.ts
  export class SubcategoryDTO {
    id: string = "";
    name: string = "";
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    products: ProductDTO[] = [];
  }
  
  // product.dto.ts
  export class ProductDTO {
    id: string = "";
    name: string = "";
    description: string = "";
    price: number = 0;
    quantity: number = 0;
    categoryId: string = "";
    subcategoryId: string = "";
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    orders: OrderDTO[] = [];
    category: CategoryDTO = new CategoryDTO();
    subcategory: SubcategoryDTO = new SubcategoryDTO();
  }
  
  // order.dto.ts
  export class OrderDTO {
    id: string = "";
    userId: string = "";
    clientId: string = "";
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    products: ProductDTO[] = [];
    client: ClientDTO = new ClientDTO();
    user: UserDTO = new UserDTO();
  }
  