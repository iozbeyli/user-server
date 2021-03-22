import bcrypt from "bcrypt";
import db from "../models";
import jwt from "jsonwebtoken";

const { User } = db;

const getUser = (id: string) =>
  new Promise(async (resolve, reject) => {
    const user = await User.findByPk(id);

    if (user === null) {
      reject({ status: 404, message: "User could not be found" });
    } else {
      resolve(user.toJSON());
    }
  });

export default getUser;
