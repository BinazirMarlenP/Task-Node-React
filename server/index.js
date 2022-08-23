const express = require("express");
require('dotenv').config()
const app = express();
const cors = require("cors");
const pool = require("./db");
// import router from './userAuth/userRouter.js';
// import errorHandler from './middleware/ErrorHandlingMiddleware.js';

//middleware
app.use(cors());
app.use(express.json());
// app.use('/api', router);
// app.use(errorHandler)



const PORT = process.env.PORT || 5000
//ROUTES

//create a todo

app.post('/todos', async(req, res)=> {
    try {
        const { description } = req.body;
        const { name } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description, name) VALUES($1, $2)    RETURNING *",
        [description, name]);
        res.json(newTodo.rows[0])
    } catch (err) {
       console.error(err.message); 
    }
})
//get all todo

app.get("/todos", async(req, res)=> {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})
//get a todo

app.get("/todos/:id", async(req, res)=> {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
        res.json(todo.rows[0])
    } catch (err) {
        console.log(err.message);
    }
})

//update a todo
app.put("/todos/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const {name} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1, name=$2 WHERE todo_id = $3", [description, name, id])
        res.json("todo was updated")
    } catch (err) {
        console.log(err.message)
    }
})

//delete a todo
app.delete("/todos/:id", async(req, res)=>{
    try {
        const {id} =req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
        res.json("todo was deleted")
    } catch (error) {
        console.log(error.message)
    }
    
})

app.

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))