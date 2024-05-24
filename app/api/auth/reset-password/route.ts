import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { hash } from "bcrypt";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: data.username },
                { email: data.email}
            ]
        },
    })
    if (user) return NextResponse.json(
        { message: 'There is already an account with the provided username or email.' },
        { status: 409 },
    );

    const password_hash = await hash(data.password, 12);

    await prisma.user.create({
        data: {
            username: data.username,
            email: data.email.toLowerCase(),
            password: password_hash,
        },
    })

    return NextResponse.json(
        { message: 'Success' },
        { status: 201 },
    );
}