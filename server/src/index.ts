import express from "express";
import cors from "cors";

const PORT = 3000;
const app = express();
app.use(cors());
app.use((req, res, next) => {
  console.log(new Date(), req.url, req.params);
  next();
});
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
