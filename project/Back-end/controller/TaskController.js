import ModelFactory from "../models/ModelFactory.js";

class TaskController {
    constructor(){
        ModelFactory.get().then((model)=>{
            this.model=model;
        });
    }

    async getAllItems(req, res) {
        const items = await this.model.read();
        res.json({items});
    }

    async additem(req, res){
        try {
            if (!req.body || !req.body.item) {
                return res.status(400).json({ error: "Item description is required." });
            }
            const item = await this.model.create(req.body);
        }
        catch(e){
            return res.status(500).json({error: "Failed to add item. Please try again."});
        }
    }
    async clearItems(req, res) {
        await this.model.delete();
        res.json(await this.model.read());
      }
}

export default new TaskController();