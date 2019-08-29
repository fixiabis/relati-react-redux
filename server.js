const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

let router = express();
router.use(express.static("build"));

let server = new http.Server(router);
let io = socketIO(server);
let socketClientInfo = {};
let players = [];

io.on("connection", socketClient => {
    let leaveTimer;

    socketClient.on("player-find", () => {
        console.log("player-find");

        while (players.length) {
            let player = players.shift();

            if (!player.disconnected) {
                socketClientInfo[player.id] = {
                    playerSymbol: "O",
                    opponentSocketId: socketClient.id
                };
                player.emit("player-found", socketClient.id, "O");

                socketClientInfo[socketClient.id] = {
                    playerSymbol: "X",
                    opponentSocketId: player.id
                };
                socketClient.emit("player-found", player.id, "X");
                return;
            }
        }

        players.push(socketClient);
    });

    socketClient.on("player-select-grid", ({ x, y }, opponentSocketId) => {
        console.log("player-select-grid", { x, y }, opponentSocketId);

        clearTimeout(leaveTimer);
        socketClient.emit("player-select-grid", { x, y });
        socketClient.to(opponentSocketId).emit("player-select-grid", { x, y });
    });

    socketClient.on("player-leave", opponentSocketId => {
        socketClient.to(opponentSocketId).emit("player-leave");
    });

    socketClient.on("disconnect", () => {
        leaveTimer = setTimeout(function () {
            console.log("timeout");
            let opponentSocketId = socketClient[socketClient.id];
            socketClient.to(opponentSocketId).emit("player-leave");
        }, 60000);
    });
});

server.listen(process.env.PORT || 3000);
