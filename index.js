// Jai Shree Ram
// Node server which will handle socket io connections
// I have taken 50 port for client and 8000 port for server
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/KdTest");
  console.log("we have been connected with KdTest db");
}
const loginSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  confpassword: String,
});
const kitten = mongoose.model("chatapp", loginSchema);

app.use(cors());
// const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "static/pug"));
// app.use(cors());
app.use("/static", express.static("static"));
app.use(express.urlencoded());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "https://dusad.tech",
    //  credentials: true,
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.status(200).render("login.pug");
});
app.get("/signup", (req, res) => {
  res.status(200).render("signup.pug");
});
app.post("/signup", (req, res) => {
  const userData = new kitten(req.body);
  userData.save();
  res.status(200).render("login.pug");
});
app.post("/", (req, res) => {
  // const username = req.body.username;
  const username = req.body.username;
  const password = req.body.password;
  kitten
    .find({ username: username })
    .then((chatapp) => {
      if (
        chatapp[0].password === password &&
        chatapp[0].username === username
      ) {
        res.status(200).render("home.pug");
      } else {
        res.send("Invalid credentials");
      }
    })
    .catch((err) => console.log(err));
});

const users = {};
// io.on --> It will handle all the users(or we can say it will handle the whole connection)
io.on("connection", (socket) => {
  // When someone left the chat
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
  // This socket.on give a message to other users that someone joined the chat
  socket.on("new-user-joined", (name) => {
    // We will store the name into user with a unique id
    users[socket.id] = name;
    // broadkast.emit --> It will send a message that 'name' joined the chat
    socket.broadcast.emit("user-joined", name);
  });

  // Now if a user send a message then we have to handel that message and pass it to other users
  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });
});

server.listen(5001, () => {
  console.log("Server is running on port 5001");
});
