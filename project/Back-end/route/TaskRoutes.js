import express from "express";
import TaskController from "../controller/TaskController.js";

class TaskRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {

    this.router.get("/tasks", async (req, res) => {
      await TaskController.getAllIteam(req, res);
    });

    this.router.post("/task", async (req, res) => {
      await TaskController.addItems(req, res);
    });

    this.router.delete("/tasks", async (req, res) => {
      await TaskController.clearItems(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new TaskRoutes().getRouter();