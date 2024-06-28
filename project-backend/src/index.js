import "express-async-errors";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database/connection.js";
import seedTodos from "./database/seeders/todos.js";
import Todo from "./database/models/Todo.js";
import errorHandler from "./middleware/error.js";
import logger from "./utils/logger.js";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Ping backend");
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.findAll();

  res.json({ status: "success", data: todos });
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    logger.error("Title is required", { title });

    return res
      .status(400)
      .json({ status: "error", message: "Title is required" });
  }

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
