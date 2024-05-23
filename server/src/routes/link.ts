import { Router } from "express";
import * as controller from "../controllers/link";

export const link = Router();

link.get("/", controller.link);