import InMemoryTaskModel from "./InMemoryTaskModel.js";
import SQLiteUserModel from "./SQLiteUserModel.js";

class _ModelFactory {
  async getModel(model) {
    if (model === "user") {
      return SQLiteUserModel;
    } else if (model === "sets") {
      return SQLiteSetModel;
    } else {
      return InMemoryTaskModel;
    }
  }
}

const ModelFactoryUsers = new _ModelFactory("user");
const ModelFactorySets = new _ModelFactory("sets");
export {ModelFactoryUsers,ModelFactorySets};