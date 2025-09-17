
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-and-long-key-that-is-at-least-32-characters';

async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return users;
}

export default async function UsersPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    verify(token, JWT_SECRET);
  } catch (error) {
    redirect('/login');
  }

  const users = await getUsers();

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      color: 'var(--text-color)',
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '40px', 
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
      }}>User List</h1>
      <div style={{ 
        overflowX: 'auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'var(--card-background-color)',
          border: '1px solid var(--border-color)',
        }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Username</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '15px' }}>{user.username}</td>
                <td style={{ padding: '15px' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

