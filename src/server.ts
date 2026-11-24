import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "http://localhost:3000" } });
app.get("/health", (_req, res) => res.json({ status: "ok" }));
type Message = { id: string; room: string; sender: string; text: string; sentAt: string };
const history = new Map<string, Message[]>();
io.on("connection", socket => {
  socket.on("room:join", (room: string) => {
    socket.join(room);
    socket.emit("message:history", history.get(room) ?? []);
  });
  socket.on("message:send", (payload: { room: string; sender: string; text: string }) => {
    if (!payload?.room || !payload?.sender || !payload?.text?.trim()) return;
    const message: Message = { id: `msg_${Date.now()}`, room: payload.room, sender: payload.sender, text: payload.text.trim().slice(0, 2000), sentAt: new Date().toISOString() };
    const messages = history.get(payload.room) ?? [];
    messages.push(message);
    history.set(payload.room, messages.slice(-100));
    io.to(payload.room).emit("message:new", message);
  });
});
httpServer.listen(4400, () => console.log("Chat demo listening on http://localhost:4400"));
