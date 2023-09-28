import express from "express";
import UsersController from "../controller/Users/users";
import ValidateToken from "./../middleware/index.middleware";
import ProductsController from "../controller/Products/product";
import ClientsController from "../controller/Clients/client";
import SalesController from "../controller/Sales/sales";

const router = express();
const registeredUserController = new UsersController();
const productsController = new ProductsController();
const clientsController = new ClientsController();
const salesController = new SalesController();
router.get("/", (req, res) => {
  res.send("MVR TECH");
});
router.post(
  "/signin",
  async (req, res) => await registeredUserController.signIn(req, res)
);

router.use(
  async (req, res, next) => await ValidateToken.validate(req, res, next)
);
router.post("/product/", async (req, res) => {
  try {
    return await productsController.create(req, res);
  } catch (e) {
    console.log(e);
  }
});
router.put("/product/:id", async (req, res) => {
  try {
    return await productsController.update(req, res);
  } catch (e) {
    console.log(e);
  }
});
router.delete("/product/", async (req, res) => {
  try {
    return await productsController.delete(req, res);
  } catch (e) {
    console.log(e);
  }
});
router.get("/products", async (req, res) => {
  try {
    return await productsController.list(req, res);
  } catch (e) {
    console.log(e);
  }
});
router.get("/product/:id", async (req, res) => {
  try {
    return await productsController.listOne(req, res);
  } catch (e) {
    console.log(e);
  }
});

router.post(
  "/user/",
  async (req, res) => await registeredUserController.register(req, res)
);
router.get(
  "/user/:id",
  async (req, res) => await registeredUserController.listOne(req, res)
);
router.get(
  "/users/",
  async (req, res) => await registeredUserController.list(req, res)
);
router.delete(
  "/user/:id",
  async (req, res) => await registeredUserController.delete(req, res)
);
router.put(
  "/users/:id",
  async (req, res) => await registeredUserController.update(req, res)
);

router.post(
  "/client/",
  async (req, res) => await clientsController.create(req, res)
);
router.post(
  "/client/:id/vehicle/",
  async (req, res) => await clientsController.vehicleAdd(req, res)
);
router.get(
  "/clients/",
  async (req, res) => await clientsController.list(req, res)
);
router.get(
  "/client/:id",
  async (req, res) => await clientsController.listOne(req, res)
);
router.put(
  "/client/:id",
  async (req, res) => await clientsController.update(req, res)
);
router.delete(
  "/client/:id",
  async (req, res) => await clientsController.delete(req, res)
);

router.delete(
  "/client/:clientId/vehicle/:id/",
  async (req, res) => await clientsController.vehicleDelete(req, res)
);

router.get(
  "/vehicle/:id",
  async (req, res) => await clientsController.vehicleListOne(req, res)
);
router.get(
  "/client/:id/vehicles",
  async (req, res) => await clientsController.vehicleList(req, res)
);

router.post(
  "/sales/",
  async (req, res) => await salesController.create(req, res)
);

router.put(
  "/sales/:id",
  async (req, res) => await salesController.update(req, res)
);
router.delete(
  "/sales/:id",
  async (req, res) => await salesController.delete(req, res)
);
router.get("/sales/:id", async (req, res) => await salesController.list(req, res));
router.get("/sales/", async (req, res) => await salesController.listOne(req, res));

export default router;
