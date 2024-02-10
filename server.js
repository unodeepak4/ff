const express = require("express");
const http = require("http");
const socket = require("socket.io");
const port = 8000;
const path = require("path");

let app = express();
let server = http.createServer(app);
let io = socket(server);

app.get("/", (req, res) => {
  let option = {
    root: path.join(__dirname),
  };

  let fileName = "index.html";

  res.sendFile(fileName, option);
});

let users = 0;
let roomNo = 0;

io.on("connection", (socketIO) => {
  console.log("A user Connected", socketIO.id);
  ++users;

  socketIO.join(`room-${roomNo}`)
  socketIO.in(`room-${roomNo}`).emit(`connectedRoom`, "You are connected to room"+ roomNo)

  // socketIO.emit('brodcast', {message: `${users} is connected`})

  // socketIO.emit("myEvent", { data: "Hellow Deepak Keshri" });

  // socketIO.broadcast.emit('brodcast', `${users} are connected`)

  socketIO.on("myEventFromClientSide", (data) => {
    console.log("Dat is ", data);
  });

  socketIO.on("disconnect", (s) => {
    --users;
    socketIO.emit('brodcast', {message: `${users} is disconnected`});
    console.log("A users id desconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running ${port}`);
});
