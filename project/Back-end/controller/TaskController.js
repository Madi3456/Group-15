import { ModelFactoryUsers as ModelFactoryUsers, ModelFactorySets as ModelFactorySets } from "../models/ModelFactory.js";
import { User } from "../models/SQLiteUserModel.js";
import {Set} from "../models/SQliteSetModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const factoryResponse = (status, message) => ({ status, message });

// Check if a user exists
const existsUser = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user;
};

// Check if a set exists
const existsSet = async (nameSet) => {
  const set = await Set.findOne({ where: { nameSet } });
  return set;
};

// Register a new user
export const register = async (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  if (await existsUser(username)) {
    return res.status(400).json(factoryResponse(400, "Username already taken"));
  }

  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, password: hash });
  res.json(factoryResponse(200, "Registration successful"));
  console.log("User registered successfully");
};

// Log in an existing user
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

// Log out the user
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

// Get the user's profile
export const getProfile = (req, res) => {
  res.json(factoryResponse(200, `Welcome, ${req.user.username}`));
};

// Get a specific set
export const getSet = async (req, res) => {
  const { nameSet } = req.body;
  const set = await Set.findOne({ where: { nameSet } });
  res.json({ set });
};

// Get all sets
export const getAllSets = async (req, res) => {
  const sets = await Set.findAll();
  res.json({ sets });
};

// Add a new set
export const addSets = async (req, res) => {
  try {
    const { nameSet, subjects, data } = req.body;

    if (await existsSet(nameSet)) {
      return res.status(400).json({ error: "Set name already exists." });
    }

    const set = await Set.create({ nameSet, subjects, data });
    res.json({ set });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to add set. Please try again." });
  }
};

// Clear all sets
export const clearSets = async (req, res) => {
  await Set.destroy({ where: {} });
  res.json(await Set.findAll());
};

// Add a flashcard to a specific set
export const addFlashcardToSet = async (req, res) => {
  try {
    const { nameSet, flashcard } = req.body; // `flashcard` includes data like question and answer

    const set = await Set.findOne({ where: { nameSet } });
    if (!set) {
      return res.status(404).json({ error: "Set not found." });
    }

    const updatedData = set.data ? [...set.data, flashcard] : [flashcard];
    set.data = updatedData;
    await set.save();

    res.json({ set });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to add flashcard. Please try again." });
  }
};

// Remove a flashcard from a specific set
export const removeFlashcardFromSet = async (req, res) => {
  try {
    const { nameSet, flashcardId } = req.body; // `flashcardId` identifies the flashcard to remove

    const set = await Set.findOne({ where: { nameSet } });
    if (!set) {
      return res.status(404).json({ error: "Set not found." });
    }

    const updatedData = set.data.filter((card) => card.id !== flashcardId);
    set.data = updatedData;
    await set.save();

    res.json({ set });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to remove flashcard. Please try again." });
  }
};

// TaskController class
export class TaskController {
  constructor() {
    ModelFactoryUsers.getModel().then((model) => {
      this.modelUsers = model;
    });
    ModelFactorySets.getModel().then((model) => {
      this.modelSets = model;
    });
  }

  // Get all users
  async getAllUsers(req, res) {
    const users = await User.findAll();
    res.json({ users });
  }

  // Add a new user
  async addUsers(req, res) {
    try {
      const { username, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await this.modelUsers.create({ username, password: hash });
      res.json({ user });
    } catch (e) {
      return res.status(500).json({ error: "Failed to add user. Please try again." });
    }
  }

  // Clear all users
  async clearUsers(req, res) {
    await this.modelUsers.destroy({ where: {} });
    res.json(await this.modelUsers.findAll());
  }
}

export default new TaskController();
