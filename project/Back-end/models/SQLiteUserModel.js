import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
  });
  
  const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING },
    googleId: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "user" }, // Roles: 'user', 'admin'
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
  
    async create(user) {
      return await User.create(user);
    }
  
    async read(id = null) {
      if (id) {
        return await User.findByPk(id);
      }
  
      return await User.findAll();
    }

    async findOne(user){
      return await User.findOne(user);
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
  
      await User.destroy({ where: { username:user.username} });
      return user;
    }
  }
  
await sequelize.sync();

const SQLiteUserModel = new _SQLiteUserModel();
  
export {SQLiteUserModel, User};