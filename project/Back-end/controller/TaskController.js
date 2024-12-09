import {ModelFactoryUsers as ModelFactoryUsers,ModelFactorySets as ModelFactorySets} from "../models/ModelFactory.js";
import {User} from "../models/SQLiteUserModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const factoryResponse = (status, message) => ({ status, message });

const existsUser = async (username) => {
  const user = await User.findOne({ where: { username } });
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
        const items = await this.modelUsers.read();
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

    //clearsUsers in set.
    async clearUsers(req, res) {
        await this.model.delete();
        res.json(await this.modelUsers.read());
      }
      async getAllUsers(req, res) {
        const items = await this.modelUsers.read();
        res.json({items});
    }


    async getAllSetss(req, res) {
        const items = await this.modelSets.read();
        res.json({items});
    }

    async addSets(req, res){
        try {
          const { setName, subjects, data } = req.body;
          console.log(req.body);
            if (!req.body || !req.body.item) {
                return res.status(400).json({ error: "Sets description is required." });
            }
            const item = await this.modelSets.create({ setName, subjects, data });
        }
        catch(e){
            return res.status(500).json({error: "Failed to add item. Please try again."});
        }
    }

    async clearSets(req, res) {
        await this.modelSets.delete();
        res.json(await this.modelSets.read());
      }
}


export default new TaskController();