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
        console.log(`'${socketClient.id}' finding player`);

        while (players.length) {
            let player = players.shift();

            if (player.disconnected) continue;

            player.emit("player-found", socketClient.id, "O");
            socketClientInfo[player.id] = {
                playerSymbol: "O",
                opponentSocketId: socketClient.id
            };
            console.log(`'${player.id}' founded player`);

            socketClient.emit("player-found", player.id, "X");
            socketClientInfo[socketClient.id] = {
                playerSymbol: "X",
                opponentSocketId: player.id
            };
            console.log(`'${socketClient.id}' founded player`);

            return;
        }

        players.push(socketClient);
        console.log(`'${socketClient.id}' waiting`);
    });

    socketClient.on("player-select-grid", ({ x, y }, opponentSocketId) => {
        if (leaveTimer) clearTimeout(leaveTimer), leaveTimer = null;

        socketClient.emit("player-select-grid", { x, y });
        socketClient.to(opponentSocketId).emit("player-select-grid", { x, y });

        console.log(`'${socketClient.id}' select grid (x: ${x}, y: ${y})`);
    });

    socketClient.on("player-leave", opponentSocketId => {
        socketClient.to(opponentSocketId).emit("player-leave");
        console.log(`'${socketClient.id}' leaved`);
    });

    socketClient.on("disconnect", () => {
        let { opponentSocketId } = socketClientInfo[socketClient.id] || {};
        console.log(`'${socketClient.id}' disconnected`);

        if (opponentSocketId) {
            leaveTimer = setTimeout(() => {
                socketClient.to(opponentSocketId).emit("player-leave");
                console.log(`'${opponentSocketId}' is missing opponent '${socketClient.id}'`);
            }, 60000);
        }
    });
});

server.listen(process.env.PORT || 3000);
