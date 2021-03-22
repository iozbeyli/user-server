import bcrypt from "bcrypt";
import db from "../models";
import jwt from "jsonwebtoken";

const { User } = db;

const login = (email: String, password: String) =>
  new Promise(async (resolve, reject) => {
    const user = await User.findOne({ where: { email } });

    if (user === null) {
      reject({ status: 404, message: "User could not be found" });
    } else {
      const userObject = user.toJSON();
      bcrypt.compare(password, userObject.hash, (err, result) => {
        if (result) {
          const secret = process.env.JWT_SECRET || "secret";
          const token = jwt.sign({ id: userObject.id }, secret);
          resolve({ token });
        } else {
          reject({ status: 400, message: "Wrong password" });
        }
      });
    }
  });

export default login;
