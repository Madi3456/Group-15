import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
  });
  
  const User = sequelize.define("User", {
    userid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sets: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  });
  
  class _SQLiteUserModel {
    constructor() {}
  
    async init(fresh = false) {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      if (fresh) {
        await this.delete();
      }
    }
  
    async create(User) {
      return await User.create(user);
    }
  
    async read(id = null) {
      if (id) {
        return await User.findByPk(id);
      }
  
      return await User.findAll();
    }
  
    async update(user) {
      const useru = await Task.findByPk(user.userid);
      if (!user) {
        return null;
      }
  
      await useru.update(user);
      return useru;
    }
  
    async delete(user = null) {
      if (user === null) {
        await User.destroy({ truncate: true });
        return;
      }
  
      await User.destroy({ where: { userid: user.userId } });
      return user;
    }
  }
  
  const SQLiteUserModel = new _SQLiteUserModel();
  
export default SQLiteUserModel;