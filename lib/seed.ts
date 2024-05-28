import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    if (!process.env.BASE_DOMAIN) throw console.error("[ERROR] No BASE_DOMAIN set. Please set it in .env!");
    const _system = await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
            username: "system",
            email: "system",
            password: "system_reserved",
            role: "ADMIN",
            status: "ACTIVE"
        },
    })
    const _basedomain = await prisma.domain.upsert({
        where: { id: 1 },
        update: {},
        create: {
            domain: process.env.BASE_DOMAIN,
            verified: true,
            userId: 1
        },
    })
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
});