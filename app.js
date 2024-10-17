import express from "express";
import http from "http";
import db from "./db.js";

const app = express();
const server = http.createServer(app);

console.log(db);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/rooms", async (req, res) => {
  const { fields } = req.query;
  // SQL Injection Example: fields = * FROM rooms; DROP TABLE bookings; --
  const data = await db.query(`SELECT $1 FROM rooms`, fields);

  res.json({ data: data.rows });
});

app.get("/rooms/:roomId([0-9]+)", async (req, res) => {
  const { roomId } = req.params;
  const data = await db.query(`SELECT * FROM rooms WHERE room_id = $1`, roomId);

  res.json({ data: data.rows });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
