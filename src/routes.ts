import cors from "cors";
import express from "express";
import controller from "./controllers/controller";
import auth from "./middlewares/auth";
// options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

export const register = (app: express.Application) => {
  const router = express.Router();
  router.use(cors(options));

  router.get("/users/:id", auth, (req, res) => controller.getUser(req, res));
  router.get("/users", auth, (req, res) => controller.getAllUsers(req, res));
  router.post("/register", (req, res) => controller.register(req, res));
  router.post("/login", (req, res) => controller.login(req, res));
  router.put("/users/:id", auth, (req, res) => controller.edit(req, res));
  router.delete("/users/:id", auth, (req, res) =>
    controller.deleteUser(req, res)
  );
  app.use("/api", router);
};
