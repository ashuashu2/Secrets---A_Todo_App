const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.SECREAT || 2100;
const user_routes = require("./routes/authRouter");
const todo_routes = require("./routes/todoRouter");
const connectDB = require("./connect");

const uri1 =
  "mongodb+srv://ashubirthare123:ashuashu1@cluster0.2p0iqvu.mongodb.net/cluster0?retryWrites=true&w=majority";

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hy i m live . ");
});

app.use("/api/user", user_routes);
app.use("/api/todo", todo_routes);

const start = async () => {
  try {
    await connectDB(uri1);
    app.listen(PORT, () => {
      console.log(PORT + " i m connected with this port");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
