import express, { json } from "express";
import cors from "cors";
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {CORS, PORT} from "./config";

const app = express();

app.use(cors({
    origin: CORS,
}))
app.use(json());

app.use(handleError);
app.listen(PORT, () => `Server listening on port ${PORT}`)


