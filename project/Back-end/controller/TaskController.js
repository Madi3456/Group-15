import {ModelFactoryUsers as ModelFactoryUsers,ModelFactorySets as ModelFactorySets} from "../models/ModelFactory.js";
import {User} from "../models/SQLiteUserModel.js";
import {Set} from "../models/SQliteSetModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const factoryResponse = (status, message) => ({ status, message });

const existsUser = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user;
};

const existsSet = async (nameSet) => {
  const user = await Set.findOne({ where: { nameSet } });
  return user;
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  if (await existsUser(username)){
    console.log("/n here /n");
    return res.status(400).json(factoryResponse(400, "Username already taken"));
  }
  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, password: hash });
  res.json(factoryResponse(200, "Registration successful"));
  console.log("User registered successfully");
};


export const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json(factoryResponse(401, "Invalid credentials"));
  }

  req.login(user, (err) =>
    err ? next(err) : res.json(factoryResponse(200, "Login successful"))
  );
};

export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.json(factoryResponse(500, "Logout failed"));
      return;
    }
    res.json(factoryResponse(200, "Logout successful"));
  });
};


export const googleAuthCallback = (req, res) => {
  res.redirect("/");
};


export const getAdminArea = (req, res) => {
  res.json(factoryResponse(200, "Welcome to the admin area"));
};

export const getProfile = (req, res) => {
  res.json(factoryResponse(200, `Welcome, ${req.user.username}`));
};

export const getSet = async (req, res)=>{
  const {nameSet, subjects, data} = req.body;
  const items = await Set.findOne({where:nameSet});
  res.json({items});
};

export const getAllSets = async (req, res)=>{
  const items = await Set.findAll();
  res.json({items});
};

export const addSets = async (req, res)=>{
  try {
<<<<<<< Updated upstream
    const { nameSet, subjects, data } = req.body;
    console.log(req.body);
      if (await existsSet(nameSet)) {
          return res.status(400).json({ error: "Sets description is required." });
      }
      const item = await Set.create({ nameSet, subjects, data });
=======
    const { setName, subjects, data } = req.body;
    console.log(req.body);
      if (await existsSet(setName)) {
          return res.status(400).json({ error: "Sets description is required." });
      }
      const item = await Set.create({ setName, subjects, data });
>>>>>>> Stashed changes
  }
  catch(e){
    console.log(e);
    return res.status(500).json({error: "Failed to add item. Please try again."});
  }
};

export const clearSets = async(req, res) => {
  await Set.delete();
  res.json(await Set.findAll());
};


export class TaskController {
    constructor(){
        ModelFactoryUsers.getModel().then((model)=>{
            this.modelUsers=model;
        });
        ModelFactorySets.getModel().then((model)=>{
            this.modelSets=model;
        });
    }

    async getAllUsers(req, res) {
        const items = await User.findAll();
        res.json({items});
    }

    async addUsers(req, res){
        try {
            if (!req.body || !req.body.item) {
                return res.status(400).json({ error: "User description is required." });
            }
            const item = await this.modelUsers.create(req.body);
        }
        catch(e){
            return res.status(500).json({error: "Failed to add item. Please try again."});
        }
    }
<<<<<<< Updated upstream
    async getSetBySubject(req, res, sub) {
      try {
          const { setName, subjects, data } = req.body;
          console.log(req.body);
  
          if (sub !== subjects) {
              return res.status(400);
          }
          if (!setName || !subjects || !data) {
              return res.status(500);
          }
          const item = await this.modelSets.create({ setName, subjects, data });
  
          return res.status(200)
  
      } catch (e) {
          console.error(e);
          return res.status(500);
      }
  }
=======

>>>>>>> Stashed changes
    //clearsUsers in set.
    async clearUsers(req, res) {
        await this.model.delete();
        res.json(await this.modelUsers.read());
      }
      async getAllUsers(req, res) {
        const items = await this.modelUsers.read();
        res.json({items});
    }

<<<<<<< Updated upstream
    async updateProgress(req, res) {
      try {
        const { userId, setName, progress } = req.body;
        if (!userId || !setName || typeof progress !== "object") {
          return res.status(400).json(factoryResponse(400, "Invalid input data"));
        }
        const userSet = await Set.findOne({ where: { userId, nameSet: setName } });
        if (!userSet) {
          return res.status(404).json(factoryResponse(404, "Set not found for the user"));
        }

        await userSet.update({ progress });

        return res.status(200).json(factoryResponse(200, "Progress updated successfully"));
      } catch (e) {
        console.error(e);
        res.status(500).json(factoryResponse(500, "Failed to update progress"));
      }
    };
=======

>>>>>>> Stashed changes

}


export default new TaskController();