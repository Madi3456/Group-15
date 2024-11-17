export class UserDataBase {
  constructor(dbName) {
    this.dbName = dbName;
  }
  async openDatabase() {
    return new Promise((resolve, reject) => {
      if (this.dbName === "") {
        reject("Database name cannot be empty.");
        return;
      }

      let request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = function (event) {
        let db = event.target.result;
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "id" });
        }
      };
      request.onsuccess = function (event) {
        resolve(event.target.result);
      };
      request.onerror = function (event) {
        reject(event.target.error);
      };
    });
  }

  async addUser(user) {
    const db = await this.openDatabase();
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    store.add(user,user.getUserID);

    return new Promise((resolve, reject) => {
      tx.oncomplete = function () {
        resolve("User added successfully!");
      };
      tx.onerror = function () {
        reject("Failed to add user.");
      };
    });
  }

  async getUsers() {
    const db = await this.openDatabase();
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const stuff = store.getAll();

    return new Promise((resolve, reject) => {
      stuff.onsuccess=function(event){
        let arr = event.target.result;
        resolve(arr);
      }
      stuff.onerror = function(){
        reject("Failed to get users.");
      }
    });
  }

  async deleteUser(user) {
    const db = await this.openDatabase();
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    const stuff = store.delete(user.userID);

    return new Promise((resolve, reject) => {
      stuff.onsuccess=function(){
        resolve("User deleted successfully!");
      }
      stuff.onerror = function(){
        reject("Failed to delete user.");
      }
    });
  }
}



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
    constructor(username,gmail,userID){
        this.username=username;
        this.gmail=gmail;
        this.userID=userID;
        this.sets=[];
    }
    setUsername(userName){
        this.username=userName;
    }
    getUsername(){
        return this.username()
    }
    setGmail(gmail){
        this.gmail = gmail;
    }
    getGmail(){
        return this.gmail;
    }
    getUserID(){
        return this.userID;
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

