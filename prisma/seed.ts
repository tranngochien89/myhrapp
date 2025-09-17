
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  const password = await hashPassword('password123');
  await prisma.user.createMany({
    data: [
      {
        username: 'alice',
        password,
      },
      {
        username: 'bob',
        password,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

