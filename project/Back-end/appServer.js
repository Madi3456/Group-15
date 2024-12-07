import dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Environment variables loaded successfully');
}
console.log("hello");
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from 'url';
import passport from "./authentication/passport.js"

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

   this.app.use("/styles",express.static(path.join(__dirname, '../Front-end/styles')));
   this.app.use("/js",express.static(path.join(__dirname, '../Front-end/js')));
   this.app.use("/functionality",express.static(path.join(__dirname, '../Front-end/functionality')));

    //rendering the website
    this.app.get("/", (req,res) =>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, '../Front-End/pages/initial-page.html');
    res.sendFile(filePath);
    });

    this.app.get("/initial-page.html", (req,res) =>{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, '../Front-End/pages/initial-page.html');
    res.sendFile(filePath);
    });

  this.app.get("/intro.html", (req,res) =>{

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

   const filePath = path.join(__dirname, '../Front-End/pages/intro.html');
   res.sendFile(filePath);
   })

  this.app.get("/testing.html", (req,res) =>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, '../Front-end/pages/testing.html');
    res.sendFile(filePath);
  });

  this.app.get("/entering-study-sets.html", (req,res) =>{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, '../Front-end/pages/entering-study-sets.html');
    res.sendFile(filePath);
  });

  this.app.get("/inside-the-sets.html", (req,res) =>{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, '../Front-end/pages/inside-the-sets.html');
    res.sendFile(filePath);
  });

  this.app.get("/learn.html", (req,res) =>{

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, '../Front-end/pages/learn.html');
  res.sendFile(filePath);
});

  this.app.get("/sign-in.html", (req,res) =>{

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, '../Front-end/pages/sign-in.html');
  res.sendFile(filePath);
  });

  this.app.get("/subjects.html", (req,res) =>{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, '../Front-end/pages/subjects.html');
    res.sendFile(filePath);
  });



  this.app.use(express.json({ limit: "10mb" }));
  
  //for authentication 
  //console.log(process.env.SESSION_SECRET);
  this.app.use(express.urlencoded({ extended: false }));
  this.app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  this.app.use(passport.initialize());
  this.app.use(passport.session());


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

console.log('Server started at http://localhost:' + 3000);