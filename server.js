const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer);
  });

  socket.on("candidate", (candidate) => {
    socket.broadcast.emit("candidate", candidate);
  });

  socket.on("cursorMove", (data) => {
    socket.broadcast.emit("cursorMove", data);
  });

  socket.on("cursorClick", () => {
    socket.broadcast.emit("cursorClick");
  });
});

server.listen(3001, () => {
  console.log(`
    Server running on http://localhost:3001
    display running on http://localhost:3001/display.html
    controller running on http://localhost:3001/controller.html
     `);

});