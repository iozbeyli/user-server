import { Sequelize, Model, DataTypes } from "sequelize";
import users from "./User.model";
const sequelize = new Sequelize("sqlite::memory");

const User = users(sequelize, Sequelize);

export default { Sequelize, sequelize, User };
