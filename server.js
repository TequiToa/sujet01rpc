const http = require("http");
const fs = require("fs");
const { chifoumi } = require("./chifoumi.js");
// Un server qui sera branché en permanence avec le client
const { Server } = require("socket.io");

const hostname = "localhost";
const port = "3000";

const server = (req, res) => {
  const url = req.url.replace("/", "");

  if (url === "") {
    // la page qui contient socket.io
    const home = fs.readFileSync("./view/index.html", "utf-8");
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(home);
    res.end();
  }
};

const app = http.createServer(server);

// attention vous devez passer l'app au server Socket.io
const io = new Server(app);

// connection de socker io avec notre server Node.js
io.on("connection", (socket) => {
  // est ce que le client envoie quelque chose ? Si oui on récupère le message
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    msg = chifoumi.convertEmoji(msg);
    // re-envoyer un message à tout le monde, même à celui qui l'a envoyé
    io.emit("chat message", chifoumi.state.players[0].name + " : " + msg);

    if (chifoumi.state.count < chifoumi.state.max) {
      console.log(chifoumi.state.count);
      const res = chifoumi.run(msg);
      chifoumi.state.count++;
      console.log("res", res);

      io.emit("chat message", "JEU : " + res);
      io.emit(
        "chat message",
        `JEU : score j1 ${chifoumi.state.players[0].count} score j2 ${chifoumi.state.players[1].count}`
      );
    }
    // envoyer un message sauf à celui qui a déclenché l'événement
    //socket.broadcast.emit("chat message", "SOME EVENT !!");
    if (chifoumi.state.count === chifoumi.state.max) {
      if (chifoumi.state.players[0].count > chifoumi.state.players[1].count) {
        io.emit(
          "chat message",
          "JEU : " +
            `${chifoumi.state.players[0].name} a gagner avec ${chifoumi.state.players[0].count} score`
        );
      }
      if (chifoumi.state.players[0].count < chifoumi.state.players[1].count) {
        io.emit(
          "chat message",
          "JEU : " +
            `${chifoumi.state.players[1].name} a gagner avec ${chifoumi.state.players[1].count} score`
        );
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
