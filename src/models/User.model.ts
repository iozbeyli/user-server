const init = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    hash: {
      type: Sequelize.STRING,
    },
  });
  return User;
};

export default init;
