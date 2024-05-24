import { Request, Response } from "express";
import prisma from "../../lib/db";

export const link = async (req: Request, res: Response): Promise<void> => {
    const path = req.originalUrl.replace("/","");
    const domain = await prisma.domain.findFirst({
        where: {
            domain: req.headers.host
        },
    })
    if (!domain) return res.status(404).render("404");

    const link = await prisma.link.findFirst({
        where: {
            AND: [
                { path: path },
            ]
        },
    })
    if (!link) return res.status(404).render("404");
    const expire = link?.expireAt && new Date(link?.expireAt).getTime() || -1;
    const now = Date.now();
    if (expire != -1 && expire < now) return res.status(404).render("404");
    const goLink = (!(link.url.toLowerCase().startsWith("https://") || link.url.toLowerCase().startsWith("http://")) ? "https://" : "") + link.url;
    res.set('Cache-Control','no-cache').status(301).redirect(goLink);
};
