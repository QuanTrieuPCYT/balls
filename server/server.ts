import express, { Request, Response } from "express";
import next from "next";
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";

const port = 3000;
const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev })
const handle = app.getRequestHandler();

import { index } from "./routes/index";
import { link } from "./routes/link";

app.prepare().then(() => {
    const server = express();

    server.set("views", path.join(__dirname, "/views"));
    server.set("view engine", "ejs");

    server.use(cookieParser());
    server.use(/\/((?!app).)*/,bodyParser.urlencoded({ extended: true }));
    server.use("/", index);
    server.use("/app", index);
    server.use("/:path", link);
    server.use(express.static(path.join(__dirname, "../public")));
    
    server.all('*', (req: Request, res: Response) => {
        return handle(req, res)
    })

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    }).on("error", (e) => {
        throw e;
    })
})