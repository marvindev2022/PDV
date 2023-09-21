import express from "express";
import UsersController from "../controller/Users/users";
import ValidateToken from "./../middleware/index.middleware";
import ProductsController from "../controller/Products/product";
import ClientsController from "../controller/Clients/client";
const router = express.Router();
const registeredUserController = new UsersController();
const productsController = new ProductsController();
const clientsController = new ClientsController();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.post(
  "/product/",
  async (req, res, next) => await ValidateToken.validate(req, res, next),
  async (req, res) => {
    try {
      return await productsController.create(req, res);
    } catch (e) {
      console.log(e);
    }
  }
);
router.put(
  "/product/:id",
  async (req, res, next) => await ValidateToken.validate(req, res, next),
  async (req, res) => {
    try {
      return await productsController.update(req, res);
    } catch (e) {
      console.log(e);
    }
  }
);
router.delete(
  "/product/",
  async (req, res, next) => await ValidateToken.validate(req, res, next),
  async (req, res) => {
    try {
      return await productsController.delete(req, res);
    } catch (e) {
      console.log(e);
    }
  }
);
router.get(
  "/products",
  async (req, res, next) => await ValidateToken.validate(req, res, next),
  async (req, res) => {
    try {
      return await productsController.list(req, res);
    } catch (e) {
      console.log(e);
    }
  }
);
router.get(
  "/product/:id",
  async (req, res, next) => await ValidateToken.validate(req, res, next),
  async (req, res) => {
    try {
      return await productsController.listOne(req, res);
    } catch (e) {
      console.log(e);
    }
  }
);

router.post("/categories/registered", (req, res) => {});
router.post("/subcategories/registered", (req, res) => {});

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
  async (req, res, next) => await ValidateToken.validate(req, res, next),
  async (req, res) => await registeredUserController.delete(req, res)
);
router.put(
  "/users/:id",
  async (req, res, next) => await ValidateToken.validate(req, res, next),
  async (req, res) => await registeredUserController.update(req, res)
);
router.post(
  "/signin",
  async (req, res) => await registeredUserController.signIn(req, res)
);

router.post(
  "/client/registered",
  async (req, res, next) => await ValidateToken.validate(req, res, next),
  async (req, res) => await clientsController.create(req, res)
);
router.post("/client/:id/vehicle/registered", (req, res) => {});
router.delete("/client/:id/vehicle/delete", (req, res) => {});

export default router;
