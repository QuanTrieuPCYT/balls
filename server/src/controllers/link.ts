import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const link = async (req: Request, res: Response): Promise<void> => {
    const path = req.originalUrl.replace("/","");
    const link = await prisma.link.findFirst({
        where: {
            AND: [
                { path: path },
                { domain: req.headers.host },
            ]
        },
    })
    if (!link) return res.status(404).render("404");
    const expire = link?.expireAt && new Date(link?.expireAt).getTime() || -1;
    const now = Date.now();
    if (expire != -1 && expire < now) return res.status(404).render("404");
    res.set('Cache-Control','no-cache').status(301).redirect(link.url);
};
