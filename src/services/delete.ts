import db from "../models";

const { User } = db;

const deleteUser = (id: string) =>
  new Promise((resolve, reject) => {
    User.destroy({ where: { id } })
      .then((success: number) => {
        if (success) {
          resolve({ message: `${id} got successfully deleted` });
        } else {
          reject({ status: 500, message: `Cannot delete ${id}` });
        }
      })
      .catch((err: any) => {
        reject({ status: 500, message: `Cannot delete ${id}` });
      });
  });

export default deleteUser;
