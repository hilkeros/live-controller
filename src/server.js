
const server = require("http").createServer();
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"]
});

io.on("connection", client => {
  client.on("connect", () => {
    io.emit("device connected", client.id);
  });

  client.on("send", message => {
    io.emit("message", {
      text: message,
      clientId: client.id
    });
  });

  client.on("disconnect", () => {
    io.emit("disconnected", client.id);
  });
});
server.listen(3000);