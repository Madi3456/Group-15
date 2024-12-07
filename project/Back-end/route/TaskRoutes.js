import express from "express";
import TaskController from "../controller/TaskController.js";

class TaskRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {

    this.router.get("/user", async (req, res) => {
      await TaskController.getAllUsers(req, res);
    });

    this.router.post("/user", async (req, res) => {
      await TaskController.addUsers(req, res);
    });

    this.router.delete("/user", async (req, res) => {
      await TaskController.clearUsers(req, res);
    });

    this.router.get("/sets", async (req, res) => {
      await TaskController.getAllSets(req, res);
    });

    this.router.post("/sets", async (req, res) => {
      await TaskController.addSets(req, res);
    });

    this.router.delete("/sets", async (req, res) => {
      await TaskController.clearSets(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new TaskRoutes().getRouter();