import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
  });
  
  const Set = sequelize.define("Set", {
    nameSet: { type: DataTypes.STRING, unique: true, allowNull: false },
    subjects: { type: DataTypes.STRING },
    data: { type: DataTypes.STRING }
  });
  
  class _SQLiteSetModel {
    constructor() {}
  
    async init(fresh = false) {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      if (fresh) {
        await this.delete();
      }
    }
  
    async create(set) {
      return await Set.create(set);
    }
  
    async read(id = null) {
      if (id) {
        return await Set.findByPk(id);
      }
  
      return await Set.findAll();
    }
  
    async update(set) {
      const Setu = await Task.findByPk(set.nameSet);
      if (!set) {
        return null;
      }
  
      await Setu.update(set);
      return Setu;
    }
  
    async delete(set = null) {
      if (set === null) {
        await Set.destroy({ truncate: true });
        return;
      }
  
      await Set.destroy({ where: { nameSet: set.nameSet } });
      return user;
    }
  }
  
await sequelize.sync();

const SQLiteSetModel = new _SQLiteSetModel();
  
export {SQLiteSetModel,Set};