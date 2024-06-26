import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database/connection.js";
import seedTodos from "./database/seeders/todos.js";
import Todo from "./database/models/Todo.js";

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
    return res
      .status(400)
      .json({ status: "error", message: "Title is required" });
  }

  await Todo.create({ title });

  res.status(201).json({ status: "success", message: "Todo created" });
});

app.listen(PORT, async () => {
  console.log(`Project backend listening on port ${PORT}`);

  await connectToDatabase();

  await seedTodos();
});
