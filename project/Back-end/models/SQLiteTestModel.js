import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
  });
  
  const Tests = sequelize.define("Tests", {
    subject: { type: DataTypes.STRING},
    score: { type: DataTypes.STRING },
    date: { type: DataTypes.STRING }
  });
  
  class _SQLiteTestsModel {
    constructor() {}
  
    async init(fresh = false) {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      if (fresh) {
        await this.delete();
      }
    }
  
    async create(tests) {
      return await Tests.create(tests);
    }
  
    async read(id = null) {
      if (id) {
        return await Tests.findByPk(id);
      }
  
      return await Tests.findAll();
    }
  }
  
  await sequelize.sync();

  const SQLiteTestsModel = new _SQLiteTestsModel();
  
export default SQLiteTestsModel;