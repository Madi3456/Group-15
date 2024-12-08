import {SQLiteUserModel} from "./SQLiteUserModel.js";
import SQLiteSetModel from "./SQLiteSetModel.js";
class _ModelFactory {
  async getModel(model) {
    if (model === "user") {
      return SQLiteUserModel;
    } else if (model === "sets") {
      return SQLiteSetModel;
    }
  }
}

const ModelFactoryUsers = new _ModelFactory("user");
const ModelFactorySets = new _ModelFactory("sets");
export {ModelFactoryUsers,ModelFactorySets};