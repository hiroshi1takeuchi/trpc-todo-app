import express from "express";
import cors from "cors";
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";
import { appRouter as router } from "./router";
import { initDb } from "./service";

const PORT = 3001;
const app = express();

const createContext = ({ req, res }: CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

initDb();

app.use(cors());
app.use((req, res, next) => {
  console.log(new Date(), req.url, req.params);
  next();
});

app.use("/trpc", createExpressMiddleware({ router, createContext }));

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
