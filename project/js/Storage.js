import PouchDB from "pouchdb";

const initdb = async (dbname) => {
    const db = new PouchDB(dbname);
  
    try {
      const users = await db.get("users");
    } catch (e) {
      await db.put({ _id: "users", users: [] });
    }
    try {
      const sets = await db.get("sets");
    } catch (e) {
      await db.put({ _id: "sets", sets: [] });
    }
  
    await db.close();
};

export const replitDatabase = async (dbname) => {
    await initdb(dbname);
    const getDB = () => new PouchDB(dbname);
  
    const obj = {
      saveUser: async (user) => {
        try {
          const db = getDB();
          const data = await db.get("users");
          data.users.push(user);
          await db.put(data);
          await db.close();
          return { status: "success" };
        } catch (e) {
          return {
            status: "error",
            message: "Failed to save user",
            error: e.message,
          };
        }
      },
      saveStudySet: async (set) => {
        try {
          const db = getDB();
          const data = await db.get("sets");
          data.sets.push(set);
          await db.put(data);
          await db.close();
          return { status: "success" };
        } catch (e) {
          return {
            status: "error",
            message: "Failed to save set",
            error: e.message,
          };
        }
      },
  

      getUsers: async () => {
        try {
          const db = getDB();
          const data = await db.get("users");
          const users=data.users;
          await db.close();
          return { status: "success", data:users};
        } catch (e) {
          return {
            status: "error",
            message: "Failed to get users",
            error: e.message,
          };
        }
      },
  
      getSets: async () => {
        try {
            const db = getDB();
            const data = await db.get("sets");
            const sets=data.sets;
            await db.close();
            return { status: "success", data:sets};
          } catch (e) {
            return {
              status: "error",
              message: "Failed to get sets",
              error: e.message,
            };
          }
      },
    };
  
    return obj;
  };
  

export class StudySet{
    constructor(name,dic={}){
        this.name=name;
        this.dic=dic;
        this.results = [];
    }
    getName(){
        return this.name;
    }
    setName(name){
        this.name=name;
    }
    resultsAdd(newResult){
        this.results.push(newResult);
    }
    getResult(){
        return this.results;
    }
    dicAdd(key,value){
        this.dic.set(key,value);
    }
    dicRemove(key){
        this.dic.remove(key);
    }
    getDic(){
        return this.dic;
    }
    
}

export class User{

    constructor(username,password,gmail, userID,sets=[]) {
      this.username = username;
      this.gmail = gmail;
      this.password = "";
      this.id = userID;  // Ensure userID is being set correctly
      this.sets = sets;
    }
    setUsername(userName){
        this.username=userName;
    }
    getUsername(){
        return this.username;
    }
    setGmail(gmail){
        this.gmail = gmail;
    }
    getGmail(){
        return this.gmail;
    }
    getUserID(){
        return this.id;
    }
    getSets(){
        return this.sets;
    }
    addSets(set){
        this.sets.push(set);
    }
    removeSet(set){
        this.sets.remove(set);
    }
}

