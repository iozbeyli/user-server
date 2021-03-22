import bcrypt from "bcrypt";
import db from "../models";

const { User } = db;

const register = (name: String, email: String, password: String) =>
  new Promise((resolve, reject) => {
    let user = { name, email, password, salt: "", hash: "" };
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject({ status: 500, message: "Internal server error" });
      }
      user = { ...user, hash };
      User.create(user)
        .then((data: any) => resolve(data))
        .catch((err: any) => {
          reject({
            status: 500,
            message: err.message || "Error while creating user",
          });
        });
    });
  });

export default register;
