import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let newsData = {}; // { "news-0": { reactions: [...], comments: [...] } }

app.get("/api/news/:id", (req, res) => {
  const id = req.params.id;
  if (!newsData[id]) newsData[id] = { reactions: Array(8).fill(0), comments: [] };
  res.json(newsData[id]);
});

app.post("/api/news/:id/reaction", (req, res) => {
  const { index } = req.body;
  const id = req.params.id;
  if (!newsData[id]) newsData[id] = { reactions: Array(8).fill(0), comments: [] };
  newsData[id].reactions[index]++;
  res.json(newsData[id]);
});

app.post("/api/news/:id/comment", (req, res) => {
  const id = req.params.id;
  if (!newsData[id]) newsData[id] = { reactions: Array(8).fill(0), comments: [] };
  newsData[id].comments.push(req.body);
  res.json(newsData[id]);
});

app.listen(3000, () => console.log("Server running on port 3000"));
