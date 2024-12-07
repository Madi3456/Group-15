import {ModelFactoryUsers as ModelFactoryUsers,ModelFactorySets as ModelFactorySets} from "../models/ModelFactory.js";

class TaskController {
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
            if (!req.body || !req.body.item) {
                return res.status(400).json({ error: "Sets description is required." });
            }
            const item = await this.modelSets.create(req.body);
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