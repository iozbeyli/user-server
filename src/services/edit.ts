import db from "../models";

const { User } = db;

const edit = (id: string, name: string, email: string) =>
  new Promise(async (resolve, reject) => {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email"],
    });
    if (user === null) {
      reject({ status: 404, message: "User could not be found" });
    } else {
      user.name = name;
      user.email = email;
      user
        .save()
        .then((success: number) => {
          if (success) {
            resolve(user.toJSON());
          } else {
            reject({ status: 500, message: `Cannot update ${id}` });
          }
        })
        .catch((err: any) => {
          reject({ status: 500, message: `Cannot update ${id}` });
        });
    }
  });

export default edit;
