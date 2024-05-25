import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const alice = await prisma.user.upsert({
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