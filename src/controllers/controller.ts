import express from "express";
import services from "../services";

const controllers = {
  register: (req: express.Request, res: express.Response) => {
    const { name, email, password } = req.body;
    const errors = services.validate(
      [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
        { name: "Password", key: "password" },
      ],
      req.body
    );
    if (Object.keys(errors).length > 0) {
      res.status(400).send({ message: JSON.stringify(errors) });
      return;
    }
    services
      .register(name, email, password)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(err.status).send({ message: err.message });
      });
  },
  login: (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    const errors = services.validate(
      [
        { name: "Email", key: "email" },
        { name: "Password", key: "password" },
      ],
      req.body
    );
    if (Object.keys(errors).length > 0) {
      res.status(400).send({ message: JSON.stringify(errors) });
      return;
    }
    services
      .login(email, password)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(err.status).send({ message: err.message });
      });
  },
  edit: (req: express.Request, res: express.Response) => {
    const paramErrors = services.validate(
      [{ name: "Id", key: "id" }],
      req.params
    );
    const bodyErrors = services.validate(
      [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
      ],
      req.body
    );
    const errors = { ...paramErrors, ...bodyErrors };
    if (Object.keys(errors).length > 0) {
      res.status(400).send({ message: JSON.stringify(errors) });
      return;
    }
    const { id } = req.params;
    const { name, email } = req.body;
    services
      .edit(id, name, email)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(err.status).send({ message: err.message });
      });
  },
  deleteUser: (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const errors = services.validate([{ name: "Id", key: "id" }], req.params);
    if (Object.keys(errors).length > 0) {
      res.status(400).send({ message: JSON.stringify(errors) });
      return;
    }
    services
      .deleteUser(id)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(err.status).send({ message: err.message });
      });
  },
  getAllUsers: (req: express.Request, res: express.Response) => {
    services
      .getAll()
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(err.status).send({ message: err.message });
      });
  },
  getUser: (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const errors = services.validate([{ name: "Id", key: "id" }], req.params);
    if (Object.keys(errors).length > 0) {
      res.status(400).send({ message: JSON.stringify(errors) });
      return;
    }
    services
      .getUser(id)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(err.status).send({ message: err.message });
      });
  },
};

export default controllers;
