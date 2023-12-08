import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 } from "uuid";
import {} from "../types/global";

// dotenv config
config();

const port: number = Number(process.env.PORT) || 3000;
const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World! from backend");
});

io.on("connection", (socket) => {
  console.log("connection to server");

  socket.on("draw", (move) => {
    console.log("drawing");
    // const roomId = getRoomId();

    const timestamp = Date.now();

    move.id = v4();

    // addMove(roomId, socket.id, { ...move, timestamp });

    io.to(socket.id).emit("your_move", { ...move, timestamp });
  });

  socket.on("disconnect", () => {
    console.log("disconnected from server");
  });
});

// ToDo: handle all routes
// app.all("*", (req, res) => {})

server.listen(port, () => {
  console.log(`Server🚀 running on port ${port}`);
});
