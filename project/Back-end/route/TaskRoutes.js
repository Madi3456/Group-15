import express from "express";
import passport from "../authentication/passport.js";
import {TaskController,register,
  login,
  logout,
  googleAuthCallback,
  getAdminArea,
  getProfile
} from "../controller/TaskController.js";


const factoryResponse = (status, message) => ({ status, message });

export const isAuthenticated = (req, res, next) => {
  return req.isAuthenticated()
    ? next()
    : res.status(401).json(factoryResponse(401, "Unauthorized"));
};

export const authorizeRole = (role) => (req, res, next) => {
  return req.user.role === role
    ? next()
    : res.status(403).json(factoryResponse(403, "Forbidden"));
};

class TaskRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
    this.userId=0;
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
  
  this.router.post("/register", register);
  this.router.post("/login", login);
  this.router.get("/logout", logout);


  this.router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );
  this.router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    googleAuthCallback
  );


  this.router.get("/admin", isAuthenticated, authorizeRole("admin"), getAdminArea);
  this.router.get("/profile", isAuthenticated, getProfile);
  }

  getRouter() {
    return this.router;
  }
}

export default new TaskRoutes().getRouter();