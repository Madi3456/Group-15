import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
  });
  
  const Set = sequelize.define("Set", {
    setid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    subjects: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    set: {
      type: DataTypes.STRING,
      allowNull: true,
    }
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
      const Setu = await Task.findByPk(set.setid);
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
  
      await Set.destroy({ where: { userid: set.setid } });
      return user;
    }
  }
  
  const SQLiteSetModel = new _SQLiteSetModel();
  
export default SQLiteSetModel;