const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

// Socket.IO wiring adapted from github.com/kVarunkk/Simple-Nextjs-ChatApp (MIT).

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    path: "/socket.io",
    cors: {
      origin: "*",
    },
  });

  const nest = io.of("/nest");

  nest.on("connection", (socket) => {
    socket.on("presence.join", (data) => {
      socket.join(data.nestId);
      nest.to(data.nestId).emit("presence.update", {
        userId: data.userId,
        status: "online",
        nestId: data.nestId,
      });
    });

    socket.on("presence.leave", (data) => {
      nest.to(data.nestId).emit("presence.update", {
        userId: data.userId,
        status: "offline",
        nestId: data.nestId,
      });
    });

    socket.on("game.turn", (payload) => {
      nest.to(payload.nestId).emit("game.turn.submitted", payload);
    });

    socket.on("moment.created", (payload) => {
      nest.to(payload.nestId).emit("moment.created", payload);
    });

    socket.on("typing", (payload) => {
      nest.to(payload.nestId).emit("typing", payload);
    });

    socket.on("together.heartbeat", (payload) => {
      nest.to(payload.nestId).emit("together.status", {
        active: true,
        startedAt: payload.startedAt || Date.now(),
      });
    });

    socket.on("sync_tap", (payload) => {
      nest.to(payload.nestId).emit("sync_tap", payload);
    });

    socket.on("game.join", (payload) => {
      nest.to(payload.nestId).emit("game.joined", payload);
    });

    socket.on("game.action", (payload) => {
      nest.to(payload.nestId).emit("game.action", payload);
    });

    socket.on("disconnect", () => {
      // Optional: emit offline status with a TTL in the client.
    });
  });

  httpServer.listen(process.env.PORT || 3000, () => {
    console.log("Pairnest server running on http://localhost:3000");
  });
});
