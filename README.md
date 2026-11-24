# Real-Time Chat Platform Demo

A minimal Socket.IO server demonstrating room-based real-time messaging and in-memory message history.

## Run
```bash
npm install
npm run dev
```
Server: http://localhost:4400

## Events
Client emits:
- `room:join` with a room name
- `message:send` with `{ room, sender, text }`

Server emits:
- `message:history`
- `message:new`

## Production improvements
Add authentication, authorization for room membership, persistent message storage, rate limits, abuse controls, message delivery guarantees, pagination, monitoring and tests. This demo is not production-ready.
