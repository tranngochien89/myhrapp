
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-and-long-key-that-is-at-least-32-characters';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  //if (!token) {
  // redirect('/login');
 // }

  try {
    const decoded = verify(token, JWT_SECRET) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { username: true },
    });

    if (!user) {
      redirect('/login');
    }

    return (
      <div style={{ padding: '20px' }}>
        <h1>Welcome to your Dashboard, {user.username}!</h1>
        <form action="/api/auth/logout" method="post">
          <button type="submit" style={{ marginTop: '20px', padding: '10px' }}>
            Logout
          </button>
        </form>
      </div>
    );
  } catch (error) {
    redirect('/login');
  }
}
