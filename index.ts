import express, { json } from "express";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { handleError } from "./utils/errors";
import { CORS, PORT } from "./config";
import { adRouter } from "./routers/ad.router";

const app = express();

app.use(
  cors({
    origin: CORS,
  })
);
app.use(json());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);

app.use("/ad", adRouter);

app.use(handleError);
app.listen(PORT, () => `Server listening on port ${PORT}`);
