const express = require("express");
const bcrypt = require("bcrypt");
const todoModel = require("../models/todoSchema");
const todoRouter = express.Router();

async function addTodoHandler(data) {
  try {
    const addTodo = new todoModel(data);
    const saveUser = await addTodo.save();
    console.log(saveUser);
    console.log("todo saved");
    const allTodos = await todoModel.find({});

    return { allTodos };
  } catch (error) {
    console.log(error);
  }
}

todoRouter.post("/addtodo", async (req, res) => {
  const todoData = req.body;
  console.log(todoData);
  try {
    const { allTodos } = await addTodoHandler(todoData);
    res.status(201).json({ success: true, todos: allTodos });
  } catch (error) {
    console.log(error);
  }
});




async function deleteTodoHandler(todoId) {
    try {
      const saveUser = await todoModel.findByIdAndDelete(todoId);
      console.log(saveUser);
      console.log("todo deleted");
      const allTodos = await todoModel.find({});
  
      return { allTodos };
    } catch (error) {
      console.log(error);
    }
  }


todoRouter.post("/deletetodo", async (req, res) => {
    const todoId = req.body;
    console.log(todoId);
    try {
      const { allTodos } = await deleteTodoHandler(todoId);
      res.status(201).json({ success: true, availableTodos: allTodos });
    } catch (error) {
      console.log(error);
    }
  });





  async function updateTodoHandler(data) {
    try {
      const saveUser = await todoModel.findByIdAndUpdate( data._id ,data.updateData,{ new: true} );
      console.log(saveUser);
      console.log("todo updated");
      const updatedTodo = await todoModel.findById(data._id);

  
      return { updatedTodo };
    } catch (error) {
      console.log(error);
    }
  }


todoRouter.post("/updatetodo", async (req, res) => {
    const todoData = req.body;
    console.log(todoData);
    try {
      const { updatedTodo } = await updateTodoHandler(todoData);
      res.status(201).json({ success: true, updatedTodo: updatedTodo });
    } catch (error) {
      console.log(error);
    }
  });





module.exports = todoRouter;
