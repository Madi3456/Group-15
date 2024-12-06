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

const ModelFactory = new _ModelFactory();
export default ModelFactory;