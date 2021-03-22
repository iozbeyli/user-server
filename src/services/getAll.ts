import db from "../models";

const { User } = db;

const getAll = () =>
  new Promise(async (resolve, reject) => {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    if (users === null) {
      reject({ status: 404, message: "Users could not be found" });
    } else {
      resolve(JSON.stringify(users));
    }
  });

export default getAll;
