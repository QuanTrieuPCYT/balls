import { Request, Response } from "express";
import prisma from "../../lib/db";
import { global_config } from "../../lib/global";
import { compare } from "bcrypt";

export const link = async (req: Request, res: Response): Promise<void> => {
    const path = req.originalUrl.replace("/","");
    const domain = await prisma.domain.findFirst({
        where: {
            domain: req.headers.host
        },
    })
    if (!domain) return res.status(404).render("404", { siteName: global_config.siteName });

    const link = await prisma.link.findFirst({
        where: {
            AND: [
                { path: path },
                { domainId: domain.id }
            ]
        },
    })
    if (!link) return res.status(404).render("404", { siteName: global_config.siteName });
    const expire = link?.expireAt && new Date(link?.expireAt).getTime() || -1;
    const now = Date.now();
    if (expire != -1 && expire < now) return res.status(404).render("404", { siteName: global_config.siteName });
    if (link.password != null) {
        if (req.method != "POST" && !req.body.password) return res.render("password", { siteName: global_config.siteName, error: false });
        if (!(await compare(req.body.password, link.password))) return res.render("password", { siteName: global_config.siteName, error: true });
    }
    const goLink = (!(link.url.toLowerCase().startsWith("https://") || link.url.toLowerCase().startsWith("http://")) ? "https://" : "") + link.url;
    res.set('Cache-Control','no-cache').status(301).redirect(goLink);
};
