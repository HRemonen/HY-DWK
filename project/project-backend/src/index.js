import "express-async-errors";
import cors from "cors";
import express from "express";

import Todo from "./database/models/Todo.js";
import seedTodos from "./database/seeders/todos.js";
import { connectToDatabase, sequelize } from "./database/connection.js";

import errorHandler from "./middleware/error.js";

import logger from "./utils/logger.js";
import { validateTodo } from "./utils/validator.js";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Ping backend");
});

app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate(); // This will spam the logs with "Executing (default): SELECT 1+1 AS result"
  } catch (err) {
    logger.error("Database connection failed", { error: err.stack });

    return res
      .status(500)
      .json({ status: "error", message: "Database connection failed" });
  }

  res
    .status(200)
    .json({ status: "success", message: "Database connection established" });
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.findAll({ order: [["id", "ASC"]] });

  res.json({ status: "success", data: todos });
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);

  if (!todo) {
    return res.status(404).json({ status: "error", message: "Todo not found" });
  }

  todo.completed = !todo.completed;
  await todo.save();

  logger.info("Todo status updated", { id });

  res.json({ status: "success", message: "Todo status updated" });
});

app.post("/todos", async (req, res) => {
  const todo = req.body;

  const validationErrors = validateTodo(req.body);

  if (validationErrors.length > 0) {
    logger.error("Validation failed", { errors: validationErrors });

    return res.status(400).json({ status: "error", data: validationErrors });
  }

  const { title } = todo;

  await Todo.create({ title });

  logger.info("Todo created", { title });

  res.status(201).json({ status: "success", message: "Todo created" });
});

app.use(errorHandler);

app.listen(PORT, async () => {
  logger.info(`Server is running on PORT: ${PORT}`);

  await connectToDatabase();

  await seedTodos();
});
