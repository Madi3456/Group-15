// app.js
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

// Server.js
import TaskRoutes from "./route/TaskRoutes.js";

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }

  configureMiddleware() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.app.use(express.static('Front-End'));
    this.app.use(express.json({ limit: "10mb" }));
  }

  setupRoutes() {
    this.app.use("/v1", TaskRoutes);
  }
  start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

// Initialize and start the server
console.log("Starting server...");
const server = new Server();
server.start();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use("/styles",express.static(path.join(__dirname, '../styles')));
// app.use("/js",express.static(path.join(__dirname, '../js')));
// app.use("/functionality",express.static(path.join(__dirname, '../functionality')));

// app.get("/", (req,res) =>{

//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   const filePath = path.join(__dirname, '../pages/intro.html');
//   res.sendFile(filePath);
// })

// app.get("/intro.html", (req,res) =>{

//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   const filePath = path.join(__dirname, '../pages/intro.html');
//   res.sendFile(filePath);
// })

// app.get("/testing.html", (req,res) =>{

//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   const filePath = path.join(__dirname, '../pages/testing.html');
//   res.sendFile(filePath);
// })

// app.get("/entering-study-sets.html", (req,res) =>{

//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   const filePath = path.join(__dirname, '../pages/entering-study-sets.html');
//   res.sendFile(filePath);
// })


// app.get("/inside-the-sets.html", (req,res) =>{

//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   const filePath = path.join(__dirname, '../pages/inside-the-sets.html');
//   res.sendFile(filePath);
// })

// app.get("/learn.html", (req,res) =>{

//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   const filePath = path.join(__dirname, '../pages/learn.html');
//   res.sendFile(filePath);
// })

// app.get("/sign-in.html", (req,res) =>{

//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   const filePath = path.join(__dirname, '../pages/sign-in.html');
//   res.sendFile(filePath);
// })

// app.get("/subjects.html", (req,res) =>{

//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   const filePath = path.join(__dirname, '../pages/subjects.html');
//   res.sendFile(filePath);
// })





// app.listen(port);
// console.log('Server started at http://localhost:' + port);