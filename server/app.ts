import express from "express";
import * as path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes/index";
import { link } from "./routes/link";
// Create Express server
export const app = express();
const nextJSProxy = createProxyMiddleware({ target: 'http://localhost:3000/', pathRewrite: { '^/app': '' }, changeOrigin: true });
// Express configuration
app.set("port", 3001);
app.set("views", path.join(__dirname, "../../views"));
app.set("view engine", "ejs");

app.use("/", index);
app.use(['/app', '/_next', '/static'], nextJSProxy);
app.use(express.static(path.join(__dirname, "../../public")));
app.use("/:path", link);

app.use(errorNotFoundHandler);
app.use(errorHandler);
