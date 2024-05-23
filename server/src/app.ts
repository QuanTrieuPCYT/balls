import express from "express";
import * as path from "path";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes/index";
import { link } from "./routes/link";
// Create Express server
export const app = express();

// Express configuration
app.set("port", 3001);
app.set("views", path.join(__dirname, "../src/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", index);
app.use("/:path", link);

app.use(errorNotFoundHandler);
app.use(errorHandler);
