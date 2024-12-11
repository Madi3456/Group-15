import {SQLiteUserModel} from "./SQLiteUserModel.js";
import {SQLiteSetModel} from "./SQLiteSetModel.js";
import SQLiteTestModel from "./SQLiteTestModel.js";
class _ModelFactory {
  async getModel(model) {
    if (model === "user") {
      return SQLiteUserModel;
    } else if (model === "sets") {
      return SQLiteSetModel;
    }else if (model==="tests"){
      return SQLiteTestModel;
    }
  }
}

const ModelFactoryUsers = new _ModelFactory("user");
const ModelFactorySets = new _ModelFactory("sets");
const ModelFactoryTests = new _ModelFactory("tests");
export {ModelFactoryUsers,ModelFactorySets, ModelFactoryTests};