import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/configs/auth-options";
import { hash } from "bcrypt";
import prisma from "@/lib/db";
import { generateToken } from "@/lib/utils";


export async function POST(req: NextRequest) {
    const { url, path, domain, expire, password } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
    );

    if (!url.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi))
        return NextResponse.json(
            { error: 'Invalid URL' },
            { status: 400 },
        );
    
    if (path && !path.match(/^\w+$/))
        return NextResponse.json(
            { error: 'Invalid path' },
            { status: 400 },
        );
        
    if (expire != -1 && (new Date(expire)).getTime() < Date.now())
        return NextResponse.json(
            { error: 'Invalid expiry date' },
            { status: 400 },
        );
    
    const user_domain = await prisma.domain.findFirst({
        where: {
            id: parseInt(domain)
        },
    })

    if (user_domain?.userId != 1 && user_domain?.userId != session.user?.id)
        return NextResponse.json(
            { error: 'Provided domain is not added by user' },
            { status: 400 },
        );

    const _path = path == "" ? generateToken(7, true, true) : path;

    const isPathExist = await prisma.link.findUnique({
        where: {
            path: _path,
        },
    })

    if (isPathExist)
        return NextResponse.json(
            { error: 'Provided path exists.' },
            { status: 400 },
        );
    
    await prisma.link.create({
        data: {
            path: _path,
            expireAt: expire == -1 ? null : expire,
            password: password.length > 0 ? await hash(password, 12) : null,
            userId: session.user?.id,
            url: url,
            domainId: user_domain?.id,
        },
    })

    return NextResponse.json(
        {
            path: _path,
            expireAt: expire == -1 ? null : expire,
            userId: session.user?.id,
            url: url,
            domain: user_domain?.domain,
        },
        { status: 201 },
    );
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
    );

    if (req.nextUrl.searchParams.get("domain") != null) {
        const domains = await prisma.domain.findMany({
            where: {
                OR: [
                    { userId: session.user?.id },
                    { userId: 1 }
                ]
            },
            select: {
                id: true,
                createdAt: true,
                domain: true,
                verified: true
            }
        })

        return NextResponse.json(
            domains,
            { status: 200 }
        )
    }

    const links = await prisma.link.findMany({
        where: {
            userId: session.user?.id
        },
        select: {
            id: true,
            createdAt: true,
            path: true,
            domain: true,
            url: true,
            expireAt: true,
            password: true,
            status: true
        }
    })

    const links_filtered = links.map(e => ({...e, password: e.password ? true : false, domain: e.domain.domain }) )

    return NextResponse.json(
        links_filtered,
        { status: 201 },
    );
}