import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    

    return NextResponse.json(
        { message: 'Success' },
        { status: 201 },
    );
}