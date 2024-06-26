import Todo from "../models/Todo.js";

const TODOS = [
  { id: 1, title: "Todo 1" },
  { id: 2, title: "Todo 2" },
  { id: 3, title: "Todo 3" },
];

const seedTodos = async () => {
  await Todo.bulkCreate(TODOS, { ignoreDuplicates: true });
};

export default seedTodos;
