export class setDataBase {
    constructor(dbName) {
      this.dbName = dbName;
    }
  
    // Method to open the database
    async openDatabase() {
      return new Promise((resolve, reject) => {
        if (this.dbName === "") {
          reject("Database name cannot be empty.");
          return;
        }
  
        let request = indexedDB.open(this.dbName, 1);
        request.onupgradeneeded = function (event) {
          let db = event.target.result;
          if (!db.objectStoreNames.contains("tasks")) {
            db.createObjectStore("tasks", { keyPath: "id" });
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
  
    // Method to add a task
    async addTask(task) {
      const db = await this.openDatabase();
      const tx = db.transaction("tasks", "readwrite");
      const store = tx.objectStore("tasks");
      store.add(task);
  
      return new Promise((resolve, reject) => {
        tx.oncomplete = function () {
          resolve("Task added successfully!");
        };
        tx.onerror = function () {
          reject("Failed to add task.");
        };
      });
    }
//   
    Method to get all tasks
    async getTasks() {
      // TASK: Implement this method
      const db = await this.openDatabase();
      const tx = db.transaction("tasks", "readonly");
      const store = tx.objectStore("tasks");
      const stuff = store.getAll();
  
      return new Promise((resolve, reject) => {
        stuff.onsuccess=function(event){
          let arr = event.target.result;
          resolve(arr);
        }
        stuff.onerror = function(){
          reject("Failed to get tasks.");
        }
      });
    }
  
    // Method to delete a task by its ID
    async deleteTask(taskId) {
      const db = await this.openDatabase();
      const tx = db.transaction("tasks", "readwrite");
      const store = tx.objectStore("tasks");
      const stuff = store.delete(taskId);
  
      return new Promise((resolve, reject) => {
        stuff.onsuccess=function(){
          resolve("Task deleted successfully!");
        }
        stuff.onerror = function(){
          reject("Failed to delete object.");
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


export const setStorage = new setDataBase();
const user1 = new User("Maddie", "mgelnett@umass.edu","1");

const testTest = new Map();
testTest.set("What is the language we use to style a Web page?","css");
testTest.set("What is the standard markup language for Web pages?","html");
testTest.set("What is an object-oriented computer programming language commonly used to create interactive effects within web browsers?","javascript");
testTest.set("What sound do frogs make?","ribbit");
testTest.set("Is 326 awesome?","yes");

const set1 = new StudySet("CICS 326",testTest);
user1.addSets(set1);

//setDataBase.add(user1);